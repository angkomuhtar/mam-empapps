import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '@components/layout.component';
import Header from '@components/navigation/header.component';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '@components/navigation/tab-bar.component';
import HazardReportOpen from '@screens/request-and-approval/hazard/hazard-report-list.screen';
import {
  Actionsheet,
  Checkbox,
  HStack,
  KeyboardAvoidingView,
  Stack,
  VStack,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {setKeyword} from '@slices/filter.slice';

const Tab = createMaterialTopTabNavigator();

const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = useState(0);
  const subscriptions = useRef([]);

  useEffect(() => {
    function onKeyboardChange(e) {
      if (
        e.startCoordinates &&
        e.endCoordinates.screenY <= e.startCoordinates.screenY
      )
        setBottom(e.endCoordinates.height);
      else setBottom(0);
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};

const HazardReport = ({navigation}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [nama, setNama] = useState('');
  const dispatch = useDispatch();
  const keyword = useSelector(state => state.filter.keyword);
  const bottomInset = useKeyboardBottomInset();

  useEffect(() => {
    dispatch(setKeyword(''));
  }, [navigation]);

  return (
    <Layout>
      <View className="px-5 pt-2">
        <Header
          back={true}
          title="Hazard Report"
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setNama(keyword);
                setSheetOpen(true);
              }}
              className="relative">
              <Icon name="search" color={'rgb(239, 68, 68)'} size={20} />
              {keyword != '' && (
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
          component={HazardReportOpen}
          initialParams={{status: 'open', search: 'abdul'}}
        />
        <Tab.Screen
          name="hazard-onprogress"
          options={{
            tabBarLabel: 'ON PROGRESS',
            focusedBackground: 'bg-yellow-500',
          }}
          component={HazardReportOpen}
          initialParams={{status: 'progress', search: ''}}
        />
        <Tab.Screen
          name="hazard-done"
          options={{tabBarLabel: 'DONE', focusedBackground: 'bg-green-500'}}
          component={HazardReportOpen}
          initialParams={{status: 'close', search: ''}}
        />
      </Tab.Navigator>

      <Actionsheet isOpen={sheetOpen} onClose={setSheetOpen}>
        <Actionsheet.Content
          className="bg-white border-t-[4px] border-red-500/20"
          bottom={bottomInset}
          _dragIndicator={{
            bg: 'black',
          }}>
          <View className="w-full px-5 py-1">
            <Text
              style={{fontFamily: 'OpenSans-Bold', fontSize: 16}}
              className="text-primary-950">
              Filter
            </Text>
            <VStack space={1} className="my-2">
              <Text
                style={{fontFamily: 'OpenSans-Light'}}
                className="text-sm text-gray-500">
                Nama Pelapor / No. Laporan
              </Text>
              <TextInput
                className="border border-gray-300 rounded-md py-2 px-3 text-primary-950"
                value={nama}
                onChangeText={text => {
                  setNama(text);
                  if (text == '') {
                    dispatch(setKeyword(''));
                  }
                }}
              />
            </VStack>
            <HStack space={2} className="mt-4">
              <TouchableOpacity
                className="flex-1 py-2  border border-red-500 rounded-lg"
                onPress={() => {
                  dispatch(setKeyword(''));
                  setNama('');
                  setSheetOpen(false);
                }}>
                <Text
                  style={{fontFamily: 'OpenSans-Bold'}}
                  className="text-center text-red-500">
                  Clear
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!nama}
                className={`flex-1 py-2 ${
                  !nama ? 'bg-red-300' : 'bg-red-500'
                }  rounded-lg`}
                onPress={() => {
                  dispatch(setKeyword(nama));
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
        </Actionsheet.Content>
      </Actionsheet>
    </Layout>
  );
};

export default HazardReport;
