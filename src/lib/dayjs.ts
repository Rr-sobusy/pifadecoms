import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import minMax from 'dayjs/plugin/minMax'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

extend(relativeTime);
extend(updateLocale);
extend(isSameOrAfter)
extend(minMax)
extend(isSameOrBefore)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few sec',
    m: 'a min',
    mm: '%d min',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

export { dayjs };
