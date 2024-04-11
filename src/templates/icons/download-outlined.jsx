import Icon from '@ant-design/icons';
import classNames from 'classnames';

const DownloadOutlinedSvg = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 22"
    {...props}
  >
    <path
      d="M2.5 15.0001C2.5 14.4478 2.05228 14.0001 1.5 14.0001C0.94772 14.0001 0.5 14.4478 0.5 15.0001H2.5ZM20.7 15.0001C20.7 14.4478 20.2523 14.0001 19.7 14.0001C19.1477 14.0001 18.7 14.4478 18.7 15.0001H20.7ZM9.81147 15.7183C9.47187 16.1538 9.54947 16.7822 9.98493 17.1219C10.4204 17.4615 11.0488 17.3839 11.3885 16.9485L9.81147 15.7183ZM16.5885 10.2818C16.9281 9.84635 16.8505 9.21795 16.4151 8.87821C15.9796 8.53861 15.3512 8.61621 15.0115 9.05168L16.5885 10.2818ZM9.81147 16.9485C10.1512 17.3839 10.7796 17.4615 11.2151 17.1219C11.6505 16.7822 11.7281 16.1538 11.3885 15.7183L9.81147 16.9485ZM6.18851 9.05168C5.84883 8.61621 5.22044 8.53861 4.78497 8.87821C4.34949 9.21795 4.27183 9.84635 4.61149 10.2818L6.18851 9.05168ZM9.6 16.3334C9.6 16.8857 10.0477 17.3334 10.6 17.3334C11.1523 17.3334 11.6 16.8857 11.6 16.3334H9.6ZM11.6 1.66675C11.6 1.11447 11.1523 0.666748 10.6 0.666748C10.0477 0.666748 9.6 1.11447 9.6 1.66675H11.6ZM0.5 15.0001V16.3334H2.5V15.0001H0.5ZM0.5 16.3334C0.5 19.0709 2.67009 21.3334 5.4 21.3334V19.3334C3.82209 19.3334 2.5 18.0143 2.5 16.3334H0.5ZM5.4 21.3334H15.8V19.3334H5.4V21.3334ZM15.8 21.3334C18.5299 21.3334 20.7 19.0709 20.7 16.3334H18.7C18.7 18.0143 17.3779 19.3334 15.8 19.3334V21.3334ZM20.7 16.3334V15.0001H18.7V16.3334H20.7ZM11.3885 16.9485L16.5885 10.2818L15.0115 9.05168L9.81147 15.7183L11.3885 16.9485ZM11.3885 15.7183L6.18851 9.05168L4.61149 10.2818L9.81147 16.9485L11.3885 15.7183ZM11.6 16.3334V1.66675H9.6V16.3334H11.6Z"
    />
  </svg>
);

export const DownloadOutlined = ({className, ...rest}) => (
  <Icon component={DownloadOutlinedSvg} className={classNames('align-middle', className)} {...rest} />
);
