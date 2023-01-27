import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/header.css';
import '../styles/edit-story.css'
import 'font-awesome/css/font-awesome.css';
import 'rc-menu/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { theme } from '../theme';
import ContextProvider from '../context/ContextProvider';
import store from 'appredux/store';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (<>
  {/* <ContextProvider>
  <ThemeProvider theme={theme}>
{getLayout(<Component {...pageProps} />)}
 </ThemeProvider>
</ContextProvider>  */}

<Provider store={store}>
        <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        </DndProvider>
    </Provider>
  </>);
}

export default MyApp
