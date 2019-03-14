import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

const baseUrl = 'http://localhost:5000'

const Login = ({ handleAuthenticate, open, setOpen, socket }) => {
    const [pnr, setPnr] = useState('')

    const handleChange = (e) => {
        setPnr(e.target.value)
    }

    const handleClick = (e) => {
        // setDisabledButton(true)
        socket.emit('authenticate', pnr)
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
                            disabled={false}
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
