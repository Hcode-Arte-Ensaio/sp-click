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
import Destinations from '../components/destinations';
import SortCategories from '../components/sortCategories';
import { getCollection } from '../firebase';
const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function HomeScreen() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');

  const activePlaces = places.filter((place) => place.categoryId === activeCategoryId);

  console.log(categories);
  console.log('==================== HOME SCREEN ======================');
  console.log(activeCategoryId);

  useEffect(() => {
    getCollection('places').then((data) => setPlaces(data));
    getCollection('categories').then((data) => setCategories(data));
    // console.log(storage);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={'space-y-6 ' + topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
            SP Click
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
              value={locationFilter}
              onChangeText={setLocationFilter}
              placeholder="Pesquisar lugar"
              placeholderTextColor={'gray'}
              className="flex-1 text-base pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* categories */}
        {/*<View className="mb-4">
          <Categories />
        </View>*/}

        {/* sort categories */}
        <View className="mb-4">
          <SortCategories
            activeCategoryId={activeCategoryId}
            onChangeActiveCategory={(id: number) => setActiveCategoryId(id)}
          />
        </View>

        {/* destinations */}
        <View>
          <Destinations places={activePlaces} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
