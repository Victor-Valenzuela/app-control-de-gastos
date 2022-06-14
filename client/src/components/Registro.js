import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

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

const OutlinedInputStyle = styled(OutlinedInput)(({ theme }) => ({
    backgroundColor: '#027e7e',
}));

export default function Registro() {

    const navigate = useNavigate();
    const params = useParams();

    const [editing, setEditing] = React.useState(false);
    const [user, setUser] = React.useState({ nombre: '', email: '', password: '', password2: '' });
    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    React.useEffect(() => {
        if (params.id) loadId(params.id);
    }, [params.id]);

    const loadId = async (id) => {
        try {
            const { data } = await axios.get(`/user/${id}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
        setEditing(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.password2) {
            alert('Las contraseñas no coinciden');
        } else if (!editing) {
            try {
                await axios.post('/registro', user);
                navigate('/login');
            } catch ({ response }) {
                const { data } = response
                console.log(data);
                Swal.fire({
                    text: 'El nombre de usuario o correo ya se encuentran registrados',
                    color: '#716add',
                    imageWidth: 300,
                    imageHeight: 300,
                    imageUrl: 'https://c.tenor.com/Df5NDKON3WYAAAAC/bugs-bunny-looney-tunes.gif',
                    confirmButtonText: 'Aceptar'
                })
            }
        } else {
            try {
                await axios.put(`/user/${user.id}`, user);
                Swal.fire({
                    title: '¡Listo!',
                    text: 'Se ha actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                    .then(async () => {
                        try {
                            await axios.get('/logout');
                            navigate('/');
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    );
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleClickShowPassword = () => {
        setUser({
            ...user,
            showPassword: !user.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => {
        setUser({
            ...user,
            showPassword2: !user.showPassword2,
        });
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };


    return (
        < >
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', }}                >
                    <Avatar sx={{ m: 1, bgcolor: '#FC4A1A' }}>
                        {editing ? <EditIcon fontSize='large' /> : <SupervisorAccountIcon fontSize='large' />}
                    </Avatar>
                    <Typography sx={{ mt: 3, fontFamily: 'Courier New, Courier, monospace', fontSize: '2rem', fontWeight: 'bold' }} variant="h3">
                        {editing ? 'Editar cuenta' : 'Crear cuenta'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField onChange={handleChange} margin="normal" required fullWidth id="name" {...(editing ? { value: user.nombre } : { placeholder: "Nombre*" })} name="nombre" autoComplete="off" autoFocus inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', } }} />

                        <TextField onChange={handleChange} margin="normal" required fullWidth name="email" {...(editing ? { value: user.email } : { placeholder: "Email*" })} type="email" id="email" autoComplete="off" inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', } }} />

                        <OutlinedInputStyle sx={{ mt: 2, mb: 1 }} onChange={handleChange} required fullWidth name="password" placeholder='Password*' autoComplete="off"
                            id="password"
                            type={user.showPassword ? 'text' : 'password'}
                            {...(editing ? { value: user.password } : {})}
                            endAdornment={
                                <InputAdornment position="end" inputProps={{ style: { backgroundColor: '#027e7e' } }} >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', } }} />

                        <OutlinedInputStyle sx={{ mt: 2, mb: 1 }} onChange={handleChange} required fullWidth name="password2" placeholder='Repita su password*' autoComplete="off"
                            id="password2"
                            type={user.showPassword2 ? 'text' : 'password'}
                            {...(editing ? { value: user.password2 } : {})}
                            endAdornment={
                                <InputAdornment position="end" inputProps={{ style: { backgroundColor: '#027e7e' } }} >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword2}
                                        edge="end"
                                    >
                                        {user.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{ style: { backgroundColor: '#027e7e', color: "white", textAlign: "center", fontSize: '1rem', } }} />

                        <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            {editing ? 'Editar' : 'Registrar'}
                        </ColorButton>
                        <Grid {...(editing ? { display: 'none' } : {})} container justifyContent="flex-end">
                            <Grid item>
                                <ColorButton2 variant="text" onClick={() => navigate('/login')}> ¿Ya tienes cuenta? Inicia sesión aquí</ColorButton2>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}