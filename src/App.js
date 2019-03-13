import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import io from 'socket.io-client'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pnr: '',
            connected: false,
            authenticated: false,
            errors: [],
        }
    }
    socket

    componentDidMount() {
        this.socket = io('172.17.4.231:5000')
        this.socket.on('connect', () => this.setState({ connected: true }))
        this.socket.on('success', () => this.setState({ authenticated: true }))
        this.socket.on('failure', (response) => {
            const { details } = response
            this.setState({ errors: [{ title: '', details }] })
        })
    }

    handleChange = (event) => {
        this.setState({ pnr: event.target.value })
    }

    handleClick = (e) => {
        this.socket.emit('authenticateAndCollect', this.state.pnr)
    }

    render() {
        const { errors } = this.state
        return (
            <Grid container spacing={24} justify='center'>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' component='h2'>
                                Signera med BankID
                            </Typography>
                            {errors.length > 0 && (
                                <ul
                                    style={{
                                        backgroundColor: 'red',
                                    }}
                                >
                                    {Object.entries(errors).map(
                                        ([index, error]) => (
                                            <li key={index}>{error.details}</li>
                                        ),
                                    )}
                                </ul>
                            )}
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
        )
    }
}

export default App
