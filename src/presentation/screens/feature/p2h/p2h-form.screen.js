import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Layout from '../../../components/layout.component';
import {VStack} from 'native-base';
import SelectField from '../../../components/select.component';
import Input from '../../../components/input.component';

const P2hFormScreen = () => {
  return (
    <Layout>
      <VStack px={5} className="h-full flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 my-2">
          <VStack space={3} className="mb-5">
            <VStack
              className="py-2 px-2 border border-gray-200 rounded-md"
              space={2}>
              <Text
                style={{fontFamily: 'Inter-Bold'}}
                className="text-primary-950 text-sm">
                Pemeriksaan Keliling Unit
              </Text>
              <VStack space={1}>
                <SelectField
                  //   error={errors?.[questList.slug]}
                  label="Ban dan Baut Roda"
                  option={[
                    {id: 'yes', value: 'Baik'},
                    {id: 'no', value: 'Tidak'},
                  ]}
                  labelField="value"
                  valueField="id"
                  //   onChange={data => {
                  //     onChange(data.id);
                  //     setFieldSelected({
                  //       ...fieldSelected,
                  //       [questList.slug]: data.id,
                  //     });
                  //   }}
                  //   value={value}
                />
              </VStack>
            </VStack>
            <Input
              placeholder="Rekomendasi tindakan"
              keyboardType="default"
              multiline={true}
              numberOfLines={5}
              // value={value}
              // onChangeText={onChange}
              inputStyle={{height: 70}}
              maxLength={100}
              title="Catatan P2H (opsional)"
              // error={errors?.recommendation}
            />
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default P2hFormScreen;
