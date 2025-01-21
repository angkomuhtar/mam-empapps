import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button, HStack, VStack} from 'native-base';
import Alert from '@components/alert.component';
import ErrorAlert from '@components/alert.component';
import Loading from '@components/loading.component';
import Input from '@components/input.component';
import {Controller, useForm} from 'react-hook-form';
import {useSetSleepMutation} from '@slices/sleep.slice';
import moment from 'moment';
import Layout from '../../components/layout.component';
import ImagePicker from '../../components/image-picker.component';
import {useGetTodayQuery} from '@slices/clock.slice';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {navigate} from '../../../applications/utils/RootNavigation';

const AddSleep = ({navigation}) => {
  const height = Dimensions.get('screen').height;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {data: today, isLoading: sleepLoad, refetch} = useGetTodayQuery();

  const loading = true;
  const [postSleep, {result, isLoading, error: postError, isError, isSuccess}] =
    useSetSleepMutation();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [navigation]),
  );

  useEffect(() => {
    if (postError) {
      setError(true);
    }
    if (isSuccess) {
      setSuccess(false);
    }
  }, [postError, isSuccess]);

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
    // console.log('attachment', {
    //   uri: data.attachment.path,
    //   type: data.attachment.mime, // or photo.type
    //   name: nama[nama.length - 1],
    // });

    let end = moment().format('Y-MM-DD 06:00:00');
    let start = moment(end)
      .subtract({hours: data.jam, minutes: data.menit})
      .format('Y-MM-DD HH:mm:ss');
    form.append('end', end);
    form.append('start', start);
    form.append('stage', '0');
    postSleep(form);
  };

  return (
    <>
      <Alert
        visible={success}
        type={'success'}
        title="Berhasil"
        message="Data tidur berhasil di input"
        onOk={() => {
          setSuccess(false);
          navigate('history-sleep');
        }}
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
      <VStack className={`px-5 bg-[#fafafa] flex-1`}>
        {(isLoading || sleepLoad) && <Loading />}
        {today?.sleep[0]?.date ? (
          <VStack className="flex-1 items-center pt-24">
            <View className="rounded-full">
              <LottieView
                source={require('@images/success.json')}
                loop={true}
                autoPlay
                className=""
                style={{height: 150, width: 150}}
              />
            </View>
            <Text
              className="text-md text-primary-950 mt-5 text-center"
              style={{fontFamily: 'Inter-SemiBold'}}>
              Anda sudah menginput data tidur hari ini
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('history-sleep')}>
              <Text
                className="text-blue-900 mt-2 text-md"
                style={{fontFamily: 'Inter-SemiBold'}}>
                Lihat data
              </Text>
            </TouchableOpacity>
          </VStack>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              <VStack className="flex-1 mb-5 mt-4">
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
            </ScrollView>
            <TouchableOpacity
              onPress={handleSubmit(postTidur)}
              className="bg-green-500 p-3 py-2 justify-center items-center rounded-md mb-5">
              <Text
                className="text-sm text-white"
                style={{fontFamily: 'Inter-Bold'}}>
                Simpan
              </Text>
            </TouchableOpacity>
          </>
        )}
      </VStack>
    </>
  );
};

export default AddSleep;
