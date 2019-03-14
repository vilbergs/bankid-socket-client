import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Secret = ({ handleAuthenticate }) => {
    const handleClick = (e) => {
        sessionStorage.removeItem('token')
        handleAuthenticate(false)
    }

    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        Welcome
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleClick} color='primary' size='small'>
                        Logga ut
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Secret
