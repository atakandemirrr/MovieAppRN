// DatabaseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDatabase = () => {
      return new Promise((resolve, reject) => {
        const database = SQLite.openDatabase(
          {
            name: 'App.db',
            location: 'Default',
          },
          () => {
            console.log('Database opened successfully'); 
            database.transaction(tx => {
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS MoviesToWatch (id INTEGER PRIMARY KEY NOT NULL, MovieId int)',
                [],
                (tx, results) => {
                  console.log('Table created successfully');
                  resolve();
                },
                (tx, error) => {
                  console.log('Error occurred while creating the table: ', error.message);
                  reject(error);
                }
              );
            });
          },
          error => {
            console.log('Error opening database: ', error.message);
            reject(error);
          }
        );
        setDb(database);
      });
    };

    initializeDatabase().catch(error => {
      console.log('Database initialization failed: ', error.message || error);
    });
  }, []);

  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
