import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
} from './Data/MoviesToWatchCRUD';

const Movies = ({movie}) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
  const navigation = useNavigation();

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) {
      addMovieToWatchlist(movie.id);
      alert('Sonra İzleneceklere Eklendi!');
    } else {
      deleteMovieFromWatchlist(movie.id);
      alert('Sonra İzleneceklerden Çıkarıldı!');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: movie.poster}} style={styles.poster} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>{movie.year}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {movie.description}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('MovieDetail', {movieId: movie.id})
          }>
          <Text style={styles.buttonText}>Detay</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.starContainer} onPress={toggleFavorite}>
        <Icon name="star" size={30} color={isFavorite ? '#FFD700' : '#FFF'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2e2e1f',
    marginVertical: 5,
    position: 'relative',
  },
  poster: {
    width: '30%',
    height: '100%',
    resizeMode: 'stretch',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
  },
  description: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  starContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default Movies;
