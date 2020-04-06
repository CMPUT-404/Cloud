import React from 'react';
import SearchUser from "../Search";
import FriendsList from "./FriendsList";
import FriendRequest from "./Requests";
import FollowingList from "./Following";
import {Divider, Row, Col, Typography} from "antd";

export default function Friends(props) {
    const style = {
        backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 12, padding: 12
    };

    return (
        <div style={{width: "70%", margin: "0 15% 0 15%"}}>
            <Row>
                <Typography.Title>Friends</Typography.Title>
                <FriendRequest {...props}/>
            </Row>
            <Divider/>

            <Row>
                <Col span={11} style={style}>
                    <Typography.Title level={2}>My Friends</Typography.Title>
                    <FriendsList {...props}/>
                </Col>
                <Col span={2}>
                    <div style={{width: "100%", height: "100%"}}/>
                </Col>
                <Col span={11} style={style}>
                    <Typography.Title level={2}>Following</Typography.Title>
                    <FollowingList {...props}/>
                </Col>
            </Row>

            <Divider/>
            <Row>
                <Typography.Title style={{color: "#0e7eff"}}>Find a Person</Typography.Title>
                <SearchUser {...props}/>
                <br/><br/>
            </Row>
        </div>
    )

}