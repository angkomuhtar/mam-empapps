import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Button,
  Pressable,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '@utils/RootNavigation';
import {HStack, Select, VStack} from 'native-base';
import moment from 'moment';
import Header from '@components/navigation/header.component';
import Input from '@components/input.component';
import {Controller, useForm} from 'react-hook-form';
import SelectField from '../../components/select.component';
import Calendar from '../../components/calendar-picker.components';
// import DateTimePicker from '@react-native-community/datetimepicker';

const LeaveAdd = () => {
  const [tipe, setTipe] = useState('');
  const [start, setStart] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [note, setNote] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const submitForm = data => {
    console.log(data);
  };

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
      <VStack className="flex-1" space={5}>
        <Controller
          name="leave_type"
          control={control}
          render={({field: {onChange, value}}) => (
            <SelectField
              onChange={onChange}
              value={value}
              label="Jenis Ijin/Cuti"
              placeholder="Pilih Jenis Cuti/Ijin"
            />
          )}
        />
        <Controller
          name="date"
          defaultValue={null}
          control={control}
          render={({field: {value}}) => (
            <Calendar value={value} onChange={data => setValue('date', data)} />
          )}
        />

        <Controller
          control={control}
          defaultValue=""
          name="total_hari"
          render={({field: {onChange, value}}) => (
            <Input
              placeholder="Jumlah hari izin/cuti"
              keyboardType="default"
              value={value}
              onChangeText={onChange}
              // editable={false}
              maxLength={100}
              title="Jumlah Hari"
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Harus diisi boss',
            },
          }}
        />
        <HStack className="border border-primary-300 py-2 px-4 rounded-md">
          <VStack className="flex-1">
            <Text
              className="text-xs text-primary-950 capitalize"
              style={{fontFamily: 'Inter-Regular'}}>
              penanggung Jawab pengganti
            </Text>
            <Select
              borderWidth={0}
              py={Platform.OS == 'ios' ? '2' : '0'}
              px="0"
              dropdownIcon={() => <></>}
              selectedValue={tipe}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <Icon name="checkmark-done-outline" size={25} />,
              }}
              mt={1}
              onValueChange={itemValue => setTipe(itemValue)}>
              <Select.Item label="Cuti Tahunan" value="annual" />
              <Select.Item label="Cuti Periodik" value="web" />
              <Select.Item label="Sakit" value="cross" />
              <Select.Item label="Ijin" value="cross" />
              <Select.Item label="Cuti Melahirkan" value="ui" />
              <Select.Item label="Cuti Haid" value="ui" />
              <Select.Item label="Cuti Alasan Penting" value="backend" />
            </Select>
          </VStack>
          <View className="justify-center items-center">
            <Icon name="chevron-down-outline" size={25} />
          </View>
        </HStack>
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
        <Input
          placeholder="Lampiran berkas"
          keyboardType="default"
          multiline={true}
          numberOfLines={5}
          value={note}
          onChangeText={val => {
            setNote(val);
          }}
          inputStyle={{height: 70}}
          maxLength={100}
          title="Lampiran"
        />
      </VStack>
      <TouchableOpacity
        onPress={handleSubmit(submitForm)}
        className="bg-green-500 p-3 justify-center items-center rounded-md mb-8">
        <Text
          className="text-lg text-white"
          style={{fontFamily: 'Inter-SemiBold'}}>
          Kirim Pengajuan
        </Text>
      </TouchableOpacity>
    </VStack>
    // <ScrollView showsHorizontalScrollIndicator={true}>
    // </ScrollView>
  );
};

export default LeaveAdd;
