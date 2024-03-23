import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { IconHeart } from "tabler-icons-react-native";
import { destinationData } from "../constants";

export default function Destinations() {
  const navigation = useNavigation();
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {destinationData.map((item, index) => {
        return (
          <DestinationCard navigation={navigation} item={item} key={index} />
        );
      })}
    </View>
  );
}

const DestinationCard = ({ item, navigation }) => {
  const [isFavourite, toggleFavourite] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Destination", { ...item })}
      style={{ width: wp(44), height: wp(65) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
    >
      <Image
        source={item.image}
        style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
        className="absolute"
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
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
        style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
        className="absolute top-1 right-3 rounded-full p-3"
      >
        <IconHeart size={wp(5)} color={isFavourite ? "red" : "white"} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.title}
      </Text>
      <Text style={{ fontSize: wp(2.2) }} className="text-white">
        {item.shortDescription}
      </Text>
    </TouchableOpacity>
  );
};

