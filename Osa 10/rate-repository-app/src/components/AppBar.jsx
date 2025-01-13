import { StyleSheet, Pressable, ScrollView, View } from 'react-native'
import Constants from 'expo-constants'

import Text from './Text'
import theme from '../theme'
import { Link } from 'react-router-native'

const AppBar = () => {
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
        <Link to='/signin' style={styles.link}>
          <Text color='white' fontWeight='bold'>
            Sign in
          </Text>
        </Link>
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
