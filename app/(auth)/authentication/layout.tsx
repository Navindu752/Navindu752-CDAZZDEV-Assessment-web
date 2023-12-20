'use client'
// import node module libraries
import { Container } from 'react-bootstrap';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/mui-theme';
// import theme style scss file
import 'styles/theme.scss';

export default function AuthLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Container className="d-flex flex-column">
        {children}
      </Container>
    </ThemeProvider>
  )
}
