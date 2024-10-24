import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchCountry = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        setCountry(res.data)
      } catch (e) {
        if (e.response && e.response.status === 404) {
          setError('Country not found')
        } else {
          setError('Error in fetching data')
        }
        setCountry(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [name])

  return { country, loading, error }
}
