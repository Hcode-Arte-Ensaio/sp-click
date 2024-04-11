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
      <StatusBar backgroundColor="black" style="light" />

      <View id="main" className="bg-[#111] relative h-screen w-screen">
        <View id="header" className="bg-black pt-8 px-1 rounded-bl-3xl rounded-br-3xl">
          <View id="btns" className="flex flex-row justify-between">
            <TouchableOpacity className="rounded-md" onPress={() => navigation.goBack()}>
              <IconChevronLeft height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="rounded-md" onPress={() => navigation.goBack()}>
              <IconMenuDeep height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>
          </View>

          <View id="avatar" className="flex flex-row justify-center">
            <View className="relative">
              <Image
                source={require('../../assets/images/avatar.png')}
                style={{ height: wp(33), width: wp(33) }}
                className="rounded-full"
              />

              {/* btn edit */}
              <View className="absolute rounded-full bottom-2 right-2 bg-white border-2 border-[#111]">
                <TouchableOpacity className="p-1" onPress={handleEditPhoto}>
                  <IconEdit className="" height={wp(5)} width={wp(5)} color="#272727" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="w-full flex items-center">
            <Text className="text-2xl text-white">Saulo Costa</Text>
          </View>
        </View>

        <View id="body" className="p-5">
          <Text className="text-white">Body</Text>
        </View>

        <TouchableOpacity
          id="btnLogout"
          className="bg-black h-16 flex flex-row justify-center items-center absolute bottom-0 w-screen"
          onPress={() => {
            signOut(auth);
            navigation.replace('Welcome');
          }}
        >
          <IconLogout2 height={wp(7)} width={wp(7)} color="white" />
          <Text className="text-white text-lg ml-2">Sair do app!</Text>
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
