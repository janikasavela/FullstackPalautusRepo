import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Constants from 'expo-constants'
import { relayStylePagination } from '@apollo/client/utilities'

const createApolloClient = (authStorage) => {
  const httpLink = createHttpLink({
    uri: Constants.expoConfig.extra.env,
  })

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      console.log('Access token:', accessToken)

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
        Repository: {
          fields: {
            reviews: relayStylePagination(),
          },
        },
      },
    }),
  })
}

export default createApolloClient
