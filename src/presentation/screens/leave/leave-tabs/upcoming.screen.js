import {View, Text} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import moment from 'moment';
import LeaveCard from '../../../components/leave-card.component';

const Upcoming = () => {
  return (
    <View className="p-5">
      <LeaveCard />
    </View>
  );
};

export default Upcoming;
