import React from 'react';
//import { Link } from 'react-router-dom'
import {  Row, Col, Typography, Avatar, Tooltip} from 'antd';

const { Title } = Typography;
export default class markersworkers extends React.Component {
 
    render() {
      return (
       <div style={{ margin: 10}} >
               <Title level={4}>Makers working today</Title>
                <Row  > 
                <Col xs={20} sm={16} md={18} lg={8} xl={4}  className="ColunneDegauche"> 
               <Tooltip placement="topLeft" title={"dsqdsqd"}
                arrowPointAtCenter>
                <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
              </Tooltip>
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon="user" />
               <hr/>
               {/* <a href="" style={{ color:'#cc4d29', 'alignItems': 'center', fontWeight: '600px', fontSize: '11px'  }}><center> JOIN THEM ON MAKERS </center></a>       */}
               </Col>
               </Row>
              </div>
       
      );
    }

  }
