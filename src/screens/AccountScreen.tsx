import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Image, Linking, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { handleDelete, updateDisplayName, updateUserUrlPhoto } from '../firebase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../firebaseConfig';
import PopupMenu from '../components/PopupMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IconLogout2,
  IconChevronLeft,
  IconPhoneCall,
  IconTrashX,
  IconChevronRight,
  IconBug,
  IconWorld,
  IconBrandWhatsapp,
  IconPhotoCheck,
  IconUserCheck,
  IconCircleX,
} from 'tabler-icons-react-native';

export function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [userBio, setuserBio] = useState<null | string>(null);

  // modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');

  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setNewName(user.displayName);
    } else {
      navigation.replace('Welcome');
    }
  }, []);

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
      title: 'Relatar Falha',
      icon: <IconBug height={wp(8)} width={wp(8)} color="white" />,
      onPress: () => {
        Linking.openURL(
          'mailto:arteensaio@arteensaio.com.br?subject="Relar uma falha"&body=Descrição:%20'
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
      onPress: () => {
        handleDelete(() => {
          navigation.replace('HomeScreen');
        });
      },
    },
  ];

  const options = [
    {
      title: 'Foto de perfil',
      icon: <IconPhotoCheck height={wp(6)} width={wp(6)} color="white" />,
      onPress: () => {
        updateUserUrlPhoto((newUrl: string) => {
          console.log(newUrl);
          navigation.replace('Account'); // todo: renderizar a nova img após a alteração
        });
      },
    },
    {
      title: 'Nome de usuário',
      icon: <IconUserCheck height={wp(6)} width={wp(6)} color="white" />,
      onPress: () => {
        setIsOpen(true);
      },
    },
    // {
    //   title: 'Biografia',
    //   icon: <IconAddressBook height={wp(6)} width={wp(6)} color="white" />,
    //   onPress: () => setIsOpen2(true),
    // },
  ];

  return (
    <>
      <StatusBar backgroundColor="#000" style="light" />

      <SafeAreaView id="container" className="bg-black relative h-screen w-screen flex flex-1">
        <View id="header" className="bg-[#111] rounded-bl-3xl rounded-br-3xl">
          <View
            id="btnsAdnTitle"
            className="flex flex-row justify-between items-center border-b border-[#000]"
          >
            <TouchableOpacity
              className="rounded-md w-12 h-12 justify-center items-center"
              onPress={() => navigation.goBack()}
            >
              <IconChevronLeft height={wp(12)} width={wp(12)} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-xl">Perfil</Text>

            <PopupMenu title="Atualizar seus dados" options={options} />
          </View>

          <View id="avatarAndName" className="translate-y-5">
            <View id="avatarContainer" className="flex flex-row justify-center">
              <View className="relative rounded-full border border-white">
                <Image
                  id="profilePhoto"
                  className="rounded-full overflow-hidden"
                  source={user ? { uri: user.photoURL } : require('../../assets/images/avatar.png')}
                  style={{ height: wp(33), width: wp(33) }}
                />
              </View>
            </View>

            <View id="nameContainer" className="w-full flex items-center translate-y-3">
              {user ? (
                <Text className="text-2xl text-white">{user.displayName}</Text>
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

        {/* modal atualizar nome */}
        <Modal transparent visible={isOpen} animationType="slide">
          <SafeAreaView className="flex flex-1 items-center bg-[#000000c4] w-full">
            <View className="bg-[#111] w-full h-2/4 absolute bottom-0 px-10 py-14 rounded-tl-3xl rounded-tr-3xl border-l-2 border-t-2 border-r-2 border-b-0 border-white">
              <TouchableOpacity className="absolute right-2 top-2" onPress={() => setIsOpen(false)}>
                <IconCircleX height={wp(8)} width={wp(8)} color="white"></IconCircleX>
              </TouchableOpacity>

              <Text className="text-2xl text-white mb-3">Nome de usuário</Text>

              <TextInput
                className="bg-white h-12 w-full rounded-md text-[16px] p-2 text-black mb-2"
                value={newName}
                onChangeText={setNewName}
                keyboardType="default"
                placeholder="Seu nome"
              />

              <TouchableOpacity
                className="h-12 w-full rounded-md overflow-hidden flex justify-center bg-[#000] border border-white"
                onPress={() => {
                  updateDisplayName(newName, () => {
                    setIsOpen(false);
                  });
                }}
              >
                <Text className="text-[#fff] text-center text-lg ">ATUALIZAR</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        {/* modals atualizar bio */}
        <Modal transparent visible={isOpen2} animationType="slide">
          <SafeAreaView className="flex flex-1 items-center bg-[#000000c4] w-full">
            <View className="bg-[#111] w-full h-2/4 absolute bottom-0 px-10 py-14 rounded-tl-3xl rounded-tr-3xl border-l-2 border-t-2 border-r-2 border-b-0 border-white">
              <TouchableOpacity
                className="absolute right-2 top-2"
                onPress={() => setIsOpen2(false)}
              >
                <IconCircleX height={wp(8)} width={wp(8)} color="white"></IconCircleX>
              </TouchableOpacity>

              <Text className="text-2xl text-white mb-3">Sua biografia</Text>

              <TextInput
                className="bg-white h-12 w-full rounded-md text-[16px] p-2 text-black mb-2"
                value={userBio}
                onChangeText={setuserBio}
                keyboardType="default"
                placeholder="Sua biografia"
                maxLength={250}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}
