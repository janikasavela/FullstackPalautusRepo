import React from 'react'
import { View, StyleSheet, Pressable, Alert } from 'react-native'
import { useNavigate } from 'react-router-native'

import Text from './Text'
import theme from '../theme'

const ReviewItem = ({ review, onDelete, onMyReviews }) => {
  const navigate = useNavigate()

  const handleViewRepository = () => {
    navigate(`/repositoryView/${review.repository.id}`)
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <View style={styles.rating}>
          <Text color='primary' fontSize='subheading'>
            {review.rating}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text fontWeight='bold'>{review?.user?.username}</Text>
          <Text fontWeight='bold'>{review?.repository?.fullName}</Text>
          <Text color='textSecondary' style={styles.text}>
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      {onMyReviews && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleViewRepository}>
            <Text style={styles.buttonText}>View Repository</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete Review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rating: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.red,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ReviewItem
