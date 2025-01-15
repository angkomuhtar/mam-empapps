import {View, Text, Platform, StyleSheet} from 'react-native';
import React from 'react';
import {HStack, Select, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import SelectDropdown from 'react-native-select-dropdown';

const SelectField = ({
  onChange,
  value,
  placeholder,
  valueField = 'value',
  labelField = 'label',
  additionalLabel = false,
  label,
  option = [],
  disabled = false,
  error = false,
  onChangeSearch = false,
  searchPlaceHolder = 'Search',
}) => {
  const renderItem = item => (
    <HStack className="py-3 px-4 justify-between items-center">
      <Text
        className="text-sm text-primary-950"
        style={{fontFamily: 'Inter-Medium'}}>
        {item[labelField]}
      </Text>
      {item[valueField] === value && (
        <Icon color="black" name="checkmark-done" size={20} />
      )}
    </HStack>
  );

  return (
    <>
      <HStack className="border border-primary-100 rounded-md bg-white">
        <VStack className="flex-1">
          <Text
            className="text-xs text-primary-950 capitalize px-4 pt-2"
            style={{fontFamily: 'Inter-Regular'}}>
            {label}
          </Text>
          <View className={`py-1`}>
            <SelectDropdown
              data={option}
              // defaultValueByIndex={8} // use default value by index or default value
              // defaultValue={{title: 'kiss', icon: 'emoticon-kiss-outline'}} // use default value by index or default value
              onSelect={onChange}
              renderButton={(selectedItem, isOpen) => {
                return (
                  <View
                    style={{
                      height: 35,
                      borderRadius: 12,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                    }}>
                    {selectedItem ? (
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontFamily: 'Inter-Regular',
                          color: '#000',
                        }}>
                        {selectedItem[labelField]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontFamily: 'Inter-Regular',
                          color: '#d4d4d4',
                        }}>
                        {placeholder || 'Choose One'}
                      </Text>
                    )}
                    <Icon
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      style={{
                        fontSize: 18,
                        fontFamily: 'Inter-Regular',
                        color: '#000',
                      }}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      // maxHeight: 50,
                      flexDirection: 'row',
                      paddingHorizontal: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#f4f4f4',
                      ...(isSelected && {backgroundColor: '#f4f4f4'}),
                    }}>
                    {additionalLabel ? (
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 14,
                          }}>
                          {item[labelField]}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 12,
                          }}>
                          {item[additionalLabel]}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={{
                          flex: 1,
                        }}>
                        {item[labelField]}
                      </Text>
                    )}
                    {isSelected && (
                      <Icon
                        name="checkmark-done"
                        style={{
                          fontSize: 18,
                          color: '#000',
                        }}
                      />
                    )}
                  </View>
                );
              }}
              dropdownStyle={{
                backgroundColor: '#fff',
                borderRadius: 8,
              }}
              showsVerticalScrollIndicator={false}
              search
              searchInputStyle={{
                backgroundColor: '#fff',
              }}
              searchPlaceHolder={searchPlaceHolder}
              searchPlaceHolderColor={'#d8d8d8'}
              renderSearchInputLeftIcon={() => {
                return <Icon name={'search'} color={'#a4a4a4'} size={18} />;
              }}
              disabled={disabled}
              onChangeSearchInputText={onChangeSearch}
            />
            {/* <Dropdown
              className="px-4 "
              placeholderStyle={{
                color: '#cacaca',
                fontFamily: 'Inter-Light',
                fontSize: 13,
              }}
              selectedTextStyle={{
                color: '#490609',
                fontFamily: 'OpenSans-Light',
                fontSize: 14,
              }}
              data={option}
              search={false}
              maxHeight={500}
              labelField={labelField}
              valueField={valueField}
              placeholder="pilih salah satu"
              value={value}
              onChange={onChange}
              renderRightIcon={() => (
                <Icon name="chevron-down-outline" size={25} />
              )}
              renderItem={renderItem}
            /> */}
          </View>
        </VStack>
      </HStack>
      {error && (
        <Text
          className="text-primary-500 capitalize text-[11px] ml-2 mt-2"
          style={{fontFamily: 'Inter-Medium'}}>
          {error?.message}
        </Text>
      )}
    </>
  );
};

export default SelectField;
