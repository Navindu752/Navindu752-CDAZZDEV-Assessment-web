'use client';
// import node module libraries
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { EMAIL_PLACEHOLDER, EMAIL_REQUIRED, PASSWORD_REQUIRED, SECONDARY_BLUE, WHITE, PASSWORD_PLACEHOLDER } from 'utils/constants';
import { Formik } from 'formik';
import * as Yup from "yup";
// import hooks
import useMounted from 'hooks/useMounted';
import toaster from '../utils/toaster';
import routerConstants from '../utils/routerConstants';
import React from 'react';
// import theme style scss file
import 'styles/theme.scss';
import { signIn } from 'next-auth/react';

let LoginUserSchema = Yup.object().shape({
  email: Yup.string().trim().required(EMAIL_REQUIRED),
  password: Yup.string().required(PASSWORD_REQUIRED),
});

const SignIn = () => {
  const hasMounted = useMounted();
  const [isLoading, setIsLoading] = React.useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmitFormik = async (credentials) => {
    setIsLoading(true);
    await signIn("credentials", { ...credentials, callbackUrl: routerConstants.PROFILE, redirect: true }).then(async (response) => {
      setIsLoading(false);
      if (response && response.error) {
        toaster("error", response.error);
      }
    }).catch(error => {
      console.log('error:::', error);
      toaster("error", "Something went wrong while sign in, try again later!");
    });
    setIsLoading(false);
  }

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100 px-2 px-sm-0">
      {hasMounted &&
        <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
          {/* Card */}
          <Card className="smooth-shadow-md">
            {/* Card body */}
            <Card.Body className="p-6">

              {/* Form */}
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values) => handleSubmitFormik(values)}
                validationSchema={LoginUserSchema}
              >
                {({
                  errors,
                  handleChange,
                  handleSubmit,
                  submitCount,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    {/* Username */}
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>E-Mail</Form.Label>
                      <Form.Control type="email" name="email" placeholder={EMAIL_PLACEHOLDER} isInvalid={submitCount > 0 && errors.email} onChange={handleChange} />
                      {submitCount > 0 && errors.email &&
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      }
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-6" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" placeholder={PASSWORD_PLACEHOLDER} isInvalid={submitCount > 0 && errors.password} onChange={handleChange} />
                      {submitCount > 0 && errors.password &&
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      }
                    </Form.Group>

                    <div>
                      {/* Button */}
                      <div className="d-grid">
                        <Button variant="primary" style={{ color: WHITE }} type="submit" disabled={(submitCount > 0 && !(Object.keys(errors).length === 0)) || isLoading}>
                          {isLoading ?
                            <Spinner animation="border" size="sm" className="me-2" />
                            :
                            "Sign In"
                          }
                        </Button>
                      </div>
                      <div className="d-md-flex justify-content-end mt-4">
                        <div className="mb-2 mb-md-0">
                          <Link href={routerConstants.SIGNUP} className="fs-5" style={{ color: SECONDARY_BLUE }}>Create An Account </Link>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      }
    </Row>
  )
}

export default SignIn