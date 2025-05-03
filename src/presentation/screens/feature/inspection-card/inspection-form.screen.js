import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import Header from '@components/navigation/header.component';
import {Button, VStack} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import Input from '@components/input.component';
import SelectField from '@components/select.component';
import {useGetProfileQuery} from '@slices/user.slice';
import Calendar from '@components/calendar-picker.components';
import {useGetHazardLocationQuery} from '@slices/master.slice';
import Alert from '@components/alert.component';
import ErrorAlert from '@components/alert.component';
import {
  useGetInspectQuestionQuery,
  useSendInspectionMutation,
} from '../../../../applications/slices/inspection.slice';
import Loading from '../../../components/loading.component';
import {navigate} from '../../../../applications/utils/RootNavigation';

const InspectionForm = ({route}) => {
  const {type, name, inspect_id} = route.params;

  const {data: users} = useGetProfileQuery();
  const {data: question} = useGetInspectQuestionQuery({type: type});
  const [submit, {isLoading, isSuccess, isError, data: PostResult, error}] =
    useSendInspectionMutation();

  // console.log('question', question);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm({});

  const submitForm = data => {
    console.log(data);
    submit({...data, inspection_id: inspect_id});
  };

  console.log('result', PostResult, isError, error);

  const shift = [
    {id: 'night', value: 'Malam'},
    {id: 'day', value: 'Pagi'},
  ];

  const {data: lokasi, isSuccess: lokasiSukses} = useGetHazardLocationQuery();
  const [selectedLoc, setSelectedLoc] = useState(false);
  const [fieldSelected, setFieldSelected] = useState({});

  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setPostSuccess(true);
    }
    if (isError) {
      setPostError(true);
    }
    if (PostResult) {
      reset();
    }
  }, [isSuccess, isError, PostResult]);

  return (
    <Layout>
      <VStack className="px-5 pt-2 flex-1">
        {isLoading && <Loading />}
        <Alert
          visible={postSuccess}
          type={'success'}
          title="Berhasil"
          message="Inspection Card Berhasil di buat"
          onOk={() => {
            setPostSuccess(false);
            navigate('inspection-history');
          }}
        />
        <ErrorAlert
          visible={postError}
          type="error"
          message="Terjadi kesalahan"
          title="Error"
          onOk={() => {
            setPostError(false);
          }}
        />
        <Header back={true} title={`Kartu Inspeksi ${name}`} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={2}>
            <Input
              keyboardType="default"
              editable={false}
              value={users.profile.name}
              maxLength={100}
              title="Nama Pengawas"
            />
            <Input
              keyboardType="default"
              editable={false}
              value={users.employee.position.position}
              maxLength={100}
              title="Jabatan Pengawas"
            />

            <Controller
              name="shift"
              control={control}
              rules={{
                required: 'Shift tidak boleh kosong',
              }}
              render={({field: {onChange, value}}) => (
                <SelectField
                  error={errors?.shift}
                  label="Shift"
                  option={shift}
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
              name="date"
              defaultValue={null}
              control={control}
              rulese={{
                required: 'Tanggal tidak boleh kosong',
              }}
              render={({field: {value, onChange}}) => (
                <Calendar
                  error={errors?.date}
                  label="Tanggal Inspeksi"
                  value={value}
                  range={false}
                  backDate={false}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="id_location"
              control={control}
              rules={{
                required: 'Lokasi Inspeksi tidak boleh kosong',
              }}
              render={({field: {onChange, value}}) => (
                <SelectField
                  error={errors?.id_location}
                  label="Lokasi Inspeksi"
                  option={lokasi}
                  labelField="location"
                  valueField="id"
                  onChange={data => {
                    setSelectedLoc(data.id == '999');
                    onChange(data.id);
                  }}
                  value={value}
                />
              )}
            />

            {selectedLoc && (
              <Controller
                name="other_location"
                control={control}
                rules={{
                  required: 'Lokasi lainnya tidak boleh kosong',
                }}
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
              rules={{
                required: 'Detail Lokasi tidak boleh kosong',
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Deskripsi Lokasi"
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

            {question?.map((item, index) => (
              <VStack
                className="py-4 px-2 border border-gray-200 rounded-md"
                space={2}
                key={index}>
                <Text
                  className="text-sm text-black mb-2"
                  style={{fontFamily: 'OpenSans-SemiBold'}}>
                  {item.sub_inspection_name}
                </Text>
                {item.question.map((questList, i) => (
                  <View key={i}>
                    <Controller
                      name={questList.slug}
                      control={control}
                      rules={{
                        required: 'Silahan isi pertanyaan ini',
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <SelectField
                          error={errors?.[questList.slug]}
                          label={questList.question}
                          option={[
                            {id: 'yes', value: 'Sesuai'},
                            {id: 'no', value: 'Tidak Sesuai'},
                          ]}
                          labelField="value"
                          valueField="id"
                          onChange={data => {
                            onChange(data.id);
                            setFieldSelected({
                              ...fieldSelected,
                              [questList.slug]: data.id,
                            });
                          }}
                          value={value}
                        />
                      )}
                    />

                    {fieldSelected[questList.slug] == 'no' && (
                      <View className="px-2 flex-1 pt-2">
                        <Controller
                          name={`date_${questList.slug}`}
                          defaultValue={null}
                          control={control}
                          rules={{
                            required: 'Tanggal tidak boleh kosong',
                          }}
                          render={({field: {value, onChange}}) => (
                            <Calendar
                              error={errors?.[`date_${questList.slug}`]}
                              label="Due Date"
                              value={value}
                              range={false}
                              backDate={false}
                              onChange={onChange}
                            />
                          )}
                        />
                        <View className="h-2" />
                        <Controller
                          name={`note_${questList.slug}`}
                          control={control}
                          rules={{
                            required: 'Lokasi lainnya tidak boleh kosong',
                          }}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              error={errors?.[`note_${questList.slug}`]}
                              placeholder="Tindak lanjut"
                              keyboardType="default"
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              maxLength={100}
                              title="Tindak Lanjut"
                            />
                          )}
                        />
                      </View>
                    )}
                  </View>
                ))}
              </VStack>
            ))}

            <Controller
              name="recommendation"
              control={control}
              rules={{
                required: 'Tuliskan rekomendasi tindakan',
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Rekomendasi tindakan"
                  keyboardType="default"
                  multiline={true}
                  numberOfLines={5}
                  value={value}
                  onChangeText={onChange}
                  inputStyle={{height: 70}}
                  maxLength={100}
                  title="Tuliskan Rekomendasi Tindakan Perbaikan dari Hasil Inpeksi sebagai Tindak Lanjut Inspeski"
                  error={errors?.recommendation}
                />
              )}
            />
          </VStack>
          <View className="h-10" />
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
      </VStack>
    </Layout>
  );
};

export default InspectionForm;
