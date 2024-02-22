import { StatusBar, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { BellIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import Categories from '../components/Categories';
import { categoryData, mealData } from '../constants/dummyData';

import axios from 'axios'
import Recipe from '../components/Recipe';

import Snackbar from 'react-native-snackbar';

import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Home() {

  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Beef')
  const [meals, setMeals] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation()
  const isFocused = useIsFocused();

  useEffect(() => {
    getMealCategories()
    getRecipes()
  }, [])

  useEffect(() => {
    setSearchQuery(''); // Reset searchQuery when the component mounts or is focused
  }, [isFocused]);

  const handleChangeInCategory = (category) => {
    getRecipes(category)
    setActiveCategory(category)
    setMeals([])
  }

  const getMealCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')  

      if(response && response.data) {
        setCategories(response.data.categories)
      }
    } 
    catch (error) {
      console.log('error: ', error.message)
    }
  }

  const handleMagnifyingGlassClick = () => {
    
    if(searchQuery.length == 0) {
      Snackbar.show({
        text: 'Field must not be empty',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:'orange'
      });
    }
    else {
      console.log('Recipe Searched: ', searchQuery);
      getRecipesByName()
    }
  }

  const getRecipes = async (category='Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)  

      if(response && response.data) {
        setMeals(response.data.meals)
      }
    } 
    catch (error) {
      console.log('error: ', error.message)
    }
  }

  async function getRecipesByName() {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)  

      if(response && response.data) {
        if(response.data.meals === null) { 
          Snackbar.show({
            text: 'Sorry! No Recipes Sound',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor:'red'
          }); 
        }
        else {
          navigation.navigate('SearchedRecipeDetailsScreen', ...response.data.meals)
        }
        }
    } 
    catch (error) {
      console.log('error: ', error.message)
    }
  }

  return (
    <View>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingVertical: 6,
          paddingTop: 14
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4, marginBottom: 2 }}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGBxaYdGHEpJ9001ON09kQBXAnqZaCYG3--fcJQUAIbkQAjWc-BpxmbgwJrzURi0j8gc&usqp=CAU' }}
            style={{ height: hp(7), width: hp(7) }} />
          <BellIcon size={hp(5)} color={'gray'} style={{ marginRight: 2 }} />
        </View>

        <View style={{ marginHorizontal: 4, marginVertical: 2, marginBottom: 2 }}>
          <Text style={{ fontSize: hp(3.6), marginLeft: 4, marginVertical: 10, color: 'black', fontStyle: 'italic', fontWeight: 'bold' }}>
            Make your food the right way, at your <Text style={{ color: 'orange', fontStyle: 'italic', fontWeight: 'bold' }}>Home</Text>
          </Text>
        </View>

       { /* search bar*/}

       <View style={{marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' ,borderRadius: 200, backgroundColor: '#DAE0E2', padding: 5, marginVertical: 12}}
       >
        <TextInput
        placeholder="Search for Recipes"
        placeholderTextColor={'gray'}
        style={{flex: 1, marginBottom: 1 ,fontSize: hp(2.2), paddingLeft: 10}}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
        <View style={{backgroundColor: '#DAE0E2', borderRadius: 200}}>
          <MagnifyingGlassIcon 
          size={hp(2.8)}
          strokeWidth={3}
          color={'gray'}
          style={{marginRight: 15}}
          onPress={handleMagnifyingGlassClick}
          />
        </View>
       </View>

      <View>
        {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeInCategory={handleChangeInCategory} />}                         
      </View>

        {/* recipes */}
        
        <View>
          <Recipe meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}
