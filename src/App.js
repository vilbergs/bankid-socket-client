import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './Menu'
import Grid from '@material-ui/core/Grid'
import Secret from './Secret'
import Login from './Login'
import Axios from 'axios'
const baseUrl = 'http://localhost:5000'

const App = (props) => {
    const [authenticated, setAuthenticated] = useState(false)
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
            <CssBaseline />
            <Menu authenticated={authenticated} />
            <Grid
                container
                spacing={8}
                style={{
                    margin: 0,
                    width: '100%',
                }}
                justify='center'
            >
                <Grid item xs sm={6}>
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
                        />
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default App
