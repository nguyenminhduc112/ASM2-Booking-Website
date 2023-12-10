import React, { useEffect, useState } from 'react'
// CSS
import styles from './ListHotel.module.css'
// DATA
// import listHotelData from '../../../../data/hotel_list.json'
// Các DOM
import Wrapper from '../../../../components/Layout/Wrapper'
import { useNavigate } from 'react-router-dom'

const ListHotel = () => {
    const router = useNavigate()
    const [listHotelData, setListHotelData] = useState([])
    const fetchListHotelData = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/top3/rating`)
        const data = await response.json()
        setListHotelData(data)
    }
    useEffect(() => {
        fetchListHotelData()
    }, [])
    // Hàm chuyển tới trang detail
    const handlerToViewDetail = (id, e) => {
        router(`/detail/${id}`)
    }
    // Giao diện điều kiện
    let listHotelRender = listHotelData.length > 0 ? listHotelData.map((hotel, index) => (
        <div key={index} className={styles['listHotel-item']}>
            <img className={styles['listHotel-item_img']} src={hotel.photos[1]} alt={hotel.photos[1]} />
            <h4 onClick={handlerToViewDetail.bind(null, hotel._id)} className={styles['listHotel-item_name']}>{hotel.name}</h4>
            <p className={styles['listHotel-item_city']}>{hotel.city}</p>
            <p className={styles['listHotel-item_price']}>Starting from ${hotel.cheapestPrice}</p>
            <span className={styles['listHotel-item_rate']}>{hotel.rating}</span> <span className={styles['listHotel-item_type']}>{hotel.type}</span>
        </div>
    )) : (<p>Không có danh sách hotel</p>)


    return (
        <Wrapper>
            <div className={styles.wrapperListHotel}>
                <h3 className={styles.title}>Home guests love</h3>
                <div className={styles.listHotel}>
                    {listHotelRender}
                </div>
            </div>
        </Wrapper>
    )
}

export default ListHotel
