import React from 'react'
import styles from './ListCity.module.css'

const CityItem = (props) => {
    return (
        <div className={styles['item-city']}>
            <img className={styles['item-city_img']} src={props.image} alt={props.image} />
            <div className={styles['item-city_des']}>
                <div className={styles['item-city_name']}>{props.name}</div>
                <div className={styles['item-city_properties']}>{props.subText} properties</div>
            </div>
        </div>
    )
}

export default CityItem
