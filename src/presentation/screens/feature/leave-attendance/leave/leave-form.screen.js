import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  VStack,
  ScrollView,
  KeyboardAvoidingView,
  HStack,
  Divider,
} from 'native-base';
import moment from 'moment';
import {Controller, set, useForm} from 'react-hook-form';
import Input from '@components/input.component';
import SelectField from '@components/select.component';
import Calendar from '@components/calendar-picker.components';
import Loading from '@components/loading.component';
import Layout from '@components/layout.component';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useGetCutiKuotaQuery,
  useLazyGetCutiKuotaQuery,
  useApplyLeaveMutation,
} from '@slices/pkwt.slice';
import Icon from 'react-native-vector-icons/Ionicons';
import {leaveFormSchema} from '@schema/leave-form.schema';
import {useAlert} from '../../../../../applications/hooks/useAlert';
import {navigate} from '../../../../../applications/utils/RootNavigation';

const LeaveForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(leaveFormSchema),
  });

  const [
    applyLeave,
    {result, isLoading, error: postError, isError, isSuccess},
  ] = useApplyLeaveMutation();

  const {
    data: kuotaCuti,
    error: errKuota,
    isLoading: loadCuti,
  } = useGetCutiKuotaQuery({
    date: moment().format('YYYY-MM-DD'),
  });
  const [getKuota, {data: kuota, isLoading: loadKuota}] =
    useLazyGetCutiKuotaQuery();
  const startDateDef = {
    disabled: true,
    backDate: true,
    minDate: null,
    initialDate: null,
    type: null,
  };
  const [startDate, setStartDate] = useState(startDateDef);
  const endDateDef = {
    disabled: true,
    backDate: true,
    minDate: null,
    initialDate: null,
    maxDate: null,
  };
  const [endDate, setEndDate] = useState(endDateDef);

  const {showAlert} = useAlert();
  const submitForm = data => {
    applyLeave(data);
  };

  useEffect(() => {
    if (postError) {
      showAlert({
        visible: true,
        type: 'error',
        title: 'Pengajuan Gagal',
        message:
          postError?.message ||
          'Terjadi kesalahan, silahkan coba lagi atau hubungi administrator',
      });
    }
    if (isSuccess) {
      showAlert({
        visible: true,
        type: 'success',
        title: 'Pengajuan Berhasil',
        message: 'Pengajuan cuti berhasil dikirim',
        onOk: () => {
          navigate('leave-history');
        },
      });
      reset();
    }
  }, [postError, isSuccess]);

  const getKuotaByDate = async date => {
    try {
      setValue('dateTo', null);
      if (startDate.type == 'CP') {
        const result = await getKuota({date: date}).unwrap();
        if (result?.estimation?.usable >= 1) {
          showAlert({
            visible: true,
            type: 'success',
            title: 'Kuota Cuti Tersedia',
            message: `Kuota cuti yang tersedia pertanggal ${date} adalah ${result?.estimation?.usable} hari`,
          });
        } else {
          showAlert({
            visible: true,
            type: 'error',
            title: 'Kuota Cuti Tidak Tersedia',
            message: `Maaf, kuota cuti yang tersedia pertanggal ${date} adalah ${result?.estimation?.usable} hari, silahkan pilih tanggal lain`,
          });
        }
        const max =
          result?.estimation?.rosterMax < result?.estimation?.usable
            ? result?.estimation?.rosterMax
            : result?.estimation?.usable;
        setEndDate({
          disabled: false,
          backDate: true,
          minDate: date,
          initialDate: date,
          maxDate: moment(date)
            .add(max - 1, 'days')
            .format('YYYY-MM-DD'),
        });
      } else {
        setEndDate({
          disabled: false,
          backDate: true,
          minDate: date,
          initialDate: date,
          maxDate: moment(date)
            .add(kuotaCuti?.estimation?.rosterMax - 1, 'days')
            .format('YYYY-MM-DD'),
        });
      }
    } catch (err) {
      showAlert({
        visible: true,
        type: 'error',
        title: 'Kuota Cuti Tidak Tersedia',
        message: `Maaf, Terjadi Kesalahan, silahkan coba lagi atau hubungi administrator`,
      });
    }
  };

  return (
    <Layout>
      <VStack px={5} className="h-full flex-1">
        {(isLoading || loadCuti || loadKuota) && <Loading />}
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 my-5">
            <VStack className="flex-1" space={5}>
              <VStack className="bg-white p-3 rounded-md border-primary-100 border">
                <HStack space={2} alignItems="center">
                  <Icon name="calendar-outline" size={20} color="#000" />
                  <Text
                    className="font-semibold text-black"
                    style={{fontFamily: 'OpenSans-SemiBold'}}>
                    Informasi Kuota Cuti
                  </Text>
                </HStack>
                <Divider my={2} />
                <HStack className="justify-between items-center my-2">
                  <Text
                    className="text-xs text-black"
                    style={{fontFamily: 'OpenSans-SemiBold'}}>
                    Kuota Cuti Hari ini ({moment().format('DD MMM YYYY')}):
                  </Text>
                  <Text
                    className="text-sm text-black"
                    style={{fontFamily: 'OpenSans-Bold'}}>
                    {kuotaCuti?.estimation?.usable} Hari
                  </Text>
                </HStack>
                <HStack className="justify-between items-center my-2">
                  <Text
                    className="text-xs text-black"
                    style={{fontFamily: 'OpenSans-SemiBold'}}>
                    Maksimum Pengajuan Cuti :
                  </Text>
                  <Text
                    className="text-sm text-black"
                    style={{fontFamily: 'OpenSans-Bold'}}>
                    {kuotaCuti?.estimation?.rosterMax} Hari
                  </Text>
                </HStack>
                <Divider my={1} />
                <Text
                  className="text-[10px] text-justify text-black"
                  style={{fontFamily: 'OpenSans-Regular'}}>
                  * Kuota cuti diatas adalah kuota perhari ini, silahkan pilih
                  tanggal mulai cuti, untuk melihat kuota cuti pada tanggal
                  tersebut
                </Text>
              </VStack>
              <Text
                className="text-sm text-black"
                style={{fontFamily: 'OpenSans-SemiBold'}}>
                Detail Pengajuan Cuti
              </Text>
              <Controller
                name="absence_type_id"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.absence_type_id}
                    label="Jenis Cuti"
                    option={kuotaCuti?.absenceTypes || []}
                    placeholder="Pilih Jenis Cuti"
                    labelField="name"
                    valueField="id"
                    onChange={data => {
                      onChange(data.id);
                      setValue('dateFrom', null);
                      setValue('dateTo', null);
                      setValue('totalDay', 0);
                      setEndDate(endDateDef);
                      if (data.code == 'CE') {
                        setStartDate({
                          disabled: false,
                          backDate: true,
                          minDate: null,
                          initialDate: null,
                          type: 'CE',
                        });
                      } else if ((data.code = 'CP')) {
                        setStartDate({
                          disabled: false,
                          backDate: true,
                          minDate: moment().add(7, 'days').format('YYYY-MM-DD'),
                          initialDate: moment()
                            .add(7, 'days')
                            .format('YYYY-MM-DD'),
                          type: 'CP',
                        });
                      }
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                name="dateFrom"
                defaultValue={null}
                control={control}
                render={({field: {value, onChange}}) => (
                  <Calendar
                    error={errors?.due_date}
                    label="Tanggal Mulai Cuti"
                    value={value}
                    range={false}
                    backDate={startDate.backDate}
                    minDate={startDate.minDate}
                    disabled={startDate.disabled}
                    initialDate={startDate.initialDate}
                    onChange={data => {
                      onChange(data);
                      getKuotaByDate(data);
                    }}
                  />
                )}
              />
              <Controller
                name="dateTo"
                defaultValue={null}
                control={control}
                render={({field: {value, onChange}}) => (
                  <Calendar
                    error={errors?.due_date}
                    label="Tanggal Selesai Cuti"
                    value={value}
                    range={false}
                    backDate={endDate.backDate}
                    minDate={endDate.minDate}
                    maxDate={endDate.maxDate}
                    disabled={endDate.disabled}
                    initialDate={endDate.initialDate}
                    onChange={data => {
                      onChange(data);
                      setValue(
                        'totalDay',
                        moment(data).diff(watch('dateFrom'), 'days') + 1,
                      );
                    }}
                  />
                )}
              />
              <Controller
                name="totalDay"
                control={control}
                render={({field: {value, onChange}}) => (
                  <Input
                    placeholder="Jumlah Hari Cuti"
                    keyboardType="default"
                    editable={false}
                    value={value ? String(value) : '0'}
                    onChangeText={onChange}
                    title="Jumlah Hari Cuti"
                    error={errors?.totalDay}
                  />
                )}
              />
              <Controller
                name="note"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Catatan"
                    keyboardType="default"
                    multiline={true}
                    numberOfLines={5}
                    value={value}
                    onChangeText={onChange}
                    inputStyle={{height: 70}}
                    maxLength={100}
                    title="Catatan"
                    error={errors?.note}
                  />
                )}
              />
            </VStack>
          </ScrollView>
          <TouchableOpacity
            onPress={handleSubmit(submitForm)}
            className="bg-green-500 p-3 py-2 justify-center items-center rounded-md mb-5">
            <Text
              className="text-sm text-white"
              style={{fontFamily: 'Inter-Bold'}}>
              Kirim Pengajuan Cuti
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </VStack>
    </Layout>
  );
};

export default LeaveForm;
