import {Text, ScrollView, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import DetailValue from '@components/detail-value.component';
import DetailImage from '@components/detail-image.component';
import Layout from '@components/layout.component';
import Loading from '@components/loading.component';
import {
  useGetHazardDetailsQuery,
  useSetPICMutation,
} from '@slices/hazard.slice';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import SelectField from '../../../components/select.component';
import {z} from 'zod';
import {useSearchPicQuery} from '../../../../applications/slices/user.slice';

import Alert from '@components/alert.component';
import ErrorAlert from '@components/alert.component';

const HazardReportDetails = ({route}) => {
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

  const [
    postPIC,
    {postResult, isLoading: postLoading, error: postError, isError, isSuccess},
  ] = useSetPICMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(
      z.object({
        pic: z.number({
          required_error: 'Pilih Person in Charge',
        }),
      }),
    ),
  });

  const {data, isLoading} = useGetHazardDetailsQuery(id);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {data: dataPic, isLoading: isLoadingPic} = useSearchPicQuery({
    name: search,
  });

  const sendingData = e => {
    postPIC({id, body: e});
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
        message="Hazard Report : PIC Telah di Tugaskan"
        onOk={() => {
          setSuccess(false);
          navigate('hazard-report');
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
        <Header
          back={true}
          title="Hazard Report Details"
          rightIcon={
            <View
              className={`py-1 px-3 ${
                data.status == 'OPEN'
                  ? 'bg-red-500'
                  : data.status == 'ONPROGRESS'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              } rounded-sm text-white`}>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Inter-ExtraBold'}}>
                {data.status}
              </Text>
            </View>
          }
        />
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
            <Text>Departement Terkait</Text>
            <DetailValue label="Perusahaan" value={data.company.company} />
            <DetailValue label="Project" value={data.project.name} />
            <DetailValue label="Departement" value={data.division.division} />
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
            {type == 'reviewer' && (
              <>
                <Text>Detail Pelapor</Text>
                <DetailValue
                  label="Nama"
                  value={data.created_by.profile.name}
                />
                <DetailValue
                  label="Nomer Registrasi Pekerja"
                  value={data.created_by.employee.nip}
                />
                <DetailValue
                  label="Departement"
                  value={data.created_by.employee.division?.division}
                />
              </>
            )}
            <Text>Tindakan Penanganan</Text>

            {data?.hazard_action ? (
              <>
                <DetailValue
                  label="Person In Charge"
                  value={data.hazard_action.pic.profile.name}
                />
                <DetailValue
                  label="Nomer Registrasi Pekerja"
                  value={data.hazard_action.pic.employee.nip}
                />
                <DetailValue
                  label="Jabatan"
                  value={data.hazard_action.pic.employee.position.position}
                />
              </>
            ) : (
              <Controller
                name="pic"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    error={errors?.pic}
                    label="Person in Charge"
                    placeholder="Pilih Person in Charge"
                    onChangeSearch={data => {
                      if (data.length > 2) {
                        setSearch(data);
                      } else {
                        setSearch('');
                      }
                    }}
                    option={dataPic}
                    labelField="name"
                    additionalLabel="position"
                    valueField="id"
                    searchPlaceHolder="ketikkan minimal 3 karakter untuk mencari"
                    onChange={data => {
                      onChange(data.id);
                      setValue('pic', data.id);
                    }}
                    value={value}
                  />
                )}
              />
            )}
          </VStack>
        </ScrollView>
        {!data?.hazard_action && (
          <VStack className="py-5 pb-8">
            <Button onPress={handleSubmit(sendingData)}>
              <Text
                className="text-white"
                style={{fontFamily: 'OpenSans-Bold'}}>
                TENTUKAN PIC
              </Text>
            </Button>
          </VStack>
        )}
      </VStack>
    </Layout>
  );
};

export default HazardReportDetails;
