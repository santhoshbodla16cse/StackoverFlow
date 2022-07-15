import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import './TagStyles.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Constants from './../../util/Constants.json'

const TagCard = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useState([])
  const [alltags,setAllTags] = useState([])

  useEffect(() => {
    async function getTags() {
      const res = await axios.get(`${Constants.uri}/api/tags`)
      setTagsGrid(res.data)
      setAllTags(res.data)
      console.log(res.data)
    }
    getTags()
  }, [])

  const setTagsGrid = (data) => {
    console.log('setting grid')
    const tagsGrid = []
    for (var i = 0; i < data.length; i = i + 4) {
      var ar = []
      if (data[i]) {
        ar.push(data[i])
      }
      if (data[i + 1]) {
        ar.push(data[i + 1])
      }
      if (data[i + 2]) {
        ar.push(data[i + 2])
      }
      if (data[i + 3]) {
        ar.push(data[i + 3])
      }
      tagsGrid.push(ar)
    }
    setTags(tagsGrid)
  }

  const onChangeTagInput = async (e) => {
    e.preventDefault()
      const res = await axios.get(`${Constants.uri}/api/tags/${e.target.value}`)
      const filteredtags = res.data
      console.log(filteredtags.length)
      if (filteredtags.length > 0) {
        console.log("here--")
        setTagsGrid(filteredtags)
      }

      // console.log(alltags)

      // const ftags = alltags.filter(tag=> tag.name.includes(e.target.value) == true)
      // console.log(ftags)
  }

  const openTag = (tag) => {
    navigate(`/tags/${tag.name}/?show_user_posts=${false}&filterBy=interesting`);
  }
  return (
    <div>

      <div style={{ width: '20%' }}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></InputGroup.Text>
          <FormControl
            placeholder="Filter By tag name"
            onChange={(e) => onChangeTagInput(e)}
          />
        </InputGroup>
      </div>



      {tags && tags.map((tagRow) => (
        <Row>
          {tagRow && tagRow.map(tag => (

            <Card style={{ width: "16rem", height: "13rem", marginRight: "9px", marginBottom: "9px" }}>
              <Card.Body style={{ fontSize: "13px" }}>
                <Row><Col sm={6}><button className='tagButton' onClick={() => openTag(tag)}>{tag.name}</button></Col></Row>
                <Row style={{ marginTop: "1rem" }}><text className='textLimitt'>{tag.description}</text></Row>
                <Row style={{ marginTop: "1rem" }}>
                  <Col sm={5}>{tag.no_of_questions} questions</Col>
                  <Col>{tag.no_of_questions_asked_today} asked today, {tag.no_of_questions_asked_this_week} this week</Col>
                </Row>
              </Card.Body>
            </Card>

          ))}
          <br />
        </Row>

      ))}

    </div>
  )
}

export default TagCard