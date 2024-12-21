import React from 'react';
import {Divider, VStack, Text} from 'native-base';

const HomeCard = ({children, title}) => {
  return (
    <VStack className="py-5 px-3 bg-white rounded-lg my-3" shadow="1">
      <Text
        className="text-sm text-black"
        style={{fontFamily: 'OpenSans-Bold'}}>
        {title}
      </Text>
      <Divider className="my-2" />
      {children}
    </VStack>
  );
};

export default HomeCard;
