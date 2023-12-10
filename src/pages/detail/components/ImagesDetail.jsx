import React from 'react'
import styles from '../Dettail.module.css'

const ImagesDetail = (props) => {
    let listImagesRender = props.photos.length > 0 ? props.photos.map((photo, index) => (
        <img key={index} className={styles.imgDetail} src={photo} alt={photo} />
    )) : (<p>Không có hình ảnh</p>)
    return (
        <div className={styles.wrapperImages}>
            {listImagesRender}
        </div>
    )
}

export default ImagesDetail
