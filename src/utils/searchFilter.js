
export const searchFilter = (data , value) => {
    return data.filter(obj => {
        return value === '' ? obj : obj.title.toLowerCase().includes(value.toLowerCase())
    })
}