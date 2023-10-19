import {Text} from 'react-native';

export const TextMontserrat = props => {
  let font = 'Montserrat-Regular';

  switch (props.weight) {
    case 'Black':
      font = 'Montserrat-Black';
      break;
    case 'Bold':
      font = 'Montserrat-Bold';
      break;
    case 'ExtraBold':
      font = 'Montserrat-ExtraBold';
      break;
    case 'ExtraLight':
      font = 'Montserrat-ExtraLight';
      break;
    case 'Light':
      font = 'Montserrat-Light';
      break;
    case 'Medium':
      font = 'Montserrat-Medium';
      break;
    case 'Regular':
      font = 'Montserrat-Regular';
      break;
    case 'SemiBold':
      font = 'Montserrat-SemiBold';
      break;
    case 'Thin':
      font = 'Montserrat-Thin';
      break;
    default:
      font = 'Montserrat-Regular';
      break;
  }

  return (
    <Text
      className={props.class}
      style={{...props.style, fontFamily: `${font}`}}>
      {props.children}
    </Text>
  );
};

export const TextTitle = ({children}) => {
  return (
    <TextMontserrat class="text-primary-950 text-lg mb-4" weight="SemiBold">
      {children}
    </TextMontserrat>
  );
};
