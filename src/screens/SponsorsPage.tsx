import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconChevronLeft } from 'tabler-icons-react-native';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function SponsorsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      <ScrollView showsVerticalScrollIndicator={false} className={'space-y-6 ' + topMargin}>
        {/* avatar */}
        <View className="mx-3 flex-row justify-start items-center space-x-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <IconChevronLeft size={wp(4)} strokeWidth={4} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: wp(7) }} className="font-bold text-white">
            Patrocínio
          </Text>
        </View>
        <View className="mx-5 text-white">
          <Text className="text-white mb-10">
            É com imensa satisfação que apresentamos os parceiros e apoiadores que tornam possível a
            realização deste evento inovador. SPClick não é apenas um projeto, mas uma celebração da
            cultura, da arte e da diversidade, proporcionando experiências únicas para a comunidade
            de São Paulo.
          </Text>
          <Image
            className="mb-5"
            source={require('../../assets/images/sponsors.png')}
            style={{ width: '100%', height: undefined, aspectRatio: 1.2 }}
          />
          <Text className="text-white mb-5">
            Nossos patrocinadores desempenham um papel fundamental no sucesso do SP Click,
            contribuindo não apenas financeiramente, mas também compartilhando a visão de promover o
            acesso à cultura e à expressão artística.{' '}
          </Text>

          <Text className="text-white">
            Cada marca representada nesta seção desempenha um papel crucial na construção de uma
            plataforma inclusiva, onde artistas locais e talentos emergentes têm a oportunidade de
            brilhar.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
