import React from 'react'
import { Container,Row,Col,Button,Form } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleUser = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleSubmit = () => {
        let userData = {
            test1:username,
            test2:password
        }
        console.log(userData)
    }
  return (
    <div>
        <h1 className='text-center'>Login</h1>
        <Form>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter Username" onChange={handleUser}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
      </Form.Group>
      
      <Button variant="primary" onClick={handleSubmit} >
        Submit
      </Button>
      <p className='mt-2'>If you don't have an account</p>
      <Button variant="primary" onClick={() => navigate('/CreateAccount')} >
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Login