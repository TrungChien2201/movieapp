import React from 'react';
import './style.scss';
import { Button } from 'antd';

interface Props{ 
    children?: string | any;
    mode?: 'dark' | 'light' | 'blue';
    htmlType?: 'submit' | 'reset' | 'button' | undefined;
    onClick?: (e?: any) => void | undefined;
}
const ButtonCustom = (props: Props) => {
    const {children, mode, htmlType , onClick} = props;
  return (
      <Button onClick={onClick} htmlType={htmlType} className={`${mode} btn-default`}>{children}</Button>
  )
}
export default ButtonCustom;