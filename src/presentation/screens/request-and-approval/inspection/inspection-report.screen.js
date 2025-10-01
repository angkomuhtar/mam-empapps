import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import InspectReportList from './inspection-report-list.screen';
import {useDispatch, useSelector} from 'react-redux';
import {setKeyword, setMonth} from '@slices/filter.slice';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actionsheet, HStack, VStack} from 'native-base';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

const Tab = createMaterialTopTabNavigator();

const InspectionReport = ({navigation}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [nama, setNama] = useState('');
  const [Bulan, setBulan] = useState('');
  const dispatch = useDispatch();
  const {keyword, month} = useSelector(state => state.filter);
  const [bottom, setBottom] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setBottom(e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      e => {
        setBottom(0);
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(setKeyword(''));
    dispatch(setMonth(''));
  }, [navigation]);

  const onValueChange = (event, newDate) => {
    setShow(false);
    switch (event) {
      case 'dateSetAction':
        setBulan(newDate);
        break;
      case 'dismissedAction':
      default:
        break;
    }
  };

  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header
          back={true}
          title="Inspection Card"
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setNama(keyword);
                setBulan(month);
                setSheetOpen(true);
              }}
              className="relative">
              <Icon name="search" color={'rgb(239, 68, 68)'} size={20} />
              {(keyword != '' || month != '') && (
                <View className="bg-red-500 aspect-square rounded-full absolute h-[10px] border-2 border-white -left-1 "></View>
              )}
            </TouchableOpacity>
          }
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        backBehavior={() => navigate('home')}
        tabBar={props => (
          <View
            className="px-5
          ">
            <TabBar {...props} />
          </View>
        )}>
        <Tab.Screen
          name="hazard-open"
          options={{tabBarLabel: 'OPEN', focusedBackground: 'bg-red-500'}}
          component={InspectReportList}
          initialParams={{status: 'created'}}
        />
        <Tab.Screen
          name="hazard-done"
          options={{tabBarLabel: 'DONE', focusedBackground: 'bg-green-500'}}
          component={InspectReportList}
          initialParams={{status: 'verified'}}
        />
      </Tab.Navigator>
      <Actionsheet isOpen={sheetOpen} onClose={setSheetOpen}>
        <Actionsheet.Content
          bottom={bottom}
          className="bg-white border-t-[4px] border-red-500/20"
          _dragIndicator={{
            bg: 'black',
          }}>
          <View className="w-full px-5 py-1">
            <Text style={{fontFamily: 'OpenSans-Bold', fontSize: 16}}>
              Filter
            </Text>
            <VStack space={1} className="my-2">
              <Text
                style={{fontFamily: 'OpenSans-Light'}}
                className="text-sm text-gray-500">
                Nama Pelapor / No. Laporan
              </Text>
              <TextInput
                className="border border-gray-300 rounded-md py-2 px-3"
                value={nama}
                onChangeText={text => {
                  setNama(text);
                  if (text == '') {
                    dispatch(setKeyword(''));
                  }
                }}
              />
            </VStack>
            <VStack space={1} className="my-2">
              <Text
                style={{fontFamily: 'OpenSans-Light'}}
                className="text-sm text-gray-500">
                Bulan Laporan
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                }}
                className="border border-slate-400 py-2 px-3 rounded-md items-center self-start">
                <Text
                  className="text-xs text-primary-950"
                  style={{fontFamily: 'Inter-Bold'}}>
                  {Bulan ? moment(Bulan).format('MMMM YYYY') : 'Select Month'}
                </Text>
              </TouchableOpacity>
            </VStack>
            <HStack space={2} className="mt-4">
              <TouchableOpacity
                className="flex-1 py-2  border border-red-500 rounded-lg"
                onPress={() => {
                  dispatch(setKeyword(''));
                  setNama('');
                  dispatch(setMonth(''));
                  setSheetOpen(false);
                }}>
                <Text
                  style={{fontFamily: 'OpenSans-Bold'}}
                  className="text-center text-red-500">
                  Clear
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!nama && !Bulan}
                className={`flex-1 py-2 ${
                  !nama && !Bulan ? 'bg-red-300' : 'bg-red-500'
                }  rounded-lg`}
                onPress={() => {
                  dispatch(setKeyword(nama));
                  dispatch(setMonth(moment(Bulan).format('YYYY-MM-DD')));
                  setSheetOpen(false);
                }}>
                <Text
                  style={{fontFamily: 'OpenSans-Bold'}}
                  className="text-center text-white">
                  Search
                </Text>
              </TouchableOpacity>
            </HStack>
          </View>
          {show && (
            <MonthPicker
              onChange={onValueChange}
              value={Bulan ? new Date(Bulan) : new Date()}
              locale="in"
              maximumDate={
                new Date(moment().format('YYYY'), moment().format('MM'))
              }
            />
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </Layout>
  );
};

export default InspectionReport;
