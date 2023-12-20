'use client'
// import node module libraries
import { Container } from 'react-bootstrap';
// import theme style scss file
import 'styles/theme.scss';

export default function AuthLayout({ children }) {
  return (
      <Container className="d-flex flex-column">
        {children}
      </Container>
  )
}
