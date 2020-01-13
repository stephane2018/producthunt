import React from 'react';
import logo from '../logo.svg'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from '../firebase/firebase';
import { getUserData, logoutUser } from '../redux/actions/userActions';
import { Button, Row, Col, Layout, Menu, Input, Modal, Avatar, Icon, Tooltip, Dropdown } from 'antd'
import Login from '../view/login'
//import Signup from '../view/signup'
import SignupSimple from '../view/signupSimple'
import Addproduit from '../view/product/addlinkproduit'
import firebase from 'firebase';
const { SubMenu } = Menu;
const { Search } = Input;
const { Header} = Layout;

class HeaderPart extends React.Component {
  // The component's Local state.
  constructor(props) {
    super(props)
    this.props.getUserData();
    this.state = {
      visible: false, 
      visibleSignup: false , 
  };
 
  }
 
    showModalLogin = () => {
      this.setState({
        visible: true,
      });
    };
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    
    showModalSignup = () => {
      this.setState({
        visibleSignup: true,
      });
    };
    handleOkForSignup = e => {
      console.log(e);
      this.setState({
        visibleSignup: false,
      });
    };
  
    handleCancelforSignup = e => {
      console.log(e);
      this.setState({
        visibleSignup: false,
      });
    };
    componentDidMount() {
      this.props.getUserData();
      
    }
    componentWillReceiveProps(nextProps) {
      if (!this.props.name && nextProps.name) {
     
      this.setState({ authenticated: nextProps.name });
  
      }
    }
    handleLogout = () => {
      this.props.logoutUser();
    };
    render() {
      const {authenticated, email, defaultprofilUrlImage, name, userId, handle} = this.props.user;
      let isUserIsconnect=email? true: false;
      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href={`/user/profil/${handle}`}>My Profile</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href={`/user/settings/${handle}`}>Settings</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="" onClick={this.handleLogout} >Logout</a>
          </Menu.Item> 
        </Menu>
      );
      return (
        <Header  className="headermenuBar">
        <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={7}>
    <a href={`/`}><img src={logo} className="logo" alt="logo"   style={{paddingRight: "20px"}} /></a>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
    <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={'2'}
          style={{ lineHeight: '64px', width: 500 }}>
          <Menu.Item key="1">Deals</Menu.Item>
          <Menu.Item key="2">Jobs</Menu.Item>
       
          <Menu.Item key="4">Jobs</Menu.Item>
          <Menu.Item key="5">hgfhgfh</Menu.Item>
          <Menu.Item key="6">gfhfgh</Menu.Item>
          
          <SubMenu
          key="sub1"
          title={
            <span>
              <span>Navigation</span>
            </span>
          }
        >
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </SubMenu>
          
          </Menu>
    </Col>
     <Col xs={20} sm={16} md={12} lg={8} xl={5}>
     {isUserIsconnect ?
       (
       
        <div style={{float: "right"}}>
          <Col span={12}>
            <Tooltip title="Poster un produit">
            <a href={`/product/Ajouterproduit/new`}>
            <Icon type="plus" component={this.Addproduit} />  
            </a>
            </Tooltip>
          </Col>
          <Col span={12}  style={{paddingRight: "40px"}}>
          <Dropdown overlay={menu} trigger={['click']}>
          <Tooltip title={name}>
             <Avatar src={defaultprofilUrlImage} />
          </Tooltip>  
          </Dropdown>
          </Col>
         </div>
       )
      :
        (
          <div style={{float: "right"}}>
          <Col span={12}>
          <Button onClick={this.showModalLogin}>LOG IN </Button> 
          </Col>
          <Col span={12}  style={{paddingRight: "40px"}}>
            <Button className="signInLoginButtonStyle" onClick={this.showModalSignup}>SIGN UP</Button>
          </Col>
          </div>
          
        )} 
    </Col>
  </Row>
  <Modal
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            
            >
            <Login />
     </Modal>
     <Modal
              visible={this.state.visibleSignup}
              onOk={this.handleOkForSignup}
              onCancel={this.handleCancelforSignup}
            >
            <SignupSimple  />
     </Modal>
       
      </Header>
      
      );
    }

  }
 
  HeaderPart.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    user: state.user.credentials
    
  });
  export default connect(mapStateToProps,  { getUserData, logoutUser })(HeaderPart)
