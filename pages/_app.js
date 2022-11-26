// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '../styles/footer.scss';
import '../styles/index.scss';
import '../styles/mainMenuButton.scss';
import '../styles/homeButton.scss';
import '../styles/process.scss';
import '../styles/advisor.scss';

// Base Layout containing standard header...
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp