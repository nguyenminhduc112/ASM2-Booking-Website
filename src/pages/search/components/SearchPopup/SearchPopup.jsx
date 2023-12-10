import React from 'react'
// CSS
import styles from './SearchPopup.module.css'
const SearchPopup = () => {
    return (
        <div className={styles.wrapperSearchPopup}>
            <h3 className={styles.title}>Search</h3>
            <form >
                <div className={styles.formGroup}>
                    <label className={styles.labelForm}>Destination</label>
                    <input type='text' className={styles.inputForm} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.labelForm}>Check in Date</label>
                    <input type='date' className={styles.inputForm} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.labelForm}>Option</label>
                    <div className={styles.formGroupSub}>
                        <label className={styles.labelSubForm}>Min price per night</label>
                        <input type="text" className={styles.inputSubForm} />
                    </div>
                    <div className={styles.formGroupSub}>
                        <label className={styles.labelSubForm}>Max price per night</label>
                        <input type="text" className={styles.inputSubForm} />
                    </div>
                    <div className={styles.formGroupSub}>
                        <label className={styles.labelSubForm}>Adult</label>
                        <input type="number" placeholder='1' className={styles.inputSubForm} />
                    </div>
                    <div className={styles.formGroupSub}>
                        <label className={styles.labelSubForm}>Children</label>
                        <input type="number" placeholder='0' className={styles.inputSubForm} />
                    </div>
                    <div className={styles.formGroupSub}>
                        <label className={styles.labelSubForm}>Room</label>
                        <input type="number" placeholder='1' className={styles.inputSubForm} />
                    </div>
                </div>
                <button type='submit' className={styles.btnSubmit}>Search</button>
            </form>
        </div>
    )
}

export default SearchPopup
