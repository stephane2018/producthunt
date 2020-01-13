import React, { Component } from 'react'
import  {Link} from 'react-router-dom'
import { Button, Row, Col, Icon, Typography} from 'antd';
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {
  LOADING_DATA
} from '../redux/types';
import { likeproduits, unlikeproduits } from '../redux/actions/dataActions';
const { Title } = Typography;
const { Text } = Typography;
export class Items extends Component {
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
    
    this.props.likeproduits(this.props.product.productId);
  };
  unlikeproduits = () => {
    this.props.unlikeproduits(this.props.product.productId);
  };
  
    render() {
        const {authenticated}= this.props.user;
        const { product:{productId, productName, description, ProductImage,upvote, commentCount}}= this.props
        const  likeButton = !authenticated ? (
        <p> Connectez vous svp</p>
        ) : this.likedproduits() ? (
         
          <Button onClick={this.unlikeproduits}  style={{height: 70, width: 80, marginTop: 40, marginRight: 20, marginLeft: 90   }}><Icon type="caret-up" theme="filled" /><br/> {upvote}</Button>

        ) : (
          <Button onClick={this.likeproduits}  style={{height: 70, width: 80, marginTop: 40, marginRight: 20, marginLeft: 90   }}><Icon type="caret-down" theme="filled" /><br/> {upvote}</Button>
        );
        return (
        <Row onClick={this.showModal} >
        <Col span={3}>
        <Link to={this.props.Link} id={this.productId}><img src={ProductImage} className="logo" alt="logo"   style={{padding: "20px", height: 100, width: 100, boxShadow: 5}} /> </Link> 
         </Col>
         <Col span={15}>
          <Link to={this.props.Link}><Title level={3} style={{paddingTop: 5}}> {productName}</Title></Link>
          <Text>{description}
           </Text><br/>
           <Button style={{marginTop: 10 , marginBottom: 5}} ><Icon type="message" theme="filled" />{commentCount}</Button>
           <Button style={{marginTop: 10 , marginBottom: 5, marginLeft: 10}} ><Icon type="message" theme="filled" /></Button>
         </Col>
         <Col span={3}>
         <Button onClick={this.likeproduits}  style={{height: 70, width: 80, marginTop: 40, marginRight: 20, marginLeft: 90   }}><Icon type="caret-down" theme="filled" /><br/> {upvote}</Button>
        </Col>
       </Row>  
        )
    }
}
Items.propTypes = {
  user: PropTypes.object.isRequired,
  produitId: PropTypes.string.isRequired,
  likeproduits: PropTypes.func.isRequired,
  unlikeproduits: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch =>  {
  return {
      add : () => dispatch({types: LOADING_DATA}),
  }
}
const mapStateToProps = (state) => ({
  user: state.user
});
const mapActionsToProps = {
  likeproduits,
  unlikeproduits
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Items)
