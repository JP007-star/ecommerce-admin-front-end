import React from 'react'
import { Layout } from '../../components/Layout'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Input } from '../../components/UI/Input'
/**
* @author
* @function SignIn
**/

export const SignIn = (props) => {
    return (
        <>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                    
                            <Form>
                                <Input
                                    label="Email Address"
                                    placeholder="Email Address"
                                    type="email"
                                    value=""
                                    onChange={() => { }}

                                />

                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    value=""
                                    onChange={() => { }}

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