import {View, Text, Pressable, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = ({value, onChange, range = false}) => {
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });
  const [visible, setVisible] = useState(false);
  return (
    <Pressable onPress={() => setVisible(true)}>
      <HStack className="border border-primary-300 py-2 px-4 rounded-md">
        <VStack className="flex-1 items-start">
          <Text
            className="text-xs text-primary-950 capitalize"
            style={{fontFamily: 'Inter-Regular'}}>
            Tanggal
          </Text>

          <Text
            className={`py-2 text-xs ${
              value ? 'text-primary-950' : 'text-gray-300'
            } `}>
            {value ? moment(value.start).format('D-M-Y') : 'pilih tanggal'}
          </Text>
        </VStack>
        <View className="justify-center items-center">
          <Icon name="calendar-outline" size={25} />
        </View>
      </HStack>
      <Modal visible={visible} transparent={true}>
        <VStack className="h-full w-full bg-black/50 items-center justify-center p-5">
          <VStack
            space={5}
            className="bg-white py-10 rounded-t-2xl absolute bottom-0">
            <CalendarPicker
              textStyle={{
                fontFamily: 'Inter-Medium',
                color: '#000000',
                fontSize: 15,
              }}
              selectedStartDate={value?.start}
              selectedEndDate={value?.end}
              minDate={new Date()}
              selectedDayColor="#08b"
              allowRangeSelection={range}
              startFromMonday={true}
              weekdays={['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']}
              onDateChange={(date, type) => {
                if (type == 'START_DATE') {
                  setDates({...dates, start: date});
                } else {
                  setDates({...dates, end: date});
                }
              }}
            />
            <HStack space={4} px={5}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="border border-red-500 p-2 flex-1 justify-center items-center rounded-md">
                <Text
                  className="text-lg text-red-500"
                  style={{fontFamily: 'Inter-Medium'}}>
                  Batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={dates.start ? false : true}
                onPress={() => {
                  setVisible(false);
                  onChange(dates);
                }}
                className="bg-green-500 p-2 flex-1 justify-center items-center rounded-md">
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
  );
};

export default Calendar;
