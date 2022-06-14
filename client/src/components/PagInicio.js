import * as React from 'react';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';
import SeccionFooter from '../elements/footer';

import AddIcon from '@mui/icons-material/Add';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaymentsIcon from '@mui/icons-material/Payments';
import CottageIcon from '@mui/icons-material/Cottage';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { es } from 'date-fns/locale'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';

//Constantes para iconos, temas y colores
const options = [
    { label: 'Comida', id: 'comida', icon: <RestaurantIcon /> },
    { label: 'Cuentas', id: 'cuentas', icon: <PaymentsIcon /> },
    { label: 'Hogar', id: 'hogar', icon: <CottageIcon /> },
    { label: 'Transporte', id: 'transporte', icon: <DirectionsCarIcon /> },
    { label: 'Ropa', id: 'Ropa', icon: <CheckroomIcon /> },
    { label: 'Salud', id: 'salud', icon: <LocalHospitalIcon /> },
    { label: 'Compras', id: 'compras', icon: <ShoppingBasketIcon /> },
    { label: 'Diversion', id: 'diversion', icon: <CelebrationIcon /> },
    { label: 'Ingresos', id: 'ingresos', icon: <MonetizationOnIcon /> },
];

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FC4A1A',
    '&:hover': {
        backgroundColor: '#8d2c11',
    },
}));

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
//////////////////////////////////////////////////////////
//Variables para la alerta, hecha con sweetAlert2
const imgRandomSuccess = [
    'https://c.tenor.com/mt-AI5e-0nsAAAAC/fry-shut-up-and-take-my-money.gif',
    'https://c.tenor.com/SZGVnk9Wx6YAAAAC/take-my-money-spongebob.gif',
    'https://c.tenor.com/58A-VQVqKp4AAAAC/spongebob-no-money.gif',
    'https://c.tenor.com/FhOVoMvUq7EAAAAC/spongebob-grin.gif',
    'https://i.giphy.com/media/lSJyXE6Bre5ThheZca/giphy.webp'
]

const imgRandomError = [
    'https://c.tenor.com/YnizaZv-1TMAAAAC/patrick-star-dumb.gif',
    'https://i.giphy.com/media/dmZzuYk5P3byHg3Ggk/giphy.webp',
    'https://c.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif'
]
const alertConfig = (e) => {
    if (e === 'success') {
        Swal.fire({
            text: '¡Gasto añadido!',
            imageUrl: imgRandomSuccess[Math.floor(Math.random() * imgRandomSuccess.length)],
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: '🤫',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
            `
        })
    } else if (e === 'validacion') {
        Swal.fire({
            text: '¡Gasto sólo deben ser números!',
            imageUrl: imgRandomError[Math.floor(Math.random() * imgRandomError.length)],
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: '🙄',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
            `
        })
    } else if (e === 'edit') {
        Swal.fire({
            text: '¡Gasto editado!',
            imageUrl: 'https://c.tenor.com/uryrumlj7IIAAAAC/burns-excellent.gif',
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: '🤑',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
            `
        })
    } else {
        Swal.fire({
            text: '¡Error al añadir el gasto!',
            imageUrl: 'https://c.tenor.com/2yJBnYOY_j8AAAAM/tonton-tonton-sticker.gif',
            imageWidth: 300,
            imageHeight: 300,
            confirmButtonText: '💩',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
            `
        })
    }
}
//////////////////////////////////////////////////////////

export default function FormularioGasto() {
    //Variables para el formulario, fecha, categorias, gastos, etc.
    const navigate = useNavigate();
    const params = useParams();

    const [fecha, setFecha] = React.useState(new Date());
    const cambioFecha = (newValue) => setFecha(newValue);

    const [categoria, setCategoria] = React.useState('');
    const cambioCategoria = (event) => {
        const { value } = event.target;
        setCategoria(value);
    };

    const [editing, setEditing] = React.useState(false);
    const [gasto, setGasto] = React.useState({ categoria: '', descripcion: '', monto: '' });
    const handleChange = (e) => setGasto({ ...gasto, [e.target.name]: e.target.value });

    const [gastoMes, setGastomes] = React.useState([]);
    const getGasto = async () => {
        try {
            const { data } = await axios.get(`/all`);
            const gastoMes = data.map(item => {
                return {
                    ...item,
                    gastos: Number(item.gastos).toLocaleString('es-Cl', { style: 'currency', currency: 'CLP' }),
                    ingresos: Number(item.ingresos).toLocaleString('es-Cl', { style: 'currency', currency: 'CLP' }),
                    saldo: Number(item.saldo).toLocaleString('es-Cl', { style: 'currency', currency: 'CLP' }),
                }
            })
            setGastomes(gastoMes);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getGasto();
    }, []);

    React.useEffect(() => {
        if (params.id) loadId(params.id);
    }, [params.id]);

    const loadId = async (id) => {
        try {
            const { data } = await axios.get(`/get/${id}`);
            setGasto(data);
            let prueba = data.fecha.split('T')[0];
            const [year, month, day] = prueba.split('-');
            const newDate = new Date(+year, month - 1, +day);
            setFecha(newDate);
            setCategoria(data.categoria);
        } catch (error) {
            console.log(error);
        }
        setEditing(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fechaSplit = fecha.toString().split(' ');
        const fechaFormateada = fechaSplit[2] + '-' + fechaSplit[1] + '-' + fechaSplit[3];
        const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
        gasto.fecha = fechaFormateada;
        gasto.mes = mes;
        if (isNaN(gasto.monto)) {
            alertConfig('validacion');
        } else if (!editing) {
            try {
                await axios.post('/newgasto', gasto);
                alertConfig('success');
                getGasto();
                setFecha(new Date());
                setCategoria('');
                e.target.reset();
            } catch ({ response }) {
                alertConfig('error');
            }
        } else {
            try {
                await axios.put(`/put/${gasto.id}`, gasto);
                alertConfig('edit');
                getGasto();
                navigate('/lista')
            } catch ({ response }) {
                alertConfig('error');
            }
        }
    };
    //////////////////////////////////////////////////////////
    return (
        <Container>
            <Stack sx={{ fontFamily: 'roboto', height: { xs: '88vh', md: '90vh' }, my: { xs: 0.8, md: 0 }, }} justifyContent="space-between">
                {/* Botones a otras paginas */}
                <Grid container sx={{ mt: { xs: 1, md: 3 }, mb: { xs: -2, md: 0 }, fontSize: { xs: '1rem', md: '1.4rem' } }}>
                    <Grid container item direction="row" justifyContent="center" alignItems="center" sx={{ fontSize: { xs: '0.8rem', md: '1.4rem' } }}>
                        <h1>{editing ? 'EDITAR GASTO' : 'AGREGAR GASTO'}</h1>
                    </Grid>
                </Grid>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <Grid container justifyContent="space-evenly" alignItems="center" sx={{ width: { xs: '100%', md: '55%' }, height: '50vh', marginTop: '1rem', padding: '1rem', mt: 2, mx: 'auto', backgroundColor: '#FC4A1A', borderRadius: '15px', }}>

                        {/* seccion de categoria y fecha */}
                        <ThemeProvider theme={darkTheme}>
                            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">

                                {/* categoria */}
                                <Grid item sx={{ width: { xs: '100%', sm: 250 }, backgroundColor: '#FC4A1A', borderRadius: '5px', }}>
                                    <FormControl required variant="standard"
                                        sx={{ width: 1, }}>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={categoria} name="categoria" onChange={e => { cambioCategoria(e); handleChange(e) }} sx={{ fontSize: '1.3rem', borderBottom: '1px solid', ml: 0.5, }}>
                                            {options.map((option) => (
                                                <MenuItem key={option.id} value={option.label}>
                                                    <Grid container>
                                                        <Grid container xs={2} md={3} item style={{ marginRight: '0rem' }} justifyContent="center" alignItems="center">
                                                            {option.icon}
                                                        </Grid>
                                                        {option.label}
                                                    </Grid>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <InputLabel id="demo-simple-select-label" sx={{ color: 'white', fontSize: '1rem', ml: 0.5 }}>Categoría</InputLabel>
                                </Grid>

                                {/* fecha */}
                                <Grid item sx={{
                                    width: { xs: '100%', sm: 250 }, marginTop: { xs: '1rem', sm: 0 }, backgroundColor: '#FC4A1A', borderRadius: '5px',
                                }}>
                                    <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                        <Stack >
                                            <MobileDatePicker inputFormat="dd 'de' MMMM yyyy" name="fecha"
                                                value={fecha}
                                                onChange={cambioFecha} placeholder="Fecha" renderInput={(params) => <TextField variant="standard" sx={{ ml: 0.5, borderBottom: '1px solid', }} {...params} InputProps={{ ...params.InputProps, style: { fontSize: '1.3rem' } }} />} />
                                            <InputLabel id="demo-simple-select-label" sx={{ color: 'white', fontSize: '1rem', ml: 0.5 }}>Fecha</InputLabel>
                                        </Stack>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </ThemeProvider>

                        {/* sección de descripción y monto */}
                        <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                            <TextField required name="descripcion" onChange={handleChange} variant="standard" autoComplete="off" {...(editing ? { value: gasto.descripcion } : { placeholder: 'Descripción' })} sx={{ backgroundColor: '#FC4A1A', borderRadius: '5px', mb: 2, width: { xs: '100%', sm: '60%' }, align: 'center', justifyContent: 'center' }} inputProps={{ style: { color: "white", textAlign: "center", fontSize: '2rem', borderBottom: '2px solid white' } }} />
                            <TextField required name="monto" onChange={handleChange} variant="standard" autoComplete="off" {...(editing ? { value: gasto.monto } : { placeholder: 'Monto' })} sx={{ backgroundColor: '#FC4A1A', borderRadius: '5px', mb: 2, width: { xs: '100%', sm: '60%' } }} inputProps={{ style: { color: "white", textAlign: "center", fontSize: '2rem', borderBottom: '2px solid white' } }} />
                        </Grid>
                    </Grid>
                    <ColorButton variant="contained" type="submit" endIcon={<AddIcon />} style={{ color: 'white', display: "flex", }} sx={{ color: '#FC4A1A', my: { xs: 1, md: 3 }, mx: 'auto' }}>
                        {editing ? 'Editar' : 'Agregar'}
                    </ColorButton>
                </form>

                {/* sección footer */}
                {SeccionFooter(gastoMes)}

            </Stack>
        </Container>
    )
}











