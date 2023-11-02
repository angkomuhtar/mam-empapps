import {View, Text} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import moment from 'moment';
import LeaveCard from '../../../components/leave-card.component';
import Layout from '../../../components/layout.component';

const Upcoming = () => {
  return (
    <Layout>
      <View className="p-5">
        <LeaveCard />
      </View>
    </Layout>
  );
};

export default Upcoming;
