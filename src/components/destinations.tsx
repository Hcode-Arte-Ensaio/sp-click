import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { IconHeart, IconHeartFilled } from 'tabler-icons-react-native';
import { addLike, getImageDownloadURL, removeLike, useUser } from '../firebase';
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

  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {places.length === 0 && (
        <View className="flex justify-center items-center w-full">
          <Text className="text-center text-white">
            Sem resultados correspondentes a pesquisa ou sem lugares cadastrados para categoria.
          </Text>
        </View>
      )}
      {places.map((item) => {
        return <DestinationCard navigation={navigation} item={item} key={item.id} />;
      })}
    </View>
  );
}

const DestinationCard = ({ item, navigation }: DestinationCardProps) => {
  const user = useUser();
  const [imageURL, setImageURL] = useState('');
  const [isFavourite, setIsFavourite] = useState(
    user ? item.usersLikes.includes(user.uid) : undefined
  );

  console.log('DestinationCard - ', item.name);

  useEffect(() => {
    console.log('useEffect DestinationCard Files - ', item.name);
    if (item?.thumbPath) {
      getImageDownloadURL(item.thumbPath).then((data) => setImageURL(data));
    }
  }, [item]);

  useEffect(() => {
    setIsFavourite(user ? item.usersLikes.includes(user.uid) : undefined);
  }, [user]);

  function handleLike() {
    if (user) {
      isFavourite ? removeLike(user.uid, item) : addLike(user.uid, item);
      setIsFavourite(!isFavourite);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Destination', { ...item, imageURL })}
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
        <Text className="text-white">Carregando... </Text>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          width: wp(44),
          height: hp(24),
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />

      <TouchableOpacity
        onPress={() => {
          handleLike();
        }}
        className="absolute top-1 right-0 p-2 rounded-full mr-4"
        style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
      >
        {isFavourite ? (
          <IconHeartFilled size={wp(7)} strokeWidth={4} color="red" />
        ) : (
          <IconHeart size={wp(7)} strokeWidth={3} color="white" />
        )}
      </TouchableOpacity>
      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.name}
      </Text>
      <Text style={{ fontSize: wp(2.7) }} className="text-white">
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );
};
