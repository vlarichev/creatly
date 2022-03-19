import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header'


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <CssBaseline />
      <Header/>
      <br></br>
      <br></br>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
