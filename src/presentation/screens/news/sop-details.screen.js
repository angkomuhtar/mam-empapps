import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import {useGetFolderDetailQuery} from '../../../applications/slices/sop.slice';
import Empty from '../../components/empty.comnponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../../../applications/utils/RootNavigation';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Loading from '../../components/loading.component';
import {SopListLoading} from './sop-list.screen';

const SopDetailsScreen = ({route, navigation}) => {
  const {id, name} = route.params;
  const {data, error, refetch, isLoading, isFetching} = useGetFolderDetailQuery(
    {id: id},
  );
  const [loading, setLoading] = useState(false);

  console.log(data, error, 'data dan report');

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
        // setAlert({
        //   visible: true,
        //   type: 'error',
        //   title: 'Gagal',
        //   message: 'Gagal membuka dokumen, silahkan coba lagi',
        //   onOK: () => {
        //     setAlert({...alert, visible: false});
        //   },
        // });
        console.error(error);
      });
  };

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

      {isFetching || isLoading ? (
        <VStack space={3}>
          <SopListLoading />
          <SopListLoading />
          <SopListLoading />
        </VStack>
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            if (item.type == 'folder') {
              return (
                <TouchableOpacity
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
          ItemSeparatorComponent={() => <View className="h-3"></View>}
          ListFooterComponent={() => <View className="h-20"></View>}
        />
      )}
    </VStack>
  );
};

export default SopDetailsScreen;
