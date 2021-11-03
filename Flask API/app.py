from flask import Flask, jsonify, request
import torch.nn.functional as F
from flask_cors import CORS, cross_origin
from tqdm import trange
import torch
from transformers import GPT2TokenizerFast, T5Tokenizer
app = Flask(__name__) #is referencing the file
CORS(app, support_credentials=True)

def top_k_top_p_ordering(logits, top_k=0, top_p=0.0, filter_value=-float('Inf')):
    """ Filter a distribution of logits using top-k and/or (top-p) filtering.
        Args:
            logits: batch size x vocabulary size
            top_k > 0: keep only top k tokens with highest probability (top-k filtering).
            top_p > 0.0: keep the top tokens with cumulative probability >= top_p (nucleus filtering).
        Snippet taken from: https://gist.github.com/thomwolf/1a5a29f6962089e871b94cbd09daf317
    """
    top_k = min(top_k, logits.size(-1))  # Safety check

    if top_k > 0:
        # Remove all tokens with a probability less than the last token of the top-k
        indices_to_remove = logits < torch.topk(logits, top_k)[0][..., -1, None]
        logits[indices_to_remove] = filter_value

    if top_p > 0.0:
        sorted_logits, sorted_indices = torch.sort(logits, descending=True)
        cumulative_probs = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)

        # Remove tokens with cumulative probability greater than the top_p threshold
        sorted_indices_to_remove = cumulative_probs > top_p
        # Shift the indices to the right to keep also the first token above the threshold
        sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[..., :-1].clone()
        sorted_indices_to_remove[..., 0] = 0

        # scatter sorted tensors to original indexing
        indices_to_remove = sorted_indices_to_remove.scatter(dim=1, index=sorted_indices, src=sorted_indices_to_remove)
        logits[indices_to_remove] = filter_value
    return logits


# snippet from HuggingFace, adapted to work for contextual separation:
def sample_sequence(model, length, context, segments_tokens=None, num_samples=1, temperature=1, top_k=0, top_p=0.0, repetition_penalty=1.0,):
    context = torch.tensor(context, dtype=torch.long, device='cpu')
    context = context.unsqueeze(0).repeat(num_samples, 1)
    generated = context

    with torch.no_grad():
        for _ in trange(length):

            inputs = {'input_ids': generated}
            if segments_tokens != None:
              inputs['token_type_ids'] = torch.tensor(segments_tokens[:generated.shape[1]]).unsqueeze(0).repeat(num_samples, 1)


            outputs = model(**inputs) 
            next_token_logits = outputs[0][:, -1, :] / (temperature if temperature > 0 else 1.)

            # repetition penalty from CTRL (https://arxiv.org/abs/1909.05858)
            for i in range(num_samples):
                for _ in set(generated[i].tolist()):
                    next_token_logits[i, _] /= repetition_penalty
                
            filtered_logits = top_k_top_p_ordering(next_token_logits, top_k=top_k, top_p=top_p)
            if temperature == 0: # sampling (greedy):
                next_token = torch.argmax(filtered_logits, dim=-1).unsqueeze(-1)
            else:
                next_token = torch.multinomial(F.softmax(filtered_logits, dim=-1), num_samples=1)
            generated = torch.cat((generated, next_token), dim=1) 
    return generated

@app.route('/generateTaglines', methods=['POST'])
@cross_origin(supports_credentials=True)
def index():
    #input data
    data = request.get_json()
    context = data['context'] 
    suggestions_ = data['num_of_suggestions']

    #gpt2
    tokenizer = GPT2TokenizerFast.from_pretrained('distilgpt2',truncation=True,padding=True)
    model=torch.load('./retrained_tagline_generatorv1_compiled.pth')

    extra_tokens = {
        'pad_token': '<pad>',
        'additional_special_tokens': ['<nameinfo>', '<headline>']
    }

    tokenizer.add_special_tokens(extra_tokens)
    model.resize_token_embeddings(len(tokenizer))


    #context = "Starbucks, best coffee in california"
    #context = "Tesla, fast luxurious electric cars"

    context_tkn = tokenizer.additional_special_tokens_ids[0]
    slogan_tkn = tokenizer.additional_special_tokens_ids[1]

    input_ids = [context_tkn] + tokenizer.encode(context)

    segments = [slogan_tkn] * 64
    segments[:len(input_ids)] = [context_tkn] * len(input_ids)

    input_ids += [slogan_tkn]

    # Move the model back to the CPU for inference:
    #model.to(torch.device('cpu'))
    
    # Generate 20 samples of max length 20
    #print("using gpt2")
    list_ = []
    suggestions_gpt2 = suggestions_//2 if suggestions_%2==0 else (suggestions_//2)+1  
    print(suggestions_gpt2)
    generated = sample_sequence(model, length=20, context=input_ids, segments_tokens=segments, num_samples=suggestions_gpt2)
    for g in generated:
        slogan = tokenizer.decode(g.squeeze().tolist())
        slogan = slogan.split('<|endoftext|>')[0].split('<headline>')[1]
        #print(slogan)
        list_.append(slogan)
        


    # t5Tokenizer
    tokenizer = T5Tokenizer.from_pretrained('t5-small')
    t5_model=torch.load("./tagline_generator_T5_v1.pth")
    test_tokenized = tokenizer.encode_plus(context, return_tensors="pt")

    test_input_ids  = test_tokenized["input_ids"]
    test_attention_mask = test_tokenized["attention_mask"]

    #print("using t5")
    t5_model.eval()
    beam_outputs = t5_model.generate(
        input_ids=test_input_ids,attention_mask=test_attention_mask,
        max_length=128,
        early_stopping=True,
        num_beams=20,
        num_return_sequences=(suggestions_//2),
        no_repeat_ngram_size=2
    )
    print(len(beam_outputs))
    for beam_output in beam_outputs:
        sent = tokenizer.decode(beam_output, skip_special_tokens=True,clean_up_tokenization_spaces=True)
        #print(sent)
        list_.append(sent)

    
    return jsonify(list_)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
