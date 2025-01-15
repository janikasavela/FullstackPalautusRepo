import { useApolloClient } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

const useSignOut = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken()

      await apolloClient.resetStore()
    } catch (e) {
      console.error('Sign out error:', e)
      throw e
    }
  }

  return signOut
}

export default useSignOut
