import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'

import Text from './Text'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  container: {
    backgroundColor: 'white',
  },
})
const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const [deleteReview] = useMutation(DELETE_REVIEW)

  const handleDelete = async (id) => {
    try {
      await deleteReview({ variables: { id } })
      refetch()
    } catch (e) {
      console.error('Error deleting review:', e)
    }
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || []

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onDelete={() => handleDelete(item.id)}
          onMyReviews={true}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews
