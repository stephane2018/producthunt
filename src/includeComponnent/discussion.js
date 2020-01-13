import React from 'react';
//import { Link } from 'react-router-dom'
import { Row, Col,Typography,} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
export default class discussion extends React.Component {
    render() {
      return (
        <div style={{ margin: 10}} >
        <Title level={4}>Product Hunt Radio </Title>
         <Row  style={{ background: '#fff',  padding: 10 }}>
         <Col > 
         <Col xs={2} sm={4} md={6} lg={8} xl={15}>
        <Text style={{fontSize: '13px', fontWeight: '600'}}  >The 5 Effective Frameworks for Building a Happy and Healthy Remote Team
         By Angela Jeffrey </Text>
          </Col>
         <Col xs={20} sm={16} md={12} lg={8} xl={4}>
       <img src="https://images.unsplash.com/photo-1571285933705-b12a52ea92a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" className="logo" alt="logo"   style={{height: 100, width: 100, boxShadow: 5, borderRadius: 3}} /> 
          
         </Col>
        </Col>
        </Row>
       
       </div>
       
      );
    }

  }
