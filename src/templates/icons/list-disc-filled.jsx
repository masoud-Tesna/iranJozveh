import Icon from '@ant-design/icons';
import classNames from 'classnames';

const ListDiscFilledSvg = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 8 8"
    {...props}
  >
    <circle cx="4" cy="4" r="4" />
  </svg>
);

export const ListDiscFilled = ({className, ...rest}) => (
  <Icon component={ListDiscFilledSvg} className={classNames('align-middle', className)} {...rest} />
);
