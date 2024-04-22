import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getCollection } from '../firebase';

import { CategoryType } from '../types';
import { theme } from '../theme';

export interface SortCategoriesProps {
  activeCategoryId: number;
  onChangeActiveCategory: (value: number) => void;
}

export default function SortCategories({
  activeCategoryId,
  onChangeActiveCategory,
}: SortCategoriesProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    console.log('useEffect SortCategories');
    getCollection('categories').then((data: CategoryType[]) => setCategories(data));
  }, []);

  return (
    <View className="flex-row justify-around items-center mx-4 rounded-full space-x-2">
      {/* 
    <View className="flex-row justify-around items-center mx-4 bg-gray-950 rounded-full p-2 px-4 space-x-2">
  */}
      <ScrollView horizontal className="space-x-4" showsHorizontalScrollIndicator={false}>
        {categories.length > 0 &&
          categories.map((sort, index) => {
            let isActive = sort.id === activeCategoryId;
            let activeButtonClass = isActive ? 'bg-gray-950 shadow' : '';
            return (
              <TouchableOpacity
                onPress={() => onChangeActiveCategory(sort.id)}
                key={index}
                className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}
              >
                <Text
                  className="font-semibold"
                  style={{
                    fontSize: wp(4),
                    color: isActive ? theme.text : 'white',
                  }}
                >
                  {sort.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
