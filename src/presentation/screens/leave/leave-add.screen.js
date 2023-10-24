import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  Pressable,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '@utils/RootNavigation';
import {HStack, Select, VStack} from 'native-base';
import moment from 'moment';
import Header from '@components/navigation/header.component';
import Input from '@components/input.component';
import {Controller, useForm, useWatch} from 'react-hook-form';
import SelectField from '../../components/select.component';
import Calendar from '../../components/calendar-picker.components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from '../../components/image-picker.component';
// import DateTimePicker from '@react-native-community/datetimepicker';

const LeaveAdd = () => {
  const [tipe, setTipe] = useState('');
  const [start, setStart] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm();
  const [note, setNote] = useState('');
  const [day, setDay] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const submitForm = data => {
    console.log(data);
  };

  const handleCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  useEffect(() => {
    let tgl = watch('date');

    if (tgl?.start) {
      if (tgl?.end) {
        var a = moment(tgl.start);
        var b = moment(tgl.end);
        var jum = b.diff(a, 'day') + 1;
        setValue('tot_day', String(jum));
      } else {
        setValue('tot_day', '1');
      }
    }
  }, [watch('date')]);

  console.log(watch('tot_day'), '<<< TOtal day');

  const option = [
    {label: 'Cuti Tahunan', value: 'annual'},
    {label: 'Cuti Periodik', value: 'periodik'},
    {label: 'Sakit', value: 'sick'},
    {label: 'Ijin', value: 'permit'},
    {label: 'Cuti Melahirkan', value: 'maternity'},
    {label: 'Cuti Haid', value: 'menstruation'},
    {label: 'Cuti Alasan Penting', value: 'other'},
  ];

  console.log(errors);
  return (
    <VStack className="min-h-screen p-5">
      <Header
        back={
          <HStack alignItems={'center'} space={5}>
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
              Pengajuan Ijin
            </Text>
          </HStack>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="flex-1 mb-14" space={5}>
          <VStack>
            <Controller
              name="leave_type"
              control={control}
              render={({field: {onChange, value}}) => (
                <SelectField
                  label="Jenis ijin/Cuti"
                  option={option}
                  onChange={onChange}
                  value={value}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'pilih salah satu',
                },
              }}
            />
            {errors?.leave_type && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.leave_type.message}
              </Text>
            )}
          </VStack>

          <VStack>
            <Controller
              name="date"
              defaultValue={null}
              control={control}
              render={({field: {value}}) => (
                <Calendar
                  value={value}
                  range={true}
                  onChange={data => {
                    console.log(data);
                    setValue('date', data);
                  }}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'harus diisi',
                },
              }}
            />
            {errors?.date && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.date.message}
              </Text>
            )}
          </VStack>

          <VStack>
            <Controller
              control={control}
              // defaultValue=""
              name="tot_day"
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Jumlah hari izin/cuti"
                  keyboardType="default"
                  value={value}
                  onChangeText={onChange}
                  editable={false}
                  maxLength={100}
                  title="Jumlah Hari"
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'harus diisi',
                },
              }}
            />
            {errors?.tot_day && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.tot_day.message}
              </Text>
            )}
          </VStack>
          <VStack>
            <Controller
              name="caretaker"
              control={control}
              render={({field: {onChange, value}}) => (
                <SelectField
                  label="Penanggung jawab sementara"
                  option={option}
                  onChange={onChange}
                  value={value}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'pilih salah satu',
                },
              }}
            />
            {errors?.caretaker && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.caretaker.message}
              </Text>
            )}
          </VStack>
          <Input
            placeholder="catatan untuk atasan"
            keyboardType="default"
            multiline={true}
            numberOfLines={5}
            value={note}
            onChangeText={val => {
              setNote(val);
            }}
            inputStyle={{height: 70}}
            maxLength={100}
            title="Catatan"
          />
          <Controller
            name="attachment"
            control={control}
            render={({field: {onChange, value}}) => (
              <ImagePicker
                onChange={data => setValue('attachment', data)}
                onDelete={() => setValue('attachment', null)}
              />
            )}
          />
        </VStack>
        <TouchableOpacity
          onPress={handleSubmit(submitForm)}
          className="bg-green-500 p-3 justify-center items-center rounded-md mb-28">
          <Text
            className="text-lg text-white"
            style={{fontFamily: 'Inter-SemiBold'}}>
            Kirim Pengajuan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </VStack>
    // <ScrollView showsHorizontalScrollIndicator={true}>
    // </ScrollView>
  );
};

export default LeaveAdd;
