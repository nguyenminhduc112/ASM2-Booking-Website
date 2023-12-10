import React from 'react'
// CSS
import styles from './Footer.module.css'
// DATA
import footerData from '../../../data/footer.json'
// DOM
import Wrapper from '../Wrapper'
const Footer = () => {
    let listMenuFooterRender = footerData.length > 0 ? footerData.map(item => (

        <div key={item.col_number} className={styles.MenuFooterItem}>
            {item.col_values.map((value, index) => (
                <p key={index} className={styles['MenuFooterItem-value']}>{value}</p>
            ))}
        </div>
    )) : (<p>Khôn có menu footer</p>)
    return (
        <Wrapper>
            <div className={styles.listMenuFooter}>
                {listMenuFooterRender}
            </div>
        </Wrapper>
    )
}

export default Footer
