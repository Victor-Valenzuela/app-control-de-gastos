import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Container, Grid, Stack } from "@mui/material";

import RestaurantIcon from '@mui/icons-material/Restaurant';
import PaymentsIcon from '@mui/icons-material/Payments';
import CottageIcon from '@mui/icons-material/Cottage';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import axios from "axios";
import SeccionFooter from "../elements/footer";

const StyledTableCell = styled(TableCell)({
    color: "white",
    fontSize: 20,
})

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));

const options = [
    { categoria: 'Salud', id: '1', icon: <LocalHospitalIcon /> },
    { categoria: 'Comida', id: '2', icon: <RestaurantIcon /> },
    { categoria: 'Transporte', id: '3', icon: <DirectionsCarIcon /> },
    { categoria: 'Cuentas', id: '4', icon: <PaymentsIcon /> },
    { categoria: 'Ropa', id: '5', icon: <CheckroomIcon /> },
    { categoria: 'Hogar', id: '6', icon: <CottageIcon /> },
    { categoria: 'Compras', id: '7', icon: <ShoppingBasketIcon /> },
    { categoria: 'Diversion', id: '8', icon: <CelebrationIcon /> },
    { categoria: 'Ingresos', id: '9', icon: <MonetizationOnIcon /> },
];

export default function Categorias() {
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
            const { data } = await axios.get(`/all/categorias`);
            const newData = data.map(item => {
                const newItem = options.find(option => option.categoria === item.categoria);
                return { ...item, ...newItem };
            });
            setCategoria(newData.map(item => { return { ...item, total: Number(item.total).toLocaleString('es-Cl', { style: 'currency', currency: 'CLP' }) } }));
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getCategorias();
    }, []);

    return (
        <Container>
            <Stack sx={{ fontFamily: 'roboto', height: { xs: '88vh', md: '90vh' }, my: { xs: 0.8, md: 0 } }} justifyContent="space-between">
                {/* botón y cabecera */}
                <Grid container sx={{ mt: { xs: 1, md: 3 }, mb: { xs: -1, md: -1.4 }, fontSize: { xs: '1rem', md: '1.4rem' } }}>
                    <Grid container item direction="row" justifyContent="center" alignItems="center" sx={{ fontSize: { xs: '0.8rem', md: '1.4rem' } }}>
                        <h1>GASTOS POR CATEGORIA</h1>
                    </Grid>
                </Grid>

                {/* Tabla */}
                <Grid container item sm={8.4} justifyContent="flex-start" alignItems={allCategoria.length > 0 ? 'flex-start' : 'center'} sx={{ mx: 'auto', borderRadius: '12px', width: { xs: '95%', md: '40%' }, overflow: { xs: 'auto', md: 'off' }, height: { xs: '74%' } }} >
                    <TableContainer sx={{ fontFamily: 'roboto', borderRadius: '10px', backgroundColor: '#FC4A1A' }}>
                        <Table aria-label="customized table">
                            <TableBody>
                                {allCategoria.length === 0 ?
                                    <Grid item align={'center'} sx={{ mx: 'auto' }}>
                                        <h2>No hay gastos registrados!</h2>
                                    </Grid>
                                    :
                                    allCategoria.map((option) => (
                                        <StyledTableRow hover key={option.id} sx={{ fontSize: 20, borderBottom: '2px solid #00aeae' }}>
                                            <StyledTableCell align="center" >{option.icon}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row" >{option.categoria}</StyledTableCell>
                                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>{option.total}</StyledTableCell>
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
