# BrandIt


## Inspiration:

  

People are spending more time online than ever before. For most businesses, it’s time to amplify their digital presence.This made us ponder about creating a platform which will help to establish the voice of a brand or company. Our goal is to help brands establish their identity in a clear and simple way.

Digital marketing slogans are the little punchy taglines that explain the clients what you do. They are short, easy-to-memorize, and give insight into your business.  Being able to come up with a good branding statement for your business is a valuable skill. We felt the need to create a dynamic solution for creating branding statements.

  

## What it does:

  

‘BrandIt’ is a simple, yet effective solution to help you gain a competitive advantage in the industry by asking the right questions about your brand/product thus catering to those caveats for crafting ideal branding statements, in-turn helping you capture more market attention thus helping your business grow to new heights.

  

## How we built it:

  

We trained two Generative Transformer models- namely the GPT-2 and T5 models on a custom compilation of already present as well as web-scraped data of brand/product names and their associated statements. These models are deployed over a Flask API and served via an intuitive UI built using React for the user to interact with.

  

## Challenges we ran into:

  

-   Identifying the ideal problem statement which would have a potential benefit, took time and required a lot of critical thinking for weighing out potential impacts/issues that a problem statement may have to deal with.
    
-   Deploying an ML model over a web platform and integrating it with the front-end was a first, thus having a learning curve to overcome.
    
-   Data gathering for training the model proved to be a challenge as there is no readily compiled dataset that would prove ideal for tackling our problem.
    

  
  

## Accomplishments that we're proud of:


We are proud of being able to build an actual working product which delivers customized Branding Statements keeping in mind the target audience.

  

## What we learned:

### A few things we learnt from the non-technical aspect:
We've learned how to effectively present our concepts as a team as well as take constructive feedback for refining our ideas further, and leverage our technical skills for creating a real-life application.

### A few things we learnt from the technical aspect:

-   Using Pytorch to train a generative textual model for getting ideal output.
    
-   Data gathering, compiling and scraping for your model using Selenium Python
    
-   Leveraging the HuggingFace API for training cutting-edge models
    
-   Integrating an ML model in an application
    
-   Deploying a Flask API over an Instance
    
-   Integrating an API with a ReactJS Application over Axios.
    

  
  

## What's next for Brand-It:

  

Along with creating taglines, in future, we aim to create video advertisements using PyTorch-based deep fake videos. This will help companies save the production cost of advertisements. We plan on making this application as user friendly as possible to help small scale businesses grow.
