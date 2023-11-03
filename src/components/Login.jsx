import React from 'react'
import { Container,Row,Col,Button,Form } from 'react-bootstrap'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { login } from '../Services/DataService'
import { GetLoggedInUser } from '../Services/DataService'



const Login = () => {
  let navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const handleUser = (e) => setUsername(e.target.value)
    // const handlePassword = (e) => setPassword(e.target.value)
    const handleSubmit = async () => {
        let userData = {
           username,
           password
        }
        let token = await login(userData)
        if(token.token != null)
        {
            localStorage.setItem("Token",token.token)
            GetLoggedInUser(username)
            navigate("/Dashboard")
        }
        
    }
  return (
    <div>
        <h1 className='text-center'>Login</h1>
        <Form>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter Username" onChange={({target}) => setUsername(target.value)}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={({target}) => setPassword(target.value)}/>
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