import * as React from 'react';
import { SpinnerDotted } from 'spinners-react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Comprobar() {
    const navigate = useNavigate();

    const getToken = async () => {
        try {
            const { data } = await axios.get('/comprobar')
            if (data === true) {
                navigate('/cuenta')
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    };

    React.useEffect(() => {
        getToken();
    }, []);

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" height={'100vh'}            >
            <SpinnerDotted size={250} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" />
        </Grid>
    );
}