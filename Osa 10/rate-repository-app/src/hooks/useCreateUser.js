import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER)

  const createUser = async (username, password) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      })
      return data.createUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  return [createUser, result]
}

export default useCreateUser
