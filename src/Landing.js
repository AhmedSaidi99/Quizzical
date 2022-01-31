import { useEffect, useState } from 'react';

const Landing = (props) => {
  const [categories, setCategories] = useState([])
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState(0)
  const [fetchURL, setFetchURL] = useState('')

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
    .then(res => res.json())
    .then(data => setCategories(data.trivia_categories))
  }, [])


  useEffect(() => {
    setFetchURL(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=hard&type=multiple`)
    localStorage.setItem('fetchURL', fetchURL)
    localStorage.setItem('amount', amount)
  })


  const options = categories.map(category => {
    return (
      <option value={category.id}>{category.name}</option>
    )
  })


  return ( 
      <div className='landing'>
        <h1 className='landing__title'>Quizzical</h1>
        <p className='landing__desc'>Choose category, Questions amount <br/>and start your quiz</p>
        <div className='landing__form'>
          <input name='amount' placeholder='Questions amount (1-50)' type="number" min="1" max="50" onChange={(e) => setAmount(e.target.value)}  />
          <select name='category' onChange={(e) => setCategory(e.target.value)}>
            <option value="" selected disabled hidden>All categories </option>
            {options}
          </select>
        </div>
        <button type='submit' className='landing--btn' onClick={props.startQuiz} >Start quiz</button>
      </div>
);
}

export default Landing;