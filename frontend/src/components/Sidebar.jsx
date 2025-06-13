import React from 'react';
import { Nav, Col } from 'react-bootstrap';
import { FaChartLine, FaBox, FaUser, FaSignOutAlt } from 'react-icons/fa';
import LogoutButton from '../components/LogoutButton'; // sesuaikan path-nya

const Sidebar = () => {
  return (
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h5 className="fw-bold mb-1">UMKM Dashboard</h5>
        <p className="text-muted">Nama UMKM</p>
        <Nav defaultActiveKey="/dashboard" className="flex-column gap-2 mt-4">
          <Nav.Link href="/dashboard" className="text-white d-flex align-items-center gap-2">
            <FaChartLine /> Dashboard
          </Nav.Link>
          <Nav.Link href="/transaksi" className="text-white d-flex align-items-center gap-2">
            💰 Transaksi
          </Nav.Link>
          <Nav.Link href="/laporan" className="text-white d-flex align-items-center gap-2">
            📊 Laporan Keuangan
          </Nav.Link>
          <Nav.Link href="/produk" className="text-white d-flex align-items-center gap-2">
            <FaBox /> Produk
          </Nav.Link>
          <Nav.Link href="/profil" className="text-white d-flex align-items-center gap-2">
            <FaUser /> Profil
          </Nav.Link>
             <LogoutButton />

        </Nav>
      </div>
  );
};

export default Sidebar;
