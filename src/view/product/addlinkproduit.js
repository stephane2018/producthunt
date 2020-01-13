import React from 'react'
import '../../style.css'
import Navbar from '../../includeComponnent/header'

//import { Link } from 'react-router-dom'
import {Row, Col, Form, Input, Icon,Select, AutoComplete, Layout,Typography, Card, Button} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content,  } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
 class addlinkproduit extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        websiteLink: '',
        confirmDirty: false,
        isFiledIsOk:false,
        autoCompleteResult:[]
      }
    }
    handlewebsiteChange=e=>{
      e.preventDefault();
      this.setState={
        [e.target.name]: e.target.values,
      }
    }
    handleSubmitAndPassToNextPage = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.history.push({
              pathname: '/product/Ajouterproduit/submission',
              state: { website: values.website }
            })
        }else{
          this.Setstate={
            isFiledIsOk: false
           }
        }
      });
    };
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      
      }
      this.setState({ 
        autoCompleteResult, 
       });
    };
   
      render() { 
        const {getFieldDecorator} = this.props.form;
        const { autoCompleteResult, isFiledIsOk } = this.state;
        const websiteOptions = autoCompleteResult.map(website => (
          <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
       console.log(isFiledIsOk);
        return (
            <Layout className="layout">
            <Navbar/>
            <Row>
            <Col span={12} offset={7}>
                <div style={{paddingTop: '30px' }}>
                <center>Submit a product </center>

               <Card style={{ width: 500 }} >
                <Form onSubmit={this.handleSubmit} className="login-form">
            
            <Form.Item label="Website" hasFeedback validateStatus="success">
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'ENtrer un site internet valide svp!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
            >
              <Input 
                type="text"
                prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="URL of the product(eg https://snaptchat.com)"
                  />
            </AutoComplete>,
          )}
        </Form.Item>
        <center>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmitAndPassToNextPage} >
         Next
          </Button><br/> <br/>
          <p><b>Not ready to launch today?</b></p>
          <p>You can schedule your launch. Learn more</p>
         
          
          </center>
            </Form>
                </Card>
              
                </div>
         
            
            </Col>
            </Row>

            </Layout>
        )
    }
}
export default (Form.create()(addlinkproduit));
