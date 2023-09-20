import React from 'react'
import { Container,Row,Col,Button,Form } from 'react-bootstrap'
import { useState } from 'react'
const CreateAccount = () => {
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
        <h1 className='text-center'>Create Account</h1>
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
    </Form>
    </div>
  )
}

export default CreateAccount