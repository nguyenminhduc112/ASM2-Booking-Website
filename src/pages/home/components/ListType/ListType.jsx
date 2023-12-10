import React, { useEffect, useState } from 'react'
// CSS
import styles from './ListType.module.css'
// Data 
// import listTypeData from '../../../../data/type.json'
// DOM
import Wrapper from '../../../../components/Layout/Wrapper'
import TypeItem from './TypeItem'
const ListType = () => {
    const [listTypeData, setListTypeData] = useState([])
    const fetchListTypeData = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/count/category`)
        const data = await response.json()
        setListTypeData(data)
    }
    useEffect(() => {
        fetchListTypeData()
    }, [])
    let listTypeRender = listTypeData.length > 0 ? (listTypeData.map((type, index) => (
        <TypeItem key={index} name={type.type} image={type.image} count={type.count} />
    ))) : (<p>Không có một thể loại nào</p>)
    return (
        <Wrapper >
            <div className={styles.wrapperListType}>
                <h3 className={styles.title}>Browse by property type</h3>
                <div className={styles.listType}>
                    {listTypeRender}
                </div>
            </div>
        </Wrapper>
    )
}

export default ListType
