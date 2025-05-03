import React, {useRef} from 'react';
import WebView from 'react-native-webview';
import Layout from '@components/layout.component';
import {VStack} from 'native-base';
import Header from '@components/navigation/header.component';

import SignatureScreen from 'react-native-signature-canvas';
import {View} from 'react-native';

const PkwtScreen = () => {
  const ref = useRef();
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = signature => {
    // console.log(signature);
    console.log('signature Cretae');
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('Empty');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('clear success!');
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = data => {
    // console.log(data);
  };
  return (
    <Layout>
      <VStack className="px-5 pt-2">
        <Header title="Kontrak" back={true} />
      </VStack>
      <View className="h-40"></View>
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        autoClear={false}
        descriptionText={'Digital Signature'}
      />
    </Layout>
  );
};

export default PkwtScreen;
