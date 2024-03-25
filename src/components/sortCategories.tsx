import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getCollection } from '../firebase';
import { theme } from '../theme';
import { CategoryType } from '../types';

export default function SortCategories() {
  const [activeSort, setActiveSort] = useState(0);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    setCategories([
      { id: 0, name: 'Arte e cultura' },
      { id: 1, name: 'Arquitetura' },
    ]);
    console.log('useEffect SortCategories');
    getCollection('categories').then((data: CategoryType[]) => setCategories(data));
  }, []);

  return (
    <View className="flex-row justify-around items-center mx-4 bg-neutral-100 rounded-full p-2 px-4 space-x-2">
      <ScrollView horizontal className="space-x-4" showsHorizontalScrollIndicator={false}>
        {categories.length > 0 &&
          categories.map((sort, index) => {
            let isActive = sort.id === activeSort;
            let activeButtonClass = isActive ? 'bg-white shadow' : '';
            return (
              <TouchableOpacity
                onPress={() => setActiveSort(sort.id)}
                key={index}
                className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}
              >
                <Text
                  className="font-semibold"
                  style={{
                    fontSize: wp(4),
                    color: isActive ? theme.text : 'rgba(0,0,0,0.6)',
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
