import React from 'react'
import '../style.css'
import Navbar from '../includeComponnent/header'
import Contents from '../includeComponnent/content'
import Markersworkers from '../includeComponnent/markersworkers'
import ProductHunt from '../includeComponnent/RadiohuntProduct'
import LastStories from '../includeComponnent/lastStories'
import Discussion from '../includeComponnent/discussion'

//import { Link } from 'react-router-dom'
import {Row, Col, Layout,Typography} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content } = Layout;

export default class Home extends React.Component {
   
    
      render() {
        return (
            <Layout className="layout">
            <Navbar/>
            <Content style={{ padding: '50px' }}>
            <div style={{ padding: 10 }}>
            <Title level={4}>Popular This Month</Title>
            <Row>
            <Col span={16}  style={{ background: '#fff',  margin: 10 }}>
             <Contents/>
            </Col> 
            <Col span={7}>  
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
  