import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconChevronLeft, IconHeart, IconHeartFilled } from 'tabler-icons-react-native';
import { theme } from '../theme';
import { PlaceType } from '../types';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-10';

export interface DestinationScreenProps {
  route: {
    params: PlaceType & {
      imageURL: string;
    };
  };
}

export default function DestinationScreen({ route }: DestinationScreenProps) {
  const item = route.params;
  const navigation = useNavigation();
  console.log(item);
  const [isFavourite, toggleFavourite] = useState(false);

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${item.location.latitude},${item.location.longitude}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <View className="bg-white flex-1">
      {/* destination image */}
      <Image source={{ uri: item.imageURL }} style={{ width: wp(100), height: hp(55) }} />
      <StatusBar style={'light'} />

      {/* back button */}
      <SafeAreaView
        className={'flex-row justify-between items-center w-full absolute ' + topMargin}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
        >
          <IconChevronLeft size={wp(7)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          className="p-2 rounded-full mr-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
        >
          {isFavourite ? (
            <IconHeartFilled size={wp(7)} strokeWidth={4} color="red" />
          ) : (
            <IconHeart size={wp(7)} strokeWidth={4} color="white" />
          )}
        </TouchableOpacity>
      </SafeAreaView>

      {/* title & descritpion & booking button */}
      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text style={{ fontSize: wp(7) }} className="font-bold flex-1 text-neutral-700">
              {item?.name}
            </Text>
            {/*<View className="flex flex-row items-center gap-3 text-red-500">
              <IconHeartFilled color="red" />
              <Text style={{ fontSize: wp(7), color: 'red' }} className="font-semibold">
                250
              </Text>
            </View>*/}
          </View>
          <Text style={{ fontSize: wp(3.7) }} className="text-neutral-700 tracking-wide mb-2">
            {item?.longDescription}
          </Text>
          {/*
          <View className="flex-row justify-between mx-1">
            <View className="flex-row space-x-2 items-start">
              <IconClock size={wp(7)} color="skyblue" />
              <View className="flex space-y-2">
                <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                  {item.name}
                </Text>
                <Text className="text-neutral-600 tracking-wide">Duration</Text>
              </View>
            </View>
            <View className="flex-row space-x-2 items-start">
              <IconMapPin size={wp(7)} color="#f87171" />
              <View className="flex space-y-2">
                <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                  {item.name}
                </Text>
                <Text className="text-neutral-600 tracking-wide">Distance</Text>
              </View>
            </View>
            <View className="flex-row space-x-2 items-start">
              <IconSun size={wp(7)} color="orange" />
              <View className="flex space-y-2">
                <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                  {item.name}
                </Text>
                <Text className="text-neutral-600 tracking-wide">Sunny</Text>
              </View>
            </View>
          </View>*/}
        </ScrollView>
        <TouchableOpacity
          onPress={() => Linking.openURL(url)}
          style={{
            backgroundColor: theme.bg(0.8),
            height: wp(15),
            width: wp(50),
          }}
          className="mb-6 mx-auto flex justify-center items-center rounded-full"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
            Navegar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
