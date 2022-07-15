import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Constants from '../util/Constants.json'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
const BadgeList = (props) => {
  const { userid } = useParams();
  const [state, setstate] = useState([]);
  const [badgecount, setbadgecount] = useState();
  useEffect(() => {
    async function getBadges() {
      await Axios.get(`${Constants.uri}/api/users/${userid}/activity/badges`, {
        withCredentials: true
      }).then((r) => {
        setbadgecount(r.data.length);
        let gridProducts = [];
        for (let i = 0; i < r.data.length; i = i + 3) {
          gridProducts.push(r.data.slice(i, i + 3));
        }
        setstate(gridProducts)
      })
    }
    getBadges()
  }, [])
  return (
    <div>
      <Row>
        <h5>{badgecount} {props.text}</h5>
      </Row>
      {
        state.map((array) => (
          <Row>
            {array.map((obj) => (
              <Col sm={4}>
                <Card style={{ width: "auto", marginRight: "3rem", marginBottom: "1rem" }}>
                  <Row>
                    <Col sm={1}> {obj.type === "GOLD" ? <text style={{ color: "gold" }}><i class="fa-solid fa-circle" style={{ fontSize: "10px" }}></i></text> : obj.type === "SILVER" ? <text style={{ color: "silver" }}><i class="fa-solid fa-circle" style={{ fontSize: "10px" }}></i></text> : <text style={{ color: "#cd7f32" }}><i class="fa-solid fa-circle" style={{ fontSize: "10px" }}></i></text>}</Col>
                    <Col><text style={{fontSize:"14px"}}>{obj.name}</text>
                    </Col>

                  </Row>

                </Card>
              </Col>

            ))}
          </Row>
        ))
      }
    </div>
  )
}

export default BadgeList