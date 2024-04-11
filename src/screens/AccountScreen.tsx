import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../firebaseConfig';
import { UserContext } from '../contexts/UserContext';
import { handleDelete } from '../firebase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IconLogout2, IconEdit, IconChevronLeft, IconMenuDeep } from 'tabler-icons-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as DocumentPicker from 'expo-document-picker';
import { StatusBar } from 'expo-status-bar';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export function AccountScreen() {
  const user = useContext(UserContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleEditPhoto = async () => {
    // escolha a foto
    const files: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: 'image/*',
      copyToCacheDirectory: true,
    });
    console.log(files);
  };

  return (
    <>
      <StatusBar backgroundColor="#000" style="light" />

      <View id="main" className="bg-black relative h-screen w-screen">
        <View id="header" className="bg-[#111] pt-8 px-1 rounded-bl-3xl rounded-br-3xl">
          <View id="btns" className="flex flex-row justify-between items-center">
            <TouchableOpacity className="rounded-md" onPress={() => navigation.goBack()}>
              <IconChevronLeft height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-xl ml-2">Perfil</Text>

            <TouchableOpacity className="rounded-md" onPress={() => navigation.goBack()}>
              <IconMenuDeep height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>
          </View>

          <View id="avatarAndName" className="translate-y-6">
            <View id="avatar" className="flex flex-row justify-center">
              <View className="relative">
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={{ height: wp(33), width: wp(33) }}
                  className="rounded-full"
                />

                {/* btn edit */}
                <View className="absolute rounded-full bottom-1 right-1 bg-white border-4 border-[#111]">
                  <TouchableOpacity className="p-1" onPress={handleEditPhoto}>
                    <IconEdit className="" height={wp(5)} width={wp(5)} color="#111" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="w-full flex items-center translate-y-3">
              <Text className="text-2xl text-white">Saulo Costa</Text>
            </View>
          </View>
        </View>

        <View id="body" className="px-5 py-16">
          <Text className="text-white mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus autem dolorum ea,
            debitis architecto tenetur optio sint illum ab veniam maxime itaque id totam dicta hic
            sapiente minus qui velit.
          </Text>
          <Text className="text-white mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus autem dolorum ea,
            debitis architecto tenetur optio sint illum ab veniam maxime itaque id totam dicta hic
            sapiente minus qui velit.
          </Text>
          <Text className="text-white mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus autem dolorum ea,
            debitis architecto tenetur optio sint illum ab veniam maxime itaque id totam dicta hic
            sapiente minus qui velit.
          </Text>
          <Text className="text-white mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus autem dolorum ea,
            debitis architecto tenetur optio sint illum ab veniam maxime itaque id totam dicta hic
            sapiente minus qui velit.
          </Text>
        </View>

        <TouchableOpacity
          id="btnLogout"
          className="bg-[#111] h-16 flex flex-row justify-center items-center absolute bottom-0 w-screen rounded-tl-3xl rounded-tr-3xl"
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

{
  /* <TouchableOpacity
              onPress={() => {
                handleDelete(() => {
                  navigation.navigate('Welcome');
                });
              }}
            >
              <Text className="text-white">Delete</Text>
            </TouchableOpacity> */
}
