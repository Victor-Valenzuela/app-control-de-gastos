import * as React from 'react';
import { Grid, Button, Stack, IconButton, TableRow, TableContainer, Table, TableBody, Container } from "@mui/material";
import axios from "axios";
import SeccionFooter from '../elements/footer';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaymentsIcon from '@mui/icons-material/Payments';
import CottageIcon from '@mui/icons-material/Cottage';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { styled } from '@mui/material/styles';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: '#FC4A1A'
    },
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));

const ColorButton1 = styled(Button)(({ theme }) => ({
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: '#8d2c11',
    },
}));

const ColorButton2 = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#FC4A1A',
    '&:hover': {
        backgroundColor: '#ffffff',
    },
}));

const options = [
    { categoria: 'Salud', icon: <LocalHospitalIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Comida', icon: <RestaurantIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Transporte', icon: <DirectionsCarIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Cuentas', icon: <PaymentsIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Ropa', icon: <CheckroomIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Hogar', icon: <CottageIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Compras', icon: <ShoppingBasketIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Diversion', icon: <CelebrationIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
    { categoria: 'Ingresos', icon: <MonetizationOnIcon sx={{ fontSize: { xs: 24, md: 40 } }} /> },
];

const imgRandom = [
    'https://c.tenor.com/kHcmsxlKHEAAAAAC/rock-one-eyebrow-raised-rock-staring.gifauto=format&fit=crop&w=800&q=60',
    'https://c.tenor.com/XGpqtoboIiUAAAAC/the-rock-dwayne-johnson.gif',
    'https://c.tenor.com/8MKYrtiPYuQAAAAC/sip-shocked.gif',
    'https://i.gifer.com/origin/47/479e482a4c1fdb8852119641b6c169b4.gif',
]

export default function Lista() {

    const navigate = useNavigate();

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

    const [allCategoria, setCategoria] = React.useState([]);
    const getCategorias = async () => {
        try {
            const { data } = await axios.get(`/all/fechas`);
            const newData = data.map(item => { return { ...item, fecha: item.fecha.split('T')[0].split('-') } });
            const newData2 = newData.map(item => { return { ...item, fecha: `${item.fecha[2]} de ${item.mes} del ${item.fecha[0]}` } });

            const newData3 = newData2.map(item => { return { ...item, icon: options.find(option => option.categoria === item.categoria).icon } });
            setCategoria(newData3.map(item => { return { ...item, monto: item.monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) } }));
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getCategorias();
    }, []);

    const mostrarAlerta = (id) => {
        Swal.fire({
            imageUrl: imgRandom[Math.floor(Math.random() * imgRandom.length)],
            imageWidth: 300,
            imageHeight: 300,
            text: '¿¡Quieres borrar este registro!?',
            showDenyButton: true,
            confirmButtonText: `Borrar`,
            confirmButtonColor: 'green',
            denyButtonText: `Cancelar`,
            color: '#716add',
            backdrop: `
                      rgba(0,0,123,0.4)
                    `
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: 'Registro borrado!',
                    imageUrl: 'https://c.tenor.com/P0tX6a_nVIkAAAAC/grinch-smile-grinch.gif',
                    imageWidth: 300,
                    imageHeight: 300,
                    confirmButtonText: '🤑',
                    color: '#716add',
                    backdrop: `
                      rgba(0,0,123,0.4)
                    `
                })
                try {
                    await axios.delete(`/delete/${id}`);
                    getCategorias()
                    getGasto();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    const deleteGasto = async (id) => {
        mostrarAlerta(id)
    }

    return (
        <Container>
            <Stack sx={{ fontFamily: 'roboto', height: { xs: '88vh', md: '90vh' }, my: { xs: 0.8, md: 0 } }} justifyContent="space-between">
                {/* sección del boton y encabezado */}
                <Grid container sx={{ mt: { xs: 1, md: 3 }, mb: { xs: -1, md: -1.4 }, fontSize: { xs: '1rem', md: '1.4rem' } }}>
                    <Grid container item direction="row" justifyContent="center" alignItems="center" sx={{ fontSize: { xs: '0.8rem', md: '1.4rem' } }}>
                        <h1>GASTOS POR FECHA</h1>
                    </Grid>
                </Grid>

                {/* sección de los gastos */}
                <Grid container item md={7.8} justifyContent="flex-end" alignItems={allCategoria.length > 0 ? 'flex-start' : 'center'} sx={{ overflow: 'auto', mx: 'auto', borderRadius: '12px', minHeight: '22vh', maxHeight: { xs: '70vh', md: '70vh' }, width: { xs: '95%', md: '65%' } }} >
                    <TableContainer sx={{ fontFamily: 'roboto', borderRadius: '15px', backgroundColor: '#FC4A1A' }}>
                        <Table aria-label="customized table">
                            <TableBody >
                                {allCategoria.length === 0 && (
                                    <Grid item align={'center'} sx={{ mx: 'auto' }}>
                                        <h2>No hay gastos registrados!</h2>
                                    </Grid>
                                )}

                                {allCategoria.map((item, i) => (
                                    <StyledTableRow sx={{ borderBottom: '3px solid #00aeae', }}>
                                        <Grid container item md={12} key={item.id} direction="row" justifyContent="center" alignItems="center" sx={{ maxHeight: '20vh', py: { xs: 1, md: 2 }, fontSize: 20 }} >

                                            {/* validación para agregar o no el boton de la fecha */}
                                            {i === 0 || item.fecha !== allCategoria[i - 1].fecha
                                                ? <>
                                                    <Grid container item xs={12} sx={{ mb: 1, ml: { xs: 0, md: 2 } }} justifyContent={{ xs: "center", md: "flex-start" }}>
                                                        <ColorButton1 sx={{ color: 'black', height: 18, pt: { xs: 1, md: 1.2 } }} >{item.fecha}</ColorButton1>
                                                    </Grid>
                                                </>
                                                : <></>}

                                            <Grid container item xs={2} md={1} justifyContent="flex-end">
                                                {item.icon}
                                            </Grid>

                                            <Grid container item xs={4} md={2} justifyContent="space-evenly" alignItems="center">
                                                {item.categoria}
                                            </Grid>
                                            <Grid container item xs={6} md={5} justifyContent="center">
                                                {item.descripcion}
                                            </Grid>
                                            <Grid container item xs={6} md={2} justifyContent={{ xs: "center", md: "flex-start" }} sx={{ mt: { xs: 1, md: 0 } }}>
                                                {item.monto}
                                            </Grid>

                                            {/* botones editar y borrar */}
                                            <Grid container item justifyContent="center" xs={6} md={2} sx={{ mt: { xs: 1, md: 0 } }}>
                                                <Grid item>
                                                    <ColorButton2 color='success' sx={{ border: { xs: '1px solid white', md: 0 }, mr: { xs: 1, md: 0 } }} onClick={() => navigate(`/${item.id}/edit`)} >
                                                        <EditIcon />
                                                    </ColorButton2>
                                                </Grid>
                                                <Grid item>
                                                    <ColorButton2 color="error" sx={{ color: '#a70a0a', border: { xs: '1px solid white', md: 0 } }} onClick={() => deleteGasto(item.id)}><DeleteForeverIcon /></ColorButton2>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* sección footer */}
                {SeccionFooter(gastoMes)}
            </Stack>
        </Container>
    );
}