import { useDebouncedValue } from '@mantine/hooks';
import { useNavigation } from '@react-navigation/native';
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
import { IconInfoCircle, IconSearch } from 'tabler-icons-react-native';
import Destinations from '../components/destinations';
import SortCategories from '../components/sortCategories';
import { getCollection } from '../firebase';
import { PlaceType } from '../types';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function HomeScreen() {
  const [places, setPlaces] = useState([]);
  const [activePlaces, setActivePlaces] = useState<PlaceType[]>([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');
  const [debounced] = useDebouncedValue(locationFilter, 1000);

  const navigation = useNavigation();

  useEffect(() => {
    const pesquisaEscapada = locationFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(pesquisaEscapada, 'i');

    setActivePlaces(
      places.filter(
        (place) =>
          place.categoryId === activeCategoryId && (debounced === '' || regex.test(place.name))
      )
    );
  }, [debounced, activeCategoryId, places]);

  console.log(categories);
  console.log('==================== HOME SCREEN ======================');
  console.log(activeCategoryId);

  useEffect(() => {
    getCollection('places').then((data) => setPlaces(data));
    getCollection('categories').then((data) => setCategories(data));
    // console.log(storage);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      <ScrollView showsVerticalScrollIndicator={false} className={'space-y-6 ' + topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{ fontSize: wp(7) }} className="font-bold text-white">
            SP Click
          </Text>
          <TouchableOpacity className="flex flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => navigation.navigate('Sponsors')}>
              <IconInfoCircle height={wp(8)} width={wp(8)} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={{ height: wp(12), width: wp(12) }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-gray-950 rounded-full p-4 space-x-2 pl-6">
            <IconSearch color="white" />
            <TextInput
              value={locationFilter}
              onChangeText={setLocationFilter}
              placeholder="Pesquisar lugar"
              placeholderTextColor={'white'}
              className="flex-1 text-base pl-1 tracking-wider text-white"
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
