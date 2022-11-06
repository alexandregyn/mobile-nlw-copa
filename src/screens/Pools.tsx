import React, { useCallback, useState } from 'react';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { PoolCard, PoolCardPros } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';

export function Pools() {
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<Array<PoolCardPros>>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  const fetchPools = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/pools');
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível listar os bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões"/>

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          title="BUSCAR BOLÃO POR CÓDIGO" 
          leftIcon={<Icon as={FontAwesome5} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {
        isLoading ? <Loading /> :
        <FlatList 
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />}
    </VStack>
  );
}