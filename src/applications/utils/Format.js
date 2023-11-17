import moment from 'moment';

export const cDuration = (start, end) => {
  var mins = '',
    st = start ? moment(start, 'HH:mm:ss') : null,
    et = end ? moment(end, 'HH:mm:ss') : moment();

  if (start == null) return '--:-- --';
  if (et < st) {
    mins = moment(moment('24:00:00', 'HH:mm:ss')).diff(st, 'minutes');
    mins += moment(et).diff(moment('00:00:00', 'HH:mm:ss'), 'minutes');
  } else {
    mins = moment(et).diff(st, 'minutes');
  }

  var h = (mins / 60) | 0,
    m = mins % 60 | 0;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};
