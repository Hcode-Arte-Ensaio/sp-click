import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { UserContext } from '../contexts/UserContext';
import { theme } from '../types/theme';

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const user = useContext(UserContext);

  return (
    <View className="flex-1 flex justify-end">
      {/* background image */}
      <Image
        source={require('../../assets/images/welcome-bg.png')}
        className="h-full w-full absolute"
      />

      {/* content & gradient */}
      <View className="p-5 pb-10 space-y-8 flex flex-col justify-between h-full">
        {/*<LinearGradient
          colors={['transparent', 'rgba(3,105,161,0.8)']}
          style={{ width: wp(100), height: hp(60) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />*/}
        <View className="w-full max-w-full mt-10 flex items-center">
          <Image
            className="aspect-[900/291] max-h-[100px]"
            source={require('../../assets/images/legal-logos.png')}
          />
        </View>
        <View className="space-y-3 flex items-center">
          <Text className="text-neutral-200 font-medium text-center text-xl w-[75%] mb-10">
            Secretaria Municipal de Cultura de São Paulo
          </Text>
          <Text className="text-neutral-200 text-xl text-center font-medium mb-10 ">
            Apresenta:
          </Text>
          <Text className="text-white font-normal tracking-widest" style={{ fontSize: wp(10) }}>
            &#60;<Text className="font-black">sp</Text>/click&#62;
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => (user ? navigation.navigate('Home') : navigation.navigate('Login'))}
          style={{ backgroundColor: theme.bg(1) }}
          className="mx-auto p-3 px-12 rounded-full"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
            Conheça SAMPA
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
