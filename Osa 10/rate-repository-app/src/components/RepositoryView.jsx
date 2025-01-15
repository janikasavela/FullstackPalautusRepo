import React from 'react'
import { View, Button, StyleSheet, FlatList } from 'react-native'
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
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: repoId },
  })
  const {
    data: reviewsData,
    loading: loadingReviews,
    error: errorReviews,
  } = useQuery(GET_REVIEWS, {
    variables: { id: repoId },
  })

  const openGitHub = (url) => {
    Linking.openURL(url)
  }

  if (loading || loadingReviews) return <Text>Loading...</Text>
  if (error || errorReviews) return <Text>Error: {error.message}</Text>

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
    />
  )
}

export default RepositoryView
