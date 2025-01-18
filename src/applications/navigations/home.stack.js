import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  TabHome,
  SleepStack,
  RequestReportStack,
  Hazard,
} from '@navigations/index';
import LeaveAdd from '@screens/other/leave/leave-add.screen';
import LeaveDetails from '@screens/other/leave/leave-details.screen';
import ChangePassword from '@screens/settings/password.screen';
import Profile from '@screens/settings/profile.screen';
import Leave from '@screens/other/leave/leave.screen';
import ApprovalTab from './approval-tab.stack';
import HazardDetails from '../../presentation/screens/hazard/hazarad-detail.screen';
import HazardReport from './hazard-report.stack';
import HazardReportDetails from '../../presentation/screens/request-and-report/hazard-report/hazarad-report-detail.screen';
import HazardAction from './hazard-action.stack';
import HazardActionDetails from '../../presentation/screens/hazard-action/hazard-action-details.screen';

const Stack = createNativeStackNavigator();

const HomeBase = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TabHome} name="home" />
      <Stack.Screen component={SleepStack} name="sleep" />
      <Stack.Screen component={Leave} name="leave" />
      <Stack.Screen component={LeaveAdd} name="leave-add" />
      <Stack.Screen component={LeaveDetails} name="leave-details" />
      <Stack.Screen component={ApprovalTab} name="approval-request" />

      {/* hazard report */}
      <Stack.Screen component={Hazard} name="hazard" />
      <Stack.Screen component={HazardDetails} name="hazard-details" />

      {/* request And report */}
      <Stack.Screen component={RequestReportStack} name="request-report" />
      <Stack.Screen component={HazardReport} name="hazard-report" />
      <Stack.Screen
        component={HazardReportDetails}
        name="hazard-report-details"
      />
      <Stack.Screen component={HazardAction} name="hazard-action" />
      <Stack.Screen
        component={HazardActionDetails}
        name="hazard-action-details"
      />

      {/* settings */}
      <Stack.Screen component={ChangePassword} name="change-password" />
      <Stack.Screen component={ChangePassword} name="edit-profile" />
      <Stack.Screen component={Profile} name="my-profile" />
      <Stack.Screen component={ChangePassword} name="term-condition" />
      <Stack.Screen component={ChangePassword} name="privacy-policy" />
    </Stack.Navigator>
  );
};

export default HomeBase;
