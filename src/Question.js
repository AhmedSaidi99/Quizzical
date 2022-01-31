import { useEffect, useState } from "react";
import { decode } from "html-entities";

const Question = (props) => {
  const { question, correctAnswer, incorrectAnswers, isSubmited } = props;
  const [chosen, setChosen] = useState(localStorage.getItem(question) || '')
  const [allAnswers, setAllAnswers] = useState([])



  useEffect(() => {
    localStorage.setItem(question, chosen)
  }, [chosen])




  useEffect(() => {
    setAllAnswers([correctAnswer, ...incorrectAnswers].sort())
  }, [])


  function handleClick(e) {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
    } else {
      let answers = e.target.parentNode.childNodes;
      answers.forEach((ans) => {
        ans.classList.remove("active");
      });
      e.target.classList.add("active");
      setChosen(e.target.outerText)
    }
  }

  
  const answerElements = allAnswers.map((answer) => {

    return (
      <>
      {!isSubmited ?
      <span key={answer} onClick={(e) => handleClick(e)}>{decode(answer)}</span> :
      <span 
        key={answer}
        className={`submited 
        ${ correctAnswer === answer ? 'correct' : ""}
        ${  chosen === answer && incorrectAnswers.some(ans => ans === chosen) ? 'wrong' : ''}
        `}
      >
        {decode(answer)}
      </span>}
      </>
    )
  });


  return (
    <div className="question">
      <h1 className="question__title">{decode(question)}</h1>
      <div className="question__answers">
        {answerElements}
      </div>
      <div className="question--line"></div>
    </div>
  );
};

export default Question;
