import React from 'react';
import './style.scss';
import { Button } from 'antd';

interface Props{ 
    children?: string;
    mode?: 'dark' | 'light';
    htmlType?: 'submit' | 'reset' | 'button' | undefined;
}
const ButtonCustom = (props: Props) => {
    const {children, mode, htmlType } = props;
  return (
      <Button htmlType={htmlType} className={`${mode} btn-default`}>{children}</Button>
  )
}
export default ButtonCustom;