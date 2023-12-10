// CSS
import styles from './Search.module.css'
// DOM
import Footer from '../../components/Layout/Footer/Footer';
import NavBar from '../../components/Layout/NavBar';
import Wrapper from '../../components/Layout/Wrapper';
import FormReg from '../../components/Layout/FormReg/FormReg';
import SearchList from './components/SearchList/SearchList'
import SearchPopup from './components/SearchPopup/SearchPopup'

const Search = () => {
  return (
    <div>
      <NavBar />
      <Wrapper >
        <div className={styles.container}>
          <SearchPopup />
          <SearchList />
        </div>
      </Wrapper>
      <FormReg />
      <Footer />
    </div>
  );
};

export default Search;
