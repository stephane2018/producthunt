import React from 'react';
import axios from 'axios'
import Item from './items'
//import { Link } from 'react-router-dom'
import { Row, Col} from 'antd';

axios.defaults.baseURL='https://us-central1-producthunts-cf964.cloudfunctions.net/api';

export default class Conteneur extends React.Component {
 
  state={
    productsData: []
  }
  componentDidMount(){
   axios.get('/productListes')
    .then((res)=>{
      console.log(res.data);
      this.setState({ 
        productsData: res.data
      })
    })
    .catch((err)=>console.log(err));
  }
  render() {
      
      let recentProduct= this.state.productsData ? (
      
        this.state.productsData.map((productsData)=><Item key={productsData.productId} product={productsData}/>)
      ):(
        <p>en  cours dechargement ...</p>
      );

    return (
       <div>
        <Row>
          <Col span={24}>
          {recentProduct}
          </Col> 
       </Row>  
        </div>
      );
    }

  }
