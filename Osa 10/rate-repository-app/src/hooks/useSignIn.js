import { useMutation } from '@apollo/client'
import { SIGNIN } from '../graphql/mutations'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router'

import useAuthStorage from '../hooks/useAuthStorage'

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGNIN)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      })

      const accessToken = data?.authenticate?.accessToken
      if (accessToken) {
        await authStorage.setAccessToken(accessToken)

        await apolloClient.resetStore()

        navigate('/repositories')
      }

      return accessToken
    } catch (e) {
      console.error('Authentication error:', e)
      throw e
    }
  }

  return [signIn, result]
}

export default useSignIn
