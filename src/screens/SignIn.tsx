import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';

import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { UseAuth } from '../hooks/useAuth';

export function SignIn() {
  const { signIn, isUserLoading } = UseAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40}/>

      <Button 
        title="Entrar com o Google"
        type="SECONDARY"
        leftIcon={<Icon as={FontAwesome5} name="google" color="white" size="md"/>}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
      />

      <Text color="white"  textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'} 
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}