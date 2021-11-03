import { useEffect, useState } from "react";
import Question from "../components/Question";
import * as React from "react";
import Loader from "./Loader";
import axios from "axios";

const Questionnaire = ({ loading, setLoading }) => {
  const [inner, setInner] = useState("");
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [text, setText] = useState("");
  const [lastque, setLastque] = useState(0);
  const [result, setResult] = useState([]);

  const handleDone = (e) => {
    if (count === 3) {
      setLoading(true);
      setLastque(1);
    }
    setCount(count + 1);
    setInner("inner");
    setText(text + " " + answer);
    setAnswer("");
  };

  useEffect(() => {
    setTimeout(() => {
      setInner("");
    }, 1200);
  }, [count]);
  useEffect(() => {
    if (count === 4) {
      axios
        .post("https://apiforbrandit.in/generateTaglines", {
          num_of_suggestions: 5,
          context: text,
        })
        .then((res) => {
          setResult(res.data);
        });
    }
  }, [lastque, setLastque]);

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const questions = [
    {
      qno: "1",
      question: "Let's start simple - what's the name of your product/brand?",
    },
    {
      qno: "2",
      question: "Words you wish to strongly associate with your brand?",
    },
    {
      qno: "3",
      question: "What problem does it solve?",
    },
    {
      qno: "4",
      question: "What segment does it target?",
    },
  ];

  return (
    <div>
      {loading ? (
        <Loader result={result} setResult={setResult} text={text} />
      ) : (
        <div className="questionnaire">
          <Question
            qno={questions[count].qno}
            question={questions[count].question}
            handleDone={handleDone}
            inner={inner}
            answer={answer}
            setAnswer={setAnswer}
          />
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
