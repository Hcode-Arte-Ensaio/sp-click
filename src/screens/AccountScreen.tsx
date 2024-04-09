import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../firebaseConfig';
import { UserContext } from '../contexts/UserContext';
import { handleDelete } from '../firebase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IconLogout, IconEdit, IconChevronLeft } from 'tabler-icons-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as DocumentPicker from 'expo-document-picker';

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
    });
    console.log(files);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#111] px-4">
      <ScrollView showsVerticalScrollIndicator={false} className={'space-y-6 ' + topMargin}>
        <View>
          {/* header */}
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              className="bg-slate-500 rounded-md"
              onPress={() => navigation.goBack()}
            >
              <IconChevronLeft height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-slate-500 rounded-md"
              onPress={() => {
                signOut(auth);
                navigation.replace('Welcome');
              }}
            >
              <IconLogout height={wp(10)} width={wp(10)} color="white" />
            </TouchableOpacity>
          </View>

          {/* body */}
          <View>
            {/* avatar container */}
            <View className="flex flex-row justify-center">
              <View className="relative">
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={{ height: wp(33), width: wp(33) }}
                  className="rounded-full"
                />

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

            {/* <TouchableOpacity
              onPress={() => {
                handleDelete(() => {
                  navigation.navigate('Welcome');
                });
              }}
            >
              <Text className="text-white">Delete</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
