export const genreFilter = (data , value) => {
    return data.filter(obj => {
        return value == 'All' ? obj : obj.genre.toLowerCase() === value.toLowerCase() 
    })
}