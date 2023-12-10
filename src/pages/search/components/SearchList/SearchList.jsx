import React, { useEffect, useState } from 'react'
// CSS
import styles from './SearchList.module.css'
// DATA
// import listSearchData from '../../../../data/search.json'
// DOM
import SearchItem from './SearchItem'
import { useSelector } from 'react-redux'
const SearchList = () => {
    const [listSearchData, setListSearchData] = useState([])
    const keySearchData = useSelector(state => state.search)
    const fetchListHotelData = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/search?address=${keySearchData.address}&dateEnd=${keySearchData.dateEnd}&dateStart=${keySearchData.dateStart}&numberPeople=${keySearchData.numberPeople}&numberRoom=${keySearchData.numberRoom}`)
        const data = await response.json()
        setListSearchData(data)
    }
    useEffect(() => {
        fetchListHotelData()
    }, [keySearchData])
    let listSearchRender = listSearchData.length > 0 ? listSearchData.map((item, index) => (
        <SearchItem key={index} address={item.address} name={item.name} distance={item.distance} tag={item.tag} description={item.desc} type={item.type} free_cancel={item.featured} numberRoom={item.rooms.length} rate={item.rating} url_img={item.photos[1]} price={item.cheapestPrice} id={item._id} />
    )) : (<p>Không có kết quả tìm kiểm</p>)
    return (
        <div className={styles.ListSearch}>
            {listSearchRender}
        </div>
    )
}

export default SearchList
