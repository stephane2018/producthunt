import React from 'react'
import '../../style.css'
import Navbar from '../../includeComponnent/header'

//import { Link } from 'react-router-dom'
import { Result, Button , Row, Col, Form, Input, Icon,Select, AutoComplete, Layout,Typography, Card} from 'antd';

const { Title } = Typography;
const { Text } = Typography;
const { Footer, Content,  } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
 class succesaddproduct extends React.Component {
    constructor(props) {
      super(props)
     
    }
  
    nextPage = e => {
      e.preventDefault();
      
            this.props.history.push({
              pathname: '/',
            })
       
    };
  
   
      render() { 
      
        return (
            <Layout className="layout">
            <Navbar/>
            <Row>
            <Col span={12} offset={7}>
                <div style={{paddingTop: '30px' }}>
                <Card style={{ width: 500 }} >
                <Result
                    status="success"

                   // icon={<Icon type="smile" theme="twoTone" />}
                    title="Bravo votre projet a bien été créer "
                    extra={<Button onClick={this.nextPage} type="primary">Aller a la page d'acceuil</Button>}
                />
                </Card>
                </div>
         
            
            </Col>
            </Row>

            </Layout>
        )
    }
}
export default (Form.create()(succesaddproduct));
