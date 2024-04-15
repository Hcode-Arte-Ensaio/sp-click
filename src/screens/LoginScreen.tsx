import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { auth } from '../../firebaseConfig';
import { UserContext } from '../contexts/UserContext';
import { handleSignIn } from '../firebase';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  function handleRecoveryPassword() {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Recuperação de senha', `Enviamos um email para '${email}' com as instruções`);
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        Alert.alert('Recuperação de senha', 'Verifique seu email ou senha e tente novamente');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    console.log(!user);
    if (user) {
      console.log('>>>>>>>>> REDIRECT');
      navigation.navigate('Home');
    } else {
      console.log('>>>>>>>>> no redirect');
    }
  }, [user]);

  return (
    <View className="flex-1 flex justify-center relative">
      <Image
        source={require('../../assets/images/welcome-bg.png')}
        className="h-full w-full absolute"
      />
      <View className="absolute top-0 m-auto left-0 right-0">
        <View className="p-5 pb-10 space-y-8 flex flex-col justify-between h-full">
          <View className="space-y-3 flex items-center">
            <Text
              className="text-white font-normal tracking-widest mt-10"
              style={{ fontSize: wp(10) }}
            >
              &#60;<Text className="font-black">sp</Text>/click&#62;
            </Text>
            <Text style={{ fontSize: wp(7) }} className="text-white">
              Login
            </Text>
          </View>
        </View>
      </View>

      {/* form de login */}
      <View className="flex items-center flex-col space-y-4">
        <View className="flex flex-col items-center w-3/4">
          {/* email */}
          <TextInput
            className="bg-white w-full h-12 rounded-md text-[16px] p-2 text-black mb-2"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="seu@email.com"
          />

          {/* password */}
          <TextInput
            className="bg-white w-full h-12 rounded-md text-[16px] p-2 text-black mb-2"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="********"
          />

          {/* login button */}
          <TouchableOpacity
            className="h-12 w-full rounded-md overflow-hidden flex justify-center"
            onPress={() => handleSignIn(email, password, () => navigation.navigate('Home'))}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#9ad2f8' : '#38afff',
            }}
          >
            <Text className="text-white text-center text-lg">ENTRAR</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-between w-3/4">
          <TouchableOpacity onPress={() => navigation.replace('CreateAccount')}>
            <Text className="text-white">Criar conta?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRecoveryPassword}>
            <Text className="text-white">Esqueci a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
