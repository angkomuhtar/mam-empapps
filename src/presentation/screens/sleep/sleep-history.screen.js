import {View, Text, RefreshControl, Modal, Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
import {FlatList, HStack, Icon, Image, Stack, VStack} from 'native-base';
import {useLazyGetSleepQuery} from '@slices/sleep.slice';
import Empty from '@components/empty.comnponent';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
const SleepHistory = ({navigation}) => {
  const [trigger, {data, isFetching}, lastPromiseInfo] = useLazyGetSleepQuery();
  const [image, setImage] = useState({
    show: false,
    url: [
      {
        url: '',
      },
    ],
  });

  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [navigation]),
  );

  const renderData = (end, start) => {
    const durasi = parseInt(
      moment.duration(moment(end).diff(moment(start))).asMinutes(),
    );

    if (durasi > 0) {
      let jam = Math.floor(durasi / 60),
        menit = durasi % 60;
      return (
        <HStack className="space-x-2">
          <HStack className="space-x-1">
            <Text
              className="text-xl text-primary-950 tracking-tighter"
              style={{fontFamily: 'Inter-Bold'}}>
              {jam}
            </Text>
            <Text
              className="text-xs text-primary-950 mt-3"
              style={{fontFamily: 'OpenSans-Bold'}}>
              jam
            </Text>
          </HStack>
          {menit > 0 && (
            <HStack className="space-x-1">
              <Text
                className="text-xl text-primary-950 tracking-tighter"
                style={{fontFamily: 'Inter-Bold'}}>
                {menit}
              </Text>
              <Text
                className="text-xs text-primary-950 mt-3"
                style={{fontFamily: 'OpenSans-Bold'}}>
                menit
              </Text>
            </HStack>
          )}
        </HStack>
      );
    } else {
      return <Text className="text-xl">-</Text>;
    }
  };

  return (
    <View className="px-5 pt-3 bg-[#fafafa] flex-1">
      <FlatList
        className="flex-1"
        data={data?.data}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={trigger} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="">
            <Empty />
          </View>
        )}
        renderItem={({item, index}) => {
          const duration = moment
            .duration(moment(item.end).diff(moment(item.start)))
            .asMinutes();

          return (
            <HStack
              className="bg-white rounded-md p-2 mb-3 space-x-5 border border-primary-50"
              key={index}>
              <View className="border border-primary-100 rounded-lg p-1 w-24 h-24 justify-center items-center">
                {item?.imagesUrl ? (
                  <Pressable
                    onPress={() =>
                      setImage({
                        show: true,
                        url: [{url: item.imagesUrl}],
                      })
                    }>
                    <Image
                      className="w-full aspect-square rounded-md"
                      alt="images"
                      source={{
                        uri: item.imagesUrl,
                      }}
                    />
                  </Pressable>
                ) : (
                  <Image
                    className="w-24 h-20 aspect-square rounded-md"
                    alt="images"
                    source={require('@images/no-file.jpg')}
                  />
                )}
              </View>
              <VStack className="flex-1 justify-center">
                <HStack className="justify-between items-center">
                  <Text
                    style={{fontFamily: 'Inter-Bold'}}
                    className="text-[10px] text-primary-950">
                    {moment(item.date, 'YYYY-MM-DD').format('dddd, DD MMM YY')}
                  </Text>
                  {duration < 300 && (
                    <HStack
                      alignItems="center"
                      space={1}
                      className="bg-red-500 px-1.5 rounded-md py-0.5">
                      <IonIcon
                        name="information-circle-sharp"
                        size={18}
                        color="#FFF"
                      />
                      <Text
                        className="text-[10px] text-white"
                        style={{fontFamily: 'OpenSans-Bold'}}>
                        Kurang
                      </Text>
                    </HStack>
                  )}

                  {duration < 360 && duration >= 300 && (
                    <HStack
                      space={1}
                      alignItems="center"
                      className="bg-yellow-500 px-1.5 rounded-md py-0.5">
                      <IonIcon
                        name="information-circle-sharp"
                        size={18}
                        color="#FFF"
                      />
                      <Text
                        className="text-[10px] text-white"
                        style={{fontFamily: 'OpenSans-Bold'}}>
                        Cukup
                      </Text>
                    </HStack>
                  )}
                  {duration >= 360 && (
                    <HStack
                      space={1}
                      alignItems="center"
                      className="bg-green-500 px-1.5 rounded-md py-0.5">
                      <IonIcon
                        name="checkmark-done-circle"
                        size={18}
                        color="#FFF"
                      />
                      <Text
                        className="text-[10px] text-white"
                        style={{fontFamily: 'OpenSans-Bold'}}>
                        Bagus
                      </Text>
                    </HStack>
                  )}
                </HStack>
                {renderData(item.end, item.start)}
                <Text
                  className="text-primary-950 text-xs mt-2"
                  style={{fontFamily: 'Inter-Medium'}}>
                  {moment(item.start).format('HH:mm')} -{' '}
                  {moment(item.end).format('HH:mm')}
                </Text>
              </VStack>
              <Modal visible={image.show} transparent={true}>
                <VStack className="relative w-full h-full">
                  <HStack
                    className={`relative bg-black justify-end ${
                      Platform.OS == 'ios' ? 'pt-10' : ''
                    } px-10`}>
                    <Pressable onPress={() => setImage({show: false, url: []})}>
                      <IonIcon name="close" color="#fff" size={35} />
                    </Pressable>
                  </HStack>
                  <ImageViewer imageUrls={image.url} />
                </VStack>
              </Modal>
            </HStack>
          );
        }}
      />
    </View>
  );
};

export default SleepHistory;
