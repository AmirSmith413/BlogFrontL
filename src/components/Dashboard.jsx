import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  checkToken,
  LoggedInData,
  getBlogItems,
  GetblogItemsByUserId,
  updateBlogItems,
} from "../Services/DataService";
import Spinner from "react-bootstrap/Spinner";

const Dashboard = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!checkToken()) {
      navigate("/Login");
    } else {
      setTimeout(async () => {
        let loggedInData = LoggedInData();
        setUserID(loggedInData.userId)
        setPublisherName(loggedInData.PublisherName)
        console.log(loggedInData);
        let userBlogItems = await GetblogItemsByUserId(loggedInData.userId);
        setBlogItems(userBlogItems);
        console.log(userBlogItems);
        setIsLoading(false);
      }, 1000);
    }
    // let userInfo = LoggedInData();
    // console.log(userInfo);
  }, []);

  const [show, setShow] = useState(false);
  const handleSetTitle = (e) => setBlogTitle(e.target.value);
  const handleDescription = (e) => setBlogDescription(e.target.value);
  const handleTag = (e) => setBlogTags(e.target.value);
  const handleCategory = (e) => setBlogCategory(e.target.value);
  // const handleImage = ({ target }) => setBlogImage(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = (
    e,
    {
      id,
      userID,
      publisherName,
      title,
      description,
      image,
      category,
      tags,
      IsDeleted,
      IsPublished,
    }
  ) => {
    setShow(true);
    if (e.target.textContent == "Add Blog Item") {
      setEdit(false);
    } else {
      setEdit(true);
    }
    setBlogID(id);
    setUserID(userID);
    setPublisherName(publisherName);
    setBlogTitle(title);
    setBlogImage(image);
    setBlogDescription(description);
    setBlogCategory(category);
    setBlogTags(tags);
    setIsDeleted(IsDeleted);
    setIsPublished(IsPublished);
    // console.log(blogData)
  };
  const [blogUserId, setBlogUserId] = useState(0);
  const [blogPublisherName, setBlogPublisherName] = useState("");

  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogItems, setBlogItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blogID, setBlogID] = useState(0);
  const [userID, setUserID] = useState(0);
  const [IsDeleted, setIsDeleted] = useState(false);
  const [IsPublished, setIsPublished] = useState(false);
  const [PublisherName, setPublisherName] = useState("");
  // const [userId, setUserId] = useState(0)
  // const [PublisherName, setPublisherName] = useState("")

  const [edit, setEdit] = useState(false);

  const handleSave = async ({ target: { textContent } }) => {
    // let { PublisherName, userId } = LoggedInData();
    const Published = {
      Id: 0,
      UserId: blogUserId,
      PublisherName: blogPublisherName,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      Tag: blogTags,
      IsDeleted: false,
      IsPublished:
        textContent == "Save" || textContent == "SaveChanges" ? false : true,
    };
    console.log(Published);
    handleClose();
    let result = false;
    if (edit) {
      result = await updateBlogItems(Published);
    } else {
      result = await AddBlogItems(Published);
    }
    if (result) {
      let userBlogItems = await GetblogItemsByUserId(blogUserId);
      console.log(userBlogItems);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "yes it works");
    } else {
      alert(`Blog Item not ${edit ? "Updated" : "Added"}`);
    }
  };

  const handlePublish = async (item) => {
    console.log("first");
    item.IsPublished = !item.IsPublished;
    let result = await updateBlogItems(item);
    if (result) {
      let userBlogItems = await GetblogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "it works");
    } else {
      alert(`Blog item not ${edit ? "Update" : "Added"}`);
    }
  };
  const handleDelete = async (item) => {
    console.log("first");
    item.IsDeleted = !item.IsDeleted;
    let result = await updateBlogItems(item);
    if (result) {
      let userBlogItems = await GetblogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog item not ${edit ? "Update" : "Added"}`);
    }
  };

  const handleImages = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setBlogImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container>
        <Button
          className="me-3"
          variant="putline-primary"
          onClick={(e) =>
            handleShow(e, {
              id: 0,
              userID: blogUserId,
              PublisherName: blogPublisherName,
              title: "",
              image: "",
              description: "",
              category: "",
              tags: "",
              IsDeleted: false,
              IsPublished: false,
            })
          }
        >
          Add Blog Item
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} Blog Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
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
                  <option value="adventure time">Adventure Time</option>
                  <option value="distant lands">Adventure Time: Distant Lands</option>
                  <option value="fionna and cake">Adventure Time: Fionna and Cake </option>
              
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
                  // value={blogImage}
                  onChange={handleImages}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <Button variant="outline-primary" onClick={handleShow}>
          Edit Blog Item
        </Button> */}

        <Row>
          <Col>
            {isLoading ? (
              <>
                {" "}
                <Spinner animation="border" variant="info" />{" "}
                <h1>Loading ....</h1>
              </>
            ) : blogItems.length == 0 ? (
              <h1 className="text-center">
                No Blog Items. Add a Blog Item Above
              </h1>
            ) : (
              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Publish</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#3f3f3f", color: "azure" }}
                  >
                    {blogItems.map((item, i) =>
                      item.isPublished && !item.isDeleted ? (
                        <ListGroup key={i}>
                          {item.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                              Delete
                            </Button>
                            <Button
                              variant="outline-info mx-2"
                              onClick={(e) => handleShow(e, item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-primary mx-2"
                              onClick={() => handlePublish(item)}
                            >
                              Unpublish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Unpublished</Accordion.Header>
                  <Accordion.Body
                    style={{ backgroundColor: "#3f3f3f", color: "azure" }}
                  >
                    {blogItems.map((item, i) =>
                      !item.isPublished && !item.isDeleted ? (
                        <ListGroup key={i}>
                          {item.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                              Delete
                            </Button>
                            <Button
                              variant="outline-info mx-2"
                              onClick={(e) => handleShow(e, item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-primary mx-2"
                              onClick={() => handlePublish(item)}
                            >
                              Publish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
