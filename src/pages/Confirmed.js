import React from 'react'
import {Spin, Row , Col, Card, Input, Button, Dropdown, Menu, message} from 'antd'
import { ArrowLeftOutlined, DownOutlined, SyncOutlined, FlagOutlined, EnvironmentTwoTone } from '@ant-design/icons';
import '../covid.css'
import {Link} from 'react-router-dom'

const {Search}= Input 

export default class Confirmed extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            data : null,
            isLoading :true,
            search : "China"
        }
    }

    componentDidMount(){
        try {
            fetch("https://covid19.mathdro.id/api/confirmed")
            .then(res => res.json())
            .then(jsonData => {
                console.log("Confirmed", jsonData[0])
                this.setState({
                    isLoading : false,
                    data : jsonData
                })
            })
        } catch (error) {
            console.log("Ngacoh")
        }
    }

    handleChange = (e) => {
        const key = e.target.value

        this.setState({
            search : key
        })
    }

    handleMenuClick = (e) => {
        const country = this.state.data.map(data => {
            return data
        })

        let countryCompare = Object.values(country.reduce((c, {countryRegion}) => {
            c[countryRegion] = c[countryRegion] || {countryRegion}
            return c
        }, {}))

        let selectCountry = countryCompare.filter((c, i) =>{
            return e.key == i
        })

        this.setState({
            search : selectCountry[0].countryRegion
        })
    }

    refresh = () => {
        this.setState({search : ""})
    }


    render(){
        const {isLoading, data, search} = this.state

        if(isLoading){
            return(
                <center>
                    <Spin size="large" />
                </center>
            )
        }else{
            const filteredData = data.filter(data => {
                return data.countryRegion.toLowerCase().indexOf(search.toLowerCase()) !== -1
            })

            const country = data.map(data => {
                return data
            })

            let countryCompare = Object.values(country.reduce((c, {countryRegion}) => {
                c[countryRegion] = c[countryRegion] || {countryRegion}
                return c
            }, {}))

            console.log("CountryRes", countryCompare)

            const menu = (
                <Menu onClick={(e) => this.handleMenuClick(e)}>
                    {countryCompare.map((v, i) => {
                        return (
                            <Menu.Item key={i}>
                                <FlagOutlined />
                                {v.countryRegion}
                            </Menu.Item>
                        )
                    })}
                </Menu>
            );

            return (
                <div className="site-card-wrapper-confirmed">
                    <Row style={{marginBottom : 20}}>
                        <Col span={22} push={2}>
                            <Search placeholder="Type Your Country" onSearch={value => console.log(value)} enterButton size="large" onChange={(e) => this.handleChange(e) }/>
                        </Col>
                        <Col span={2} pull={22}>
                            <Link to="/"><Button type="primary" size="large"><ArrowLeftOutlined twoToneColor="#fff"/></Button></Link>
                        </Col>
                    </Row>

                    <Dropdown overlay={menu} style={{width : '90%'}}>
                        <Button style={{width :'90%'}}>
                            Filtered By Select Country<DownOutlined />
                        </Button>
                    </Dropdown>
                    <Button  style={{width : '10%'}} type="primary" onClick={() => this.refresh()}><SyncOutlined spin twoToneColor="#fff"/></Button>

                    {filteredData.map((v, i) => {
                        return (
                        <Row style={{marginBottom : 20, marginTop : 20}} key={i}>
                            <Col span={24}>
                            <center>
                                <Card title={v.countryRegion} bordered={false} className="card">
                                    <h1 style={{color: "red"}}>{v.confirmed}</h1>
                                    <a href={`https://www.google.com.sa/maps/search/@${v.lat},${v.long},12.21z?hl=en`} target="_blank" rel="noopener">Open Maps&nbsp;<EnvironmentTwoTone twoToneColor="#52c41a" title="Open Maps"/></a>
                                </Card>
                            </center>
                            </Col>
                        </Row>
                        )
                    })}
                </div>
            )
        }
    }
}