import  React from 'react';
import {Modal , Form, Input, Button, Select} from 'antd';
import './style.scss';
import ButtonCustom from '../../../../components/Button';
interface Props{
    visible? : boolean;
    setVisible: (e: boolean) => void | undefined;
    EditAccount: (e: any)=> void | undefined ;
    data?: any;
}
const {Option} = Select;
const ModalEditAccount = (props: Props) => {
    const { visible,setVisible, EditAccount, data} = props;
    const [form] = Form.useForm();
    const handleSubmit = (e: any) => {
        EditAccount({...e, id: data?._id});
    }
    React.useEffect(()=>{
        form.setFieldsValue(data)
    },[data])
    return (
        <Modal
      width="40%"
      footer={null}
      visible={visible}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
      }}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại tài khoản"
          name="rule"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Select>
              <Option value={1}>Thường</Option>
              <Option value={2}>Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <ButtonCustom htmlType="submit" mode="dark">
            Hoàn thành
          </ButtonCustom>
        </Form.Item>
      </Form>
    </Modal>
    )
}

export default ModalEditAccount;