import {View, Text} from 'react-native';
import React from 'react';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
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
  return (
    <>
      <HStack className="border border-primary-100 rounded-md bg-white">
        <VStack className="flex-1">
          {label && (
            <Text
              className="text-xs text-primary-950 capitalize px-4 pt-2"
              style={{fontFamily: 'Inter-Regular'}}>
              {label}
            </Text>
          )}
          <View className={`py-1`}>
            <SelectDropdown
              data={option}
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
                            color: '#000',
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 14,
                          }}>
                          {item[labelField]}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
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
                          color: '#000',
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
