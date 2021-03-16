import React from 'react';
import { Modal } from 'antd'

interface Props{
    visible?: boolean;
    onSubmit?: (e: any) => void | any ;
    onCancle?: () => void | any;
    children? : any;
}

const ModalAntd = (props: Props) => {
    const {visible, children, onSubmit, onCancle} = props;
    return (
        <Modal visible={visible} footer={null} onCancel={onCancle}>
           {children}
        </Modal>
    )
}

export default ModalAntd;