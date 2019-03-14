import React, { useState } from 'react'
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
                    />
                )}
            </Grid>
        </>
    )
}

export default App
