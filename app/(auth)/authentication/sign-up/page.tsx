'use client'
// import node module libraries
import { Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation'
// import hooks
import useMounted from 'hooks/useMounted';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { USER_NAME_PLACEHOLDER, USER_NAME_REQUIRED, CONFIRM_PASSWORD_NOT_MATCHED, CONFIRM_PASSWORD_REQUIRED, EMAIL_INVALID, EMAIL_PLACEHOLDER, EMAIL_REGEX_VALIDATION, EMAIL_REQUIRED, PASSWORD_INVALID, PASSWORD_PLACEHOLDER, PASSWORD_REQUIRED, PASSWORD_VALIDATION, SECONDARY_BLUE, WHITE } from 'utils/constants';
import React from 'react';
import toaster from 'utils/toaster';
import routerConstants from 'utils/routerConstants';
import apiRouter from 'utils/apiRouter';

let CreateCompanySchema = Yup.object().shape({
  userName: Yup.string().required(USER_NAME_REQUIRED),
  email: Yup.string()
    .trim()
    .matches(
      EMAIL_REGEX_VALIDATION,
      EMAIL_INVALID
    ).required(EMAIL_REQUIRED),
  password: Yup.string().matches(
    PASSWORD_VALIDATION,
    PASSWORD_INVALID
  ).required(PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .oneOf([Yup.ref("password"), null], CONFIRM_PASSWORD_NOT_MATCHED),
});

const SignUp = () => {
  const router = useRouter();
  const axios = useAxiosPrivate();
  const [isLoading, setIsLoading] = React.useState(false);

  const hasMounted = useMounted();
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmitFormik = async (e) => {
    try {
      setIsLoading(true);
      const result = await axios.post(apiRouter.SIGNUP, e);
      if (result?.status === 200) {
        console.log('result', result);
        toaster("success", result.data.message);
        router.push(routerConstants.SIGNIN);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      {hasMounted &&
        <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
          {/* Card */}
          <Card className="smooth-shadow-md">
            {/* Card body */}
            <Card.Body className="p-6">
              <div className="mb-4 text-center">
                <h4 className="mb-6">Create new account</h4>
              </div>
              {/* Form */}
              <>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={(values) => handleSubmitFormik(values)}
                  validationSchema={CreateCompanySchema}
                >
                  {({
                    errors,
                    handleChange,
                    handleSubmit,
                    submitCount
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      {/* User name */}
                      <Form.Group className="mb-3" controlId="userName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" userName="userName" placeholder={USER_NAME_PLACEHOLDER} isInvalid={submitCount > 0 && errors.userName} onChange={handleChange} />
                        {submitCount > 0 && errors.userName &&
                          <Form.Control.Feedback type="invalid">
                            {errors.userName}
                          </Form.Control.Feedback>
                        }
                      </Form.Group>

                      {/* Email */}
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" userName="email" placeholder={EMAIL_PLACEHOLDER} isInvalid={submitCount > 0 && errors.email} onChange={handleChange} />
                        {submitCount > 0 && errors.email &&
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        }
                      </Form.Group>

                      {/* Password */}
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" userName="password" placeholder={PASSWORD_PLACEHOLDER} isInvalid={submitCount > 0 && errors.password} onChange={handleChange} />
                        {submitCount > 0 && errors.password &&
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        }
                      </Form.Group>

                      {/* Confirm Password */}
                      <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" userName="confirmPassword" placeholder={PASSWORD_PLACEHOLDER} isInvalid={submitCount > 0 && errors.confirmPassword} onChange={handleChange} />
                        {submitCount > 0 && errors.confirmPassword &&
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
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
                              "Signup"
                            }
                          </Button>
                        </div>
                        <div className="d-md-flex justify-content-end mt-4">
                          <div className="mb-2 mb-md-0">
                            <Link href="/" className="fs-5" style={{ color: SECONDARY_BLUE }}>Already a user? Login </Link>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            </Card.Body>
          </Card>
        </Col>
      }
    </Row>
  )
}

export default SignUp