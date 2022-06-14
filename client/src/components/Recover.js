import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const ColorButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#FC4A1A',
        color: 'white',
    },
}));


export default function Recover() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState({});
    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/recover', user);
            Swal.fire({
                title: '¡Listo!',
                text: 'Te hemos enviado un correo para que puedas iniciar sesión con tu contraseña',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                navigate('/login');
            });
        } catch ({ response }) {
            const { data } = response;
            console.log(data.error);
            Swal.fire({
                title: '¡Error!',
                text: 'El correo no existe en la base de datos',
                icon: 'error',
                confirmButtonText: 'Ok'
            })

        }
    };

    return (
        < >
            <Container component="main">
                <Grid />
                <Box sx={{ marginTop: 8, textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: '#FC4A1A' }}>
                        <MarkEmailUnreadIcon fontSize='large' />
                    </Avatar>
                    <Typography sx={{ mt: 3, fontFamily: 'Courier New, Courier, monospace', fontSize: '2rem', fontWeight: 'bold' }} variant="h3">
                        Recupera tu contraseña
                    </Typography>
                    {/* text only*/}
                    <Typography item sx={{ mt: 3, mx: 'auto', fontFamily: 'Courier New, Courier, monospace', fontSize: '1rem', fontWeight: 'bold' }} variant="h5">
                        Ingresa tu correo electrónico y te enviaremos un correo con tu contraseña
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField onChange={handleChange} margin="normal" required id="email" placeholder="Email*" name="email" type="email" autoComplete="off" autoFocus inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', width: 300 } }} />
                        <Grid container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            sx={{ mt: 2 }}>
                            <Grid marginRight={2}>
                                <ColorButton type="submit" variant="text" sx={{ color: '#4b4f56' }} onClick={() => navigate('/login')} >
                                    Cancelar
                                </ColorButton>
                            </Grid>
                            <Grid >
                                <Button type="submit" variant="contained"   >
                                    Recuperar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}