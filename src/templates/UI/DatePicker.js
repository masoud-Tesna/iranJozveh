'use client';

import MultiDatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import transition from 'react-element-popper/animations/transition';
import opacity from 'react-element-popper/animations/opacity';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import {useWindowSize} from '@/utils/helpers';
import {ConfigProvider, Form, Input} from 'antd';
import {CalendarDateOutlined} from '@/templates/icons';

export const DatePicker = (props) => {
  const {
    noPlaceHolder = false,
    name,
    placeholder,
    listName,
    dateFormat = 'YYYY/MM/DD',
    onChange,
    ...rest
  } = props;
  
  const {width} = useWindowSize();
  
  const CustomDatePickerInput = ({openCalendar, value, handleValueChange}) => {
    return (
      <ConfigProvider direction="ltr">
        <Input
          placeholder={!noPlaceHolder ? placeholder : null}
          onFocus={openCalendar}
          onClick={openCalendar}
          value={value}
          onChange={handleValueChange}
          allowClear={false}
          rootClassName="d-ltr [&>input]:placeholder:text-right [&>.ant-input-prefix]:!me-[8px]"
          className="--test"
          prefix={<CalendarDateOutlined className="!text-[20px] !text-gray-40" />}
        />
      </ConfigProvider>
    );
  };
  
  return (
    <MultiDatePicker
      className={width <= 767 ? 'rmdp-mobile' : ''}
      render={<CustomDatePickerInput />}
      onChange={onChange}
      locale={persian_fa}
      calendar={persian}
      format={dateFormat}
      zIndex={9999}
      animations={[
        opacity(),
        transition({
          from: 40,
          transition: 'all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)'
        })
      ]}
      containerStyle={{width: '100%'}}
      hideOnScroll
      mobi
      portal
      {...rest}
    />
  );
};
