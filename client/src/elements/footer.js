import { Grid } from '@mui/material';
import React from 'react';


const SeccionFooter = (event) => {
    return (
        <>            {event.map((mes, i) => (
            <Grid key={i} container direction="row" justifyContent="space-between" alignItems="center"
                sx={{
                    backgroundColor: '#FC4A1A',
                    borderRadius: '10px',
                    color: 'white',
                    textAlign: 'center', fontSize: { xs: '1rem', md: '1.3rem' },
                    fontWeight: 'bold',
                    width: { xs: '100%', md: '85%' },
                    padding: '1rem',
                    mx: 'auto',
                    py: '0.3rem',
                }}>
                <Grid item xs={12} md={4} >
                    INGRESOS DEL MES: {mes.ingresos}
                </Grid>
                <Grid item xs={12} md={4} >
                    GASTOS DEL MES: {mes.gastos}
                </Grid>
                <Grid item xs={12} md={3} >
                    SALDO: {mes.saldo}
                </Grid>
            </Grid>
        ))
        }
        </>
    );
};

export default SeccionFooter;