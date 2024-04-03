import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { auth } from '../../firebaseConfig';

export default function CreateAccount() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleCreateAcoount() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((_userCredential) => {
        Alert.alert('Login', 'Conta criada com sucesso', [
          { text: 'OK', onPress: () => navigation.replace('Home') },
        ]);
      })
      .catch((error: FirebaseError) => {
        console.log({ errorCode: error.code, errorMessage: error.message });
        Alert.alert('Falha ao cadastrar!', 'Verifique seu email ou senha e tente novamente');
      });
  }

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
              Criar uma conta
            </Text>
          </View>
        </View>
      </View>

      {/* form de login */}
      <View className="flex items-center flex-col space-y-4">
        <View className="flex flex-col items-center w-3/4">
          {/* email */}
          <TextInput
            className="bg-white w-full rounded-md text-[16px] p-2 text-black"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="seu@email.com"
          />

          {/* password */}
          <TextInput
            className="bg-white w-full rounded-md text-[16px] p-2 text-black mt-2"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="********"
          />

          {/* login button */}
          <View className="w-full rounded-md mt-6">
            <Button title="Cadastrar" disabled={isLoading} onPress={handleCreateAcoount}></Button>
          </View>
        </View>

        <View className="flex flex-row justify-between w-3/4">
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text className="text-white">Ja tenho uma conta.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
