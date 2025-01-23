import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import RepositoryView from './RepositoryView'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ReviewForm from './ReviewForm'
import MyReviews from './MyReviews'

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repositoryView/:repoId' element={<RepositoryView />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/review' element={<ReviewForm />} />
        <Route path='/reviews' element={<MyReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
})

export default Main
