import { useNavigate } from 'react-router-native'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const useCreateReview = () => {
  const navigate = useNavigate()
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const createReview = async (ownerName, repositoryName, text, rating) => {
    console.log(ownerName, repositoryName, rating, text)

    try {
      const { data } = await mutate({
        variables: {
          ownerName,
          repositoryName,
          rating,
          text,
        },
      })

      if (data?.createReview?.repositoryId) {
        navigate(`/repositoryView/${data.createReview.repositoryId}`)
      }
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  }

  return [createReview, result]
}

export default useCreateReview
