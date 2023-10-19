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
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import Header from '../../../component/navigation/Header';
import Input from '../../components/input.component';
// import DateTimePicker from '@react-native-community/datetimepicker';

const LeaveAdd = () => {
  const [tipe, setTipe] = useState('');
  const [start, setStart] = useState(new Date());

  const [date, setDate] = useState(new Date(1598051730000));
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
        <HStack className="border border-primary-300 py-2 px-4 rounded-md">
          <VStack className="flex-1">
            <Text
              className="text-xs text-primary-950 capitalize"
              style={{fontFamily: 'Inter-Regular'}}>
              jenis izin
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
        <Pressable onPress={() => setShow(true)}>
          <HStack className="border border-primary-300 py-2 px-4 rounded-md">
            <VStack className="flex-1 items-start">
              <Text
                className="text-xs text-primary-950 capitalize"
                style={{fontFamily: 'Inter-Regular'}}>
                Tanggal
              </Text>
              <Text className="py-2 text-xs text-primary-950">
                {moment(date).format('MMM DD, YYYY')}
              </Text>
            </VStack>
            <View className="justify-center items-center">
              <Icon name="calendar-outline" size={25} />
            </View>
          </HStack>
          <Modal visible={show} transparent={true}>
            <VStack className="h-full w-full bg-black/50 items-center justify-center p-5">
              <VStack
                space={5}
                className="bg-white py-10 rounded-t-2xl absolute bottom-0">
                {/* <View className="bg-slate-600 w-20 h-1 rounded-full" />÷ */}
                <CalendarPicker
                  textStyle={{
                    fontFamily: 'Inter-Medium',
                    color: '#000000',
                    fontSize: 15,
                  }}
                  minDate={new Date()}
                  // allowRangeSelection={true}
                  weekdays={['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']}
                  onDateChange={(date, type) => setDate(date)}
                />
                <HStack space={4} px={5}>
                  <TouchableOpacity
                    onPress={() => setShow(false)}
                    className="border border-red-500 p-2 flex-1 justify-center items-center rounded-md">
                    <Text
                      className="text-lg text-red-500"
                      style={{fontFamily: 'Inter-Medium'}}>
                      Batal
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-green-500 p-2 flex-1 justify-center items-center rounded-md">
                    <Text
                      className="text-lg text-white"
                      style={{fontFamily: 'Inter-Medium'}}>
                      Simpan
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </VStack>
          </Modal>
        </Pressable>
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
          title="Catatan"></Input>
      </VStack>
      <TouchableOpacity className="bg-green-500 p-3 justify-center items-center rounded-md mb-8">
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
