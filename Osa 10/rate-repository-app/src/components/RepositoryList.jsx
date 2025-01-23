import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    height: 40,
    width: 180,
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  separator: {
    height: 10,
  },
  dropdownText: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 10,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    marginVertical: 10,
    backgroundColor: 'white',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  setOrderDirection,
  setOrderBy,
  orderBy,
  orderDirection,
}) => {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredRepositories, setFilteredRepositories] = useState([])

  const handleChange = (text) => {
    setQuery(text)

    if (text === '') {
      setFilteredRepositories([])
    } else {
      const newFilteredRepositories = repositories.edges
        .map((edge) => edge.node)
        .filter(
          (repo) =>
            repo.fullName.toLowerCase().includes(text.toLowerCase()) ||
            repo.description.toLowerCase().includes(text.toLowerCase())
        )

      setFilteredRepositories(newFilteredRepositories)
    }
  }

  const handleOrderChange = (value) => {
    if (value === 'latest') {
      setOrderBy('CREATED_AT')
      setOrderDirection('DESC')
    } else if (value === 'highest') {
      setOrderBy('RATING_AVERAGE')
      setOrderDirection('DESC')
    } else if (value === 'lowest') {
      setOrderBy('RATING_AVERAGE')
      setOrderDirection('ASC')
    }
    setPickerVisible(false)
  }

  const navigate = useNavigate()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const repositoriesToDisplay =
    query.length > 0 ? filteredRepositories : repositoryNodes

  const handlePress = (repoId) => {
    navigate(`/repositoryView/${repoId}`)
  }

  return (
    <FlatList
      data={repositoriesToDisplay}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>Sort by:</Text>
          {!pickerVisible && (
            <Pressable onPress={() => setPickerVisible(!pickerVisible)}>
              <View style={styles.picker}>
                <Text style={styles.pickerText}>
                  {orderBy === 'CREATED_AT'
                    ? 'Latest repositories'
                    : orderBy === 'RATING_AVERAGE' && orderDirection === 'DESC'
                    ? 'Highest rated repositories'
                    : 'Lowest rated repositories'}
                </Text>
              </View>
            </Pressable>
          )}

          {pickerVisible && (
            <View
              style={{
                width: 180,
                backgroundColor: 'white',
                borderRadius: 5,
                paddingVertical: 10,
              }}
            >
              <Picker
                selectedValue={`${orderBy}-${orderDirection}`}
                onValueChange={(value) => handleOrderChange(value)}
              >
                <Picker.Item label='Latest repositories' value='latest' />
                <Picker.Item
                  label='Highest rated repositories'
                  value='highest'
                />
                <Picker.Item label='Lowest rated repositories' value='lowest' />
              </Picker>
            </View>
          )}
          <TextInput
            style={styles.searchInput}
            placeholder='Search repositories'
            value={query}
            onChangeText={(text) => handleChange(text)}
          />
        </View>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const { repositories, loading } = useRepositories({ orderBy, orderDirection })

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderDirection={setOrderDirection}
      setOrderBy={setOrderBy}
      orderBy={orderBy}
      orderDirection={orderDirection}
    />
  )
}

export default RepositoryList
