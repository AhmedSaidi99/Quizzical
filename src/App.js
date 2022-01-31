import { useEffect, useState } from 'react';
import Landing from './Landing';
import Question from './Question';
import { nanoid } from 'nanoid'
import './App.css';

function App() {
  const [started, setStarted] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)
  const [questions, setQuestions] = useState(() => JSON.parse(localStorage.getItem('questions')) || [])
  const [score, setScore] = useState(0)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {

    setTimeout(() => {
      fetch(localStorage.getItem('fetchURL'))
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)
        setIsPending(false)
      })
    }, 700)
    
  }, [started])

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    setScore(0)
    if (isSubmited) {
      questions.map(quest => {
        if (localStorage.getItem(quest.question) === quest.correct_answer) {
          setScore(prevCount => prevCount + 1)
        }
      })
    }
  }, [isSubmited])

  function startQuiz() {
    setStarted(true)
    setIsPending(true)
  }

  


  function checkAnswers() {
    if (isSubmited) {
      setIsSubmited(false)
      setStarted(false)
      localStorage.clear()
    } else {
      setIsSubmited(true)
    }
  }


  
  const questionsBodies = questions.map(quesInfo => {
    let questionId = nanoid()
    return (
      <Question
        key={questionId}
        question={quesInfo.question}
        correctAnswer={quesInfo.correct_answer}
        incorrectAnswers={quesInfo.incorrect_answers}
        isSubmited={isSubmited}
      />
    )
  })


  return (
    <div className="app">
      <div className='blob-top'></div>
      {!started && <Landing startQuiz={startQuiz}/>}
      {isPending && <div className='loading'><div class="spinner"></div></div>}
      {
        started && 
        <div className='quiz'>
        <div className='quiz__questions'>{questionsBodies}</div>
        {isSubmited && <p className='quiz__result'>You scored {score}/{localStorage.getItem('amount')} correct answers</p>}
        {!isPending && <button className='quiz--btn' onClick={checkAnswers}>{isSubmited ? 'Play again' : 'Check answers'}</button>}
      </div>
      }
      <div className='blob-bottom'></div>
    </div>
  );
}

export default App;
