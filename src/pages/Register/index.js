import history from '../../utils/history';
import { connect } from 'react-redux';
import { registerAction } from '../../redux/actions';
import './style.css'
import { Form, Input, Row, Col, Button } from 'antd';
function RegistrationForm({ register }) {

  const [form] = Form.useForm();
  const onFinish = (values) => {
    register(values);
  };
  
  return (
    <div className='wb'>
      <Form
        form={form}
        onFinish={onFinish}
        className="register"
        name="register"
      >
        <h3 className="top">REGISTER</h3>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input className='input-Register' placeholder='Name' />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input className='input-Register' placeholder='E-mail' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password className='input-Register' placeholder='Password' />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password className='input-Register' placeholder='Confirm-Password' />
        </Form.Item>
        <div className='button-register'>
          <Row>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" >
                Register
          </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" htmlType="submit" onClick={() => history.push('./login')}
              >
                Login
        </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (params) => dispatch(registerAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(RegistrationForm);


