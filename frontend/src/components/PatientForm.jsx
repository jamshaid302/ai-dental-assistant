import { Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { useEffect } from "react";

export default function PatientForm({
  open,
  onCancel,
  onSubmit,
  initialValues,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dob: moment(initialValues.dob),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, dob: values.dob.toISOString() });
      form.resetFields();
    } catch (err) {
      message.error("Validation failed", err);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="dob" label="DOB" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="medicalNotes" label="Medical Notes">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
