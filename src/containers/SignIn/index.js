import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Input } from '../../components/UI/Input'
import { login} from '../../actions'
import { useDispatch } from 'react-redux'
/**
* @author
* @function SignIn
**/

export const SignIn = (props) => {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const dispatch=useDispatch()
    const userLogin=(e)=>{
        e.preventDefault()
        const user={
            email,password
        }
        dispatch(login(user));
    }
    return (
        <>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                    
                            <Form onSubmit={userLogin}>
                                <Input
                                    label="Email Address"
                                    placeholder="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />

                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </Layout>

        </>
    )

}