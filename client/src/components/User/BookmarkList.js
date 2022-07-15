import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
import './styles.css'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import Constants from '../util/Constants.json'
const BookmarkList = (props) => {
    const { userid } = useParams();
    const navigate = useNavigate();
    const [state,setstate] = useState([]);
    useEffect(()=>{
        async function getBookmarks(){
            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/bookmarks`, {
              withCredentials: true
          }).then((r) => {
              setstate(r.data)
          })
          }
         getBookmarks()  
    },[])

    const openQuestion = (id) => {
        navigate(`/questions/${id}`);
    }
    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=interesting`);
    }

    return (
        <div>
            <Row>
                <h5>{state.length} {props.text}</h5>
            </Row>
            {
                state.map((i) => (
                    <Card>
                        <div style={{ margin: "1rem" }}>
                            <Row>
                                {i.Post.accepted_answer_id ? <Col sm={3}><Button style={{backgroundColor: "hsl(140deg 40% 47%)",cursor:"default", color: "white", marginTop: "-10px", border: "0" , fontSize:"12px"}}><i style={{ color: "white" }} class="fa-solid fa-check"></i> {i.Post.answers_count} Answers</Button></Col> :<Col sm={3}><Button style={{backgroundColor: "white",cursor:"default", color: "hsl(140deg 40% 47%)",borderColor:"hsl(140deg 40% 47%)", marginTop: "-10px", fontSize:"12px"}}> {i.Post.answers_count} Answers</Button></Col> }
                                <Col sm={3} style={{marginLeft:"-50px"}}><text style={{fontSize:"15px"}}>{i.Post.score} votes</text></Col>
                                <Col sm={2}><text style={{fontSize: 13, color: "hsl(27deg 90% 55%)", marginLeft:"-90px"}}>{i.Post.views_count} views</text></Col>
                            </Row>
                            <Row className='textLimit3' style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px" , cursor:"pointer"}}><text onClick={() => openQuestion(i.Post.id)}>{parse(i.Post.title)}</text></Row>
                            <Row style={{marginLeft:"-18px"}}>
                                <Col sm={7}>
                                    {i.Post.tags.map((obj) => (
                                        <button onClick={() => openTag(obj)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                            <text style={{ fontSize: "13px", cursor: "pointer" }}>{obj}</text>
                                        </button>
                                    ))}
                                </Col>

                                <Col sm={2}></Col>
                                <Col style={{fontSize:"14px", color:"hsl(210deg 8% 45%)"}}> {moment(i.created_date).format("MMM Do")} at {moment(i.created_date).format("ha")}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }

        </div>
    )
}

export default BookmarkList