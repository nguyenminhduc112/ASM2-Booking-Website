import React from 'react'
import styles from './ListType.module.css'

const TypeItem = (props) => {
    return (
        <div className={styles['listType-item']}>
            <img className={styles['listType-item_img']} src={props.image} alt={props.image} />
            <h4 className={styles['listType-item_name']}>{props.name}</h4>
            <p className={styles['listType-item_count']}>{props.count} {props.name}</p>
        </div>
    )
}

export default TypeItem
