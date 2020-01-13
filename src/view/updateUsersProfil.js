import React  from 'react'
import Navbar from '../includeComponnent/header'
import Contents from '../includeComponnent/content'
//import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getUserData, editUserDetails, uploadImage} from '../redux/actions/userActions';
import { Form, Icon, Input,Avatar, Button, message , Upload ,Row, Col, Layout,Typography, Card} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content } = Layout;
class DetailsUser extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          loading: false,
          errors: {}
        }
    }
    //Load UserData
    componentDidMount(){
      this.props.getUserData();
    }
    
    handleChange= e=>{
          this.props.form.setFieldsValue({
            [e.target.name]: e.target.values,
          });
        
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('no error to update')
            this.setState({ loading: true });
            const UserdataToUpdate={
              email: values.email,
              name:values.name,
              alias: values.alias, 
              website: values.website
            };
            //console.log(UserdataToUpdate);
            //This function is for updating infos 
             this.props.editUserDetails(UserdataToUpdate, this.props.history);
             message.success("Vos information ont ete mis a jour avec succes ");
          }
        });
      
      }
    /************************this function is for Upload SingleImage ****************************/
    // handleChange = (info) => {
    //   if (info.file.status === 'uploading') {
    //     this.setState({ loading: true });
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     this.getBase64(info.file.originFileObj, imageUrl => this.setState({
    //       imageUrl,
    //       loading: false
    //     }));
    //   }
    // };
      handleImageChange=(e)=>{
        e.preventDefault();
        const image= e.target.files[0];
        console.log(image)
        //Send Image To Server 
        const formData = new FormData();
        formData.append('defaultprofilUrlImage', image, image.name);
        this.props.uploadImage(formData);
        
      }
      handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };
    // beforeUpload = (file) => {
    //   const isImage = file.type.indexOf('image/') === 0;
    //   if (!isImage) {
    //      message.error('You can only upload image file!');
    //   }
      
    //   // You can remove this validation if you want
    //   const isLt5M = file.size / 1024 / 1024 < 5;
    //   if (!isLt5M) {
    //     message.error('Image must smaller than 5MB!');
    //   }
    //   return isImage && isLt5M;
    // };
  
    
    render() {
     
        const { getFieldDecorator  } = this.props.form;// accesse from from data 
        const {credentials:{email, defaultprofilUrlImage, alias, name, website}}= this.props.user;//access form user data
        const uploadButton = (
          <div>
            <Icon type={this.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
          );
        return (
            <Layout className="layout">
            <Navbar/>
            <Content style={{ padding: '50px' }}>
            <Row> 
            <Col xs={2} sm={4} md={6} lg={8} xl={6}>
            <Card style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>,
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={18}>
            <Card >
              <div>
              <p>You are logged in using <b>Normal login as <i>{name}</i></b></p>
              <Button  style={{"margin": 5}} type="primary" htmlType="submit" className="login-form-button"  >
              Se Connecter avec google
              </Button><br/>
              <Button style={{"margin": 5}} type="primary" htmlType="submit" className="login-form-button" >
              Se Connecter avec facebook
              </Button><br/>
              <Button style={{"margin": 5}} type="primary" htmlType="submit" className="login-form-button"  >
              Se Connecter avec linked 
              </Button>
              <p>Connect with other networks to find more friends & followers.</p>
              </div>
            </Card>
            <Title level={2}>Settings</Title>
            <Card>
              <h3>Vos Information ici: </h3>
              <h6>Vous pouvez les modifier a ce niveau et rassuez vous d'avoir bien remplie les champs </h6>
            <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item  label="Email"  >
          {getFieldDecorator('email', {
            initialValue: email , rules: [{ required: true, message: 'entrer votre adresse email '}],
          })(
            <Input
               type="email"
              placeholder="email"
              onChange={this.handleChange}
            />,
          )}
         
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: name ,  rules: [{ required: true, message: 'entrer un nom'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Name "
              onChange={this.handleChange}
            />,
          )}
        </Form.Item>
        <Form.Item label="alias">
          {getFieldDecorator('alias', {
            initialValue:`${alias}`,  rules: [{ required: true, message: 'entrer un alias '}],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Alias"
              onChange={this.handleChange}
            />,
          )}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator('website', {
            initialValue: website,  rules: [{ required: true, message: 'entrer un site web valide '}],
          })(
            <Input
              prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="website"
              onChange={this.handleChange}
            />,
          )}
        </Form.Item>
        <Form.Item label="Avatar">
        <Avatar size={64} src={defaultprofilUrlImage} icon="user" /><br/>
         <p>Change Avatar ici : 
         {/* <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          customRequest={this.props.uploadImage}
        >
          {defaultprofilUrlImage ? <Avatar size={64} src={defaultprofilUrlImage} icon="user" alt="avatar"/>: uploadButton}
        </Upload> */}
        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleEditPicture} btnClassName="button" >
          changer
          </Button>
         </p>
        </Form.Item>
        
        <Button type="primary" htmlType="submit" className="login-form-button" >
          Mettre mes informtions a jour 
          </Button>
      </Form>
            </Card>
            </Col>
           
           
        </Row>
            </Content>
            </Layout>
          
        )
    }
}
DetailsUser.protoType={
  getUserData: PropTypes.func.required,
  uploadImage: PropTypes.func.isRequired,
  editUserDetails: PropTypes.func.required,
  user: PropTypes.object.required,
}
const mapStateToProps = (state) => ({
  user: state.user
})
const mapActionsToProps = {
  getUserData,
  editUserDetails, 
  uploadImage
};
export default connect(mapStateToProps, mapActionsToProps)(Form.create()(DetailsUser));