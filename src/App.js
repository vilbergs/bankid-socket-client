import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
    root: {
        flexGrow: 1,
        marginTop: 50,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        fontSize: 8,
        marginBottom: 12,
    },
}

function SimpleCard(props) {
    const { classes } = props
    const bull = <span className={classes.bullet}>•</span>

    return (
        <div className={classes.root}>
            <Grid container spacing={24} justify="center">
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Signera med BankID
                            </Typography>
                            <TextField
                                id="standard-name"
                                label="Personnummer"
                                className={classes.textField}
                                margin="normal"
                            />
                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                            >
                                YYMMDDNNNN
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" size="small">
                                Start
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)
