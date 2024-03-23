import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconSearch } from 'tabler-icons-react-native';
import Categories from '../components/categories';
import Destinations from '../components/destinations';
import SortCategories from '../components/sortCategories';
import { getCollection, getImageDownloadURL } from '../firebase';
const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function HomeScreen() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log(categories);
  console.log('==========');

  useEffect(() => {
    getCollection('places', setPlaces);
    getCollection('categories', setCategories);
    // console.log(storage);

    getImageDownloadURL('masp/masp-1.jpg');
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={'space-y-6 ' + topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
            Let's Discover!
          </Text>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{ height: wp(12), width: wp(12) }}
            />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <IconSearch />
            <TextInput
              placeholder="Search destination"
              placeholderTextColor={'gray'}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* categories */}
        <View className="mb-4">
          <Categories />
        </View>

        {/* sort categories */}
        <View className="mb-4">
          <SortCategories />
        </View>

        {/* destinations */}
        <View>
          <Destinations />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
