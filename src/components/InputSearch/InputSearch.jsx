import React from 'react'
import { TextField } from '@material-ui/core'
function InputSearch({setValue , styles , value}) {
    return (
        <TextField onChange={(e) => setValue(e.target.value)} style={styles} label="Search" variant="standard" value={value} />
    )
}

export default InputSearch
