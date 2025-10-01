import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import DetailValue from '@components/detail-value.component';
import Layout from '@components/layout.component';
import Loading from '@components/loading.component';
import moment from 'moment';
import {useGetInspectDetailQuery} from '@slices/inspection.slice';
import _ from 'lodash';
import Alert from '@components/alert.component';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {useVerifyInspectionMutation} from '../../../../applications/slices/inspection.slice';
import FileViewer from 'react-native-file-viewer';
import {API_URL, APP_ENV, API_URL_DEV} from '@env';

const InspectionDetail = ({route}) => {
  const {id, type} = route.params;

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    title: 'Pengajuan dibatalkan',
    message: 'Pengajuan Anda telah dibatalkan',
    quote: '',
    onOK: () => {
      setAlert({...alert, show: false});
    },
    onDissmiss: false,
  });

  const url =
    APP_ENV == 'production'
      ? `${API_URL}/inspection/${id}/export_pdf`
      : `${API_URL_DEV}/inspection/${id}/export_pdf`;

  const {data, isLoading} = useGetInspectDetailQuery({id});
  const [verify, {isLoading: isVerifying, isSuccess, isError, error}] =
    useVerifyInspectionMutation();

  const grouped = _.groupBy(
    data?.answer,
    item => item?.question?.sub_inspection?.sub_inspection_name || 'Unknown',
  );
  const sections = Object.entries(grouped).map(([key, items]) => ({
    title: key,
    data: items,
  }));

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setAlert({
        show: true,
        type: 'error',
        title: 'Verifikasi Gagal',
        message: 'Verifikasi gagal, silahkan coba lagi',
        onOK: () => {
          setAlert({...alert, show: false});
        },
      });
      console.log('error', error);
    }
    if (isSuccess) {
      setAlert({
        show: true,
        type: 'success',
        title: 'Verifikasi Berhasil',
        message: 'Verifikasi berhasil dilakukan',
        onOK: () => {
          setAlert({show: false});
        },
      });
    }
  }, [isVerifying, isSuccess, isError]);

  const openFile = () => {
    const filename = `inspection_${data.inspection_number}`;
    const newFilename = filename.replace(/\//g, '_').toLowerCase();
    const localFile = `${RNFS.DocumentDirectoryPath}/${newFilename}.pdf`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };

    setLoading(true);
    RNFS.downloadFile(options)
      .promise.then(() => {
        setLoading(false);
        console.log('File downloaded to:', localFile);

        FileViewer.open(localFile);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);

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

  if (loading) return <Loading />;
  return (
    <Layout>
      <VStack px={5} pt={3} className="flex-1">
        <Header
          back={true}
          title="Inspection Card Detail"
          rightIcon={
            <View className="flex-row items-center">
              {data?.status == 'verified' && (
                <TouchableOpacity onPress={openFile} className="mr-2">
                  <Icon name="cloud-download-outline" size={20} color="#000" />
                </TouchableOpacity>
              )}
              <View
                className={`py-1 px-3 ${
                  data?.status == 'OPEN'
                    ? 'bg-red-500'
                    : data?.status == 'ONPROGRESS'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                } rounded-sm text-white`}>
                <Text
                  className="text-[10px] text-white"
                  style={{fontFamily: 'Inter-ExtraBold'}}>
                  {data?.status}
                </Text>
              </View>
            </View>
          }
        />
        <Alert
          visible={alert.show}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          quote={alert.quote}
          onOk={alert.onOK}
          onDissmiss={alert.onDissmiss}
        />
        {isVerifying && <Loading />}

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} pb={10}>
            <DetailValue
              label="nomor hazard report"
              value={data?.inspection_number}
            />
            <DetailValue
              label="tanggal inspeksi"
              value={moment(data?.inspection_date).format('DD MMM YYYY')}
            />
            <DetailValue
              label="Lokasi"
              value={
                data?.location_id !== '999'
                  ? data?.location?.location
                  : data?.other_location
              }
            />
            <DetailValue label="Detail Lokasi" value={data?.detail_location} />
            <DetailValue
              label="Catatan Inspeksi"
              value={data?.recomended_action}
            />

            {sections.map((section, index) => {
              return (
                <VStack key={index} space={2}>
                  <Text
                    style={{fontFamily: 'Inter-Medium'}}
                    className="text-primary-950">
                    {section.title}
                  </Text>
                  {section.data.map(item => {
                    if (item?.answer == 'yes' || item?.answer == 'na') {
                      return (
                        <DetailValue
                          key={item.id}
                          label={item.question.question}
                          value={item?.answer == 'yes' ? 'Sesuai' : 'N/A'}
                        />
                      );
                    } else if (item?.answer == 'no') {
                      return (
                        <VStack key={item.id} space={1}>
                          <DetailValue
                            label={item.question.question}
                            value="Tidak Sesuai"
                          />
                          <VStack space={1} px={2}>
                            <DetailValue
                              label="Tindakan Perbaikan"
                              value={item.note}
                            />
                            <DetailValue
                              label="Due Date"
                              value={moment(item.due_date).format('DD MMM YY')}
                            />
                          </VStack>
                        </VStack>
                      );
                    }
                  })}
                </VStack>
              );
            })}

            <DetailValue label="Nama Pengawas" value={data?.creator?.name} />
            <DetailValue
              label="Jabatan Pengawas"
              value={data?.creator?.position}
            />
            <DetailValue label="NRP Pengawas" value={data?.creator?.nrp} />

            {data?.supervisor && (
              <>
                <DetailValue
                  label="Nama Verifikator"
                  value={data?.supervisor?.name}
                />
                <DetailValue
                  label="Jabatan Verifikator"
                  value={data?.supervisor?.position}
                />
                <DetailValue
                  label="NRP Verifikator"
                  value={data?.supervisor?.nrp}
                />
              </>
            )}
          </VStack>
        </ScrollView>

        {type == 'reviewer' && data?.status == 'created' && (
          <VStack className="py-5 pb-8">
            <Button
              onPress={() => {
                setAlert({
                  show: true,
                  type: 'warning',
                  title: 'Verifikasi Inspeksi',
                  message: 'ingin melakukan verifikasi inspeksi sekarang.?',
                  onOK: () => {
                    setAlert({
                      ...alert,
                      show: false,
                    });
                    verify({id: id});
                  },
                  onDissmiss: () => {
                    setAlert({...alert, show: false});
                  },
                });
              }}>
              <Text
                className="text-white capitalize"
                style={{fontFamily: 'OpenSans-Bold'}}>
                Verifikasi Inspeksi
              </Text>
            </Button>
          </VStack>
        )}
      </VStack>
    </Layout>
  );
};

export default InspectionDetail;
