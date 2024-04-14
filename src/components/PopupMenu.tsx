import React, { useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, SafeAreaView, View, Animated, Easing } from 'react-native';
import { IconMenuDeep, IconWorld } from 'tabler-icons-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function PopupMenu() {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  function resizeBox(to: number) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.linear,
    }).start(() => {
      to === 0 && setVisible(false);
    });
  }

  const optionsMenu = [
    {
      title: 'Opção 1',
      icon: <IconWorld height={wp(6)} width={wp(6)} color="white" />,
      onPress: () => {
        console.log('Opção 1');
      },
    },
    {
      title: 'Opção 2',
      icon: <IconWorld height={wp(6)} width={wp(6)} color="white" />,
      onPress: () => {
        console.log('Opção 3');
      },
    },
    {
      title: 'Opção 3',
      icon: <IconWorld height={wp(6)} width={wp(6)} color="white" />,
      onPress: () => {
        console.log('Opção 3');
      },
    },
    {
      title: 'Opção 4',
      icon: <IconWorld height={wp(6)} width={wp(6)} color="white" />,
      onPress: () => {
        console.log('Opção 4');
      },
    },
  ];

  return (
    <>
      <TouchableOpacity
        className="rounded-md w-12 h-12 justify-center items-center"
        onPress={() => resizeBox(1)}
      >
        <IconMenuDeep height={wp(12)} width={wp(10)} color="white" />
      </TouchableOpacity>

      <Modal visible={visible} transparent>
        <SafeAreaView className="h-full w-full" onTouchStart={() => resizeBox(0)}>
          <Animated.View
            className="absolute top-14 right-5 rounded-md bg-black p-1 gap-1"
            style={{
              transform: [{ scale }],
              opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
              translateX: scale.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }),
              translateY: scale.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }),
            }}
          >
            {optionsMenu?.map((option: any, index: number) => (
              <TouchableOpacity
                onPress={option.onPress}
                key={`popup-option-${index}`}
                className="bg-[#111] h-10 w-48 rounded-md flex flex-row items-center justify-between px-4"
              >
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-white ml-2">{option.title}</Text>
                  {option.icon}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
