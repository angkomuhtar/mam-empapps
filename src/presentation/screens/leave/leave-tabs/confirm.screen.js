import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar, HStack} from 'native-base';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import LeaveConfirmCard from '../../../components/leave-confirm-card.component';

const Confirm = () => {
  return (
    <View className="p-5">
      <LeaveConfirmCard />
    </View>
  );
};

export default Confirm;
