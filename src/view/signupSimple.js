import React from 'react';
import { Form, Icon, Input, Button, Tooltip, Row, Col, message, Alert, Avatar, AutoComplete, Upload } from 'antd';
import axios from 'axios'
const AutoCompleteOption = AutoComplete.Option;
class SignupSimple extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      iconLoading: false,
      errors: {},
      confirmDirty: false,
      autoCompleteResult: [],
    };
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
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const Userdata={
            name:values.name,
            email: values.email,
            alias: values.alias,
            handle: 'users',
            password:values.password,
            website: values.website,
            createdAt: new Date().toISOString(),
            disableAccount: 0
        };
        axios.post('https://us-central1-producthunts-cf964.cloudfunctions.net/api/signup', Userdata, { headers: {'Content-Type': 'application/json'}})
        .then(res=>{
          console.log(res);
          console.log(res.data);
           message.success("bienvenu a vous");
           this.setState({ loading: false });
          
        })
        .catch(err=>{
          // this.setState({ 
          //   errors: err.errors,
          //   loading: false 
          // });
          // message.error(this.state.errors);
          console.log(err);
        });
      }
    });
  };
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value){
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Les Deux mots de passe que vous saisissez sont incohérents!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors, loading } = this.state;
    const { autoCompleteResult } = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
    
    return (
      
      <Row>
      
      <Col span={12} offset={6}>
      {errors.noUser&& (
          <center><Alert message={errors.noUser} type="error" showIcon /><br/></center>
        
        )}
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
      <center>
      <Avatar size={64} icon="user" />
      </center>
      <br/>
      <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'adresse email invalide',
              },
              {
                required: true,
                message: 'Veillez renseigner une adresse email valide ',
              },
            ],
          })(<Input />)}
        </Form.Item>
      <Form.Item label="Nom">
          {getFieldDecorator('name', {
            rules: [{required: true, message: 'veuillez remplir votre nom'}],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'entrer votre mot de passe !',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'confirmez votre mot de passe !',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
            ALias &nbsp;
              <Tooltip title="Créer votre propre alias preceder d'une @ ">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('alias', {
            rules: [{ required: true, message: 'Entrer un alias !', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>,
          )}
        </Form.Item>
        <Form.Item>
         
          {/* <a className="login-form-forgot" href="">
            Forgot password auth/user-not-found
          </a><br/> */}
        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} onClick={this.enterLoading} >
           Signup
          </Button>
        <br/>
        </Form.Item>
      </Form>
      </Col>
    </Row>
    );
  }
}

export default Form.create()(SignupSimple);
