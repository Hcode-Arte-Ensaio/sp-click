import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { IconHeart, IconHeartFilled } from 'tabler-icons-react-native';
import { getImageDownloadURL } from '../firebase';
import { PlaceType } from '../types';

export interface DestinationProps {
  places: PlaceType[];
}

export interface DestinationCardProps {
  item: PlaceType;
  navigation: any;
}

export default function Destinations({ places }: DestinationProps) {
  const navigation = useNavigation();

  console.log('Destinations');

  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {places.map((item) => {
        return <DestinationCard navigation={navigation} item={item} key={item.id} />;
      })}
    </View>
  );
}

const DestinationCard = ({ item, navigation }: DestinationCardProps) => {
  const [isFavourite, toggleFavourite] = useState(false);
  const [imageURL, setImageURL] = useState('');

  console.log('DestinationCard - ', item.name);

  useEffect(() => {
    console.log('useEffect DestinationCard Files - ', item.name);
    if (item?.thumbPath) {
      getImageDownloadURL(item.thumbPath).then((data) => setImageURL(data));
    }
  }, [item]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Destination', { ...item })}
      style={{ width: wp(44), height: wp(65) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
    >
      {imageURL ? (
        <Image
          source={{ uri: imageURL }}
          style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
          className="absolute"
        />
      ) : (
        <Text>Loading... </Text>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          width: wp(44),
          height: hp(15),
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />

      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
        className="absolute top-1 right-3 rounded-full p-3"
      >
        {isFavourite ? <IconHeartFilled size={wp(5)} color="red" /> : <IconHeart size={wp(5)} />}
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.name}
      </Text>
      <Text style={{ fontSize: wp(2.2) }} className="text-white">
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );
};
