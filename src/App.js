import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'
import io from 'socket.io-client'

const baseUrl = '127.0.0.1:5000'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pnr: '',
            connected: false,
            authenticated: false,
            token: sessionStorage.getItem('token'),
        }
    }

    componentDidMount() {
        const { token } = this.state
        this.socket = io(baseUrl)
        this.socket.on('connect', () => this.setState({ connected: true }))
        this.socket.on('success', (response) => {
            const { token } = response
            sessionStorage.setItem('token', token)
            this.setState({ authenticated: true, token })
        })

        if (token !== null) {
            console.log(baseUrl + '/secret?token=' + token)
            Axios(baseUrl + '/secret?token=' + token)
                .then((response) => {
                    console.log(response)
                    this.setState({ authenticated: true })
                })
                .catch((response) => {
                    console.log(response)
                })
        }
    }

    handleChange = (event) => {
        this.setState({ pnr: event.target.value })
    }

    handleClick = (e) => {
        this.socket.emit('authenticateAndCollect', this.state.pnr)
    }

    handleLogout = (e) => {
        sessionStorage.removeItem('token')
        this.setState({ authenticated: false })
    }

    render() {
        const { authenticated } = this.state
        return (
            <>
                {authenticated ? (
                    <Grid container spacing={24} justify='center'>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' component='h2'>
                                        Welcome!
                                    </Typography>
                                    <button onClick={this.handleLogout}>
                                        Logga ut
                                    </button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={24} justify='center'>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' component='h2'>
                                        Signera med BankID
                                    </Typography>
                                    <Typography
                                        component='p'
                                        style={{
                                            color: this.state.connected
                                                ? 'green'
                                                : 'red',
                                        }}
                                    >
                                        ****
                                    </Typography>
                                    <TextField
                                        value={this.state.pnr}
                                        onChange={this.handleChange}
                                        id='standard-name'
                                        label='Personnummer'
                                        margin='normal'
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={this.handleClick}
                                        color='primary'
                                        size='small'
                                    >
                                        Start
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </>
        )
    }
}

export default App
