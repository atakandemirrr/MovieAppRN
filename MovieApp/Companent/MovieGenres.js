import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MovieGenres = ({onGenreSelect}) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2ViMWYzYTMyOTNiOTNkYTVkNTg4NmYyMDQzMGFjZSIsIm5iZiI6MTcyMTIxOTE5MC43NTMwMTEsInN1YiI6IjY2OTc4Y2VjNGFlNjM1NWQxYjBjZWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZVvQmzp4mA1rVtSNa4I5yfj5RknPx5eM6F2LsLRJx4I',
        },
      };

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=tr',
          options,
        );
        const data = await response.json();

        const fetchedGenres = [
          {id: 0, name: 'Tümü'},
          ...data.genres.map(genre => ({
            id: genre.id,
            name: genre.name,
          })),
        ];

        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching Genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenrePress = genreId => {
    onGenreSelect(genreId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {genres.map(genre => (
          <TouchableOpacity
            key={genre.id}
            style={styles.button}
            onPress={() => handleGenrePress(genre.id)}>
            <Text style={styles.buttonText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default MovieGenres;
