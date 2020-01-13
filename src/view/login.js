import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message, Alert } from 'antd';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
class login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      iconLoading: false,
      errors: {}, 
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  
  enterLoading = () => {
    this.setState({ loading: false });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: false });
  };

  handleChange= e=>{
    this.SetState={
      [e.target.name]: e.target.values,
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  };  
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    console.log(this.state);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('no error')
        this.setState({ loading: true });
        const Userdata={
          email: values.email,
          password:values.password
        };
        this.props.loginUser(Userdata, this.props.history); 
        this.handleClose();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors, loading } = this.state;
    
    return (
      
      <Row>
      
      <Col span={12} offset={6}>
      {errors.noUser&& (
          <center><Alert message={errors.noUser} type="error" showIcon /><br/></center>
        
        )}
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item   validateStatus="success" >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'entrer votre username '}],
          })(
            <Input
               type="email"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
              onChange={this.handleChange}
            />,
          )}
         
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'entrer votre adresse email'}],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />,
          )}
        </Form.Item>
        <Form.Item>
         
          {/* <a className="login-form-forgot" href="">
            Forgot password auth/user-not-found
          </a><br/> */}
          <center>
         
        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} onClick={this.enterLoading} >
            Log in
          </Button>
        <br/> or <br/>
       
          <Button type="primary" htmlType="submit" className="google-button">
            <span className="google-button__icon">
              <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
          </span>
          <span className="google-button__text">Sign in with Google</span>
          </Button><br/>
          </center>
        
        </Form.Item>
      </Form>
      </Col>
    </Row>
    );
  }
}
login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired 
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Form.create()(login));
