import {Text, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import DetailValue from '@components/detail-value.component';
import DetailImage from '@components/detail-image.component';
import Layout from '@components/layout.component';
import Loading from '@components/loading.component';
import {useGetHazardActionDetailsQuery} from '@slices/hazard.slice';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import SelectField from '@components/select.component';
import {z} from 'zod';
import Alert from '@components/alert.component';
import ErrorAlert from '@components/alert.component';
import Input from '@components/input.component';
import ImagePicker from '@components/image-picker.component';
import {useSetActionMutation} from '@slices/hazard.slice';
import {navigate} from '@utils/RootNavigation';
import moment from 'moment';

const DetailHazardAction = ({route}) => {
  const {id, type} = route.params;
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

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(
      z
        .object({
          action_status: z.string({
            required_error: 'Pilih Status',
          }),
          action_note: z.string().optional(),
          action_attachment: z.any().refine(
            data => {
              if (!data || data.length === 0) {
                return false;
              }
              return true;
            },
            {
              message: 'Lampiran tidak boleh kosong',
            },
          ),
        })
        .refine(
          data => {
            if (data.action_status == 'PENDING' && !data.action_note) {
              return false;
            }
            return true;
          },
          {
            message:
              'Lokasi lainnya harus diisi jika anda memilih lokasi lainnya',
            path: ['action_note'],
          },
        ),
    ),
  });

  const {data, isLoading} = useGetHazardActionDetailsQuery(id);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [
    postAction,
    {postResult, isLoading: postLoading, error: postError, isError, isSuccess},
  ] = useSetActionMutation();

  console.log('data', data?.status);

  const sendingData = e => {
    // postPIC({id, body: e});
    const formdata = new FormData();
    formdata.append('action_status', e.action_status);
    formdata.append('action_note', e?.action_note ?? '');
    var nama = e.action_attachment.path.split('/');
    formdata.append('action_attachment', {
      uri: e.action_attachment.path,
      type: e.action_attachment.mime,
      name: nama[nama.length - 1],
    });
    formdata.append('id_action', data?.hazard_action?.id);
    postAction(formdata);
  };

  useEffect(() => {
    if (postError) {
      setError(true);
    }
    if (isSuccess) {
      setSuccess(true);
      reset();
    }
  }, [postError, isSuccess]);

  console.log(postResult, postError, isSuccess, isError);

  if (isLoading || postLoading) return <Loading />;
  return (
    <Layout>
      <Alert
        visible={success}
        type={'success'}
        title="Berhasil"
        message="Hazard Report : Status Telah di Update"
        onOk={() => {
          setSuccess(false);
          navigate('hazard-action');
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
      <View className="px-5 pt-2">
        <Header back={true} title="Hazard Report Details" />
      </View>
      <VStack px={5} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} pb={5}>
            <DetailValue
              label="nomor hazard report"
              value={data.hazard_report_number}
            />
            <DetailValue
              label="Kategori"
              value={
                data.category == 'KTA'
                  ? 'Kondisi Tidak Aman'
                  : 'Tindakan Tidak Aman'
              }
            />
            <DetailValue
              label="Lokasi Temuan"
              value={
                data.id_location == '999'
                  ? data.other_location
                  : data.location.location
              }
            />
            <DetailValue
              label="Detail Lokasi Temuan"
              value={
                data.id_location == '999'
                  ? data.other_location
                  : data.location.location
              }
            />
            <Text>Detail Laporan</Text>
            <DetailValue
              label="kondisi temuan"
              value={data.reported_condition}
            />
            <DetailValue
              label="rekomendasi tindakan"
              value={data.recomended_action}
            />
            <DetailValue
              label="Tindakan yang diambil"
              value={data.action_taken}
            />
            <DetailImage source={data.report_attachment} />
            <DetailValue label="Batas Waktu Pengerjaan" value={data.due_date} />
            <Text>Detail Pelapor</Text>
            <DetailValue label="Nama" value={data.created_by.profile.name} />
            <DetailValue
              label="Nomer Registrasi Pekerja"
              value={data.created_by.employee.nip}
            />
            <DetailValue
              label="Departement"
              value={data.created_by.employee.division?.division}
            />

            {data?.status == 'CLOSED' ? (
              <>
                <Text>Tindakan Perbaikan</Text>
                <DetailValue
                  label="Status Perbaikan"
                  value={data.hazard_action.status}
                />
                <DetailImage source={data.hazard_action.attachment} />
                <DetailValue
                  label="Tanggal Selesai"
                  value={moment(data.hazard_action.updated_at).format(
                    'YYYY-MM-DD',
                  )}
                />
                <DetailValue
                  label="Keterangan"
                  value={data.hazard_action?.notes ?? '-'}
                />
              </>
            ) : (
              <>
                <Text>Tindakan Penanganan</Text>
                <Controller
                  name="action_status"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <SelectField
                      error={errors?.action_status}
                      label="Status Perbaikan"
                      placeholder="Pilih Status perbaikan"
                      option={[
                        {id: 'DONE', name: 'SELESAI'},
                        {id: 'PENDING', name: 'PENDING'},
                      ]}
                      labelField="name"
                      valueField="id"
                      onChange={data => {
                        onChange(data.id);
                        setValue('action_status', data.id);
                      }}
                      value={value}
                    />
                  )}
                />
                <Controller
                  name="action_note"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="Catatan Perbaikan"
                      keyboardType="default"
                      multiline={true}
                      numberOfLines={5}
                      value={value}
                      onChangeText={onChange}
                      inputStyle={{height: 70}}
                      maxLength={100}
                      title="Catatan Perbaikan"
                      error={errors?.action_note}
                    />
                  )}
                />
                <Controller
                  name="action_attachment"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <ImagePicker
                      error={errors?.action_attachment}
                      label="Foto Perbaikan"
                      value={value}
                      crop={true}
                      type="both"
                      onChange={data => {
                        onChange(data);
                      }}
                      onDelete={() => onChange(undefined)}
                    />
                  )}
                />
              </>
            )}
          </VStack>
        </ScrollView>
        {data?.status != 'CLOSED' && (
          <VStack className="py-5 pb-8">
            <Button onPress={handleSubmit(sendingData)}>
              <Text
                className="text-white capitalize"
                style={{fontFamily: 'OpenSans-Bold'}}>
                Update status perbaikan
              </Text>
            </Button>
          </VStack>
        )}
      </VStack>
    </Layout>
  );
};

export default DetailHazardAction;
