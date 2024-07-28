import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesToWatch from './Companent/Data/DatabaseContext';
import MoviesList from './Companent/MoviesList';
import Movies from './Companent/Movies';
import MovieDetail from './Companent/MovieDetail';
import DatabaseProvider from './Companent/Data/DatabaseContext';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MoviesList">
        <Stack.Screen
          name="MoviesList"
          component={MoviesList}
          options={{title: 'Home Page'}}
        />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
      </Stack.Navigator>
      <MoviesToWatch />
    </NavigationContainer>
  );
};

export default App;
