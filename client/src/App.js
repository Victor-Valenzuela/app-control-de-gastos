// import React from 'react';
//Con BrowserRouter digo que tendré una navegación dentro de la pagina
//Con Routes voy a tener una lista de rutas
//Con Route especifico esa ruta
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Comprobar from './components/Loader';
import Login from './components/Login';
import Registro from './components/Registro';
import FormularioGasto from './components/PagInicio';
import Categorias from './components/PagCategorias';
import Lista from './components/PagLista';
import WithNav from './components/WithNavBar';
import WithoutNav from './components/WithoutNavBar';
import Recover from './components/Recover';

export default function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<WithoutNav />}>
          <Route path="/" element={<Comprobar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar" element={<Recover />} />
        </Route>

        <Route element={<WithNav />}>
          <Route path="/cuenta" element={<FormularioGasto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/:id/edit" element={<FormularioGasto />} />
          <Route path="/:id/misdatos" element={<Registro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
