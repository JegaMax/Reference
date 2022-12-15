import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/header.css';
import '../styles/edit-story.css'
import 'font-awesome/css/font-awesome.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import ContextProvider from '../context/ContextProvider';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (<>
  <ContextProvider>
  <ThemeProvider theme={theme}>
{getLayout(<Component {...pageProps} />)}
</ThemeProvider>
</ContextProvider>
  </>);
}

export default MyApp
