import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const UsersTopCard = () => {
  const obj = useSelector(state => state.DashboardSecondTopSlice)
  const { Title, Description } = obj.value
  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <Row>
          <Col sm={9}>
            <text style={{ fontSize: "1.9rem", PaddingBottom: "1rem" }}>Users</text>
          </Col>
        </Row>
      </div>

      <hr style={{ marginTop: "1rem", marginLeft: "-45px" , background:"none"}}></hr>
    </div>
  )
}

export default UsersTopCard