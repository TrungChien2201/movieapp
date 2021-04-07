import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Select } from "antd";
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
  url?: string;
}
const { Option } = Select;
const ModalCreateProduct = (props: Props) => {
  const {
    form,
    url,
    setUrl,
    handleSubmit,
    handleEdit,
    visible,
    setVisible,
    edit,
    dataEdit,
    setEdit,
  } = props;
  const CreateProduct = (e: any) => {
    debugger;
    if (edit) {
      if (e.price_sale) {
        handleEdit({
          id: dataEdit._id,
          e,
          percent_sale: Math.ceil((1 - e.price_sale / e.price) * 100),
        });
      } else handleEdit({ id: dataEdit._id, e, percent_sale: null });
      setEdit(false);
    } else if (!edit) {
      handleSubmit(e);
    }
  };
  const handleCheck = (e: any) => {
  };

  const handleChangeColor = (e: any) => {
  };

  const handleChangeSize = (e: any) => {
  }
  React.useEffect(() => {
    if (url) {
      form.setFieldsValue({ image: url });
    }
    if (edit) {
      form.setFieldsValue(dataEdit);
      setUrl(dataEdit.image);
    }
  }, [url, form, edit]);
  return (
    <Modal
      width="40%"
      footer={null}
      visible={visible}
      onCancel={() => {
        setEdit(false);
        setUrl("");
        setVisible(false);
        form.resetFields();
      }}
    >
      <Form form={form} onFinish={CreateProduct}>
        <Form.Item
          label="Tên sản phẩm"
          name="title"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả chi tiết"
          name="description"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          name="price"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Giá khuyến mãi" name="price_sale">
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh sản phẩm"
          name="image"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <UploadFile url={url} setUrl={setUrl} />
        </Form.Item>
        <Form.Item label="Màu sắc" name="color">
          <Select
            value={dataEdit && dataEdit.color}
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select color"
            onChange={handleChangeColor}
            optionLabelProp="label"
          >
            <Option value="đen" label="Đen">
              <div className="demo-option-label-item">Đen</div>
            </Option>
            <Option value="trắng" label="Trắng">
              <div className="demo-option-label-item">Trắng</div>
            </Option>
            <Option value="xám" label="Xám">
              <div className="demo-option-label-item">Xám</div>
            </Option>
            <Option value="đỏ" label="Đỏ">
              <div className="demo-option-label-item">Đỏ</div>
            </Option>
            <Option value="xanh" label="Xanh">
              <div className="demo-option-label-item">Xanh</div>
            </Option>
            <Option value="hồng" label="Hồng">
              <div className="demo-option-label-item">Hồng</div>
            </Option>
            <Option value="cam" label="Cam">
              <div className="demo-option-label-item">Cam</div>
            </Option>
            <Option value="vàng" label="Vàng">
              <div className="demo-option-label-item">Vàng</div>
            </Option>
            <Option value="nâu" label="Nâu">
              <div className="demo-option-label-item">Nâu</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="size"
          label="Size giày"
        >
           <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select size"
    onChange={handleChangeSize}
    optionLabelProp="label"
  >
    <Option value="36" label="36">
      <div className="demo-option-label-item">
        36
      </div>
    </Option>
    <Option value="37" label="37">
      <div className="demo-option-label-item">
        37
      </div>
    </Option>
    <Option value="38" label="38">
      <div className="demo-option-label-item">
        38
      </div>
    </Option>
    <Option value="39" label="39">
      <div className="demo-option-label-item">
      39
      </div>
    </Option>
    <Option value="40" label="40">
      <div className="demo-option-label-item">
       40
      </div>
    </Option>
    <Option value="41" label="41">
      <div className="demo-option-label-item">
      41
      </div>
    </Option>
    <Option value="42" label="42">
      <div className="demo-option-label-item">
        42
      </div>
    </Option>
    <Option value="43" label="43">
      <div className="demo-option-label-item">
      43
      </div>
    </Option>
    <Option value="44" label="44">
      <div className="demo-option-label-item">
      44
      </div>
    </Option>
  </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Hoàn thành
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreateProduct;
