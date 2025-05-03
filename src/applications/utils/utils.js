import moment from 'moment';
import {HStack} from 'native-base';
import {Text} from 'react-native';

export const cDuration = (start, end) => {
  var mins = '',
    st = start ? moment(start, 'YYYY-MM-DD HH:mm:ss') : null,
    et = end ? moment(end, 'YYYY-MM-DD HH:mm:ss') : moment();

  if (start == null) return '--:-- --';

  mins = moment(et).diff(st, 'minutes');

  var h = (mins / 60) | 0,
    m = mins % 60 | 0;
  return (
    <HStack className="space-x-2">
      <HStack className="space-x-1">
        <Text
          className="text-2xl text-primary-950 tracking-tighter"
          style={{fontFamily: 'Inter-Bold'}}>
          {String(h)}
        </Text>
        <Text
          className="text-xs text-primary-950 mt-3"
          style={{fontFamily: 'OpenSans-Bold'}}>
          j
        </Text>
      </HStack>
      {m > 0 && (
        <HStack className="space-x-1">
          <Text
            className="text-2xl text-primary-950 tracking-tighter"
            style={{fontFamily: 'Inter-Bold'}}>
            {m}
          </Text>
          <Text
            className="text-xs text-primary-950 mt-3"
            style={{fontFamily: 'OpenSans-Bold'}}>
            m
          </Text>
        </HStack>
      )}
    </HStack>
  );
};

export const checkImage = url => {
  fetch(url)
    .then(res => {
      if (res.status == '404') {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {
      return false;
    });
};
