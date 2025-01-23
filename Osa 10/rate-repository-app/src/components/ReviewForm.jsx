import { Pressable, TextInput, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Text from './Text'
import theme from '../theme'
import useCreateReview from '../hooks/useCreateReview'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .min(0, 'Rating must be greater or equal to 0')
    .max(100, 'Rating must be at most 100')
    .typeError('You must specify a number')
    .required('Rating is required'),
  text: yup.string().optional(),
})

const ReviewForm = () => {
  const [createReview] = useCreateReview()

  const onSubmit = async (values) => {
    const { text } = values
    const rating = parseInt(values.rating)
    const ownerName = values.ownerName.toLowerCase()
    const repositoryName = values.repositoryName.toLowerCase()

    try {
      await createReview(ownerName, repositoryName, text, rating)
    } catch (e) {
      console.error('Review submission failed:', e.message)
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
        style={[styles.input, formik.errors.ownerName && styles.inputError]}
        placeholder='Repository owner name'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color='red'>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.errors.repositoryName && styles.inputError,
        ]}
        placeholder='Repository name'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color='red' styles={styles.text}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.rating && styles.inputError]}
        placeholder='Rating between 0 and 100'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color='red'>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.text && styles.inputError]}
        placeholder='Review'
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text color='red'>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color='white' fontWeight='bold'>
          Create a review
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

export default ReviewForm
