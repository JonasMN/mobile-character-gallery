import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import Card from './Card';

const numColumns = 2;

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const charactersData = await response.json();
        setCharacters(prevCharacters => [...prevCharacters, ...charactersData.results]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handleEndReached = () => {
    if (!isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderCharacterGroup = ({ item }) => (
    <View style={styles.characterGroup}>
      {item.map(character => (
        <Card 
          key={character.id}
          title={character.name}
          description={character.status}
          image={{uri: character.image}}
        />
      ))}
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7e67ab" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const characterGroups = [];
  for (let i = 0; i < characters.length; i += numColumns) {
    characterGroups.push(characters.slice(i, i + numColumns));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={characterGroups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCharacterGroup}
          contentContainerStyle={styles.listContent}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  listContent: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingBottom: 20,
  },
  characterGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});
