import React, {useEffect, useRef, useState} from 'react';
import Layout from '@components/layout.component';
import {HStack, Text, VStack} from 'native-base';
import Header from '@components/navigation/header.component';

import SignatureScreen from 'react-native-signature-canvas';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useGetPkwtListQuery} from '@slices/contract.slice';
import HazardListLoad from '@components/hazard-list-load.component';
import Empty from '@components/empty.comnponent';
import Icon from 'react-native-vector-icons/Ionicons';

const PkwtScreen = ({navigation}) => {
  const [page, setPage] = useState(1);

  const {data, isLoading, error, isFetching, refetch} = useGetPkwtListQuery({
    page,
    user_id: 3797,
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
  console.log('result', data, error);

  // const ref = useRef();
  // // Called after ref.current.readSignature() reads a non-empty base64 string
  // const handleOK = signature => {
  //   // console.log(signature);
  //   console.log('signature Cretae');
  //   // onOK(signature); // Callback from Component props
  // };

  // // Called after ref.current.readSignature() reads an empty string
  // const handleEmpty = () => {
  //   console.log('Empty');
  // };

  // // Called after ref.current.clearSignature()
  // const handleClear = () => {
  //   console.log('clear success!');
  // };

  // // Called after end of stroke
  // const handleEnd = () => {
  //   ref.current.readSignature();
  // };

  // // Called after ref.current.getData()
  // const handleData = data => {
  //   // console.log(data);
  // };

  const ContractCard = ({item, onPress}) => {
    let icon = '';
    switch (item?.status) {
      case 'draft':
        icon = 'heart-circle-outline';
        break;
      case 'send':
        icon = 'cloud-circle-outline';
        break;
      case 'signed':
        icon = 'checkmark-circle-outline';
        break;
      case 'success':
        icon = 'checkmark-done-circle-outline';
        break;
      case 'expired':
        icon = 'heart-dislike-circle-outline';
        break;
      default:
        icon = 'close-circle-outline';
        break;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <View className="w-full border-b-4 border-r-4 border-t border-l border-slate-500/10 rounded-md px-3 py-2 flex flex-row space-x-3 items-center">
          <Icon name="document-text-outline" size={40} />
          <View className="justify-center items-center absolute right-2 top-auto">
            <Icon name={icon} size={25} color="rgb(239 68 68)" />
            <View>
              <Text
                className="font-semibold text-[11px]"
                style={{fontFamily: 'OpenSans-SemiBold'}}>
                {item.status}
              </Text>
            </View>
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
        {isLoading || isFetching ? (
          <HazardListLoad />
        ) : (
          <FlatList
            data={item}
            showsVerticalScrollIndicator={false}
            renderItem={({item, key}) => (
              <ContractCard
                key={key}
                item={item}
                onPress={() => console.log('')}
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
      {/* <SignatureScreen
        ref={ref}
        // onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        autoClear={false}
        descriptionText={'Digital Signature'}
      /> */}
    </Layout>
  );
};

export default PkwtScreen;
