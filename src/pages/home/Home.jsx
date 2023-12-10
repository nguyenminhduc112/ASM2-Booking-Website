// CSS
import styles from './Home.module.css'

// DOM
import Header from "./components/Header/Header";
import NavBar from "../../components/Layout/NavBar";
import ListCity from "./components/ListCity/ListCity";
import ListType from "./components/ListType/ListType";
import ListHotel from './components/ListHotel/ListHotel';
import FormReg from '../../components/Layout/FormReg/FormReg'
import Footer from '../../components/Layout/Footer/Footer'



const Home = () => {
	return (
		<div className={styles.wrapperHome}>
			<NavBar />
			<Header />
			<ListCity />
			<ListType />
			<ListHotel />
			<FormReg />
			<Footer />
		</div>
	);
};

export default Home;
