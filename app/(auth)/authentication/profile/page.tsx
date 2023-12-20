'use client'
// import node module libraries
import { Row, Col, Card, Form, Spinner } from 'react-bootstrap';

// import hooks
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import useMounted from '../../../../hooks/useMounted';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import useAuthHeader from '../../../../hooks/useSessionToken';
import apiRouter from '../../../../utils/apiRouter';
import toaster from '../../../../utils/toaster';


const Profile = () => {
    const hasMounted = useMounted();
    const axios = useAxiosPrivate();
    const authHeader = useAuthHeader();
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async () => {
        setIsLoading(true);
        try {
            const result = await axios.get(apiRouter.GET_USER_DETAILS, authHeader);
            if (result?.status === 200) {
                setUserDetails(result.data.data);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toaster("error", error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (hasMounted) {
            getUserDetails();
        }
    }, [hasMounted]);
    

    return (
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
            {hasMounted &&
                <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                    <Card className="smooth-shadow-md">
                        <Card.Body className="p-6">
                            <div className="mb-4 text-center">
                                <h4 className="mb-6">Profile</h4>
                            </div>
                            <>
                                <Form.Group className="mb-3" controlId="userName">
                                    <Form.Label>User Name</Form.Label>
                                    {!isLoading ?
                                        <Form.Control type="text" userName="userName" disabled value={userDetails.userName} />
                                        :
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <Spinner animation="border" variant="primary" style={{ width: '2rem', height: '2rem' }} />
                                        </div>
                                    }
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    {!isLoading ?
                                        <Form.Control type="email" userName="email" disabled value={userDetails.email} />
                                        :
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <Spinner animation="border" variant="primary" style={{ width: '2rem', height: '2rem' }} />
                                        </div>
                                    }
                                </Form.Group>

                                <div>
                                    {/* Button */}
                                    <div className="d-md-flex text-end mt-4 justify-content-end">
                                        <div className="mb-2 mb-md-0 ">
                                            <h3 onClick={() => signOut({ callbackUrl: routerConstants.SIGNIN })} className="fs-5" style={{ color: SECONDARY_BLUE, cursor: 'pointer' }}>SignOut</h3>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </Card.Body>
                    </Card>
                </Col>
            }
        </Row>
    )
}

export default Profile