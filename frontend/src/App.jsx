import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateUMKM from './pages/CreateUMKM';
import RegisterDone from './pages/RegisterDone';

import Transaksi from './pages/Transaksi';
import AddTransaksi from './pages/AddTransaksi';

import Laporan from './pages/Laporan';

import Produk from './pages/Produk';
import AddProduk from './pages/AddProduk';

import Profil from './pages/Profil';
import EditProfil from './pages/EditProfil';
import ProfilUMKM from './pages/ProfilUMKM';
import EditProfilUMKM from './pages/EditProfilUMKM';

// Route Guards
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        {/* Redirect dari "/" ke "/dashboard" */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/create-umkm" element={
          <PublicRoute>
            <CreateUMKM />
          </PublicRoute>
        } />
        <Route path="/register-done" element={
          <PublicRoute>
            <RegisterDone />
          </PublicRoute>
        } />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        {/* Transaksi */}
        <Route path="/transaksi" element={
          <PrivateRoute>
            <Transaksi />
          </PrivateRoute>
        } />
        <Route path="/transaksi-tambah" element={
          <PrivateRoute>
            <AddTransaksi />
          </PrivateRoute>
        } />

        {/* Laporan */}
        <Route path="/laporan" element={
          <PrivateRoute>
            <Laporan />
          </PrivateRoute>
        } />

        {/* Produk */}
        <Route path="/produk" element={
          <PrivateRoute>
            <Produk />
          </PrivateRoute>
        } />
        <Route path="/produk-tambah" element={
          <PrivateRoute>
            <AddProduk />
          </PrivateRoute>
        } />

        {/* Profil Pengguna */}
        <Route path="/profil" element={
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        } />
        <Route path="/profil-edit" element={
          <PrivateRoute>
            <EditProfil />
          </PrivateRoute>
        } />

        {/* Profil UMKM */}
        <Route path="/profil-umkm" element={
          <PrivateRoute>
            <ProfilUMKM />
          </PrivateRoute>
        } />
        <Route path="/profil-umkm-edit" element={
          <PrivateRoute>
            <EditProfilUMKM />
          </PrivateRoute>
        } />

        {/* Tambahkan route lain jika diperlukan */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
