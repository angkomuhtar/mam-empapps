import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBottom = ({state, descriptors, navigation, size = '11px'}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-1 bg-[#fafafa]">
      <HStack className="relative py-4 bg-white rounded-3xl border border-primary-100">
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

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
              className={`flex-1 justify-center  items-center rounded-md`}>
              <VStack
                space={1}
                className={`flex flex-col items-center justify-center `}>
                {options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? '#fb3640' : '#000',
                })}
                <Text
                  style={{
                    fontFamily: isFocused ? 'Inter-Bold' : 'Inter-Medium',
                  }}
                  className={`text-[10px] text-primary-${
                    isFocused ? '500' : '950'
                  } uppercase`}>
                  {label}
                </Text>
              </VStack>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );
};

export default TabBottom;
