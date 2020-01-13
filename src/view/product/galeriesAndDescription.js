import React from 'react'
import '../../style.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import Navbar from '../../includeComponnent/header'
import Item from '../../includeComponnent/items'
//import { Link } from 'react-router-dom'
import { getproduits,savetherestofdata, deleteProduct, uploadFirsToProductbeforUploadAllProductDataImage1, uploadFirsToProductbeforUploadAllProductDataImage2, uploadFirsToProductbeforUploadAllProductDataImage3 } from '../../redux/actions/dataActions';
import {Row, Col, Form, Input,Divider, Upload, message,Checkbox, Icon,Select, AutoComplete, Layout,Typography, Card, Tooltip, Button, Avatar, Descriptions} from 'antd';
import Column from 'antd/lib/table/Column';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content,  } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

 class details extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        loading: false,
      }
      this.handleDescription = this.handleDescription.bind(this);
    }
    cancelAddingProduct = e =>{
        e.preventDefault();
        localStorage.removeItem('imagePrincipale')
        localStorage.removeItem('img1');
        localStorage.removeItem('img2');
        localStorage.removeItem('img3');
        this.props.deleteProduct(this.props.location.state.productId);
    } 
    handleSubmitAndPassToNextPage = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
           
               const produtDate={
                        productName: this.props.location.state.ProductName,
                        tagline:  this.props.location.state.tagline, 
                        topics:  this.props.location.state.topic, 
                        website: this.props.location.state.website,
                        status: true,
                        productId: this.props.location.state.productId,
                        description: values.description,
                        youtube: values.YoutubeLinkVideos, 
                        upvote: 0, 
                        commentCount: 0,
                        checkIfUserWorkedOn: true, 
                     }
                     console.log(produtDate);
              this.props.savetherestofdata( this.props.location.state.productId, produtDate);
              if(this.props.message!="undefined"){
                this.props.history.push({
                    pathname: '/product/Ajouterproduit/succesaddproduct',
                  })
              }
           
        }else{
            message.info("Veuillez bien le formulaire s'il vous avant d'avancer ")
          this.Setstate={
            isFiledIsOk: false
           }
        }
      });
    };
    
      handleImageuploads1=(e)=>{
        e.preventDefault();
        const image= e.target.files[0];
        console.log(image)
        //Send Image To Server 
        const formData = new FormData();
        formData.append('UserProduct1', image, image.name);
        console.log(formData);
        this.props.uploadFirsToProductbeforUploadAllProductDataImage1(this.props.location.state.productId, formData);
      }
      handleImageuploads2=(e)=>{
        e.preventDefault();
        const image= e.target.files[0];
        console.log(image)
        //Send Image To Server 
        const formData = new FormData();
        formData.append('UserProduct2', image, image.name);
        console.log(formData);
        this.props.uploadFirsToProductbeforUploadAllProductDataImage2(this.props.location.state.productId, formData);
      }
      handleImageuploads3=(e)=>{
        e.preventDefault();
        const image= e.target.files[0];
        console.log(image)
        //Send Image To Server 
        const formData = new FormData();
        formData.append('UserProduct3', image, image.name);
        console.log(formData);
        this.props.uploadFirsToProductbeforUploadAllProductDataImage3(this.props.location.state.productId, formData);
      }
      handleClickImageuploads1 = () => {
        const fileInput = document.getElementById('addImage1');
        fileInput.click();
      };
      handleClickImageuploads2 = () => {
        const fileInput = document.getElementById('addImage2');
        fileInput.click();
      };
      handleClickImageuploads3 = () => {
        const fileInput = document.getElementById('addImage3');
        fileInput.click();
      };
     
      handleDescription= event => {
        this.setState({ 
            description: event.target.value
        });
      };
      render() { 
        const {getFieldDecorator} = this.props.form;
      //const {UserProduct1}=this.props.firsdataImageForProduct1;
        const image1= localStorage.getItem('img1')!=''? localStorage.getItem('img1'):null;
        const image2= localStorage.getItem('img2')!=''? localStorage.getItem('img2'):null;
        const image3= localStorage.getItem('img3')!=''? localStorage.getItem('img3'):null;
        console.log(this.props.location.state);
        return (
            <Layout className="layout">
            <Navbar/>
            <Row style={{margin: 50}}>
            <Col span={12} >
            <Title level={2} >👋 Tell Us More About the product </Title>
            <Card style={{ width: 570, background: "#ffffff"}}>
                <Form onSubmit={this.handleSubmitAndPassToNextPage}>
                <p><b>Gallery</b><br/> Recommended size: 1270x760px</p>
                Upload image or paste URL<br/>
                <div style={{ background: '#fff', height: 120, width: 500, alignItems: "center", justifyContent:"center", WebkitBoxAlign:"center",  borderRadius: 3, border: "1px dashed #e8e8e8", display: "flex", flexFlow: "column"}} >
                    <input type="file" id="addImage1" hidden="hidden" onChange={this.handleImageuploads1} />
                    <input type="file" id="addImage2" hidden="hidden" onChange={this.handleImageuploads2} />
                    <input type="file" id="addImage3" hidden="hidden" onChange={this.handleImageuploads3} />
                    <svg onClick={this.handleClickImageuploads1} width="50" height="38" viewBox="0 0 50 38" xmlns="http://www.w3.org/2000/svg" class="icon_e4eef clickable_1ca0f"><g fill="none" fill-rule="evenodd"><path d="M33.25 4.75H1.583C.71 4.75 0 5.459 0 6.333v25.334c0 .874.709 1.583 1.583 1.583H33.25c.874 0 1.583-.709 1.583-1.583V6.333c0-.874-.709-1.583-1.583-1.583z" fill="#D4D4D4"></path><g transform="rotate(7 -35.51 56.656)"><path d="M33.25 0H1.583C.71 0 0 .709 0 1.583v25.334C0 27.79.709 28.5 1.583 28.5H33.25c.874 0 1.583-.709 1.583-1.583V1.583C34.833.71 34.124 0 33.25 0z" fill="#E6E6E6"></path><path d="M31.667 26.125h-28.5a.792.792 0 0 1-.792-.792V3.167c0-.438.354-.792.792-.792h28.5c.437 0 .791.354.791.792v22.166a.792.792 0 0 1-.791.792z" fill="#FFF"></path><circle fill="#E6E6E6" cx="15.042" cy="8.708" r="2.375"></circle><path d="M19.334 22.167l-6.9-6.893a.792.792 0 0 0-1.16.044l-4.75 5.54a.792.792 0 0 0 .601 1.309h12.21z" fill="#C9C6C6"></path><path d="M28.349 20.91l-6.334-8.71a.792.792 0 0 0-1.266-.02l-7.772 9.986h14.731a.792.792 0 0 0 .64-1.258z" fill="#E6E6E6"></path></g><path d="M41.958 0a7.917 7.917 0 1 0 7.917 7.917A7.94 7.94 0 0 0 41.958 0zm3.959 8.576h-3.299v3.299h-1.32V8.576H38v-1.32h3.299V3.959h1.32v3.299h3.298v1.32z" fill="#2A7BFF" fill-rule="nonzero"></path></g></svg>
                     <p><Button type="button" onClick={this.handleClickImageuploads2} style={{WebkitAppearance:Button,  cursor:"pointer", whiteSpace: "nowrap", border: 0, background: 0, padding:0 ,color:"#cc4d29"}}>Upload image</Button> or <Button type="button" onClick={this.handleClickImageuploads3} style={{WebkitAppearance:Button,  cursor:"pointer", whiteSpace: "nowrap", border: 0, background: 0, padding:0 ,color:"#cc4d29"}}>paste URL</Button></p> 
                </div>
                <Row  style={{marginTop:10}}>
                <Col span={3}>
                { image1!=null?(
                 <div style={{backgroundImage: `url(${image1})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }
                </Col>
                <Col span={3}>
                { image3!=null?(
                 <div style={{backgroundImage: `url(${image2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }  
                </Col>

                <Col span={3}>
                { image3!=null?(
                 <div style={{backgroundImage: `url(${image3})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }                </Col>
                </Row>
                <Form.Item label="Youtube Video " >
                    {getFieldDecorator('YoutubeLinkVideos', {
                        rules: [{ required: true, message: 'Entrer un site internet valide svp!' }],
                    })(
                       <Input
                        type="text"
                        prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Videos of product " 
                        />
                    )}
                </Form.Item>
                <Form.Item label="Description" >
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Veuillez decrire votre projet s\'il vous plait !' }],
                    })(
                        <TextArea rows={4}
                        onChange={this.handleDescription}
                        />
                    )}
                </Form.Item>
                 <Form.Item label="Are you a Maker of this product?">
                    {getFieldDecorator('fsdfsf', {
                        valuePropName: 'status',
                        initialValue: false,
                    })(<Checkbox>Yes, I worked on this product</Checkbox>)}
                 </Form.Item>
                 <Button type="primary" htmlType="submit" className="login-form-button"  >
                   Save
                    </Button>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.cancelAddingProduct} >
                   cancel
                    </Button>
                </Form>
            </Card>
            </Col>
            <Col span={10} >
                <Title level={4}>Preview </Title>
                <Card style={{ background: "#ffffff", marginTop: 30}}>
                 { image1!=null?(
                 <div style={{backgroundImage: `url(${image1})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 270 }}></div>

                )
                :(
                    <div style={{ background: '#f3f3f3', height: 270 }}/>
                    )
                } 
                <Row >
                <Col span={3}>
                { image1!=null?(
                 <div style={{backgroundImage: `url(${image1})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50}}></div>

                )
                :(
                    <div style={{ background: '#f3f3f3', height: 50, width: 50}}></div>
                )
                }  
                </Col>
                <Col span={3}>
                { image2!=null?(
                 <div style={{backgroundImage: `url(${image2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50}}></div>

                )
                :(
                    <div style={{ background: '#f3f3f3', height: 50, width: 50}}></div>
                )
                }                  </Col>

                <Col span={3}>
                { image3!=null?(
                 <div style={{backgroundImage: `url(${image3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50}}></div>

                )
                :(
                    <div style={{ background: '#f3f3f3', height: 50, width: 50}}></div>
                )
                }                  </Col>
                </Row>
                </Card>
             <Card style={{ background: "#ffffff", marginTop: 30}}>
             <Button>Twitter</Button>
             <Button>Facebook</Button>
             <Button><Icon type="plus" /></Button>
             <Divider />
             <p>{this.state.description!=''? (<b>{this.state.description}</b>):"Descriopn du produit "}</p>
             Have a question about this product? Ask the Makers
              </Card>
            </Col>
            </Row>

            </Layout>
        )
    }
}
details.protoType={
    uploadFirsToProductbeforUploadAllProductDataImage1: PropTypes.func.required,
    uploadFirsToProductbeforUploadAllProductDataImage2: PropTypes.func.required,
    uploadFirsToProductbeforUploadAllProductDataImage3: PropTypes.func.required

}
const mapStateToProps = (state) => ({
    firsdataImageForProduct1: state.data.firsdataImageForProduct1,
    firsdataImageForProduct2: state.data.firsdataImageForProduct2,
    firsdataImageForProduct3: state.data.firsdataImageForProduct3,
  })
export default connect(mapStateToProps,{
    savetherestofdata,
    deleteProduct,
    uploadFirsToProductbeforUploadAllProductDataImage1,
    uploadFirsToProductbeforUploadAllProductDataImage2,
    uploadFirsToProductbeforUploadAllProductDataImage3,   })(Form.create()(details));
