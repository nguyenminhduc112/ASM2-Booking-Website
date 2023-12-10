import React, { useEffect, useState } from 'react'
// CSS
import styles from './ListCity.module.css'
// DATA
// import listCityData from '../../../../data/city.json'
// DOM
import Wrapper from '../../../../components/Layout/Wrapper'
import CityItem from './CityItem'
const ListCity = () => {
    const [listCityData, setListCityData] = useState([])
    const fetchListCityData = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/count/captioncity`)
        const data = await response.json()
        setListCityData(data)
    }
    useEffect(() => {
        fetchListCityData()
    }, [])
    let listCityRender = listCityData.length > 0 ? listCityData.map(city => (
        <CityItem key={city.city} name={city.city} image={city.image} subText={city.count} />
    )) : (<p>Không có thành phố</p>)
    return (
        <Wrapper >
            <div className={styles.wrapperListCity}>
                {listCityRender}
            </div>
        </Wrapper>
    )
}

export default ListCity
