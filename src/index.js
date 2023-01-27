import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import App1 from './App1';
// import Div from './Div';
import reportWebVitals from './reportWebVitals';
// import { createTheme, ThemeProvider } from '@mui/material';


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#E1F2FE',
//       dark:'#98D2EB'
//     },
//     secondary:{
//      main:'#B2B1CF',
//      dark: '#77625C '
//     },


//   }
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* <ThemeProvider theme={theme} > */}
    <App1/>
    {/* </ThemeProvider> */}
    {/* <Div /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
