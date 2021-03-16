import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import UploadFile from "../../../../components/uploadFile";
import apis from "../../../../api";
import { SUCCESS } from "../../../../constants";
import LoadingPage from "../../../../components/LoadingPage";
interface Props {
  form?: any;
  setUrl?: any;
  handleSubmit: (e: any) => void | undefined;
  visible?: boolean;
  setVisible?: any;
  edit?: boolean;
  dataEdit?: any;
  setEdit?: any;
  handleEdit: (e: any) => void | undefined;
}
const ModalCreateProduct = (props: Props) => {
  const { form, handleSubmit,handleEdit, visible, setVisible ,edit,dataEdit, setEdit} = props;
  const [url,setUrl] = useState('');
  const CreateProduct = (e: any) => {
    if(edit){
      debugger
     handleEdit({id: dataEdit._id, e})
      
    }
    else if(!edit){
       handleSubmit(e)
    }
   
  }
  React.useEffect(()=> {
      if(url){
        form.setFieldsValue({image: url})
      }
      if(edit){
        form.setFieldsValue(dataEdit)
       setUrl(dataEdit.image)
      }
  },[url,form,edit])
  return (
    <Modal width="40%" footer={null} visible={visible} onCancel={() => {setEdit(false);setUrl('');setVisible(false);form.resetFields()}}>
      <Form form={form} onFinish={CreateProduct}>
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
