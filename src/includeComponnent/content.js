import React from 'react';
import axios from 'axios'
import Item from './items'
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom'
import { Row, Col, Skeleton, Empty, Button} from 'antd';
import { connect } from 'react-redux';
import { getproduits } from '../redux/actions/dataActions';

 class Conteneur extends React.Component {
   
  componentDidMount() {
    this.props.getproduits();
  }
  onHandleChange(){
    console.log("update");
  }
  render() {
    const { produits, loading } = this.props.data;
    console.log(this.props.data.produits);
      let recentProduct= !loading ? (
        (Object.keys(produits).length == 0 ?
        <Empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    imageStyle={{
      height: 150,
    }}
    description={
      <span>
        <b>Aucun produits n'as été publié jusqu'ici</b>
      </span>
    }
  >
  </Empty>
   :produits.map((produits)=>
   <Item key={produits.productId} product={produits} Link={`/produits/${produits.productId}`}
   onChange={this.onHandleChange}/>)
        )
      ):(
        <div> 
        <Skeleton avatar paragraph={{ rows: 3 }} />
        <Skeleton avatar paragraph={{ rows: 3 }} />
        <Skeleton avatar paragraph={{ rows: 3 }} />
        </div>
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
  Conteneur.propTypes = {
    getproduits: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getproduits }
  )(Conteneur)