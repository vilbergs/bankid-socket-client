import React, { useState } from 'react'
import io from 'socket.io-client'
import Grid from '@material-ui/core/Grid'
import Main from './Main'
import Snackbar from '@material-ui/core/Snackbar'

const socket = io('http://localhost:5000')

const App = (props) => {
    const [open, setOpen] = useState(false)

    socket.on('connect', () => {
        setOpen(true)
    })

    return (
        <>
            <Grid container spacing={24} justify='center'>
                <Main socket={socket} />
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={<span>BankId Connected</span>}
            />
        </>
    )
}

export default App
