import { Pressable, TextInput, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Text from './Text'
import theme from '../theme'
import useCreateUser from '../hooks/useCreateUser'
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
  password2: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Password is required'),
  password2: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
    .required('Password confirmation is required'),
})

const SignUp = () => {
  const [createUser] = useCreateUser()
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await createUser(username, password)
      signIn({ username, password })
    } catch (e) {
      console.error('Sign up failed', e.message)
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
      <TextInput
        style={[styles.input, formik.errors.password2 && styles.inputError]}
        placeholder='Password confirmation'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password2}
        onChangeText={formik.handleChange('password2')}
        secureTextEntry
      />
      {formik.touched.password2 && formik.errors.password2 && (
        <Text color='red' styles={styles.text}>
          {formik.errors.password2}
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

export default SignUp
