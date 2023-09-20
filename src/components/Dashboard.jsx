import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleSetTitle = () => setBlogTitle(e.target.value);
  const handleDescription = () => setBlogDescription(e.target.value);
  const handleTag = () => setBlogTags(e.target.value);
  const handleCategory = () => setBlogCategory(e.target.value);
  const handleImage = () => setBlogImage(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    if (e.target.textContent === "Add Blog Item") {
      setEdit(false);
      setBlogTitle("");
      setBlogDescription("");
      setBlogCategory("");
    } else {
      setEdit(true);
      setBlogTitle("My Awesome Title");
      setBlogDescription("My Awesome Description");
      setBlogCategory("Tech");
    }
  };
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogItems, setBlogItems] = useState([
    {
      Id: 1,
      Title: "Top Finishing and Crossing Drills",
      Publisher: "anonymous",
      Date: "01-13-2022",
      Text: "Developing finishing and crossing skills is an important aspect of soccer that can greatly constribute to your player.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: true,
    },
    {
      Id: 2,
      Title: "6 Soccer Drills to Work on Defense",
      Publisher: "anonymous",
      Date: "01-14-2022",
      Text: "A strong defense is the backbone of any successful soccer team",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: true,
    },
    {
      Id: 3,
      Title: "5 Small Side Games",
      Publisher: "anonymous",
      Date: "01-15-2022",
      Text: "Small-sided games create a fast-paced and intense environment.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: true,
    },
    {
      Id: 4,
      Title: "5 Fun 1 V 1 Youth Soccer Activites",
      Publisher: "anonymous",
      Date: "01-15-2022",
      Text: "One of the best ways to naturally bring out the competitive nature.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: false,
    },
    {
      Id: 5,
      Title: "5 Fun warm up soccer drills",
      Publisher: "anonymous",
      Date: "01-15-2022",
      Text: "One of the challenges for youth soccer coaches is to make sure their players are always excited to come to practice.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: false,
    },
  ]);
  const [edit, setEdit] = useState(false);
  return (
    <>
      <Container>
        <Button className="me-3" variant="primary" onClick={handleShow}>
          Add Blog Item
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} Blog Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={blogTitle}
                  onChange={handleSetTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleDescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Select
                  aria-label="Default select example"
                  value={blogCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value="food">Food</option>
                  <option value="fitness">Fitness</option>
                  <option value="sport">Sports</option>
                  <option value="tech">Tech</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tags"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Select a Picture</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select image from file"
                  accept="image/png,image/jpg"
                  value={blogImage}
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="outline-primary" onClick={handleShow}>
          Edit Blog Item
        </Button>

        <Row>
          <Col>
            <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Publish</Accordion.Header>
                <Accordion.Body>
                  {blogItems.map((item) =>
                    item.Published ? (
                      <ListGroup key={item.Title}>{item.Title}
                      <Col className="d-flex justify-content-end">
                      <Button variant="outline-danger mx-2">Delete</Button>
                      <Button variant="outline-info mx-2">Edit</Button>
                      <Button variant="outline-primary mx-2">Publish</Button>
                      </Col>
                      </ListGroup>
                    ) : null
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Unpublished</Accordion.Header>
                <Accordion.Body>
                  {blogItems.map((item) =>
                    !item.Published ? (
                      <ListGroup key={item.Title}>{item.Title}
                      <Col className="d-flex justify-content-end">
                      <Button variant="outline-danger mx-2">Delete</Button>
                      <Button variant="outline-info mx-2">Edit</Button>
                      <Button variant="outline-primary mx-2">Unpublish</Button>
                      </Col>
                      </ListGroup>
                      
                    ) : null
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
