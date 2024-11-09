import { useEffect, useState } from 'react'
import { Diary } from './models/Diary'
import { getAllDiaries, createDiary } from './services/diaryService'
import axios from 'axios'

const App = () => {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      id: diaries.length + 1,
      date,
      weather,
      visibility,
      comment,
    }

    try {
      const data = await createDiary(diaryToAdd)
      setDiaries(diaries.concat(data))
      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
      setErrorMessage(null)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data)
      } else {
        setErrorMessage('An unexpected error occurred.')
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Weather:</label>
          <div>
            <label>
              <input
                type='radio'
                name='weather'
                value='sunny'
                checked={weather === 'sunny'}
                onChange={(event) => setWeather(event.target.value)}
              />
              Sunny
            </label>
            <label>
              <input
                type='radio'
                name='weather'
                value='rainy'
                checked={weather === 'rainy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              Rainy
            </label>
            <label>
              <input
                type='radio'
                name='weather'
                value='cloudy'
                checked={weather === 'cloudy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              Cloudy
            </label>
            <label>
              <input
                type='radio'
                name='stormy'
                value='stormy'
                checked={weather === 'stormy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              Stormy
            </label>
            <label>
              <input
                type='radio'
                name='windy'
                value='windy'
                checked={weather === 'windy'}
                onChange={(event) => setWeather(event.target.value)}
              />
              Windy
            </label>
          </div>
        </div>

        <div>
          <label>Visibility:</label>
          <div>
            <label>
              <input
                type='radio'
                name='visibility'
                value='great'
                checked={visibility === 'great'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              Great
            </label>
            <label>
              <input
                type='radio'
                name='visibility'
                value='good'
                checked={visibility === 'good'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              Good
            </label>
            <label>
              <input
                type='radio'
                name='visibility'
                value='ok'
                checked={visibility === 'ok'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              Ok
            </label>
            <label>
              <input
                type='radio'
                name='visibility'
                value='poor'
                checked={visibility === 'poor'}
                onChange={(event) => setVisibility(event.target.value)}
              />
              Poor
            </label>
          </div>
        </div>

        <div>
          <label htmlFor='comment'>Comment:</label>
          <textarea
            id='comment'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder='Write your comment here'
            required
          />
        </div>

        <button type='submit'>Add</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h2>Diary entries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <div>{diary.date}</div>
            <div>{diary.weather}</div>
            <div>{diary.visibility}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
