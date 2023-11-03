import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { getPublishedBlogItems } from "../Services/DataService";

const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() => {
    getPublishedItems()

  },[])

const getPublishedItems = async () =>
{
  let publishedItems = await getPublishedBlogItems();
  console.log(publishedItems)
  setBlogItems(publishedItems)
}



  return (
    <>
    <h1 className="text-center">Welcome to the Adventure Time Blog Page!</h1>
    <h1 className="text-center">Be kind to your fellow adventurer!</h1>
    <Container>
      <Row>
        <Col>
          {blogItems.map((item, i) => (
            <div key={i}>
              {i % 2 == 0 ? (
                <Row key={i}>
                  <Col md={6}>
                    <Row style={{ border: "solid" }}>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                      >
                        <h2>
                          {item.title}
                        </h2>
                      </Col>
                      <Col md={12}>
                        <Row>
                          <Col
                            style={{ border: "solid" }}
                            md={6}
                            className="d-flex justify-content-center"
                          >
                            <h2>{item.PublisherName}</h2>
                          </Col>
                          <Col className="d-flex justify-content-center" md={6}>
                            <p>{item.date}</p>
                            </Col>
                        </Row>
                      </Col>
                      <Col
                        style={{ border: "solid" }}
                        md={12}
                        className="d-flex justify-content-center"
                      >
                        <img src={item.image} width="800px" height="400px"/>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    style={{ border: "solid" }}
                    md={6}
                    className="d-flex justify-content-center"
                  >
                    <p>{item.description}</p>
                  </Col>
                </Row>
              ) : (
                <Row key={i}>
                  <Col
                    style={{ border: "solid" }}
                    md={6}
                    className="d-flex justify-content-center"
                  >
                   <p>{item.description}</p>
                  </Col>
                  <Col md={6}>
                    <Row style={{ border: "solid" }}>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={12}
                      >
                        <h2>{item.title}</h2>
                      </Col>
                      <Col md={12}>
                        <Row>
                          <Col
                            style={{ border: "solid" }}
                            md={6}
                            className="d-flex justify-content-center"
                          >
                            <h2>{item.PublisherName}</h2>
                          </Col>
                          <Col md={6} className="d-flex justify-content-center">
                           <p>{item.date}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        style={{ border: "solid" }}
                        md={12}
                        className="d-flex justify-content-center"
                      >
                        <img src={item.image} width="800px" height="400px"/>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default BlogPage;
