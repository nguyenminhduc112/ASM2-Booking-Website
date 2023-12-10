import React, { useState } from 'react'
// Components
import Wrapper from '../../../../components/Layout/Wrapper'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
// CSS
import styles from './Header.module.css'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../../../../store/reducers/searchReducer';
const Header = () => {
    const isAuthentication = useSelector(state => state.auth.isAuthentication)
    const router = useNavigate()
    const dispatch = useDispatch()
    const keySearchData = useSelector(state => state.search)
    // State để lấy dữ liệu date
    const [range, setRange] = useState([
        {
            startDate: new Date(keySearchData.dateStart),
            endDate: new Date(keySearchData.dateEnd),
            key: 'selection'
        }
    ])
    // Open Date status
    const [openDateRange, SetOpenDateRange] = useState(false)
    // Sự kiện khi bấm nút search
    const handlerClickSearch = (e) => {
        e.preventDefault()
        const address = e.target[0].value
        const dateString = e.target[1].value.split(' - ')
        const dateStart = dateString[0]
        const dateEnd = dateString[1]
        const numberPeople = Number(e.target[2].value) + (Number(e.target[3].value) >= 2 ? 1 : 0)
        const numberRoom = Number(e.target[4].value)
        dispatch(searchAction.save({ address, dateStart, dateEnd, numberPeople, numberRoom }))
        router('/search')
    }
    return (
        <div className={styles.wrapperHomePage}  >
            <Wrapper className={styles['wrapperHomePage-main']}>
                <div className={styles['info']}>
                    <h1>A lifetime of discounts? It's Genius</h1>
                    <p>Get rewarded for your travels - unlock instant savings of 10% or more with a free account</p>
                    {!isAuthentication && <button onClick={() => {
                        router('/signin')
                    }}>Sign in/Register</button>}
                </div>
                <form className={styles.formSearch} onSubmit={handlerClickSearch}>
                    <div className={styles.formControl}>
                        <label ><span className='fa fa-bed'></span></label>
                        <input type="text" placeholder='Where are you going?' name='address' />
                    </div>
                    <div className={styles.formControl}>
                        <label ><span className='fa fa-calendar'></span></label>
                        <input
                            value={`${format(range[0].startDate, 'MM/dd/yyyy')} - ${format(range[0].endDate, 'MM/dd/yyyy')}`}
                            readOnly
                            onClick={() => SetOpenDateRange(open => !open)}
                        />

                    </div>
                    <div className={styles.formControl}>
                        <label ><span className='fa fa-female'></span></label>
                        <input type="number" name='adult' placeholder='1 adult' min={1} />
                        <input type="number" name='children' placeholder='0 children' min={1} />
                        <input type="number" name='room' placeholder='1 room' />
                    </div>
                    <div className={styles.formActions}>
                        <button type='submit' >Search</button>
                    </div>
                </form>
                {openDateRange ? (<DateRange
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    direction='vertical'
                    onChange={item => setRange([item.selection])}
                    ranges={range}
                    className={styles.date}
                />) : ''}
            </Wrapper>
        </div>
    )
}

export default Header
