import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Movies from './Movies';
import MovieGenres from './MovieGenres';
import { getMovies } from './ApiService/MoviesService';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genreId, setGenreId] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await getMovies(genreId);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [genreId]);

  const handleGenreSelection = selectedGenreId => {
    setGenreId(selectedGenreId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleGenreSelection(-1)}>
          <Text style={styles.buttonText}>İzlenecek Filmler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleGenreSelection(-2)}>
          <Text style={styles.buttonText}>En Çok Oy Alanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleGenreSelection(-3)}>
          <Text style={styles.buttonText}>Trend Filmler</Text>
        </TouchableOpacity>
      </View>
      <MovieGenres onGenreSelect={handleGenreSelection} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.moviesContainer}>
          {movies.map(movie => (
            <Movies key={movie.id} movie={movie} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRightWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
  scrollView: {
    flex: 1, // Bu, ScrollView'in geri kalan alanı kaplamasını sağlar
  },
  moviesContainer: {
    flexGrow: 1, // İçeriğin ScrollView içinde büyümesini sağlar
  },
  footer: {
    padding: 0.1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 0.1,
    color: '#333',
  },
});

export default MoviesList;
