import React, {useEffect, useRef, useState} from 'react';
import Layout from '@components/layout.component';
import {Checkbox, HStack, Text, VStack} from 'native-base';
import Header from '@components/navigation/header.component';

import SignatureCanvas from 'react-native-signature-canvas';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetProfileQuery} from '../../../../applications/slices/user.slice';
import DetailValue from '../../../components/detail-value.component';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Loading from '../../../components/loading.component';
import {useSignedPkwtMutation} from '../../../../applications/slices/pkwt.slice';
import Alert from '@components/alert.component';
import {now} from 'moment';
// import {Platform} from 'react-native';

const PkwtDetailScreen = ({navigation, route}) => {
  const {data: users} = useGetProfileQuery();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    type: 'success',
    title: 'Berhasil',
    message: 'Penandatanganan berhasil',
    onOK: () => {
      setAlert({...alert, visible: false});
      navigation.goBack();
    },
  });

  const [Post, {isLoading, isSuccess, error}] = useSignedPkwtMutation();

  const {item} = route.params;

  const url =
    'https://e-pkwt.mitraabadimahakam.id/storage/' +
    item?.contract_document?.file;

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  const extension = getUrlExtension(url);
  const localFile = `${RNFS.DocumentDirectoryPath}/pkwt-${now()}.${extension}`;

  console.log(localFile);

  const ref = useRef();

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      setAlert({
        visible: true,
        type: 'error',
        title: 'Gagal',
        message: 'Gagal menandatangani kontrak, silahkan coba lagi',
        onOK: () => {
          setAlert({...alert, visible: false});
        },
      });
    }
    if (isSuccess) {
      navigation.goBack();
      setAlert({
        ...alert,
        visible: true,
      });
    }
  }, [error, isSuccess]);

  const openFile = () => {
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
        setAlert({
          visible: true,
          type: 'error',
          title: 'Gagal',
          message: 'Gagal membuka dokumen, silahkan coba lagi',
          onOK: () => {
            setAlert({...alert, visible: false});
          },
        });
      });
  };

  const handleOK = signature => {
    Post({
      already_have_sign: false,
      sign: signature,
      user_id: users?.id,
      contract_id: item?.id,
    });
  };

  let status = {
    text: '',
    color: '',
  };

  switch (item?.status) {
    case 'send':
      status = {
        text: 'ditawarkan',
        color: 'bg-yellow-500',
      };
      break;
    case 'signed':
      status = {
        text: 'diajukan ke HR Dept',
        color: 'bg-gray-500',
      };
      break;
    case 'success':
      status = {
        text: 'aktif',
        color: 'bg-green-500',
      };
      break;
    case 'expired':
      status = {
        text: 'expired',
        color: 'bg-red-500',
      };
      break;
    default:
      status = {
        text: 'cancel',
        color: 'bg-red-500',
      };
      break;
  }

  return (
    <Layout>
      <VStack className="px-5 pt-2">
        <Header title="Kontrak Detail" back={true} />
      </VStack>

      <Alert {...alert} />
      {loading && <Loading />}
      <VStack className="px-5 pt-3 bg-[#fafafa] flex-1 pb-8">
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}>
          <VStack space={3} pb={10}>
            <DetailValue label="Nomor Document" value={item?.code || '-'} />
            <DetailValue
              label="Jenis Kontrak"
              value={item?.contract_type?.name}
            />
            <DetailValue
              label="Durasi Kontrak"
              value={`${item?.start_date} - ${item?.end_date}`}
            />
            <DetailValue
              label="Nama Karyawan"
              value={users?.profile?.name || '-'}
            />
            <DetailValue
              label="Jabatan"
              value={users?.employee?.position?.position || '-'}
            />
            <DetailValue
              label="Departement"
              value={users?.employee?.division?.division || '-'}
            />
            <DetailValue
              label="status"
              value={
                <View className={`py-1 px-3 ${status.color} rounded-sm`}>
                  <Text className="text-white font-semibold">
                    {status.text}
                  </Text>
                </View>
              }
            />
            <HStack className="items-center justify-center">
              <TouchableOpacity
                className="flex-row space-x-2 items-center self-start px-3 py-2 rounded-md text-white border"
                onPress={openFile}>
                <Icon name="document-outline" size={15} />
                <Text className="text-xs font-semibold">Lihat Dokumen</Text>
              </TouchableOpacity>
            </HStack>
            {item?.status === 'send' && (
              <VStack className="px-3 py-4 bg-white rounded-md shadow-sm">
                <Text className="text-sm font-semibold">Tanda Tangan</Text>
                <HStack className="space-x-3 py-2 mb-4">
                  <Checkbox
                    value="test"
                    defaultIsChecked={check}
                    onChange={e => {
                      setCheck(e);
                    }}
                    size={'sm'}
                    accessibilityLabel="This is a dummy checkbox"
                  />
                  <Text className="text-xs font-light">
                    Anda telah membaca dan menyatakan setuju dengan semua isi
                    kontrak kerja ini.
                  </Text>
                </HStack>
                {check && !users?.signature && (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      alignItems: 'center',
                    }}>
                    <SignatureCanvas
                      ref={ref}
                      style={{
                        width: '100%',
                        height: 350,
                      }}
                      dotSize={0.5}
                      maxWidth={1}
                      onBegin={() => setScrollEnabled(false)}
                      onEnd={() => setScrollEnabled(true)}
                      onOK={handleOK}
                      dataURL="string"
                      descriptionText={'Tanda Tangan'}
                      clearText={'Hapus'}
                      confirmText={'Simpan'}
                    />
                  </View>
                )}
                {check && users?.signature && (
                  <TouchableOpacity
                    onPress={() =>
                      Post({
                        already_have_sign: true,
                        user_id: users?.id,
                        contract_id: item?.id,
                      })
                    }
                    className="flex-row space-x-2 items-center justify-center px-3 py-2 rounded-md text-white border">
                    <Icon name="document-outline" size={15} />
                    <Text className="text-xs font-semibold">
                      Tanda Tangan Dokumen
                    </Text>
                  </TouchableOpacity>
                )}
              </VStack>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default PkwtDetailScreen;
