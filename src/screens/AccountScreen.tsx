import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../firebaseConfig';
import { UserContext } from '../contexts/UserContext';
import { handleDelete } from '../firebase';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export function AccountScreen() {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      <ScrollView showsVerticalScrollIndicator={false} className={'space-y-6 ' + topMargin}>
        {/* avatar */}
        <View>
          <TouchableOpacity
            onPress={() => {
              signOut(auth);
              navigation.navigate('Welcome');
            }}
          >
            <Text className="text-white">Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDelete(() => {
                navigation.navigate('Welcome');
              });
            }}
          >
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
