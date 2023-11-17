import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {HStack, Select, VStack} from 'native-base';
import Empty from '@components/empty.comnponent';
import Loading from '@components/loading.component';
import {useFocusEffect} from '@react-navigation/native';
import {useLazyGetLeaveRequestQuery} from '@slices/leave.slice';
import RequestCard from '@components/request-card.component';
import RejectAlert from '../../../../components/alert.component';
import Alert from '../../../../components/alert.component';
import {useUpdateLeaveMutation} from '@slices/leave.slice';

const ApprovalOvertimeNew = ({navigation}) => {
  const [trigger, result, lastPromiseInfo] = useLazyGetLeaveRequestQuery();
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, [navigation]),
  );
  const [reject, setReject] = useState(false);
  const [accept, setAccept] = useState(false);
  const [note, setNote] = useState('');
  const [errText, setErrText] = useState(false);

  const [updateStatus, {result: res, isLoading: cancelLoading}] =
    useUpdateLeaveMutation();
  const [confirmAlert, setConfirmAlert] = useState({
    show: false,
    title: 'setujui pengajuan',
    message: '',
    onOk: () => {},
  });
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    title: 'Pengajuan dibatalkan',
    message: 'Pengajuan Anda telah dibatalkan',
    quote: '',
    onOK: () => {
      setAlert({...alert, show: false});
    },
    onDissmiss: false,
  });

  const updateAction = body => {
    setConfirmAlert({...confirmAlert, show: false});
    console.log(note);
    updateStatus({...body, approver_note: note}).then(({data}) => {
      if (data.success) {
        setAlert({
          show: true,
          type: 'success',
          title:
            body.status == '1' ? 'Pengajuan Disetujui' : 'Pengajuan ditolak',
          message:
            body.status == '1'
              ? 'Pengajuan telah di setujui dan akan masuk ke tahap HR review'
              : 'Pengajuan telah di batalkan',
          quote: false,
          onOK: () => {
            setAlert({show: false});
            trigger();
          },
        });
      } else {
        setAlert({
          show: true,
          type: 'error',
          title: 'Error',
          message: 'Terjadi Kesalahan',
          quote: false,
          data: {status: '', id: 0},
        });
      }
    });
  };

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1">
      <RejectAlert
        visible={confirmAlert.show}
        type={'warning'}
        onChangeText={text => {
          setNote(text);
        }}
        onDissmiss={() => setConfirmAlert({...confirmAlert, show: false})}
        onOk={() => {
          if (note != '') {
            updateAction(confirmAlert.data);
          }
        }}
        errText={note == '' ? true : false}
        title={confirmAlert.title}
        message={confirmAlert.message}
      />

      <Alert
        visible={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        quote={alert.quote}
        onOk={alert.onOK}
        onDissmiss={alert.onDissmiss}
      />
      {result.isLoading || cancelLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={result?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <RequestCard
              data={item}
              onAccept={() => {
                setNote('');
                setConfirmAlert({
                  ...confirmAlert,
                  show: true,
                  title: 'Setujui pengajuan',
                  message: 'anda yakin akan menyetujui pengajuan.?',
                  data: {status: '1', id: item.id},
                });
              }}
              onReject={() => {
                setNote('');
                setConfirmAlert({
                  ...confirmAlert,
                  show: true,
                  title: 'Tolak pengajuan',
                  message: 'anda yakin akan menolak pengajuan.?',
                  data: {status: '3', id: item.id},
                });
              }}
            />
          )}
          ListEmptyComponent={<Empty />}
          ListFooterComponent={
            result?.data?.length > 0 && (
              <TouchableOpacity className="mb-10 mt-5">
                <HStack className="flex-1 justify-center">
                  <Text
                    style={{fontFamily: 'OpenSans-Bold'}}
                    className="text-primary-950/70">
                    Tampilkan lebih banyak
                  </Text>
                </HStack>
              </TouchableOpacity>
            )
          }
        />
      )}
    </VStack>
  );
};

export default ApprovalOvertimeNew;
