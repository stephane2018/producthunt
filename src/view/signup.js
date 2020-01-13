import React from 'react';
import { Form, Row, Col, message, Avatar, Typography, Spin  } from 'antd';
import axios from 'axios'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
axios.defaults.baseURL='https://us-central1-producthunts-cf964.cloudfunctions.net/api';
// Configure Firebase.

const { Title } = Typography;
const config = {
    apiKey: 'AIzaSyDzS0MikOvFnmVmKUTxsMtRYhbAok3bzE8',
    authDomain: 'producthunts-cf964.firebaseapp.com',
    // ...
  };
  firebase.initializeApp(config);

class Signup extends React.Component {
  constructor(props) {
    super(props)
    props= this.props;
  }
  
 // The component's Local state.
 state = {
    isSignedIn: false,  // Local signed-in state.
  };
 
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInSuccessUrl: '/',

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
 
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
  );
  

    if(this.state.isSignedIn){
        
    const userdetails=firebase.auth().currentUser
    const newUser={
        name:userdetails.displayName,
        email: userdetails.email,
        handle: 'users',
        password: '123456az',
        website: "https://firebasestorage",
        createdAt: new Date().toISOString(),
        defaultprofilUrlImage: userdetails.photoURL,
        userId: userdetails.uid,
        disableAccount: 0
    }
   //SAve to database of users with axios 
   axios.post('/signup', newUser,  { headers: {'Content-Type': 'application/json'}})
   .then(res=>{
     console.log(res.data);
   })
   .then(err=>{
    console.log(err.response.data);
    
    
    });
    } 
   
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      
      <Row>
      
      <Col span={12} offset={6}>
      <Form onSubmit={this.handleSubmit} className="login-form">
      {/* The button will execute the handler function set by the parent component */}
     
        <Form.Item>
         
          {/* <a className="login-form-forgot" href="">
            Forgot password auth/user-not-found
          </a><br/> */}
          <center>
         <br/>
        {
         !this.state.isSignedIn ?
       (

        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div> 
      )
      :
        (
      <div>
        <h1>ProductHunt</h1>
        <Avatar size={64} icon="user" src={firebase.auth().currentUser.photoURL}  alt="profile picture"  /><br/>
        Welcome <Title level={4}>{firebase.auth().currentUser.displayName}</Title> 
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    )
    
        }
    
          </center>
        
        </Form.Item>
      </Form>
     
      </Col>
    </Row>
    );
  }
}

export default Form.create()(Signup);
