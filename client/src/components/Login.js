import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FC4A1A',
    '&:hover': {
        backgroundColor: '#8d2c11',
    },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
    color: 'white',
    textDecoration: ' underline',
    backgroundColor: '#00aeae',
    '&:hover': {
        backgroundColor: '#027e7e',
    },
}));


export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState({ email: '', password: '' });
    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', user);
            if (data === true) {
                Swal.fire({
                    text: '!Bienvenida/o!',
                    imageWidth: 300,
                    imageHeight: 300,
                    imageUrl: 'https://i.giphy.com/media/3xqh9FxO2PpiU/giphy.webp',
                    confirmButtonText: 'Aceptar',
                    color: '#716add',
                    backdrop: `rgba(0,0,123,0.4)`
                }).then(() => navigate('/'));

            } else {
                Swal.fire({
                    text: '!Usuario o contraseña incorrectos!',
                    imageWidth: 300,
                    imageHeight: 200,
                    imageUrl: 'https://64.media.tumblr.com/acf4d3984db4dacecb3fc5f76a882974/tumblr_mjt4banB8t1qjaow2o1_500.gif',
                    confirmButtonText: 'Aceptar',
                    color: '#716add',
                    backdrop: `rgba(0,0,123,0.4)`
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        < >
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: '#FC4A1A' }}>
                        <LoginIcon fontSize='large' />
                    </Avatar>
                    <Typography sx={{ mt: 3, fontFamily: 'Courier New, Courier, monospace', fontSize: '2rem', fontWeight: 'bold' }} variant="h3">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField onChange={handleChange} margin="normal" required fullWidth id="email" placeholder="Email*" name="email" type="email" autoComplete="off" autoFocus inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', } }} />
                        <TextField onChange={handleChange} margin="normal" required fullWidth id="password" placeholder="Password*" name="password" type="password" autoComplete="off" inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', } }} />
                        <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Iniciar
                        </ColorButton>
                        <Grid container justifyContent="flex-end">
                            <ColorButton2 sx={{ fontSize: '0.7rem' }} variant="text" onClick={() => navigate('/recuperar')}> ¿Has olvidado la contraseña? </ColorButton2>
                            <Grid item>
                                <ColorButton2 variant="text" onClick={() => navigate('/registro')}>¿No tienes cuenta? Regístrate aquí</ColorButton2>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}