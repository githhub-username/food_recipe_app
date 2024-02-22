// RecipeDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Touchable, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline'
import { HeartIcon, UsersIcon, Square3Stack3DIcon } from 'react-native-heroicons/solid'

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Loading from '../components/Loading';
import { mealData } from '../constants/dummyData';

import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

export default function RecipeDetailsScreen(props) {
  
  let item = props.route.params

  const [isFavourite, setIsFavourite] = useState(false)
  const navigation = useNavigation()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMealData(item.idMeal)
  }, [])
  
  const ingredientsIndexes = (meal) => {
    if(!meal) {
      return []
    } 
    
    let indexes = []

    for(let i=1 ;i<=20 ;i++) {
      if(meal['strIngredient' + i]) {
        indexes.push(i)
      }
    }
    return indexes
  } 

  const getMealData = async (idMeal) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`) 

      if(response && response.data) {
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    } 
    catch (error) {
      console.log('error: ', error.message)
    }
  }

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/
    const match = url.match(regex)

    if(match && match[1]) {
      return match[1]
    }

    return null
  }

  return (
    <ScrollView
    className="bg-white flex-1"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={'light'} />

      {/* recipe image */}

      <View className='flex-row justify-center'>
        <Animated.Image source={{uri: item.strMealThumb }} sharedTransitionTag={item.strMeal} 
        style={{width: wp(98), height: hp(50), borderRadius: 40, marginTop: 5, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}
        />
      </View>

      {/* back button */}

      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center"
      style={{paddingTop: 15}}
      >
        <TouchableOpacity className='p-2 rounded-full ml-3 bg-white'
        onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(4)} strokeWidth={5} color='#fbbf24' />
        </TouchableOpacity>
        <TouchableOpacity className='p-2 rounded-full mr-3 bg-white'
        onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon size={hp(4)} strokeWidth={5} color={ isFavourite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {
        loading ? (
          <Loading size= "large" className='mt-16'/>
        ) : (
          <View className='flex-1 px-4 justify-between space-y-4 pt-8'>
            <Animated.View entering={FadeInDown.duration(700).springify().damping(10)} className='space-y-2 '>
              <Text style={{fontSize: hp(3) , fontWeight: 'bold'}} className="text-neutral-700">
                {meal?.strMeal}
              </Text>
              <Text style={{fontSize: hp(2)}} className="text-neutral-500 font-medium">
                {meal?.strArea}
              </Text>
            </Animated.View>

          {/* other data */}

          <Animated.View className="flex-row justify-around" entering={FadeInDown.delay(100).duration(700).springify().damping(10)}>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height: hp(6), width: hp(6)}} className='bg-white rounded-full flex items-center justify-center' >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>35</Text>
                <Text style={{fontSize: hp(1.5)}} className='font-bold text-neutral-700'>Mins</Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height: hp(6), width: hp(6)}} className='bg-white rounded-full flex items-center justify-center' >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>3</Text>
                <Text style={{fontSize: hp(1.5)}} className='font-bold text-neutral-700'>Servings</Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height: hp(6), width: hp(6)}} className='bg-white rounded-full flex items-center justify-center' >
                <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>300</Text>
                <Text style={{fontSize: hp(1.5)}} className='font-bold text-neutral-700'>Calories</Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View style={{height: hp(6), width: hp(6)}} className='bg-white rounded-full flex items-center justify-center' >
                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{fontSize: hp(1.7)}} className='font-semibold text-neutral-700'>Easy</Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}

          <Animated.View className='space-y-4' entering={FadeInDown.delay(200).duration(700).springify().damping(10)}>
              <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700'>Ingredients</Text>
              <View className='ml-3 space-y-2'>
                {
                  ingredientsIndexes(meal).map(i => {
                    return (
                      <View key={i} className='flex-row space-x-4'>
                        <View style={{ height: hp(1.5), width: hp(1.5), marginTop: 4 }} className='bg-amber-300 rounded-full' />                                                
                      
                        <View className='flex-row space-x-2'>
                          <Text style={{fontSize: hp(2)}} className='font-extrabold text-neutral-800'>{meal['strMeasure'+i]}</Text>
                          <Text style={{fontSize: hp(2)}} className='font-medium text-neutral-600'>{meal['strIngredient'+i]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            {/* instructions */}

          <Animated.View className='space-y-4 ' entering={FadeInDown.delay(300).duration(700).springify().damping(10)}>
              <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700'>Instructions</Text>
              <Text style={{fontSize: hp(1.8)}} className='text-neutral-700'>
                {
                  meal?.strInstructions
                }
              </Text>
            </Animated.View>

            {/* video */}

            {
              meal?.strYoutube && (
                <Animated.View className='space-y-4' entering={FadeInDown.delay(400).duration(700).springify().damping(10)}>
                  <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700'>Recipe Video</Text>
                  <View>
                    <YoutubeIframe
                      videoId={getYoutubeVideoId(meal.strYoutube)}
                      height={hp(30)}
                    />         
                  </View>
                </Animated.View>
              )
            }

          </View>
        )
      }

    </ScrollView>
  );
}
