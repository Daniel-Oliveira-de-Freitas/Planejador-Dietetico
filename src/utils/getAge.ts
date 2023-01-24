import { differenceInYears } from 'date-fns';
export const getAge = (date: Date) => differenceInYears(new Date(), date);
