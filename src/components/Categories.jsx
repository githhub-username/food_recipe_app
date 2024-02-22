import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categoryData } from '../constants/dummyData';

import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Categories({ categories, activeCategory, handleChangeInCategory }) {
  
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: 4 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = category.strCategory == activeCategory;
          let activeButtonColor = isActive ? 'bg-amber-400' : 'bg-black/5';

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeInCategory(category.strCategory)}
              style={{ marginVertical: 2, marginRight: 8 }}
            >
          
                <View className={"rounded-full p-[5px] " + activeButtonColor}
                >
                  <Image
                    source={{ uri: category.strCategoryThumb }}
                    style={{ width: hp(7), height: hp(7) }}
                    className="rounded-full"
                  />
                </View>
                <Text style={{ fontSize: hp(1.5), textAlign: 'center' }}>
                  {category.strCategory}
                </Text>
              
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};
