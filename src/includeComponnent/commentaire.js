import React from 'react';
import axios from 'axios'
import Item from './items'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitComment , getcomments} from '../redux/actions/dataActions';
import {getUserData} from '../redux/actions/userActions';
//import { Link } from 'react-router-dom'
import {Comment, Avatar, Form, Button, List, Input, Tooltip} from 'antd';
import moment from 'moment';

const { TextArea } = Input;

//axios.defaults.baseURL='https://us-central1-producthunts-cf964.cloudfunctions.net/api';


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

 class Commentaires extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
      comments: [],
      submitting: false,
      value: '',
      produitIdparam: null
    };
   }
   componentDidMount() {
    this.props.getUserData();
    this.props.getcomments(this.props.idProduit);
  }
  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userComment={
      body: this.state.value, 
      productId:this.props.idProduit, 
      userHandler:this.props.user.handle, 
      userImage: this.props.user.defaultprofilUrlImage
    }
    console.log(userComment);
     this.props.submitComment(this.props.idProduit, { body: this.state.value });
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };



  render() {
    const { submitting, value } = this.state;
    const {authenticated, email, defaultprofilUrlImage, name, userId, handle} = this.props.user;
    const comments= this.props.comments;
    console.log(this.props.comments);
   
    let data=[]; 
   this.props.comments.forEach((comment, i) => {
      const datas = {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: `${comment.username}`,
        avatar:  `${comment.userProfilImage}`,
        content: (
          <p>
           {comment.body}
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment()
                .subtract(1, 'days')
                .fromNow()}
            </span>
          </Tooltip>
        ),
      }
      data.push(datas)

  })
  console.log(data);
    return (
      <div>
      <h2> Ajouter Un Commentaire au produit </h2>
      <Comment
        avatar={
          <Avatar
            src={defaultprofilUrlImage}
            alt={name}
          />
        }
        content={
          <Editor
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
          />
        }      
      />      
     
    <List
    className="comment-list"
    header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <li>
        <Comment
          actions={item.actions}
          author={item.author}
          avatar={item.avatar}
          content={item.content}
          datetime={item.datetime}
        />
      </li>
    )}
  />

    </div>
      
    )
  }
}
Commentaires.propTypes = {
  submitComment: PropTypes.func.isRequired,
  produitId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  getUserData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user.credentials,
  comments: state.data.comments
});
export default connect( 
  mapStateToProps,
  { submitComment, getUserData, getcomments })(Commentaires); 