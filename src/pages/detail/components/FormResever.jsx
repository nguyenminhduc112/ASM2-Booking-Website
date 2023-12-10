import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import styles from './FormResever.module.css'
import { DateRange } from 'react-date-range';
import { differenceInDays, format } from 'date-fns';
import { useForm } from "react-hook-form"
import MultipleCheckBoxRooms from './MultipleCheckBoxRooms';
import { getUserByEmail } from '../../../utils/dataUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTransaction } from '../../../utils/transaction';
import { useNavigate } from 'react-router-dom';
import { fetchHotel } from '../../../utils/hotelsData';
import { searchAction } from '../../../store/reducers/searchReducer';
// Mannager state pirce and number rooms
const reducerNumberRoom = (state, action) => {
    if (action.type === 'UPPDATE_ROOM_NUMBER') {
        return {
            roomNumber: action.data,
            priceTotal: Number(state.priceTotal),
            hotel: state.hotel
        }
    }
    if (action.type === 'UPPDATE_PRICE') {
        return {
            roomNumber: state.roomNumber,
            priceTotal: Number(action.data),
            hotel: state.hotel
        }
    }
    if (action.type === "UPPDATE_HOTEL") {
        return {
            roomNumber: state.roomNumber,
            priceTotal: Number(state.priceTotal),
            hotel: action.data
        }
    }

    return state
}
const FormResever = ({ hotel }) => {
    const router = useNavigate()
    const dispatchSerch = useDispatch()
    const keySearchData = useSelector(state => state.search)
    // State để lấy dữ liệu date
    const [range, setRange] = useState([
        {
            startDate: new Date(keySearchData.dateStart),
            endDate: new Date(keySearchData.dateEnd),
            key: 'selection'
        }
    ])

    const [stateRoom, dispatch] = useReducer(reducerNumberRoom, {
        roomNumber: [],
        priceTotal: 0,
        hotel: { ...hotel }
    })
    const isAuthentication = useSelector(state => state.auth.isAuthentication)
    const emailUser = useSelector(state => state.auth.emailUser)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onBlur'
    })

    // Get info user when isAuthentication
    useEffect(() => {
        if (isAuthentication) {
            getUserByEmail(emailUser)
                .then(data => {
                    setValue('fullName', data.fullName)
                    setValue('email', data.email)
                    setValue('phone', data.phone)
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }, [emailUser, isAuthentication, setValue])

    const numberDateBooked = useMemo(() => {
        const number = differenceInDays(range[0].endDate, range[0].startDate)
        let totalPrice = 0

        stateRoom.roomNumber.forEach(room => {
            if (room.numberRooms.length > 0) {
                room.numberRooms.forEach(number => {
                    totalPrice += Number(room.price)
                })
            }
        })
        dispatch({ type: 'UPPDATE_PRICE', data: totalPrice * number })

        const dateStart = format(range[0].startDate, 'MM/dd/yyyy')
        const dateEnd = format(range[0].endDate, 'MM/dd/yyyy')

        // Check and change Room of hotel when you change date
        fetchHotel(stateRoom.hotel._id, dateStart, dateEnd)
            .then(data => {
                dispatch({ type: 'UPPDATE_HOTEL', data: data })
                dispatchSerch(searchAction.save({ address: keySearchData.address, dateStart, dateEnd, numberPeople: keySearchData.numberPeople, numberRoom: keySearchData.numberRoom }))
            })
            .catch(err => console.log(err))
        return number
    }, [range])

    // Get Number Room Checked
    const handlerNumberRooms = useCallback((data) => {
        dispatch({ type: "UPPDATE_ROOM_NUMBER", data: data })
        let totalPrice = 0
        data.forEach(room => {
            if (room.numberRooms.length > 0) {
                room.numberRooms.forEach(number => {
                    totalPrice += Number(room.price)
                })
            }
        })
        dispatch({ type: 'UPPDATE_PRICE', data: totalPrice * numberDateBooked })
    }, [range])

    // Submit Handler
    const onHandleSubmit = (data) => {

        // 
        const dataReserve = {
            hotel: hotel._id,
            user: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                cardNumber: data.cardNumber
            },
            dateStart: format(range[0].startDate, 'MM/dd/yyyy'),
            dateEnd: format(range[0].endDate, 'MM/dd/yyyy'),
            room: stateRoom.roomNumber,
            price: stateRoom.priceTotal,
            payment: data.pay
        }
        // Check have choose number rooms
        const checkChooseRoom = stateRoom.roomNumber.some(room => {
            return room.numberRooms.length > 0
        })

        if (checkChooseRoom) {
            fetchAddTransaction(dataReserve)
                .then(response => {
                    alert('Reserve Success')
                    router('/')
                })
                .catch(err => console.log(err))
        } else {
            console.log(dataReserve)
            alert('You need to choose a room')
        }
    }
    // Render   
    const listRoomsRender = useMemo(() => {
        return stateRoom.hotel.rooms.map(room => (<div key={room._id} className={styles.roomItem}>
            <div className={styles.roomInfo}>
                <p className={styles.roomInfo_name}>{room.title}</p>
                <p className={styles.roomInfo_decs}>{room.desc}</p>
                <p className={styles.roomInfo_numberPeople}>Max people <span>{room.maxPeople}</span></p>
                <p className={styles.roomInfo_price}>${room.price}</p>
            </div>
            <MultipleCheckBoxRooms key={room._id} roomId={room._id} numberRooms={room.roomNumbers} price={room.price} onHandlerNumber={handlerNumberRooms} />
        </div>))
    }, [handlerNumberRooms, stateRoom.hotel])
    return (
        <React.Fragment>
            <form className={styles.form} onSubmit={handleSubmit(onHandleSubmit)}>
                <div className={styles.rowForm}>
                    <div className={styles.formControl}>
                        <label htmlFor="date" className={styles.labelForm}>Date</label>
                        <DateRange
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            direction='vertical'
                            onChange={item => setRange([item.selection])}
                            ranges={range}
                            className={styles.date}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.labelForm}>Reserve info</label>
                        <div className={styles.formControl}>
                            <label htmlFor="fullName" className={styles.labelSub}>Your Full Name:</label>
                            <input
                                id='fullName'
                                type='text'
                                name='fullName'
                                className={styles.inputForm}
                                {...register("fullName")}
                                placeholder='Full Name'
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label htmlFor="email" className={styles.labelSub}>Your Email:</label>
                            <input
                                id='email'
                                type='text'
                                className={styles.inputForm}
                                name='email'
                                {...register("email", {
                                    required: true
                                })}
                                placeholder='Email'
                            />
                            {errors.email?.type === "required" && (
                                <p role="alert" style={{ color: 'red' }}>Email is required</p>
                            )}
                        </div>
                        <div className={styles.formControl}>
                            <label htmlFor="phone" className={styles.labelSub}>Your Phone Number:</label>
                            <input
                                id='phone'
                                type='text'
                                className={styles.inputForm}
                                name='phone'
                                {...register("phone", {
                                    required: true
                                })}
                                placeholder='Phone Number'
                            />
                            {errors.phone?.type === "required" && (
                                <p role="alert" style={{ color: 'red' }}>Phone is required</p>
                            )}
                        </div>
                        <div className={styles.formControl}>
                            <label htmlFor="cardNumber" className={styles.labelSub}>Your Identity Card Number:</label>
                            <input
                                id='cardNumber'
                                type='text'
                                className={styles.inputForm}
                                name='cardNumber'
                                {...register("cardNumber", {
                                    required: true
                                })}
                                placeholder='Card Number'
                            />
                            {errors.cardNumber?.type === "required" && (
                                <p role="alert" style={{ color: 'red' }}>Card number is required</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.formControl}>
                    <label className={styles.labelForm}>Select Rooms</label>
                    <div className={styles.rowForm}>
                        {listRoomsRender}
                    </div>
                </div>
                <p className={styles.totlaBill}>Total Bill: ${stateRoom.priceTotal}</p>
                <div className={styles.actionForm}>
                    <div>
                        <select name="pay" id="pay"  {...register("pay", {
                            required: true
                        })} className={`${styles.inputForm} ${styles.selectForm}`}>
                            <option value="">Select Payment Method</option>
                            <option value="Credit">Credit</option>
                            <option value="Card">Card</option>
                            <option value="Cash">Cash</option>
                        </select>
                        {errors.pay?.type === "required" && (
                            <p role="alert" style={{ color: 'red', marginTop: 10 }}>Please choose payment method</p>
                        )}
                    </div>
                    <button type='submit' className={styles.btnReserveNow}>Reserve Now</button>
                </div>
            </form>

        </React.Fragment>
    )
}

export default React.memo(FormResever)
