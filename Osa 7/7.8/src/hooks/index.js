import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (url) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(url)
        setResources(res.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchAll()
  }, [url])

  const create = async (newObject) => {
    try {
      const res = await axios.post(url, newObject)
      setResources(resources.concat(res.data))
    } catch (e) {
      console.error(e)
    }
  }

  return [resources, { create }]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
