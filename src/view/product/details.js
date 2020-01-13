import React from 'react'
import '../../style.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Navbar from '../../includeComponnent/header'
import Item from '../../includeComponnent/items'
//import { Link } from 'react-router-dom'
import { getproduits, uploadFirsToProductbeforUploadAllProductDataImage } from '../../redux/actions/dataActions';
import {Row, Col, Form, Input, Upload, message,Checkbox, Icon,Select, AutoComplete, Layout,Typography, Card, Tooltip, Button, Avatar} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content,  } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const OPTIONS = [
    'Productivity', 
    'Artificial Intelligence', 
    'books', 
    'Devellopers Tools',
    'User Experience', 
    'Amazon'];

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  function arrayToString(arr) {
    let str = '';
    arr.forEach(function(i, index) {
      str += i;
      if (index != (arr.length - 1)) {
        str += ',';
      };
    });
    return str;
  }
 class details extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        websiteLink: this.props.location.state.website,
        ProductName:"",
        tagline: [],
        topic:"",
        urlImageProduct:"",
        loading: false,
        confirmDirty: false,
        isFiledIsOk:false,
        autoCompleteResult:[],
        selectedItems: []
      }
      this.handleChangeTextProductName = this.handleChangeTextProductName.bind(this);
      this.handleChangeTextTagline = this.handleChangeTextTagline.bind(this);
      this.handleChangeTextTopic = this.handleChangeTextTopic.bind(this);

    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    handleSubmitAndPassToNextPage = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
           
                this.props.history.push({
                    pathname: '/product/Ajouterproduit/galleryProduct',
                    state: {
                        ProductName: values.ProductName,
                        tagline: values.tagline, 
                        topic: this.state.selectedItems, 
                        website: values.website,
                        UserImage: localStorage.getItem('imagePrincipale'),
                        status: true,
                        productId:localStorage.getItem("idproduct")
                     }
                  })
          
        }else{
            message.info("Veuillez bien le formulaire s'il vous avant d'avancer ")
          this.Setstate={
            isFiledIsOk: false
           }
        }
      });
    };
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      
      }
      this.setState({ 
        autoCompleteResult, 
       });
    };

    handleChangeTextProductName= event => {
        this.setState({ 
            ProductName: event.target.value,
        });
      };
      handleChangeTextTagline= event => {
        this.setState({ 
            tagline: event.target.value
        });
      };
      handleChangeTextTopic= selectedItems => {
        this.setState({ selectedItems });
      
      };
      handleImageuploads=(e)=>{
        e.preventDefault();
        const image= e.target.files[0];
        console.log(image)
        //Send Image To Server 
        const formData = new FormData();
        formData.append('UserImage', image, image.name);
        console.log(formData);
        this.props.uploadFirsToProductbeforUploadAllProductDataImage(formData);
        
      }
      handleClickInputImage = () => {
        const fileInput = document.getElementById('UserImage');
        fileInput.click();
      };
    
      render() { 
        const {getFieldDecorator} = this.props.form;
        const { autoCompleteResult, isFiledIsOk } = this.state;
        const websiteOptions = autoCompleteResult.map(website => (
          <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const { selectedItems } = this.state;
          const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
         const {productId, UserImage}=this.props.firsdataImageForProduct;
        return (
            
            <Layout className="layout">
            <Navbar/>
            <Row style={{margin: 50}}>
            <Col span={12} >
            <Title level={2} >👋 Tell Us More About the product </Title>

            <Card style={{ width: 570, background: "#ffffff"}}>
                <Form >
                <Form.Item label="Name of the product " >
                    {getFieldDecorator('ProductName', {
                        rules: [{ required: true, message: 'ENtrer un site internet valide svp!' }],
                    })(
                        <Input 
                            type="text"
                            placeholder="Simply the name of thr product"
                            onChange={this.handleChangeTextProductName}
                            />
                      
                    )}
                    </Form.Item>
                    <Form.Item label="Tagline" >
                    {getFieldDecorator('tagline', {
                        rules: [{ required: true, message: 'ENtrer un site internet valide svp!' }],
                    })(
                        <Input 
                            type="text"
                            placeholder="concise and descriptive tagline for the product"
                            onChange={this.handleChangeTextTagline}
                            />
                      
                    )}
                    </Form.Item>
                   
                    <Form.Item label="Topic" >
                    {getFieldDecorator('topics', {
                        rules: [{ required: true, message: 'ENtrer un site internet valide svp!' }],
                    })(
                        <Select
                            mode="multiple"
                            placeholder="concise and descriptive tagline for the product"
                            value={selectedItems}
                            suffix={
                                 <Tooltip title="Tell us what the product does avoid hyperbolic word and emojis ">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            onChange={this.handleChangeTextTopic}
                            style={{ width: '100%' }}
                            >
                            {filteredOptions.map(item => (
                            <Select.Option key={item} value={item}>
                                    {item}
                            </Select.Option>
                                ))}
                            </Select>
                      
                    )}
                    </Form.Item>
                    <Form.Item label="Download Link - App Store, Google Play" hasFeedback validateStatus="success">
                    {getFieldDecorator('website', {
                        initialValue:this.state.websiteLink,  rules: [{ required: true, message: 'ENtrer un site internet valide svp!' }],
                    })(
                      
                        <Input 
                            type="text"
                            disabled
                            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="URL of the product(eg https://snaptchat.com)"
                            />

                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('Thumbnail ')(
                        <div>
                            <p>Make it look nice and professional.</p>
                            <Col span={6}>
                             <Avatar size={64} src={ localStorage.getItem('imagePrincipale')!=''?  localStorage.getItem('imagePrincipale'):'https://www.mocky.io/v2/5cc8019d300000980a055e76'} icon="user" /><br/>
                            <input type="file" id="UserImage" hidden="hidden" onChange={this.handleImageuploads} />
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleClickInputImage} ClassName="button" >
                                img 
                            </Button>
                           
                           
                            </Col>
                            <Col span={10}>
                                <Row>Upload image or paste URL</Row>
                                <Row>
                                <p>Recommended size: 240x240JPG,<br/> PNG, GIF. Max size: 2MB
                                </p>
                                </Row>
                            </Col>
                     
                  
                    </div>
                      
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('Status', {
                        valuePropName: 'status',
                        initialValue: false,
                    })(<Checkbox>This product isn’t available yet</Checkbox>)}
                    
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmitAndPassToNextPage} >
                     Next: Galerie
                    </Button>
                </Form>
            </Card>
            </Col>
            <Col span={10} style={{ background: "#ffffff"}} >
            <Row >
            <Col span={3}>
            <Avatar shape="square" style={{marginTop:20, marginLeft:10, height: 60}} size={64} src={ localStorage.getItem('imagePrincipale')!=''?  localStorage.getItem('imagePrincipale'):'https://www.mocky.io/v2/5cc8019d300000980a055e76'} icon="user" /><br/>
            </Col>
            <Col span={15}>
            <Title level={4} style={{paddingTop: 5, marginLeft:20}}>{(this.state.ProductName!=''? this.state.ProductName: "Titre du product")}</Title>
            <Text style={{ marginLeft:20}}>{(this.state.tagline!=''? this.state.tagline: "Titre du product")} </Text><br/>
            <Button style={{marginTop: 10 , marginBottom:0, marginLeft:30}} ><Icon type="message" theme="filled" />0</Button>
            <Text style={{marginLeft: 10 }}>{(this.state.selectedItems[0]!=''? this.state.selectedItems[0]: "Titre du product")} </Text><br/>
            </Col>
            <Col span={3}>
                 <Button style={{height: 70, width: 80, marginTop: 30,marginBottom: 15  }}><Icon type="caret-up" theme="filled" /><br/> 1024</Button>
            </Col>
         </Row>
            </Col>
            </Row>

            </Layout>
        )
    }
}
details.protoType={
    uploadFirsToProductbeforUploadAllProductDataImage: PropTypes.func.required
}
const mapStateToProps = (state) => ({
    firsdataImageForProduct: state.data.firsdataImageForProduct,
})
export default connect(mapStateToProps,{uploadFirsToProductbeforUploadAllProductDataImage})(Form.create()(details));
