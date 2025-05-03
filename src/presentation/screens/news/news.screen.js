import {ScrollView} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {VStack} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Layout from '@components/layout.component';

const Tab = createMaterialTopTabNavigator();

const News = () => {
  return (
    <Layout>
      <VStack px={5} className="flex-1">
        <Header back={false} title="Berita & Informasi" />
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </VStack>
    </Layout>
  );
};

export default News;
