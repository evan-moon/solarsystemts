
export const G: number = 6.6742e-11;
export const AU: number = 149597870; // astronomical unit in km
export const CIRCLE: number = 2 * Math.PI;
export const QUARTER_CIRCLE: number = Math.PI / 2;
export const KM: number = 1000;
export const DEG_TO_RAD: number = Math.PI / 180;
export const RAD_TO_DEG: number = 180 / Math.PI;

export const NM_TO_KM: number = 1.852;
export const LB_TO_KG: number = 0.453592;
export const LBF_TO_NEWTON: number = 4.44822162;
export const FT_TO_M: number= 0.3048;

export const HOUR: number = 60 * 60;
export const DAY: number = 24 * HOUR; // duration in seconds
export const YEAR: number = 365.25; // duration in days
export const CENTURY: number = 100 * YEAR; // duration in days
export const SIDERAL_DAY: number = 3600 * 23.9344696;

export const J2000: Date = new Date('2000-01-01T12:00:00-00:00');

export const DEFAULT_CALC_PER_TICK: number = 1;

export const REALTIME: number = 3600 * 10 / 60 / 60; // RealTime
export const HOUR_PER_SECOND = REALTIME * HOUR;
export const DAY_PER_SECOND = HOUR_PER_SECOND * 24;
export const MONTH_PER_SECOND = DAY_PER_SECOND * 30;
export const HALF_YEAR_PER_SECOND = MONTH_PER_SECOND * 6;
export const YEAR_PER_SECOND = HALF_YEAR_PER_SECOND * 2;
