import { useDateFormat, useNow } from '@vueuse/core';
import * as Vue from 'vue';
type RowOptionsParams<T = any> = {
  labelKey: string;
  valueKey: string;
  iconKey?: string;
  rows: T[];
};
export type RowData = {
  label: string;
  value: string;
  key: string;
  title: string;
};
/* 把数据库的值转成下拉列表,菜单等 */
export const rowsToOptions = (config: RowOptionsParams): RowData[] => {
  return config.rows.map(e => {
    return {
      label: e![config.labelKey],
      value: e![config.valueKey],
      title: e![config.labelKey],
      key: e![config.labelKey],
    };
  });
};
export const isDev = () => {
  return import.meta.env.MODE === 'development';
};

export const getCurrentTime = () => useDateFormat(useNow(), 'HH:mm:ss').value;
