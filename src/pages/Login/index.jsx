import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import './style.css'
import { connect } from 'react-redux';

import { loginAction } from '../../redux/actions';
import history from '../../utils/history';

function LoginPage({ login }) {
  return (
    <div className='wb'>
      <Form
        className='login'
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => login(values)}

      >
        <h3 className="top">LOGIN</h3>
        <div className='login-input' >
          <Form.Item
            className='text'
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
            <Input className='input' placeholder='Email' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password className='input' placeholder='Password' style={{ color: 'black' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 18, offset: 6 }} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </div>
        <div className='button'>
          <Row>
            <Col span={12} style={{ textAlign: 'right' }} >
              <Button type="primary" htmlType="submit">
                Submit
          </Button>
            </Col>
            <Col span={12}>

              <Button type="primary" htmlType="submit" onClick={() => history.push('./register')}>
                Register
        </Button>
            </Col>
          </Row>
        </div>

      </Form>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(loginAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);

