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
import {setKeyword} from '@slices/filter.slice';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actionsheet, HStack, VStack} from 'native-base';

const Tab = createMaterialTopTabNavigator();

const InspectionReport = ({navigation}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [nama, setNama] = useState('');
  const dispatch = useDispatch();
  const keyword = useSelector(state => state.filter.keyword);

  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        console.log('this from event', e);
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
  }, [navigation]);

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

export default InspectionReport;
