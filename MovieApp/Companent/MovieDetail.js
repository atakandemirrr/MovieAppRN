import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MovieDetail = ({ route,navigation}) => {
  const { movieId } = route.params;
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2ViMWYzYTMyOTNiOTNkYTVkNTg4NmYyMDQzMGFjZSIsIm5iZiI6MTcyMTIxOTE5MC43NTMwMTEsInN1YiI6IjY2OTc4Y2VjNGFlNjM1NWQxYjBjZWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZVvQmzp4mA1rVtSNa4I5yfj5RknPx5eM6F2LsLRJx4I'
        }
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=tr`, options);
        const data = await response.json();

        const movie = {
          title: data.title,
          year: data.release_date ? new Date(data.release_date).getFullYear().toString() : '',
          description: data.overview,
          rating: data.vote_average.toString(),
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`
        };
        setMovieDetail(movie);
        navigation.setOptions({ title: movie.title });

        setMovieDetail(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId, navigation]);

  if (!movieDetail) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movieDetail.poster }} style={styles.poster} />
      <Text style={styles.title}>{movieDetail.title}</Text>
      <Text style={styles.subtitle}>{movieDetail.year}</Text>
      <View style={styles.divider} />
      <Text style={styles.description}>{movieDetail.description}</Text>
      <View style={styles.footer}>
        <Icon name="star" size={20} color="#ffd700" />
        <Text style={styles.rating}>{movieDetail.rating}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
  divider: {
    height: 1,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    marginVertical: 10,
    width: '100%',
    color: 'black',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetail;
