import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VStack} from 'native-base';
import moment from 'moment';
import Input from '@components/input.component';
import {Controller, useForm} from 'react-hook-form';
import SelectField from '@components/select.component';
import Calendar from '@components/calendar-picker.components';
import ImagePicker from '@components/image-picker.component';
import {useGetProfileQuery} from '@slices/user.slice';
import {useAddLeaveMutation, useGetLeaveTypeQuery} from '@slices/leave.slice';
import Loading from '../../../components/loading.component';
import {useGetTeamQuery} from '../../../../applications/slices/user.slice';
import Alert from '../../../components/alert.component';

const LeaveAdd = () => {
  const [tipe, setTipe] = useState('');
  const [start, setStart] = useState(new Date());
  const [alert, setAlert] = useState({
    show: false,
    type: 'error',
    title: 'sukses',
    message: 'ssdsssssss',
    quote: 'sssssasasa',
    onOK: () => {
      setAlert({...alert, show: false});
    },
    onDissmiss: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm();
  const [note, setNote] = useState('');
  const [backDate, setBackdate] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [postLeave, {result, isLoading: postLoading}] = useAddLeaveMutation();

  const {data: users} = useGetProfileQuery();
  const {data: leave_type, isLoading} = useGetLeaveTypeQuery();
  const {data: team} = useGetTeamQuery();

  const submitForm = data => {
    var form = new FormData();
    form.append('attachment', {
      uri: data.attachment.path,
      type: data.attachment.mime, // or photo.type
      name: data.attachment.filename,
    });
    form.append('s_date', moment(data.date.start).format('YYYY-MM-DD'));
    form.append('e_date', moment(data.date.end).format('YYYY-MM-DD'));
    form.append('leave_type_id', data.leave_type);
    form.append('tot_day', data.tot_day);
    form.append('note', data.note);
    form.append('approver_note', '');
    form.append('caretaker', data.caretaker);
    form.append('status', 'CREATED');

    postLeave(form).then(({data}) => {
      if (data.success) {
        setAlert({
          show: true,
          type: 'success',
          title: 'Pengajuan Ijin berhasil',
          message:
            'Pengajuan Berhasil, silahkan menunggu konfirmasi dari atasan anda',
          quote: false,
          onOK: () => {
            setAlert({show: false});
            reset();
            setValue('attachment', null);
          },
        });
      }
    });
  };

  useEffect(() => {
    let tgl = watch('date');

    if (tgl?.start) {
      if (tgl?.end) {
        var a = moment(tgl.start);
        var b = moment(tgl.end);
        var jum = b.diff(a, 'day') + 1;
        setValue('tot_day', String(jum));
      } else {
        setValue('tot_day', '1');
      }
    }
  }, [watch('date')]);

  return (
    <VStack className="px-5 pt-3 bg-[#fafafa] flex-1">
      {postLoading && <Loading />}

      <Alert
        visible={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        quote={alert.quote}
        onOk={alert.onOK}
        onDissmiss={alert.onDissmiss}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="flex-1" space={5}>
          <VStack className="px-4 py-2 bg-white rounded-md border border-primary-100">
            <Text
              style={{fontFamily: 'Inter-Regular'}}
              className="text-primary-950 text-xs">
              Kuota Cuti Tahunan
            </Text>
            {users?.leaves?.length > 0 ? (
              <View className="py-2">
                {users.leaves.map((data, key) => (
                  <Text
                    key={key}
                    style={{fontFamily: 'Inter-SemiBold'}}
                    className="text-primary-950 text-xs">
                    {data.available} hari, berlaku hingga{' '}
                    {moment(data.exp_date, 'YYYY-MM-DD').format('DD-MM-YYYY')}{' '}
                    (Cuti {data.year})
                  </Text>
                ))}
              </View>
            ) : (
              <Text
                style={{fontFamily: 'Inter-Medium'}}
                className="text-primary-950 text-center py-2 text-xs">
                tidak ada
              </Text>
            )}
          </VStack>

          <VStack>
            <Controller
              name="leave_type"
              control={control}
              render={({field: {onChange, value}}) => (
                <SelectField
                  label="Jenis ijin/Cuti"
                  option={leave_type}
                  labelField="value"
                  valueField="id"
                  onChange={data => {
                    onChange(data.id);
                  }}
                  value={value}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'pilih salah satu',
                },
              }}
            />
            {errors?.leave_type && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.leave_type.message}
              </Text>
            )}
          </VStack>

          <VStack>
            <Controller
              name="date"
              defaultValue={null}
              control={control}
              render={({field: {value}}) => (
                <Calendar
                  value={value}
                  range={true}
                  onChange={data => {
                    setValue('date', data);
                  }}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'harus diisi',
                },
              }}
            />
            {errors?.date && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.date.message}
              </Text>
            )}
          </VStack>

          <VStack>
            <Controller
              control={control}
              // defaultValue=""
              name="tot_day"
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Jumlah hari izin/cuti"
                  keyboardType="default"
                  value={value}
                  onChangeText={onChange}
                  editable={false}
                  maxLength={100}
                  title="Jumlah Hari"
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'harus diisi',
                },
              }}
            />
            {errors?.tot_day && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.tot_day.message}
              </Text>
            )}
          </VStack>

          <VStack>
            <Controller
              name="caretaker"
              control={control}
              render={({field: {onChange, value}}) => (
                <SelectField
                  label="Penanggung jawab sementara"
                  option={team}
                  labelField="name"
                  valueField="user_id"
                  onChange={data => {
                    onChange(data.user_id);
                  }}
                  value={value}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'pilih salah satu',
                },
              }}
            />
            {errors?.caretaker && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {errors.caretaker.message}
              </Text>
            )}
          </VStack>

          <Controller
            name="note"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="catatan untuk atasan"
                keyboardType="default"
                multiline={true}
                numberOfLines={5}
                value={value}
                onChangeText={onChange}
                inputStyle={{height: 70}}
                maxLength={100}
                title="Catatan"
              />
            )}
          />

          <Controller
            name="attachment"
            control={control}
            render={({field: {onChange, value}}) => (
              <ImagePicker
                value={value}
                onChange={data => setValue('attachment', data)}
                onDelete={() => setValue('attachment', null)}
              />
            )}
          />

          <TouchableOpacity
            onPress={handleSubmit(submitForm)}
            className="bg-green-500 p-3 justify-center items-center rounded-md mb-5">
            <Text
              className="text-lg text-white"
              style={{fontFamily: 'Inter-SemiBold'}}>
              Kirim Pengajuan
            </Text>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default LeaveAdd;
