import React from 'react';
import { FaUser, FaBox, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Nav, Card, Button, Table } from "react-bootstrap";

const ProfilUMKM = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h5 className="fw-bold mb-1">UMKM Dashboard</h5>
        <p className="text-muted">Nama UMKM</p>
        <Nav defaultActiveKey="/profil" className="flex-column gap-2 mt-4">
          <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
            <FaChartLine /> Dashboard
          </Nav.Link>
          <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
            💰 Transaksi
          </Nav.Link>
          <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
            📊 Laporan Keuangan
          </Nav.Link>
          <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
            <FaBox /> Produk
          </Nav.Link>
          <Nav.Link href="#" className="text-white d-flex align-items-center gap-2 fw-bold">
            <FaUser /> Profil
          </Nav.Link>
          <Nav.Link onClick={handleLogout} href="#" className="text-white d-flex align-items-center gap-2 mt-2">
            <FaSignOutAlt /> Keluar
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3">
          <h4 className="fw-bold">Profil</h4>
          <div className="d-flex align-items-center gap-2">
            <FaUser size={20} />
            <span>User</span>
          </div>
        </div>

        {/* Informasi UMKM */}
        <Card className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold">Batik Sleman</h5>
              <p className="text-muted mb-0">Terakhir update: 15 Mei 2025</p>
            </div>
            <Button variant="primary" size="sm">Edit</Button>
          </div>

          <h6 className="fw-semibold mb-3">Informasi UMKM</h6>

          <Table borderless responsive>
            <tbody>
              <tr>
                <th style={{ width: "200px" }}>Nama UMKM</th>
                <td>Batik Sleman</td>
              </tr>
              <tr>
                <th>Jenis Usaha</th>
                <td>Kerajinan</td>
              </tr>
              <tr>
                <th>Alamat</th>
                <td>Jl. Malioboro No. 45 Yogyakarta</td>
              </tr>
              <tr>
                <th>No Telepon</th>
                <td>+6283178654321</td>
              </tr>
              <tr>
                <th>Tahun Berdiri</th>
                <td>1 Januari 2025</td>
              </tr>
              <tr>
                <th>Deskripsi</th>
                <td>
                  UMKM yang bergerak di bidang produksi dan penjualan batik tradisional Yogyakarta
                  dengan motif khas dan kualitas terbaik.
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ProfilUMKM;
