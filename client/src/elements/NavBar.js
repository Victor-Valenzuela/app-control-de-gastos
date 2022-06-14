import * as React from 'react';
import axios from "axios";
import { AppBar, Avatar, Box, Button, Menu, MenuItem, Toolbar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';


const pages = [
    { label: 'Inicio', ruta: '/cuenta', id: '1' },
    { label: 'Categorias', ruta: '/categorias', id: '2' },
    { label: 'Fechas', ruta: '/lista', id: '3' },
];

const darkTheme = createTheme({
    palette: {
        background: {
            default: '#1f1f1f',
            paper: '#1f1f1f',
        },
    },
});

export default function Prueba2() {
    const navigate = useNavigate()
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [user, setUser] = React.useState();

    const getName = async () => {
        try {
            const { data } = await axios.get('/nombre');
            setName(data.nombre);
            setEmail(data.email);
            setUser(data.idUser);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getName();
    }, []);

    const logOut = async () => {
        try {
            await axios.get('/logout');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCuenta = async (email) => {
        Swal.fire({
            imageUrl: 'https://i0.wp.com/elpalomitron.com/wp-content/uploads/2018/05/Deadpool-sorpresa-gif.gif?resize=700%2C472',
            imageWidth: 350,
            imageHeight: 300,
            text: '¿¡Quieres borrar esta cuenta!?',
            showDenyButton: true,
            confirmButtonText: `Borrar`,
            confirmButtonColor: 'green',
            denyButtonText: `Cancelar`,
            color: '#716add',
            backdrop: `rgba(0,0,123,0.4)`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: '¡Cuenta borrada!',
                    imageUrl: 'https://c.tenor.com/p5DlOqiAhMsAAAAC/adios-vaquero.gif',
                    imageWidth: 350,
                    imageHeight: 250,
                    confirmButtonText: '🤑',
                    color: '#716add',
                    backdrop: `rgba(0,0,123,0.4)`
                }).then(async () => {
                    try {
                        await axios.delete(`/deleteAccount/${email}`);
                        navigate('/');
                    } catch (error) {
                        console.log(error);
                    }
                })
            }
        });
    }

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" style={{ background: '#00aeae' }}>
                    <Toolbar >
                        <Box sx={{ flexGrow: 1 }}>
                            <Tooltip title={name}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={name} src="/" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '40px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu} >
                                    <Button key='1' sx={{ color: 'white' }} onClick={() => logOut()} > <LogoutIcon /> Cerrar sesión</Button>
                                </MenuItem>

                                <MenuItem onClick={handleCloseUserMenu} >
                                    <Button key='2' sx={{ color: 'white' }} onClick={() => navigate(`/${user}/misdatos`)} ><UpgradeIcon />Actualizar datos</Button>
                                </MenuItem>

                                <MenuItem onClick={handleCloseUserMenu} >
                                    <Button key='3' sx={{ color: 'white' }} onClick={() => deleteCuenta(email)}><DeleteForeverIcon />Eliminar cuenta</Button>
                                </MenuItem>
                            </Menu>
                        </Box>


                        <Box sx={{ flexGrow: 0, display: 'flex' }}>
                            {pages.map((page) => (
                                <Button
                                    disabled={window.location.pathname === page.ruta || (window.location.pathname.includes('/edit') && page.id === '1')}
                                    color="inherit" key={page.id} onClick={() => navigate(page.ruta)}>
                                    {page.label}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    )
}


