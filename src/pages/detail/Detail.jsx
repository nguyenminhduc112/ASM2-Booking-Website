// CSS
import styles from './Dettail.module.css'
// DOM
import Footer from '../../components/Layout/Footer/Footer';
import NavBar from '../../components/Layout/NavBar';
import Wrapper from '../../components/Layout/Wrapper';
import FormReg from '../../components/Layout/FormReg/FormReg';
import ImagesDetail from './components/ImagesDetail'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormResever from './components/FormResever';
const Detail = () => {
  const [openReserve, setOpenReserve] = useState(false)
  const { hotelId } = useParams()
  const [hotelData, setHotelData] = useState(null)
  const fetchHotelData = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/${hotelId}`)
    const data = await response.json()
    setHotelData(data)
  }
  useEffect(() => {
    fetchHotelData()
  }, [])
  // Open Reserve
  const handlerOpenReserve = () => {
    setOpenReserve(true)
  }
  return (
    <div>
      <NavBar />
      <Wrapper >
        {hotelData ? <div className={styles.container}>
          <div className={styles['detail-info']}>
            <div>
              <h2 className={styles.name}>{hotelData.name}</h2>
              <p className={styles.address}><span className={`fa fa-map-marker ${styles.icon}`}></span> {hotelData.address}</p>
              <p className={styles.distance}>{hotelData.distance} from center</p>
              <p className={styles.price}>Book a stay over, ${hotelData.cheapestPrice} at this property and get a free airport taxi</p>
            </div>
            <div>
              <button className={styles.btnReserve} onClick={handlerOpenReserve}>Reserve or Book Now!</button>
            </div>
          </div>
          <ImagesDetail photos={hotelData.photos} />
          <div className={styles['detail-info-1']}>
            <div> <h2 className={styles.title}>{hotelData.title}</h2>
              <p className={styles.description}>{hotelData.desc}</p></div>
            <div className={styles.combo}>
              <p className={styles['combo-price']}>$ {hotelData.cheapestPrice} <span className={styles['combo-price-sub']}>{`(1 nights)`}</span></p>
              <button className={styles.btnReserve} onClick={handlerOpenReserve}>Reserve or Book Now!</button>
            </div>
          </div>
          {openReserve && <FormResever hotel={hotelData} />}

        </div> : <p>...Loading</p>}

      </Wrapper>
      <FormReg />
      <Footer />
    </div>
  );
};

export default Detail;
