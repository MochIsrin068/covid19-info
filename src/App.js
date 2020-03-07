import React from 'react'
import {Row, Col, Card, Spin, Tooltip} from 'antd'
import 'antd/dist/antd.css'
import './covid.css'
import Happy from './assets/emoji.png'
import Sad from './assets/sad.png'
import Verysad from './assets/verysad.png'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Confirmed from './pages/Confirmed'
import Recovered from './pages/Recovered'
import Deaths from './pages/Death'

export default class App extends React.Component{

  state = {
    isLoading : true,
    data : null,
    currentPage : "/",
  }

  componentDidMount(){
    this.fetchAPI("https://covid19.mathdro.id/api/")
  }

  fetchAPI(url){
    try {
      fetch(url)
      .then(res => res.json())
      .then(jsondata => {
        this.setState({
          isLoading : false,
          data : jsondata
        })
        console.log("Data", this.state.data)
      })
    } catch (error) {
      console.log("Ngacoh")
    }
  }


  handleCLick(page){
    this.setState({
      currentPage : page,
    })

    // this.fetchAPI(url)
  }


  render(){
    const {isLoading, data} = this.state

    if(isLoading){
      return (
        <div className="site-card-wrapper">
          <center><Spin size="large"/></center>
        </div>
      )
    }else{
      return (
        <Router>
            <Switch>
              <Route path="/confirmed">
                <Confirmed/>
              </Route>
              <Route path="/recovered">
                <Recovered/>
              </Route>
              <Route path="/death">
                <Deaths />
              </Route>
              <Route path="/">
                  <div className="site-card-wrapper">
                    <Row style={{marginBottom : 20}}>
                      <Col span={24}>
                        <center>
                          <h1>COVID19 INFORMATION</h1>
                          <h4>Corona Virus data Information, confirmed, recovered and deaths, keep safe and smile :)</h4>
                        </center>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Tooltip placement="bottom" title={<span>Click to Show Corona Virus Confirmed</span>}>
                          <Link to="/confirmed" onClick={() => this.handleCLick("/confirmed")}>
                            <Card title="CONFIRMED" bordered={false} className="card" >
                              <img src={Sad} style={{width : '10%', marginBottom : 10}}/>
                              <h1>{data.confirmed.value}</h1>
                            </Card>
                          </Link>
                        </Tooltip>
                      </Col>
                      <Col span={8}>
                        <Tooltip placement="bottom" title={<span>Click to Show Corona Virus Recovered</span>}>
                          <Link to="/recovered" onClick={() => this.handleCLick("/recovered")}>
                            <Card title="RECOREVERED" bordered={false} className="card">
                              <img src={Happy} style={{width : '10%',  marginBottom : 10}}/>
                              <h1 style={{color: "green"}}>{data.recovered.value}</h1>
                            </Card>
                          </Link>
                        </Tooltip>
                      </Col>
                      <Col span={8}>
                        <Tooltip placement="bottom" title={<span>Click to Show Corona Virus total Death</span>}>
                          <Link to="/death" onClick={() => this.handleCLick("/death")}>
                            <Card title="DEATH" bordered={false} className="card">
                              <img src={Verysad} style={{width : '10%',  marginBottom : 10}}/>
                              <h1 style={{color: "red"}}>{data.deaths.value}</h1>
                            </Card>
                          </Link>
                        </Tooltip>
                      </Col>
                    </Row>
                </div>
              </Route>
            </Switch>
        </Router>
      )
    }
  }
}