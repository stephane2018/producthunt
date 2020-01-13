import React from 'react'
import '../style.css'
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import Navbar from '../includeComponnent/header'
import Commentaires from '../includeComponnent/commentaire'
import Markersworkers from '../includeComponnent/markersworkers'
import ProductHunt from '../includeComponnent/RadiohuntProduct'
import LastStories from '../includeComponnent/lastStories'
import Discussion from '../includeComponnent/discussion'
import {
  LOADING_DATA
} from '../redux/types';
import { likeproduits, unlikeproduits,getproduit, getcomments } from '../redux/actions/dataActions';
//import { Link } from 'react-router-dom'
import {Row,Card,Button,Form, Icon, Divider, Col, Layout,Typography,  Comment, Tooltip, List , Input, Avatar } from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content } = Layout;
const { TextArea } = Input;
 
 class detailsProduct extends React.Component {
   
    state = {
        value: '',
      };

      addClickHandler = () => {
        this.props.add();
    }
      likedproduits = () => {
        if (
          this.props.user.likes && 
          this.props.user.likes>0 &&
          this.props.user.likes.find(
            (like) => like.produitId === this.props.product.productId
          )
        )
          return true;
        else return false;
      };
      likeproduits = () => {
        
        this.props.likeproduits(this.props.match.params.produitId);
      };
      unlikeproduits = () => {
        this.props.unlikeproduits(this.props.match.params.produitId);
      };
      componentWillReceiveProps(nextProps) {
       
        if (this.props.data.vote !== nextProps.data.vote) {
            this.setState({
                vote: nextProps.data.vote,

            });
        }
      }
    
      onChange = ({ target: { value } }) => {
        this.setState({ value });
      };
      componentDidMount() {
        this.props.getproduit(this.props.match.params.produitId);
        this.props.getcomments(this.props.match.params.produitId);
      }
     
      render() {
        const { value } = this.state;
        const {comments}= this.props.data.comments; 
        const {authenticated}= this.props.user;
        console.log(this.props.data.comments);
        console.log(this.state);
        const  likeButton = !authenticated ? (
          <p> Connectez vous svp</p>
          ) : this.likedproduits() ? (
           
            <Button onClick={this.unlikeproduits}  style={{height: 70, width: 80, marginTop: 40, marginRight: 20, marginLeft: 90   }}><Icon type="caret-up" theme="filled" /><br/> {this.state.vote!=null?  this.state.vote:this.props.data.produit.upvote}</Button>
  
          ) : (
            <Button onClick={this.likeproduits}  style={{height: 70, width: 80, marginTop: 40, marginRight: 20, marginLeft: 90   }}><Icon type="caret-down" theme="filled" /><br/> {this.state.vote!=null? this.state.vote :this.props.data.produit.upvote}</Button>
          );
        return (
            <Layout className="layout">
            <Navbar/>
            <Content style={{ padding: '50px' }}>
            <div style={{ padding: 10 }}>
              
            <Row>
            <Col span={21}>
              <Avatar src={this.props.data.produit.UserImagefirst} size={64}/>
              <Title level={2}>{this.props.data.produit.productName}</Title>
              <Title level={4}>{this.props.data.produit.tagline}</Title>
            </Col>
            <Col span={16} style={{background: "#fff", margin: 10}}>
            <Col >
            <Card style={{ background: "#ffffff", marginTop: 30}}>
                { this.props.data.produit.UserImagefirst!=null?(
                 <div style={{backgroundImage: `url(${this.props.data.produit.UserImagefirst})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 270}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }
                {/* <div style={{ background: '#f3f3f3', height: 270 }}/> */}
                
                <Row >
                <Col span={3}>
                { this.props.data.produit.Userproduct1!=null?(
                 <div style={{backgroundImage: `url(${this.props.data.produit.Userproduct1})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }
                </Col>
                <Col span={3}>
                { this.props.data.produit.Userproduct2!=null?(
                 <div style={{backgroundImage: `url(${this.props.data.produit.Userproduct2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }                </Col>

                <Col span={3}>
                { this.props.data.produit.Userproduct3!=null?(
                 <div style={{backgroundImage: `url(${this.props.data.produit.Userproduct3})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 50, width: 50}}></div>

                )
                :(
                    <div style={{background: '#fff', height: 50, width: 50, border: "1px dashed #e8e8e8"}}></div>
                )
                }                </Col>
                </Row>
                </Card>
             <Card style={{ background: "#ffffff", marginTop: 30}}>
            
             <Divider />
             {this.props.data.produit.description}
            <br/>
             Have a question about this product? Ask the Makers<br/><br/>
             <Button>Twitter</Button>
             <Button>Facebook</Button>
             <Button><Icon type="plus" /></Button>
              </Card>
            </Col>  
            <Commentaires idProduit={this.props.match.params.produitId} />
            </Col> 
             
            <Col span={7}> 
              {likeButton}
              <Button  style={{height: 50, width: 120, marginTop: 40, marginRight: 20, marginLeft: 90   }}><Icon type="caret-up" theme="filled" /><br/> {this.props.data.produit.website}</Button>
              <Markersworkers/>
              <ProductHunt/> 
              <LastStories />
              <Discussion />
              <div style={{ margin: 10}} >
               <Title level={4}>Hiring Now </Title>
                <Row  style={{ background: '#fff', width:'auto', padding: 10 }}>
                <Col style={{marginBottom: 80}} > 
                <Col  xs={2} sm={4} md={6} lg={8} xl={15}>
                   <p className="marge" style={{fontSize: '13px', fontWeight: '600'}}  >Cras sit amet nibh libero, in gravida nulla.</p>              
                    <Text type="secondary">By stephane Biteb </Text>
                 </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 70, width: 110, boxShadow: 5, borderRadius: 3}} /> 
                </Col>
           
               </Col>
               <Col style={ {paddingTop: 15, borderTop: '1px solid #e8e8e8',  marginBottom: 80}} > 
                <Col xs={2} sm={4} md={6} lg={8} xl={15}>
                   <p className="marge" style={{fontSize: '13px', fontWeight: '600'}}  >Cras sit amet nibh libero, in gravida nulla.</p>              
                    <Text type="secondary">By stephane Biteb </Text>
                 </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 70, width: 110, boxShadow: 5, borderRadius: 3}} /> 
                </Col>
              
               </Col>

               <Col style={{paddingTop: 15, borderBottom: '1px solid #e8e8e8' }} > 
                <Col xs={2} sm={4} md={6} lg={8} xl={15}>
                   <p className="marge" style={{fontSize: '13px', fontWeight: '600'}}  >Cras sit amet nibh libero, in gravida nulla.</p>              
                    <Text type="secondary">By stephane Biteb </Text>
                 </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 70, width: 110, boxShadow: 5, borderRadius: 3}} /> 
                </Col>
               </Col>
              
               <Col  > 
                <Col span={24}><br/>
                <hr/>
                {/* <a href="" style={{ color:'#cc4d29', 'alignItems': 'center', fontWeight: '600px', fontSize: '11px'  }}><center> JOIN THEM ON MAKERS </center></a> */}

                 </Col>
               </Col>
                
               </Row>
          
              </div>
              
              <div style={{ margin: 10}} >
               <Title level={4}>Top discussion </Title>
                <Row  style={{ background: '#fff', width:'auto', padding: 10 }}>
                <Col style={{marginBottom: 80}} > 
                <Col  xs={2} sm={4} md={6} lg={8} xl={15}>
                   <p className="marge" style={{fontSize: '13px', fontWeight: '600'}}  >Cras sit amet nibh libero, in gravida nulla.</p>              
                    <Text type="secondary">By stephane Biteb </Text>
                 </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 70, width: 110, boxShadow: 5, borderRadius: 3}} /> 
                </Col>
           
               </Col>
               <Col style={ {paddingTop: 15, borderTop: '1px solid #e8e8e8',  marginBottom: 80}} > 
                <Col xs={2} sm={4} md={6} lg={8} xl={15}>
                   <p className="marge" style={{fontSize: '13px', fontWeight: '600'}}  >Cras sit amet nibh libero, in gravida nulla.</p>              
                    <Text type="secondary">By stephane Biteb </Text>
                 </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 70, width: 110, boxShadow: 5, borderRadius: 3}} /> 
                </Col>
              
               </Col>

               <Col style={{paddingTop: 15, borderBottom: '1px solid #e8e8e8' }} > 
                <Col xs={2} sm={4} md={6} lg={8} xl={15}>
                   <p className="marge" style={{fontSize: '13px', fontWeight: '600'}}  >Cras sit amet nibh libero, in gravida nulla.</p>              
                    <Text type="secondary">By stephane Biteb </Text>
                 </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                  <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 70, width: 110, boxShadow: 5, borderRadius: 3}} /> 
                </Col>
               </Col>
              
               <Col  > 
                <Col span={24}><br/>
                <hr/>
                {/* <a href="" style={{ color:'#cc4d29', 'alignItems': 'center', fontWeight: '600px', fontSize: '11px'  }}><center> JOIN THEM ON MAKERS </center></a> */}
                 </Col>
               </Col>
                
               </Row>
          
              </div>
              

            </Col>
          </Row>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          
          </Layout>
          
        );
      }
  
    }
detailsProduct.protoType={
  uploadFirsToProductbeforUploadAllProductDataImage: PropTypes.func.required,
  likeproduits: PropTypes.func.isRequired,
  unlikeproduits: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
const mapDispatchToProps = dispatch =>  {
  return {
      add : () => dispatch({types: LOADING_DATA}),
  }
}
const mapActionsToProps = {
  likeproduits,
  unlikeproduits, 
  getproduit, 
  getcomments
};
  const mapStateToProps = (state) => ({
      data: state.data,
      comments: state.data.comments,
      user: state.user
  })
  export default connect(mapStateToProps,mapActionsToProps)(Form.create()(detailsProduct));
  