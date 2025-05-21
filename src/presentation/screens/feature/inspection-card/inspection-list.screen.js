import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {Component, useCallback} from 'react';
import Layout from '@components/layout.component';
import {VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '@utils/RootNavigation';
import ButtonList from '@components/button-list.components';
import {useGetInspectTypeQuery} from '@slices/inspection.slice';
import {useFocusEffect} from '@react-navigation/native';

const InspectionList = navigation => {
  const {data, isLoading, refetch} = useGetInspectTypeQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
      console.log('refetch');
    }, [navigation]),
  );

  return (
    <Layout>
      <VStack className="px-5 pt-2 flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} className="py-2">
            {data?.length <= 0 ? (
              <View className="flex-1 justify-center items-center">
                <Text className="text-center text-lg text-gray-500">
                  Tidak ada Jenis inspeksi
                </Text>
              </View>
            ) : (
              data?.map((item, index) => (
                <ButtonList
                  key={index}
                  title={`Inpspeksi ${item.inspection_name}`}
                  icon={
                    <Icon
                      name="reader-outline"
                      size={20}
                      color={'rgb(73, 6, 9)'}
                    />
                  }
                  onPress={() => {
                    navigate('inspection-form', {
                      type: `${item.slug}`,
                      name: `${item.inspection_name}`,
                      inspect_id: `${item.id}`,
                    });
                  }}
                />
              ))
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default InspectionList;
