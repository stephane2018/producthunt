import React from 'react'
import '../style.css'
import Navbar from '../includeComponnent/header'
import Contents from '../includeComponnent/contentaires'
import Markersworkers from '../includeComponnent/markersworkers'
import ProductHunt from '../includeComponnent/RadiohuntProduct'
import LastStories from '../includeComponnent/lastStories'
import Discussion from '../includeComponnent/discussion'

//import { Link } from 'react-router-dom'
import {Row, Col, Layout,Typography} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content } = Layout;

export default class posts extends React.Component {
    render() {
        return (
            <Layout className="layout">
            <Navbar/>
            <Content style={{ padding: '50px' }}>
            <div style={{ padding: 10 }}>
            <Title level={4}>Popular This Month</Title>
            <Row >
            <Col span={16}  style={{ background: '#fff',  margin: 10 }}>
             <Contents/>
            </Col> 
            <Col span={7}>  
              <Markersworkers/>
              <ProductHunt/> 
              <LastStories />
              <Discussion />
         
            </Col>
          </Row>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          
          </Layout>
        );
    }
}