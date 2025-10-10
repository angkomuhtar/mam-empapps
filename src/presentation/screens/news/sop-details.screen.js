import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HStack, List, VStack} from 'native-base';
import {useGetFolderDetailQuery} from '../../../applications/slices/sop.slice';
import Empty from '../../components/empty.comnponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../../../applications/utils/RootNavigation';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Loading from '../../components/loading.component';
import {SopListLoading} from './sop-list.screen';
import {set} from 'zod';

const SopDetailsScreen = ({route, navigation}) => {
  const {id, name} = route.params;
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const {data, error, refetch, isLoading, isFetching} = useGetFolderDetailQuery(
    {id: id, page: page},
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [navigation]);

  useEffect(() => {
    if (data && page === 1) {
      setListItem(data?.data);
    } else if (data && page > 1) {
      setListItem([...listItem, ...data?.data]);
    }
  }, [data]);

  const viewFile = ({filename, url}) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${filename}.pdf`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    setLoading(true);
    RNFS.downloadFile(options)
      .promise.then(() => {
        FileViewer.open(localFile);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  console.log(data?.meta, 'page', page);

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
      {loading && <Loading />}
      <TouchableOpacity onPress={() => goBack()}>
        <HStack className="items-center space-x-2 border border-primary-100 rounded-md px-3 py-3 mb-3">
          <Icon name="return-up-back-outline" size={20} />
          <View>
            <Text
              className="text-sm text-primary-950"
              style={{fontFamily: 'Inter-SemiBold'}}>
              {name}
            </Text>
          </View>
        </HStack>
      </TouchableOpacity>

      {isLoading ? (
        <VStack space={3}>
          <SopListLoading />
          <SopListLoading />
          <SopListLoading />
        </VStack>
      ) : (
        <FlatList
          data={listItem}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            if (item.type == 'folder') {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.push('detail-folder-sop', {
                      id: item.id,
                      name: item.title,
                    });
                  }}>
                  <HStack className="items-center space-x-2 border border-primary-100 rounded-md px-3 py-3">
                    <Icon name="folder-outline" size={35} />

                    <View className="flex-1">
                      <Text
                        className="text-sm text-primary-950"
                        style={{fontFamily: 'Inter-SemiBold'}}>
                        {item.title}
                      </Text>
                    </View>
                  </HStack>
                </TouchableOpacity>
              );
            } else if (item.type == 'file')
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    viewFile({filename: item.title, url: item.url});
                  }}>
                  <HStack className="items-center space-x-2 border border-primary-100 rounded-md px-3 py-3">
                    <Icon name="document-text-outline" size={35} />

                    <View className="flex-1">
                      <Text
                        className="text-sm text-primary-950"
                        style={{fontFamily: 'Inter-SemiBold'}}>
                        {item.title}
                      </Text>
                    </View>
                  </HStack>
                </TouchableOpacity>
              );
          }}
          ListEmptyComponent={<Empty />}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => setPage(1)}
            />
          }
          ItemSeparatorComponent={() => <View className="h-3"></View>}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (data?.meta.total > listItem.length) setPage(page + 1);
          }}
          ListFooterComponent={() => (
            <View className="">
              {data?.meta.total > listItem.length && (
                <VStack mt={3}>
                  <SopListLoading />
                </VStack>
              )}
              <View className="h-20"></View>
            </View>
          )}
        />
      )}
    </VStack>
  );
};

export default SopDetailsScreen;
