import fnsFormat from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const printDateTime = (
  dateTime: string,
  format = 'yyyy-MM-dd HH:mm'
) => {
  const date = parseISO(dateTime);
  return fnsFormat(date, format);
};
