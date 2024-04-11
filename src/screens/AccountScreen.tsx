import { useNavigation } from '@react-navigation/native';
import { signOut, updateProfile } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { handleDelete } from '../firebase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  IconLogout2,
  IconChevronLeft,
  IconPhoneCall,
  IconTrashX,
  IconChevronRight,
  IconBug,
  IconWorld,
  IconBrandWhatsapp,
  IconMenuDeep,
} from 'tabler-icons-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as DocumentPicker from 'expo-document-picker';
import { StatusBar } from 'expo-status-bar';

import { auth } from '../../firebaseConfig';

export function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [displayName, setDisplayName] = useState<null | string>(null);
  const [photoURL, setphotoURL] = useState<null | string>(null);
  const [userBio, setuserBio] = useState<null | string>(null);

  const user = useContext(UserContext);

  // todo: enviar a imagem para o firestore e salvar a url no user.photoURL
  async function updateUrlPhoto(newUrl: string) {
    updateProfile(auth.currentUser, { photoURL: newUrl })
      .then(() => {
        setphotoURL(user.photoURL);
      })
      .catch((e) => console.error(e));
  }

  async function updateDisplayName(newName: string) {
    updateProfile(auth.currentUser, { displayName: newName })
      .then(() => {
        setDisplayName(user.displayName);
      })
      .catch((e) => console.error(e));
  }

  // todo: atualizar a bio do usuario no firebase database
  async function updateUserBio(bioText: string) {
    setuserBio(bioText);
  }

  async function handleBtnMenu() {
    console.log('>> teste handleBtnMenu');
    updateUrlPhoto('https://picsum.photos/id/3/200/300');

    updateDisplayName('Saulo B. C.');

    updateUserBio(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia illo maxime culpa fugiat! Architecto eius rem obcaecati! Veniam optio quibusdam quos, perspiciatis provident dolorum mollitia voluptate! Nesciunt ullam officia nihil.'
    );
  }

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setphotoURL(user.photoURL);
    } else {
      navigation.replace('Welcome');
    }
  }, [displayName, photoURL]);

  const handleEditPhoto = async () => {
    // escolha a foto
    const files = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: 'image/*',
      copyToCacheDirectory: true,
    });
    console.log(files);

    // fazer upload para o firestore
    // recarregar o user na tela
  };

  const optionsMenu = [
    {
      title: 'Arte Ensaio Website',
      icon: <IconWorld height={wp(8)} width={wp(8)} color="white" />,
      onPress: () => {
        Linking.openURL('https://arteensaio.com.br/')
          .then((data) => {
            console.log({ data });
          })
          .catch((e: Error) => {
            console.log(e.message);
          });
      },
    },
    {
      title: 'Relatar Bug',
      icon: <IconBug height={wp(8)} width={wp(8)} color="white" />,
      onPress: () => {
        Linking.openURL(
          'mailto:arteensaio@arteensaio.com.br?subject="Relar um bug..."&body=Descrição:%20'
        ).catch((e: Error) => {
          console.log(e.message);
        });
      },
    },
    {
      title: 'Preciso de Suporte',
      icon: <IconPhoneCall height={wp(8)} width={wp(8)} color="white" />,
      onPress: () => {
        Linking.openURL('tel:552122598282').catch((e: Error) => {
          console.log(e.message);
        });
      },
    },
    {
      title: 'Nosso Whatsapp',
      icon: <IconBrandWhatsapp height={wp(8)} width={wp(8)} color="white" />,
      onPress: () => {
        Linking.openURL(
          'https://wa.me/5521971134917?text=Olá+%2AArte+Ensaio%21%2A+Preciso+de+mais+informações+sobre+Arte+Ensaio%0AApp+%60%60%60%3Csp%2Fclick%3E%60%60%60'
        ).catch((e: Error) => {
          console.log(e.message);
        });
      },
    },
    {
      title: 'Apagar minha conta',
      icon: <IconTrashX height={wp(8)} width={wp(8)} color="white" />,
      onPress: handleDelete,
    },
  ];

  return (
    <>
      <StatusBar backgroundColor="#000" style="light" />

      <View id="main" className="bg-black relative h-screen w-screen">
        <View id="header" className="bg-[#111] pt-8 rounded-bl-3xl rounded-br-3xl">
          <View id="btns" className="flex flex-row justify-between items-center">
            <TouchableOpacity className="rounded-md w-11" onPress={() => navigation.goBack()}>
              <IconChevronLeft height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-xl">Perfil</Text>

            <TouchableOpacity className="rounded-md w-11" onPress={handleBtnMenu}>
              <IconMenuDeep height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>
          </View>

          <View id="avatarAndName" className="translate-y-5">
            <View id="avatarContainer" className="flex flex-row justify-center">
              <View className="relative rounded-full border border-white">
                <Image
                  id="profilePhoto"
                  className="rounded-full overflow-hidden"
                  source={photoURL ? { uri: photoURL } : require('../../assets/images/avatar.png')}
                  style={{ height: wp(33), width: wp(33) }}
                />
              </View>
            </View>

            <View id="nameContainer" className="w-full flex items-center translate-y-3">
              {displayName ? (
                <Text className="text-2xl text-white">{displayName}</Text>
              ) : (
                <Text className="text-2xl text-white opacity-50">sem nome</Text>
              )}
            </View>
          </View>
        </View>

        <View id="body" className="px-3 py-10">
          {/* MENU */}

          <View id="userBio" className="bg-[#111] rounded-md mb-3 p-2">
            {userBio ? (
              <Text className="text-white text-center"> {userBio} </Text>
            ) : (
              <Text className="text-white text-center opacity-50">
                Que tal adicionar um bio no seu perfil?
              </Text>
            )}
          </View>

          <View id="menuList">
            {optionsMenu?.map((option: any, index: number) => (
              <TouchableOpacity
                onPress={option.onPress}
                key={`menu-option-${index}`}
                className="bg-[#111] h-14 rounded-md flex flex-row items-center justify-between p-4 mt-1"
              >
                <View className="flex flex-row items-center">
                  {option.icon}
                  <Text className="text-white ml-3 text-lg">{option.title}</Text>
                </View>

                <IconChevronRight height={wp(10)} width={wp(10)} color="#5e5e5e" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          id="btnLogout"
          className="bg-[#111] h-14 flex flex-row justify-center items-center absolute bottom-0 w-screen rounded-tl-3xl rounded-tr-3xl"
          onPress={() => {
            signOut(auth);
            navigation.replace('Welcome');
          }}
        >
          <IconLogout2 height={wp(7)} width={wp(7)} color="white" />
          <Text className="text-white text-lg ml-2">Sair da conta!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
