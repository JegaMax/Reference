import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/header.css';
import 'font-awesome/css/font-awesome.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (<>
  <ThemeProvider theme={theme}>
{getLayout(<Component {...pageProps} />)}
</ThemeProvider>
  </>);
}

export default MyApp
