import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Secret from './Secret'
import Login from './Login'
import Axios from 'axios'
import io from 'socket.io-client'

const baseUrl = 'http://localhost:5000'

const socket = io(baseUrl, {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
})

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [open, setOpen] = useState(false)

    socket.on('connect', () => {
        setOpen(true)

        console.log('connected')

        const orderRef = sessionStorage.getItem('orderRef')
        if (null !== orderRef) {
            setDisabledButton(true)
            socket.emit('checkAlreadyCollectedBankIDStatus', orderRef)
        }
    })

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected: ${reason}`)
    })

    socket.on('orderRef', (orderRef) => {
        setDisabledButton(true)
        sessionStorage.setItem('orderRef', orderRef)
        socket.emit('collect', orderRef)
    })

    socket.on('success', (response) => {
        const { token } = response
        sessionStorage.setItem('token', token)
        sessionStorage.removeItem('orderRef')
        setAuthenticated(true)
    })

    socket.on('failure', () => {
        setDisabledButton(false)
        sessionStorage.removeItem('orderRef')
    })

    const token = sessionStorage.getItem('token')

    if (token !== null) {
        var config = {
            headers: { Authorization: 'bearer ' + token },
        }

        Axios.get(baseUrl + '/secret', config)
            .then((response) => {
                setAuthenticated(true)
                console.log(response)
            })
            .catch((response) => {
                console.log(response)
            })
    }

    return (
        <>
            <Grid container spacing={24} justify='center'>
                {authenticated ? (
                    <Secret
                        handleAuthenticate={(isAuthenticated) =>
                            setAuthenticated(isAuthenticated)
                        }
                    />
                ) : (
                    <Login
                        handleAuthenticate={(isAuthenticated) =>
                            setAuthenticated(isAuthenticated)
                        }
                        open={open}
                        setOpen={setOpen}
                        socket={socket}
                    />
                )}
            </Grid>
        </>
    )
}

export default App
