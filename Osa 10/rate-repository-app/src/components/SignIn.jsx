import { Pressable, TextInput, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Text from './Text'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const accessToken = await signIn({ username, password })
      console.log('Access token: ', accessToken)
    } catch (e) {
      console.log('Sign-in failed: ', e)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.inputError]}
        placeholder='Username'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color='red'>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder='Password'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text color='red' styles={styles.text}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white' fontWeight='bold'>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 10,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: theme.colors.red,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  text: {
    marginVertical: 5,
  },
})

export default SignIn
