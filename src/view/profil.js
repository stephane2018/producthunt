import React from 'react'
import Contents from '../includeComponnent/content'
import Navbar from '../includeComponnent/header'
import {getproduits} from '../redux/actions/dataActions'
import { getUserData } from '../redux/actions/userActions'
//import { Link } from 'react-router-dom'
import {Row, Col, Layout,Typography, Avatar, Button} from 'antd';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Item from '../includeComponnent/items';
const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content } = Layout;
class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          loading: false,
          errors: {}
        }
    }
    //Lo
   //Load UserData
   componentDidMount(){
    this.props.getUserData();
  }
  
  render() {
   const {credentials:{email, defaultprofilUrlImage, alias, name, website}}= this.props.user;//access form user data
   const {produitsvoted}= this.props.user;//access form user data
  console.log(produitsvoted);
    return (
        <Layout className="layout">
        <Navbar/>
        <div>
        <br/>
        <Row  style={{ background: '#505d6c', marginLeft: 60, marginRight: 60, marginBottom: 10 }}>
            <Col span={5} style={{ marginLeft: 60 , marginBottom: 10, padding:10}}>
            <center><Avatar size={128} src={defaultprofilUrlImage} icon="user" /></center>
            </Col>
            <Col span={11} style={{ marginBottom: 10 }}><br/><br/>
                <Title level={4}>{name}</Title>
                <Title level={4}>{alias}</Title>
                <Title level={4}>{alias}</Title>
                
            </Col>
             
            <Col span={5} style={{ marginBottom: 10  }}>
                <center>
                    <p  style={{marginTop:50, right:0}}> 
                    <input type="file" id="imageInput" hidden="hidden" />
        <Button type="primary" htmlType="submit" className="login-form-button" btnClassName="button">Edit</Button>
        
                    </p>
               
                </center>
          
            </Col>
        </Row>
        <Row>
          <Col span={5} style={{ background: '#000000',  marginLeft: 60 }}>
            fdfdf
          </Col>
          <Col span={11}  style={{ marginLeft: 5, marginRight: 5  }}>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}> style={{ background: '#fff', marginTop: 10}}>
          cxwcwxcjjjjjjjjjjjj
           </Col>
          <Col span={20} style={{ background: '#fff', marginTop: 60}}>
           { produitsvoted.map((produits)=>
          <Item key={produits.productId} product={produits} Link={`/produits/${produits.productId}`}
          onChange={this.onHandleChange}/>)
         }
           </Col>
       
          </Col> 
          <Col span={5} style={{ background: '#fff', marginRight: 60}}>
              cxwcwxc
          </Col>
        </Row>
        </div>
       
        </Layout>
    )
  }
}

Profil.propType={
    getproduits: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.required, 
    data: PropTypes.object.required,   
}
 const mapStateToProps = (state) => ({
   user: state.user, 
   data: state.data
})

const mapActionsToProps = {
    getUserData , getproduits
}

export default connect(mapStateToProps,mapActionsToProps)(Profil)
