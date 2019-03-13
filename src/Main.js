import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Main = ({ socket }) => {
    const [pnr, setPnr] = useState('')

    const handleChange = (e) => {
        setPnr(e.target.value)
    }

    const handleClick = (e) => {
        socket.emit('authenticateAndCollect', pnr)
    }

    return (
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
                    <Button onClick={handleClick} color='primary' size='small'>
                        Start
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Main
