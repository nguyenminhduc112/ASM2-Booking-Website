import React, { useEffect, useMemo, useState } from 'react'
import styles from './FormResever.module.css'
let data = []
const MultipleCheckBoxRooms = ({ numberRooms, roomId, price, onHandlerNumber }) => {
    const [roomArray, setRoomArray] = useState([])
    const handlerCheckbox = (e) => {
        const checked = e.target.checked
        const value = Number(e.target.value)
        if (checked) {
            setRoomArray(cuurentState => [...cuurentState, value])
        } else {
            setRoomArray(
                cuurentState => {
                    return cuurentState.filter(num => {
                        return Number(num) !== Number(value)
                    })
                }

            )
        }
    }

    useEffect(() => {
        // Check ids hotels
        data[roomId] = {
            roomId: roomId,
            numberRooms: roomArray,
            price: price
        }
        const dataFinal = Object.values(data);
        onHandlerNumber(dataFinal)
    }, [roomArray])
    // Render 
    const listNumberRoomsRender = useMemo(() => {
        return numberRooms.map((number, index) => (
            <div key={index} className={styles.checkForm}>
                <label className={styles.checkForm_label}>{number}</label>
                <input type="checkbox" name='numberRooms' className={styles.checkForm_input} value={number} onChange={handlerCheckbox} />
            </div>
        ))
    }, [numberRooms])
    return (
        <React.Fragment>
            <div className={styles.roomsNumber}>
                {listNumberRoomsRender}
            </div>
        </React.Fragment>
    )
}

export default MultipleCheckBoxRooms
