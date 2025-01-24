import React, { useState } from 'react'
import { FlatList, Button, StyleSheet, View } from 'react-native'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  container: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    paddingBottom: 20,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryView = () => {
  const { repoId } = useParams()
  const [after, setAfter] = useState('') // initialize `after` as an empty string

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repoId },
    fetchPolicy: 'cache-and-network',
  })

  const {
    data: reviewsData,
    loading: loadingReviews,
    error: errorReviews,
    fetchMore,
  } = useQuery(GET_REVIEWS, {
    variables: { id: repoId, first: 2, after: after || '' }, // pass empty string if `after` is null
  })

  const openGitHub = (url) => {
    Linking.openURL(url)
  }

  const handleLoadMore = () => {
    if (reviewsData.repository.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: reviewsData.repository.reviews.pageInfo.endCursor,
        },
      }).then((newData) => {
        setAfter(newData.data.repository.reviews.pageInfo.endCursor)
      })
    }
  }

  // Error handling improvements:
  if (loading || loadingReviews) return <Text>Loading...</Text>

  // Check for error existence before accessing 'message'
  if (error || errorReviews) {
    const errorMessage =
      (error && error.message) ||
      (errorReviews && errorReviews.message) ||
      'An unknown error occurred.'
    return <Text>Error: {errorMessage}</Text>
  }

  const repository = data.repository
  const reviews = reviewsData.repository.reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} />
          <Button
            title='Open in GitHub'
            onPress={() => openGitHub(repository.url)}
            style={styles.button}
          />
          <ItemSeparator />
        </>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default RepositoryView
