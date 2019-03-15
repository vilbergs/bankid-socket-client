import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Dialog from './BankIdDialog'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import io from 'socket.io-client'
import Snackbar from '@material-ui/core/Snackbar'

const baseUrl = 'http://localhost:5000'
const socket = io(baseUrl, { secure: true })

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        padding: 30,
    },
}

const Login = ({ classes, handleAuthenticate }) => {
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pnr, setPnr] = useState('')

    socket.on('connect', () => {
        setOpen(true)

        const orderRef = sessionStorage.getItem('orderRef')
        if (null !== orderRef) {
            socket.emit('collect', orderRef)
            setDialogOpen(true)
        }
    })

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected: ${reason}`)
        setDialogOpen(false)
    })

    socket.on('orderRef', (orderRef) => {
        sessionStorage.setItem('orderRef', orderRef)
        socket.emit('collect', orderRef)
    })

    socket.on('success', (response) => {
        const { token } = response
        sessionStorage.removeItem('orderRef')
        sessionStorage.setItem('token', token)
        handleAuthenticate(true)
        setDialogOpen(false)
    })

    socket.on('failure', () => {
        sessionStorage.removeItem('orderRef')
        setDialogOpen(false)
    })

    const handleChange = (e) => {
        setPnr(e.target.value)
    }

    const handleClick = (e) => {
        socket.emit('authenticate', pnr)
        setDialogOpen(true)
    }

    return (
        <>
            <Card>
                <CardMedia
                    component='img'
                    alt='Contemplative Reptile'
                    className={classes.media}
                    height='200'
                    image='/bankid.svg'
                    title='Contemplative Reptile'
                />
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
                        variant='contained'
                        onClick={handleClick}
                        color='primary'
                        size='large'
                    >
                        Start
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={<span>BankId Connected</span>}
            />
            <Dialog open={dialogOpen} />
        </>
    )
}

export default withStyles(styles)(Login)
