import React, { useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, SafeAreaView, View, Animated, Easing } from 'react-native';
import {
  IconAddressBook,
  IconMenuDeep,
  IconPhotoCheck,
  IconUserCheck,
} from 'tabler-icons-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function PopupMenu({
  title,
  options,
}: {
  title: string;
  options: { title: string; icon: JSX.Element; onPress: () => void }[];
}) {
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

  return (
    <>
      <TouchableOpacity
        className="rounded-md w-12 h-12 justify-center items-center"
        onPress={() => resizeBox(1)}
      >
        <IconMenuDeep height={wp(12)} width={wp(10)} color="white" />
      </TouchableOpacity>

      <Modal visible={visible} transparent>
        <SafeAreaView className="h-full w-full bg-[#000000c4]" onTouchStart={() => resizeBox(0)}>
          <Animated.View
            className="absolute top-14 right-5 rounded-md bg-black p-2 gap-1"
            style={{
              transform: [{ scale }],
              opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
              translateX: scale.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }),
              translateY: scale.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }),
            }}
          >
            <Text className="text-white text-lg pl-2">{title}</Text>
            {options?.map((option: any, index: number) => (
              <TouchableOpacity
                onPress={option.onPress}
                key={`popup-option-${index}`}
                className="bg-[#111] h-10 w-48 rounded-md flex flex-row items-center justify-between px-2"
              >
                <View className="flex flex-row items-center justify-between w-full border-l border-white pl-2">
                  <Text className="text-white">{option.title}</Text>
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
