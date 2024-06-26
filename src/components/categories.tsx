import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { categoriesData } from '../constants';
import { theme } from '../theme';

export default function Categories() {
  return (
    <View className="space-y-5">
      <View className="mx-5 flex-row justify-between items-center">
        <Text style={{ fontSize: wp(4) }} className="font-semibold text-neutral-700">
          Categories
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: theme.text }}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => {
          return (
            <TouchableOpacity key={index} className="flex items-center space-y-2">
              <Image
                source={cat.image}
                className="rounded-3xl"
                style={{ width: wp(20), height: wp(19) }}
              />
              {/*<cat.image /> */}
              <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(3) }}>
                {cat.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
