import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import UploadFile from "../../../../components/uploadFile";
interface Props {
  form?: any;
  setUrl?: any;
  handleSubmit: (e: any) => void | undefined;
  visible?: boolean;
  setVisible?: any;
}
const ModalCreateProduct = (props: Props) => {
  const { form, handleSubmit, visible, setVisible } = props;
  const [url,setUrl] = useState('');

  React.useEffect(()=> {
      if(url){
        form.setFieldsValue({image: url})
      }
  },[url,form])
  return (
    <Modal width="40%" footer={null} visible={visible} onCancel={() => {setUrl('');setVisible(false);form.resetFields()}}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Product Name"
          name="title"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image Product"
          name="image"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <UploadFile url={url} setUrl={setUrl} />
        </Form.Item>
        {/* <Form.Item
          label="Role Product"
          name="title"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item>
            <Button htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreateProduct;
