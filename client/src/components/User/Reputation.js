import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Accordion } from 'react-bootstrap'
import Constants from '../util/Constants.json'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router'
import moment from 'moment'
import { useNavigate } from 'react-router'
const Reputation = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid } = useParams();
  const [history, setHistory] = useState([]);
  const [flag, setFlag] = useState(true);
  const [totalreputation, setTotalreputation] = useState();
  const arr = [1, 2, 3, 4, 5];
  const history1 = [
    {
      date: "11/05/2022",
      totalReputation: 25,
      history: [
        {
          postId: 23934,
          postTitle: "Python: Efficient unrolling/flattening list of tuples and single floats",
          postHistoryGrouping: [
            {
              type: "UPVOTE",
              score: 10
            },
            {
              type: "DOWNVOTE",
              score: 10
            }
          ],
          postHistoryGroupingScore: 10
        },
        {
          postId: 23933,
          postTitle: "Python: Efficient unrolling/flattening list of tuples and single floats",
          postHistoryGrouping: [
            {
              type: "ACCEPT",
              score: 15
            }
          ],
          postHistoryGroupingScore: 15
        },
        {
          postId: 23933,
          postTitle: "What's up San jose?",
          postHistoryGrouping: [
            {
              type: "ACCEPT",
              score: 15
            }
          ],
          postHistoryGroupingScore: 15
        }

      ]
    },
    {
      date: "10/05/2022",
      totalReputation: -10,
      history: [
        {
          postId: 23934,
          postTitle: "ghjkml",
          postHistoryGrouping: [
            {
              type: "UPVOTE",
              score: 10
            }
          ],
          postHistoryGroupingScore: 10
        }
      ]
    },
    {
      date: "11/05/2022",
      totalReputation: 25,
      history: [
        {
          postId: 23934,
          postTitle: "Python: Efficient unrolling/flattening list of tuples and single floats",
          postHistoryGrouping: [
            {
              type: "UPVOTE",
              score: 10
            },
            {
              type: "DOWNVOTE",
              score: 10
            }
          ],
          postHistoryGroupingScore: 10
        },
        {
          postId: 23933,
          postTitle: "Python: Efficient unrolling/flattening list of tuples and single floats",
          postHistoryGrouping: [
            {
              type: "ACCEPT",
              score: 15
            }
          ],
          postHistoryGroupingScore: 15
        },
        {
          postId: 23933,
          postTitle: "What's up San jose?",
          postHistoryGrouping: [
            {
              type: "ACCEPT",
              score: 15
            }
          ],
          postHistoryGroupingScore: 15
        }

      ]
    },
    {
      date: "10/05/2022",
      totalReputation: -10,
      history: [
        {
          postId: 23934,
          postTitle: "ghjkml",
          postHistoryGrouping: [
            {
              type: "UPVOTE",
              score: 10
            }
          ],
          postHistoryGroupingScore: 10
        }
      ]
    }
  ]
  useEffect(() => {
    async function getReputationhistory() {
      const res = await axios.get(`${Constants.uri}/api/users/${userid}/activity/reputation`, { withCredentials: true });
      
      setHistory(res.data.response);
      setTotalreputation(res.data.totalReputation);
      console.log(res);
    }
    getReputationhistory();
  }, [location])

  const opendropdown = () => {
    // setFlag(!flag)
  }

  const openQuestion =(id) =>{
    navigate(`/questions/${id}`)
  }
  return (
    <div>
      <Row>
        <h5>{totalreputation} {props.text}</h5>
      </Row>
      <Accordion defaultActiveKey="0" >
        {
          history.length>0 ?
          history.map((i, key) => (
            <Accordion.Item eventKey={key}>
              <Accordion.Header>
                <Row>
                  <Col sm={4} style={{ color: "hsl(140deg 40% 47%)" }}>{i.totalReputation > 0 ? (<text>+{i.totalReputation}</text>) : (<text>{i.totalReputation}</text>)}</Col>
                  <Col >{moment(i.date, 'DD-MM-YYYY').format("MMM Do")}</Col>
                </Row>
              </Accordion.Header>
              <Accordion.Body>
                {
                  i.history.map((hist,key2) => (
                    hist.postHistoryGrouping.length == 1 ?
                      <Row>
                        <Col style={{color:"hsl(210deg 8% 45%)"}} sm={2}>{hist.postHistoryGrouping[0].type}</Col>
                        <Col style={{ color: "hsl(140deg 40% 47%)" }} sm={1}>{hist.postHistoryGrouping[0].score >0 ? (<text>+{hist.postHistoryGrouping[0].score}</text>) : (<text>{hist.postHistoryGrouping[0].score}</text>) }</Col>
                        <Col style={{color:"blue", cursor:"pointer"}} onClick={() => openQuestion(hist.postParentId ? hist.postParentId:hist.postId)} sm={9}>{hist.postTitle}</Col>
                      </Row>
                      :
                      <Accordion.Item eventKey={key2}>
                        <Accordion.Header>
                          <Row>
                            <Col sm={2}>{hist.postHistoryGrouping.length} events</Col>
                            <Col sm={1} style={{ color: "hsl(140deg 40% 47%)" }}>{hist.postHistoryGroupingScore > 0 ? (<text>+{hist.postHistoryGroupingScore}</text>) : (<text>{hist.postHistoryGroupingScore}</text>)}</Col>
                            <Col onClick={() => openQuestion(hist.postParentId ? hist.postParentId:hist.postId)} sm={9}>{hist.postTitle}</Col>
                          </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                          {hist.postHistoryGrouping.map((obj) => (
                            <Row>
                              <Col style={{color:"hsl(210deg 8% 45%)"}} sm={2}>{obj.type}</Col>
                              <Col sm={10} style={{ color: "hsl(140deg 40% 47%)" }}>{obj.score > 0 ? (<text>+{obj.score}</text>) : (<text>{obj.score}</text>)}</Col>
                            </Row>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>


                  ))
                }
              </Accordion.Body>
            </Accordion.Item>
          ))
          :
          <h5 style={{marginLeft:"10rem",marginTop:"5rem"}}>Nothing to show</h5>
        }
      </Accordion>




    </div>
  )
}

export default Reputation