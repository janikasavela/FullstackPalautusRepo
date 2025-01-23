import { StyleSheet, ScrollView, View } from 'react-native'
import Constants from 'expo-constants'
import { Link } from 'react-router-native'

import Text from './Text'
import theme from '../theme'
import useMe from '../hooks/useMe'
import useSignOut from '../hooks/useSignOut'

const AppBar = () => {
  const { data, loading, error } = useMe()
  const signOut = useSignOut()

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const isAuthenticated = data?.me?.id != null

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Link to='/' style={styles.link}>
          <Text color='white' fontWeight='bold'>
            Repositories
          </Text>
        </Link>
        {isAuthenticated ? (
          <>
            <Link to='/review' style={styles.link}>
              <Text color='white' fontWeight='bold'>
                Create a review
              </Text>
            </Link>
            <Link
              to='/signin'
              style={styles.link}
              onPress={async () => {
                await signOut()
              }}
            >
              <Text color='white' fontWeight='bold'>
                Sign out
              </Text>
            </Link>
          </>
        ) : (
          <>
            <Link to='/signin' style={styles.link}>
              <Text color='white' fontWeight='bold'>
                Sign in
              </Text>
            </Link>
            <Link to='/signup' style={styles.link}>
              <Text color='white' fontWeight='bold'>
                Sign up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    height: 120,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  link: {
    marginRight: 20,
  },
})

export default AppBar
