import { View, Image, StyleSheet } from 'react-native'

import Text from './Text'
import theme from '../theme'

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name} fontWeight='bold' fontSize='subheading'>
            {item.fullName}
          </Text>
          <Text>{item.description}</Text>
          <Text style={styles.language} color='white'>
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text fontWeight='bold' fontSize='subheading'>
            {item.stargazersCount}
          </Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight='bold' fontSize='subheading'>
            {item.forksCount}
          </Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight='bold' fontSize='subheading'>
            {item.reviewCount}
          </Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight='bold' fontSize='subheading'>
            {item.ratingAverage}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    marginBottom: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },
})

export default RepositoryItem
