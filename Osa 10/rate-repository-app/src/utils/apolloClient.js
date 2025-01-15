import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Constants from 'expo-constants'

const createApolloClient = (authStorage) => {
  const httpLink = createHttpLink({
    uri: Constants.expoConfig.extra.env,
  })

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      console.log('Accesstoken', accessToken)

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '', // Add the Bearer token if available
        },
      }
    } catch (e) {
      console.error('Failed to set Authorization header:', e)
      return {
        headers,
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
