import { Text, StatusBar, StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';

const Welcome = () => {

  const height = useSharedValue(0)
  const width = useSharedValue(0)

  const navigation = useNavigation()

  useEffect(() => {
    height.value = 0
    width.value = 0
    setTimeout(() => height.value = withSpring(height.value + hp(45)), 100)  
    setTimeout(() => width.value = withSpring(width.value + hp(45)), 300)
    
    setTimeout(() =>  navigation.navigate('Home'), 2500)
  }, [])
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      
      <Animated.View style={{ height,
                              width,
                              backgroundColor: '#FBD28B',
                              borderRadius: 200,
                              alignItems: 'center',
                              justifyContent: 'center'}}>
        <View style={styles.innerRingContainer}>
          <View style={styles.imageContainer}>
            { <Image
              source={{
                uri:
                  'https://e7.pngegg.com/pngimages/385/821/png-clipart-round-pizza-sushi-pizza-take-out-fast-food-submarine-sandwich-pizza-food-recipe.png',
                }}
              style={styles.image}
            /> }
          </View>
        </View>
      </Animated.View>
      <Text style={styles.headingText}>Food</Text>
      <Text style={styles.subHeadingText}>Just make it right</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9b42d',
  },
  innerRingContainer: {
    backgroundColor: '#F5C469',
    borderRadius: 200,
    height: hp(35),
    width: hp(35),
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 200, // half of the image width/height for a circular mask
  },
  image: {
    height: hp(25),
    width: hp(25),
  },
  headingText: {
    marginTop: 34,
    fontSize: wp(11),
    color: '#ffffff',
    marginBottom: 10,
    fontFamily: 'bold'
  },
  subHeadingText: {
    fontSize: wp(4),
    color: '#fff'
  }
});
