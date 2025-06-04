import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabHome, RequestReportStack} from '@navigations/index';
import LeaveAdd from '@screens/other/leave/leave-add.screen';
import LeaveDetails from '@screens/other/leave/leave-details.screen';
import ChangePassword from '@screens/settings/password.screen';
import Profile from '@screens/settings/profile.screen';
import Leave from '@screens/other/leave/leave.screen';
import ApprovalTab from './approval-tab.stack';

// FEATURE
import Hazard from '@features/hazard/hazard.screen';
import HazardAction from '@features/hazard-action/hazard-action.screen';
import DetailHazardAction from '@features/hazard-action/detail-hazard-action.screen';
import DetailHazard from '@features/hazard/detail-hazard.screen';
import SleepScreen from '@features/sleep-duration/sleep.screen';

import PkwtScreen from '@features/pkwt/pkwt.screen';
import PkwtDetailScreen from '../../presentation/screens/feature/pkwt/pkwt.detail.screen';

import Inspection from '@features/inspection-card/inspection.screen';
import InspectionForm from '@features/inspection-card/inspection-form.screen';
import InspectionDetail from '@features/inspection-card/inspection-detail.screen';

//REPORT AND REQUEST
import HazardReportDetails from '@requests/hazard/hazard-report-detail.screen';
import RequestScreen from '@requests/request.screen';
import HazardReport from '@requests/hazard/hazard-report.screen';

import Notification from '@screens/notif/notification.screen';

import Other from '@screens/other/other.screen';
import InspectionReport from '../../presentation/screens/request-and-approval/inspection/inspection-report.screen';

const Stack = createNativeStackNavigator();

const HomeBase = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={TabHome} name="home" />
      <Stack.Screen component={SleepScreen} name="sleep" />
      <Stack.Screen component={Leave} name="leave" />
      <Stack.Screen component={LeaveAdd} name="leave-add" />
      <Stack.Screen component={LeaveDetails} name="leave-details" />
      <Stack.Screen component={ApprovalTab} name="approval-request" />
      <Stack.Screen component={PkwtScreen} name="pkwt" />
      <Stack.Screen component={PkwtDetailScreen} name="pkwt-detail" />
      <Stack.Screen component={Other} name="others" />
      {/* create hazard report */}
      <Stack.Screen component={Hazard} name="hazard" />
      <Stack.Screen component={DetailHazard} name="hazard-details" />
      {/* action hazard report */}
      <Stack.Screen component={HazardAction} name="hazard-action" />
      <Stack.Screen
        component={DetailHazardAction}
        name="hazard-action-details"
      />
      {/* request And report */}
      <Stack.Screen component={RequestScreen} name="request" />
      <Stack.Screen component={HazardReport} name="hazard-report" />
      <Stack.Screen
        component={HazardReportDetails}
        name="hazard-report-details"
      />
      <Stack.Screen component={InspectionReport} name="inspection-report" />

      {/* settings */}
      <Stack.Screen component={ChangePassword} name="change-password" />
      <Stack.Screen component={ChangePassword} name="edit-profile" />
      <Stack.Screen component={Profile} name="my-profile" />
      <Stack.Screen component={ChangePassword} name="term-condition" />
      <Stack.Screen component={ChangePassword} name="privacy-policy" />
      {/* Notifications */}
      <Stack.Screen component={Notification} name="notif-list" />
      {/* inspection card */}
      <Stack.Screen component={Inspection} name="inspection" />
      <Stack.Screen component={InspectionDetail} name="inspection-detail" />
      <Stack.Screen component={InspectionForm} name="inspection-form" />

      {/* pkwt */}
      {/* <Stack.Screen component={Notification} name="notif-list" /> */}
    </Stack.Navigator>
  );
};

export default HomeBase;
