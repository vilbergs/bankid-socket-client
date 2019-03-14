import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import io from 'socket.io-client'
import Snackbar from '@material-ui/core/Snackbar'

const baseUrl = 'http://localhost:5000'
const socket = io(baseUrl)

const Login = ({ handleAuthenticate }) => {
    const [open, setOpen] = useState(false)
    const [pnr, setPnr] = useState('')

    socket.on('connect', () => {
        setOpen(true)
    })

    socket.on('success', (response) => {
        const { token } = response
        sessionStorage.setItem('token', token)
        handleAuthenticate(true)
    })

    const handleChange = (e) => {
        setPnr(e.target.value)
    }

    const handleClick = (e) => {
        socket.emit('authenticateAndCollect', pnr)
    }

    return (
        <>
            <Grid item xs={4}>
                <Card>
                    <CardContent>
                        <Typography variant='h5' component='h2'>
                            Signera med BankID
                        </Typography>

                        <TextField
                            value={pnr}
                            onChange={handleChange}
                            id='standard-name'
                            label='Personnummer'
                            margin='normal'
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={handleClick}
                            color='primary'
                            size='small'
                        >
                            Start
                        </Button>
                    </CardActions>
                </Card>
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

export default Login
