export const fetchHotel = async (id, dateStart, dateEnd) => {
    const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/hotel/${id}/?dateStart=${dateStart}&dateEnd=${dateEnd}`)
    const data = await response.json()
    return data
}