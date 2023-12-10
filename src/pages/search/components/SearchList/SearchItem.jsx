import React from 'react'
// CSS
import styles from './SearchList.module.css'
import { Link } from 'react-router-dom'
const SearchItem = (props) => {
    let renderFreeCancel = props.free_cancel ? (<div>
        <p className={styles['ListSearch-item_info-free_cancel']}>Free cancellation</p>
        <p className={styles['ListSearch-item_info-free_cancelDes']}>You can cancel later, so look in this great price today!</p>
    </div>) : ""
    return (
        <div className={styles['ListSearch-item']}>
            <div className={styles['ListSearch-item-group']}> <img className={styles['ListSearch-item_img']} src={props.url_img} alt={props.url_img} />
                <div className={styles['ListSearch-item_info']}>
                    <Link to={`/detail/${props.id}`} className={styles['ListSearch-item_info-title']}> <h3 >{props.name}</h3></Link>
                    <p className={styles['ListSearch-item_info-distance']}>{props.distance}m from centee</p>
                    <p className={styles['ListSearch-item_info-tag']}> {props.numberRoom > 1 ? `${props.numberRoom} rooms` : `${props.numberRoom} room`} </p>
                    <p className={styles['ListSearch-item_info-description']}>{props.description}</p>
                    <p className={styles['ListSearch-item_info-type']}>{props.address}</p>
                    {renderFreeCancel}
                </div></div>
            <div className={styles['ListSearch-item_actions']}>
                <div className={styles['ListSearch-item_actions-rate']}>
                    <p className={styles['ListSearch-item_actions-rate-text']}>{props.type}</p>
                    <p className={styles['ListSearch-item_actions-rate-number']}>{props.rate} ⭐</p>
                </div>
                <div>
                    <p className={styles['ListSearch-item_actions-price']}>${props.price}</p>
                    <p className={styles['ListSearch-item_actions-sub']}>Includes taxes and fees</p>
                    <button className={styles['ListSearch-item_actions-btn']}>See avalilabillity</button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem
