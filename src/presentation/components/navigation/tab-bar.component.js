import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <HStack className="bg-primary-100 rounded-md">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const bg = options?.focusedBackground || 'bg-primary-500';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className={`flex-1 py-3 justify-center ${
              isFocused && bg
            } items-center rounded-md`}>
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className={`text-primary-${isFocused ? '50' : '950'} capitalize`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default TabBar;
