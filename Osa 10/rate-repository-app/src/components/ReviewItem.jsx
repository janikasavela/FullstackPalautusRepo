import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from './Text'

import theme from '../theme'

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color='primary' fontSize='subheading'>
          {review.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary' style={styles.text}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    marginVertical: 5,
  },
  rating: {
    marginTop: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  ratingText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ReviewItem
