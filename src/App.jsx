
import { Container,Row,Col } from 'react-bootstrap'
import './App.css'
import Dashboard from './components/Dashboard'
import BlogPage from './components/BlogPage'
import CreateAccount from './components/CreateAccount'

function App() {
  

  return (
    <Container>
      <Row>
         <Col>
         <h1 className='text-center'>Our Blog</h1>
         </Col>
         <CreateAccount/>
         {/* <BlogPage/> */}
         {/* <Dashboard/> */}
      </Row>
    </Container>
  )
}

export default App
