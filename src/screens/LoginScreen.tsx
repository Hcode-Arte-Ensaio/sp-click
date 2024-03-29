import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconBrandFacebook, IconBrandGoogle } from 'tabler-icons-react-native';

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 flex justify-center relative">
      <Image
        source={require('../../assets/images/welcome-bg.png')}
        className="h-full w-full absolute"
      />
      <View className="absolute top-0 m-auto left-0 right-0">
        <View className="p-5 pb-10 space-y-8 flex flex-col justify-between h-full">
          <View className="space-y-3 flex items-center">
            <Text
              className="text-white font-normal tracking-widest mt-10"
              style={{ fontSize: wp(10) }}
            >
              &#60;<Text className="font-black">sp</Text>/click&#62;
            </Text>
            <Text style={{ fontSize: wp(7) }} className="text-white">
              Login
            </Text>
          </View>
        </View>
      </View>

      <View className="flex items-center flex-col space-y-4">
        <View className="flex items-center flex-row bg-red-500 w-3/4 justify-center rounded-md p-2 text-white space-x-2">
          <IconBrandGoogle color="white" />
          <Text className="text-white text-xs">GOOGLE</Text>
        </View>
        <View className="flex items-center flex-row bg-blue-500 w-3/4 justify-center rounded-md p-2 text-white space-x-2">
          <IconBrandFacebook color="white" />
          <Text className="text-white text-xs">FACEBOOK</Text>
        </View>
      </View>
    </View>
  );
}
