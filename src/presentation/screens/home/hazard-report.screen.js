import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Button, HStack, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import {goBack} from '@utils/RootNavigation';
import Alert from '@components/alert.component';
import ErrorAlert from '@components/alert.component';
import Loading from '@components/loading.component';
import Input from '@components/input.component';
import {Controller, useForm} from 'react-hook-form';
import {useSetSleepMutation} from '@slices/sleep.slice';
import moment from 'moment';
import Layout from '../../components/layout.component';
import ImagePicker from '../../components/image-picker.component';

const AddSleep = ({route}) => {
  const height = Dimensions.get('screen').height;
  const [error, setError] = useState(false);

  const [postSleep, {result, isLoading, error: postError, isError, isSuccess}] =
    useSetSleepMutation();

  useEffect(() => {
    if (postError) {
      setError(true);
    }
  }, [postError]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm();

  const postTidur = data => {
    var form = new FormData();
    var nama = data.attachment.path.split('/');
    form.append('attachment', {
      uri: data.attachment.path,
      type: data.attachment.mime, // or photo.type
      name: nama[nama.length - 1],
    });
    let end = moment().format('Y-MM-DD 06:00:00');
    let start = moment(end)
      .subtract({hours: data.jam, minutes: data.menit})
      .format('Y-MM-DD HH:mm:ss');
    form.append('end', end);
    form.append('start', start);
    form.append('stage', '0');
    postSleep(form);
  };

  console.log('post err', postError);
  return (
    // <Layout>
    <>
      <Alert
        visible={isSuccess}
        type={'success'}
        title="Berhasil"
        message="Data tidur berhasil di input"
        onOk={() => goBack()}
      />
      <ErrorAlert
        visible={error}
        type="error"
        message="Terjadi kesalahan"
        title="Error"
        onOk={() => {
          setError(false);
        }}
      />
      <Layout>
        <VStack className={`px-5 bg-[#fafafa] flex-1`}>
          {isLoading && <Loading />}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header
              back={
                <HStack alignItems={'center'} space={3}>
                  <TouchableOpacity onPress={() => goBack()}>
                    <Icon
                      name="chevron-back-outline"
                      color={'rgb(73, 6, 9)'}
                      size={30}
                    />
                  </TouchableOpacity>
                  <Text
                    className="text-xl text-primary-950"
                    style={{fontFamily: 'Inter-Bold'}}>
                    Durasi Tidur
                  </Text>
                </HStack>
              }
            />
            <VStack
              // space={3}
              flex={1}
              mb={5}
              style={{minHeight: height - height * 0.25}}>
              <Text
                className="text-lg"
                style={{fontFamily: 'OpenSans-SemiBold'}}>
                Jumlah jam tidur
              </Text>
              <HStack className="justify-between mb-4">
                <Controller
                  control={control}
                  // defaultValue=""
                  name="jam"
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="Jumlah jam tidur"
                      keyboardType="number-pad"
                      value={value}
                      onChangeText={onChange}
                      maxLength={100}
                      title="Jam"
                      error={errors?.jam?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'harus diisi',
                    },
                    max: {
                      value: 24,
                      message: 'maksimal 24 jam',
                    },
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      message: 'hanya boleh angka bilangan bulat',
                    },
                  }}
                />
                <View className="w-4"></View>
                <Controller
                  control={control}
                  name="menit"
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="Menit"
                      keyboardType="number-pad"
                      value={value}
                      onChangeText={onChange}
                      maxLength={100}
                      title="menit"
                      error={errors?.menit?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'harus diisi',
                    },
                    max: {
                      value: 59,
                      message: 'maksimal 59',
                    },
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      message: 'hanya boleh angka bilangan bulat',
                    },
                  }}
                />
              </HStack>
              <Controller
                name="attachment"
                control={control}
                render={({field: {onChange, value}}) => (
                  <ImagePicker
                    value={value}
                    onChange={data => onChange(data)}
                    onDelete={() => onChange(null)}
                    type="camera"
                    error={errors?.attachment?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'harus diisi',
                  },
                }}
              />
            </VStack>
            <TouchableOpacity
              onPress={handleSubmit(postTidur)}
              className="bg-green-500 p-3 justify-center items-center rounded-md mb-5">
              <Text
                className="text-lg text-white"
                style={{fontFamily: 'Inter-SemiBold'}}>
                Simpan
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </VStack>
      </Layout>
    </>
  );
};

export default AddSleep;
