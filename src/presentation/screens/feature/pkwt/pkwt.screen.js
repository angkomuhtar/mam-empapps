import React, {useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import {Button, Text, VStack} from 'native-base';
import Header from '@components/navigation/header.component';

import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useGetPkwtListQuery} from '@slices/pkwt.slice';
import HazardListLoad from '@components/hazard-list-load.component';
import Empty from '@components/empty.comnponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useGetProfileQuery} from '@slices/user.slice';
import {navigate} from '@utils/RootNavigation';

const PkwtScreen = ({navigation}) => {
  const [page, setPage] = useState(1);
  const {data: users} = useGetProfileQuery();
  const {data, isLoading, error, isFetching, refetch} = useGetPkwtListQuery({
    page,
    user_id: users?.id,
  });

  const [item, setItem] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [navigation]);

  useEffect(() => {
    if (data && page === 1) {
      setItem(data?.data);
      setLoad(false);
    } else if (data && page > 1) {
      setItem([...item, ...data?.data]);
      setLoad(false);
    }
  }, [data]);

  console.log(page);

  const ContractCard = ({item, onPress}) => {
    let icon = '',
      text = '';
    switch (item?.status) {
      case 'draft':
        icon = 'heart-circle-outline';
        text = 'Draft';
        break;
      case 'send':
        icon = 'cloud-circle-outline';
        text = 'ditawarkan';
        break;
      case 'signed':
        icon = 'checkmark-circle-outline';
        text = 'diajukan';
        break;
      case 'success':
        icon = 'checkmark-done-circle-outline';
        text = 'aktif';
        break;
      case 'expired':
        icon = 'heart-dislike-circle-outline';
        text = 'berakhir';
        break;
      default:
        icon = 'close-circle-outline';
        text = 'expired';
        break;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <View className="w-full border-b-4 border-r-4 border-t border-l border-slate-500/10 rounded-md px-3 py-2 flex flex-row space-x-3 items-center">
          <Icon name="document-text-outline" size={40} />
          <View className="justify-center items-center absolute right-2 top-auto">
            <Icon name={icon} size={25} color="rgb(239 68 68)" />
            <Text
              className="font-semibold text-[11px] capitalize leading-3"
              style={{fontFamily: 'OpenSans-SemiBold'}}>
              {text}
            </Text>
          </View>
          <VStack className="flex-1">
            <Text
              style={{fontFamily: 'Roboto-Bold'}}
              className="text-sm font-bold">
              {item.contract_type.name}
            </Text>
            <Text
              className="text-[10px] leading-5 text-primary-950"
              style={{fontFamily: 'OpenSans-Bold'}}>
              {item.code}
            </Text>
            <Text
              className="text-[10px] leading-3 text-primary-950 font-bold"
              style={{
                fontFamily: 'OpenSans-Bold',
              }}>{`${item.start_date} - ${item.end_date}`}</Text>
          </VStack>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      <VStack className="px-5 pt-2">
        <Header title="Kontrak" back={true} />
      </VStack>
      <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
        {isLoading ? (
          <HazardListLoad />
        ) : (
          <FlatList
            data={item}
            showsVerticalScrollIndicator={false}
            renderItem={({item, key}) => (
              <ContractCard
                key={key + Math.random()}
                item={item}
                onPress={() => navigate('pkwt-detail', {item})}
              />
            )}
            ListEmptyComponent={<Empty />}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  setPage(1);
                  refetch();
                }}
              />
            }
            ItemSeparatorComponent={() => <View className="h-3"></View>}
            ListFooterComponent={() => {
              if (item.length > 0) {
                return (
                  <View className="min-h-10">
                    {load ? (
                      <View className="w-full">
                        <HazardListLoad />
                      </View>
                    ) : page >= data?.last_page ? (
                      <Text className="text-center py-4">
                        {' '}
                        Tidak Ada Data Lagi{' '}
                      </Text>
                    ) : (
                      <View className="">
                        <Button
                          className="my-4"
                          variant="unstyled"
                          onPress={() => {
                            setLoad(true);
                            setPage(page + 1);
                          }}>
                          Load More
                        </Button>
                      </View>
                    )}
                  </View>
                );
              }
            }}
          />
        )}
      </VStack>
    </Layout>
  );
};

export default PkwtScreen;
