import SQLite from 'react-native-sqlite-storage';
export const openDatabase = () => {
  return SQLite.openDatabase(
    {name: 'App.db', location: 'Defaaault'},
    () => {},
    error => {
      console.log('Database Error: ', error);
    },
  );
};

export const addMovieToWatchlist = movieId => {
  const db = openDatabase();

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM MoviesToWatch WHERE MovieId = ?',
      [movieId],
      (tx, results) => {
        if (results.rows.length === 0) {
          // MovieId veritabanında mevcut değil, ekleyebiliriz
          tx.executeSql(
            'INSERT INTO MoviesToWatch (MovieId) VALUES (?)',
            [movieId],
            (tx, results) => {
              console.log('Movie added to watchlist');
            },
            error => {
              console.log('Error adding movie to watchlist: ', error);
            },
          );
        } else {
          console.log('Movie already in watchlist');
        }
      },
      error => {
        console.log('Error checking movie in watchlist: ', error);
      },
    );
  });
};

export const getMoviesFromWatchlist = () => {
  return new Promise((resolve, reject) => {
    const db = openDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'SELECT MovieId FROM MoviesToWatch',
        [],
        (tx, results) => {
          let movies = [];
          for (let i = 0; i < results.rows.length; i++) {
            movies.push(results.rows.item(i));
          }
          resolve(movies);
          console.log(movies);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export const deleteMovieFromWatchlist = movieId => {
  const db = openDatabase();

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM MoviesToWatch WHERE MovieId = ?',
      [movieId],
      (tx, results) => {
        if (results.rows.length != 0) {
          // MovieId veritabanında mevcut değil, ekleyebiliriz
          tx.executeSql(
            'DELETE FROM MoviesToWatch WHERE MovieId = ?',
            [movieId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log('Movie deleted from watchlist');
              } else {
                console.log('No movie found with this id');
              }
            },
            error => {
              console.log('Error deleting movie from watchlist: ', error);
            },
          );
        } else {
          console.log('Movie already in watchlist');
        }
      },
      error => {
        console.log('Error checking movie in watchlist: ', error);
      },
    );
  });
};
