import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Input from './components/Input';
import Gallery from './components/Gallery';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import styles from './components/App.module.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
   
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState('');
  const [page, setPage] = useState();
  const [pageNumber, setPageNumber] = useState();

  const fetchData = async (input, page) => {
    // Alustavasti jo true, koska käytetään useampaan otteeseen
    setLoading(true);
    // API call -> data to response variable
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${!input ? 'mountains' : input}&client_id=CmxFMH_0cKfl6BGw7068ZeCKT-C3sEFe9a6ySzQphaM&per_page=20`
    );
    const data = await response.data;
    setPhotos(data);
    setPageNumber(data.total_pages);
    // Kun API kutsu on saatu ja data muuttujassa
    setLoading(false);
  };
  
  const handleChange = (event) => {
    setFormData(event.target.value)
  };

  const handleSubmit = (event) => {
    // Jotta sivu ei lataudu uudelleen (prevent's it from submitting a form)
    event.preventDefault();
    fetchData(formData);
  };

  const pageChange = (event, value) => {
    setPage(value);
    fetchData(formData, value)
  }

  // Ajetaan kertaalleen kun sivua ensimmäisen kerran ladataan
  useEffect(() => {
    fetchData();
  }, []);

  // Latausympyrä aina keskelle ruutua
  if (loading)
    return (
      <div className={styles.loading}>
        <CircularProgress size={130} />
      </div>
    );

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Input change={handleChange} submit={handleSubmit} />      
          {/* propsina photos tilamuuttujan results array */ }
          <Gallery photos={photos.results}/>
          <div className={styles.pagination}>
            <Pagination 
              count={pageNumber} 
              shape="rounded"
              color="primary" 
              size="large" 
              onChange={pageChange}
              page={page}
              sx={{ m: '1rem 0' }}
            />
          </div>
        </Container>
      </ThemeProvider>
    </div>
  )
};
  
export default App;
