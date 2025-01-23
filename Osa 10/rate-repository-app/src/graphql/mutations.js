import { gql } from '@apollo/client'

export const SIGNIN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
    }
  }
`
