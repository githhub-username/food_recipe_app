/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import Home from './screens/Home';

import tw from 'twrnc'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native' 
import Welcome from './screens/Welcome';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import SearchedRecipeDetailsScreen from './screens/SearchedRecipeDetailsScreen'

const Stack = createNativeStackNavigator()

function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} />
        <Stack.Screen name="SearchedRecipeDetailsScreen" component={SearchedRecipeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
