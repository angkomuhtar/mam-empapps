import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {VStack, ScrollView, KeyboardAvoidingView} from 'native-base';
import moment from 'moment';
import {Controller, useForm} from 'react-hook-form';
// slices
import {useAddLeaveMutation, useGetLeaveTypeQuery} from '@slices/leave.slice';
// component
import Input from '@components/input.component';
import SelectField from '@components/select.component';
import Calendar from '@components/calendar-picker.components';
import ImagePicker from '@components/image-picker.component';
import Loading from '@components/loading.component';
import Alert from '@components/alert.component';
import ErrorAlert from '@components/alert.component';
import Layout from '@components/layout.component';
import {zodResolver} from '@hookform/resolvers/zod';
import {hazardSchema} from '../../../../applications/schema/hazard.schema';
import {
  useGetCompanyQuery,
  useGetHazardLocationQuery,
  useLazyGetDivisionQuery,
  useLazyGetProjectQuery,
} from '@slices/master.slice';
import {useSetHazardMutation} from '@slices/hazard.slice';
import {navigate} from '@utils/RootNavigation';

const AddHazard = () => {
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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showInput, setShowInput] = useState({
    other_location: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(hazardSchema),
  });

  const {data: company} = useGetCompanyQuery();
  const [getDivision, {data: division}] = useLazyGetDivisionQuery();
  const [getProject, {data: project}] = useLazyGetProjectQuery();
  const [
    postHazard,
    {result, isLoading, error: postError, isError, isSuccess},
  ] = useSetHazardMutation();

  const {data: lokasi, isSuccess: loaksisukses} = useGetHazardLocationQuery();
  const submitForm = data => {
    var form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'report_attachment') {
          var nama = data.report_attachment.path.split('/');
          form.append('report_attachment', {
            uri: data.report_attachment.path,
            type: data.report_attachment.mime, // or photo.type
            name: nama[nama.length - 1],
          });
        } else {
          form.append(key, value);
        }
      }
    });
    postHazard(form);
  };

  const kategory = [
    {id: 'TTA', value: 'Tindakan Tidak Aman'},
    {id: 'KTA', value: 'Kondisi Tidak Aman'},
  ];

  useEffect(() => {
    if (postError) {
      setError(true);
      console.log('error While POST', postError);
    }
    if (isSuccess) {
      setSuccess(true);
      reset();
    }
  }, [postError, isSuccess]);

  return (
    <Layout>
      <VStack px={5} className="h-full flex-1">
        {isLoading && <Loading />}
        <Alert
          visible={success}
          type={'success'}
          title="Berhasil"
          message="Hazard Report berhasil di kirim, Departemen terkait akan segera menindaklanjuti"
          onOk={() => {
            setSuccess(false);
            navigate('hazard-list');
          }}
        />
        <ErrorAlert
          visible={error}
          type="error"
          message="Terjadi kesalahan"
          title="Error"
          onOk={() => {
            setError(false);
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 my-5">
            <VStack className="flex-1" space={5}>
              <Text
                className="text-sm text-black"
                style={{fontFamily: 'OpenSans-SemiBold'}}>
                Lokasi
              </Text>
              <Controller
                name="id_location"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.id_location}
                    label="Lokasi Temuan Bahaya"
                    option={lokasi}
                    labelField="location"
                    valueField="id"
                    onChange={data => {
                      setShowInput({
                        ...showInput,
                        other_location: data.id === 999,
                      });
                      onChange(data.id);
                    }}
                    value={value}
                  />
                )}
              />

              {showInput.other_location && (
                <Controller
                  name="other_location"
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      error={errors?.other_location}
                      placeholder="lokasi lainnya"
                      keyboardType="default"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      maxLength={100}
                      title="Lokasi Lainnya"
                    />
                  )}
                />
              )}
              <Controller
                name="detail_location"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Deskripsi Lokasi Bahaya"
                    keyboardType="default"
                    multiline={true}
                    numberOfLines={5}
                    value={value}
                    onChangeText={onChange}
                    inputStyle={{height: 70}}
                    maxLength={100}
                    title="Detail Lokasi"
                    error={errors?.detail_location}
                  />
                )}
              />
              <Text
                className="text-sm text-black"
                style={{fontFamily: 'OpenSans-SemiBold'}}>
                Departement Penangggung Jawab
              </Text>
              <Controller
                name="company_id"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.company_id}
                    label="Perusahaan"
                    option={company}
                    labelField="company"
                    valueField="id"
                    onChange={data => {
                      console.log(data);

                      onChange(data.id);
                      getDivision(data.id);
                      getProject(data.id);
                      setValue('project_id', undefined);
                      setValue('dept_id', undefined);
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                name="project_id"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.project_id}
                    label="Project"
                    option={project}
                    labelField="name"
                    valueField="id"
                    onChange={data => {
                      onChange(data.id);
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                name="dept_id"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.dept_id}
                    label="Departement"
                    option={division}
                    labelField="division"
                    valueField="id"
                    onChange={data => {
                      onChange(data.id);
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.category}
                    label="kategori laporan"
                    option={kategory}
                    labelField="value"
                    valueField="id"
                    onChange={data => {
                      onChange(data.id);
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="reported_condition"
                render={({field: {onChange, value}}) => (
                  <Input
                    error={errors?.reported_condition}
                    placeholder="Kondisi/Perilaku Bahaya yang ditemukan"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    maxLength={100}
                    title="Kondisi/Perilaku Bahaya"
                  />
                )}
              />
              <Controller
                control={control}
                name="recomended_action"
                render={({field: {onChange, value}}) => (
                  <Input
                    error={errors?.recomended_action}
                    placeholder="Rekomendasi Tindakan"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    maxLength={100}
                    title="Rekomendasi Tindakan"
                  />
                )}
              />
              <Controller
                control={control}
                name="action_taken"
                render={({field: {onChange, value}}) => (
                  <Input
                    error={errors?.action_taken}
                    placeholder="Tindakan yang dilakukan saat ini"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    maxLength={100}
                    title="Tindakan yang dilakukan"
                  />
                )}
              />
              <Controller
                name="report_attachment"
                control={control}
                render={({field: {onChange, value}}) => (
                  <ImagePicker
                    type="both"
                    crop={true}
                    error={errors?.report_attachment}
                    label="Foto Temuan"
                    value={value}
                    onChange={data => {
                      console.log('data', data);

                      onChange(data);
                    }}
                    onDelete={() => onChange(undefined)}
                  />
                )}
              />
              <Controller
                name="due_date"
                defaultValue={null}
                control={control}
                render={({field: {value, onChange}}) => (
                  <Calendar
                    error={errors?.due_date}
                    label="Batas waktu penyelesaian"
                    value={value}
                    range={false}
                    backDate={true}
                    onChange={onChange}
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
              Kirim Laporan
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </VStack>
    </Layout>
  );
};

export default AddHazard;
