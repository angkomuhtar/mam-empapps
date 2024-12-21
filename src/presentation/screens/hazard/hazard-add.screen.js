import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VStack} from 'native-base';
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
import Layout from '../../components/layout.component';
import {ErrorMessage} from './hazard-components';

const HazardAdd = () => {
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
  const [showOtherLocation, setShowOtherLocation] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
    setValue,
  } = useForm();

  const {data: leave_type, isLoading} = useGetLeaveTypeQuery();

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

    if (data.lokasi_temuan === 'Lainnya') {
      form.append('other_location', data.other_location);
    }

    setAlert({
      show: true,
      type: 'success',
      title: 'Pengajuan Ijin berhasil',
      message:
        'laporan berhasil di kirim, tindakan akan segera di proses oleh tim Terkait',
      quote: false,
      onOK: () => {
        setAlert({show: false});
        reset();
        setValue('attachment', null);
      },
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

  useEffect(() => {
    const lokasiTemuan = watch('lokasi_temuan');
    setShowOtherLocation(lokasiTemuan === 'Lainnya');
  }, [watch('lokasi_temuan')]);

  console.log('leave type', leave_type);

  const kategory = [
    {id: 'TTA', value: 'Tindakan Tidak Aman'},
    {id: 'KTA', value: 'Kondisi Tidak Aman'},
  ];

  const lokasi = [
    {id: 'Office', value: 'Office'},
    {id: 'Tambang/PIT', value: 'Tambang/PIT'},
    {id: 'Workshop', value: 'Workshop'},
    {id: 'Warehouse', value: 'Warehouse'},
    {id: 'Kantor', value: 'Kantor'},
    {id: 'Lainnya', value: 'Lainnya'},
  ];

  return (
    <Layout>
      <VStack px={5} className="h-full flex-1">
        {isLoading && <Loading />}
        <Alert
          visible={alert.show}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          quote={alert.quote}
          onOk={alert.onOK}
          onDissmiss={alert.onDissmiss}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 my-5">
          <VStack className="flex-1" space={5}>
            <Text
              className="text-sm text-black"
              style={{fontFamily: 'OpenSans-SemiBold'}}>
              Lokasi
            </Text>
            <VStack>
              <Controller
                name="lokasi_temuan"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    label="Lokasi Temuan Bahaya"
                    option={lokasi}
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
              {errors?.lokasi_temuan && (
                <ErrorMessage value={errors.lokasi_temuan.message} />
              )}
            </VStack>

            {showOtherLocation && (
              <VStack>
                <Controller
                  name="other_location"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="lokasi lainnya"
                      keyboardType="default"
                      value={value}
                      onChangeText={onChange}
                      maxLength={100}
                      title="Lokasi Lainnya"
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'harus diisi',
                    },
                  }}
                />
                {errors?.other_location && (
                  <ErrorMessage value={errors.other_location.message} />
                )}
              </VStack>
            )}

            <VStack>
              <Controller
                name="detail_lokasi"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'harus diisi',
                  },
                }}
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
                  />
                )}
              />
              {errors?.detail_lokasi && (
                <ErrorMessage value={errors.detail_lokasi.message} />
              )}
            </VStack>

            <Text
              className="text-sm text-black"
              style={{fontFamily: 'OpenSans-SemiBold'}}>
              Departement Terkait
            </Text>
            <VStack>
              <Controller
                name="perusahaan"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    label="Perusahaan"
                    option={lokasi}
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
              {errors?.perusahaan && (
                <ErrorMessage value={errors.perusahaan.message} />
              )}
            </VStack>
            <VStack>
              <Controller
                name="project"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    label="Project"
                    option={lokasi}
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
              {errors?.project && (
                <ErrorMessage value={errors.project.message} />
              )}
            </VStack>
            <VStack>
              <Controller
                name="departement"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
                    label="Departement"
                    option={lokasi}
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
              {errors?.departement && (
                <ErrorMessage value={errors.departement.message} />
              )}
            </VStack>

            <Text
              className="text-sm text-black"
              style={{fontFamily: 'OpenSans-SemiBold'}}>
              Detail Laporan
            </Text>
            <VStack>
              <Controller
                name="kategory"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SelectField
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
                rules={{
                  required: {
                    value: true,
                    message: 'pilih salah satu',
                  },
                }}
              />
              {errors?.kategory && (
                <ErrorMessage value={errors.kategory.message} />
              )}
            </VStack>

            <VStack>
              <Controller
                control={control}
                // defaultValue=""
                name="bahaya_temuan"
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Kondisi/Perilaku Bahaya yang ditemukan"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    maxLength={100}
                    title="Kondisi/Perilaku Bahaya"
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'harus diisi',
                  },
                }}
              />
              {errors?.bahaya_temuan && (
                <ErrorMessage value={errors.bahaya_temuan.message} />
              )}
            </VStack>
            <VStack>
              <Controller
                control={control}
                name="rekomendasi_tindakan"
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Rekomendasi Tindakan"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    maxLength={100}
                    title="Rekomendasi Tindakan"
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'harus diisi',
                  },
                }}
              />
              {errors?.rekomendasi_tindakan && (
                <ErrorMessage value={errors.rekomendasi_tindakan.message} />
              )}
            </VStack>
            <VStack>
              <Controller
                control={control}
                name="tindakan_dilakukan"
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Tindakan yang dilakukan saat ini"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    maxLength={100}
                    title="Tindakan yang dilakukan"
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'harus diisi',
                  },
                }}
              />
              {errors?.tindakan_dilakukan && (
                <ErrorMessage value={errors.tindakan_dilakukan.message} />
              )}
            </VStack>
            <Controller
              name="photo_temuan"
              control={control}
              render={({field: {onChange, value}}) => (
                <ImagePicker
                  label="Foto Temuan"
                  value={value}
                  onChange={data => setValue('photo_temuan', data)}
                  onDelete={() => setValue('photo_temuan', null)}
                />
              )}
            />

            <VStack>
              <Controller
                name="due_date"
                defaultValue={null}
                control={control}
                render={({field: {value}}) => (
                  <Calendar
                    label="Batas waktu penyelesaian"
                    value={value}
                    range={false}
                    backDate={true}
                    onChange={data => {
                      setValue('due_date', data);
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
              {errors?.due_date && (
                <ErrorMessage value={errors.due_date.message} />
              )}
            </VStack>
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
      </VStack>
    </Layout>
  );
};

export default HazardAdd;
