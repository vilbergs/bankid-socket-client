import React from 'react'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import CircularProgress from '@material-ui/core/CircularProgress'

function Transition(props) {
    return <Slide direction='up' {...props} />
}

class BankIdDialog extends React.Component {
    state = {
        open: this.props.open,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
            >
                <DialogTitle id='alert-dialog-slide-title'>
                    {'Öppna BankID appen'}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={0}
                        direction='column'
                        alignItems='center'
                        justify='center'
                        style={{ minHeight: '20vh' }}
                    >
                        <Grid item xs={3}>
                            <CircularProgress size={60} />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }
}

export default BankIdDialog
