import React from 'react';
import { FaUser, FaBox, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Nav, Form, Button, Card } from "react-bootstrap";

const EditProfil = () => {
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
      <div className="flex-grow-1 p-4 pt-5 bg-light" style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3">
          <h4 className="fw-bold">Profil</h4>
          <div className="d-flex align-items-center gap-2">
            <FaUser size={20} />
            <span>User</span>
          </div>
        </div>

        <Card className="p-4">
          <h5 className="fw-bold">Eunike Clarissa</h5>
          <p className="text-muted mb-4">Terakhir update: 15 Mei 2025</p>

          <h6 className="fw-semibold mb-3">Informasi Pribadi</h6>

          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formNamaLengkap">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control type="text" placeholder="Eunike Clarissa" />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="eunike_clarissa" />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formNoTelp">
                  <Form.Label>No Telp</Form.Label>
                  <Form.Control type="tel" placeholder="+6283178654321" />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="••••••••" />
                </Form.Group>
              </div>
            </div>

            <div className="text-end mt-3">
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfil;
