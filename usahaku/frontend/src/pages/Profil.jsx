import React from 'react';
import { FaUser, FaBox, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Nav, Tab, Card, Button, Col } from "react-bootstrap";
import Sidebar from '../components/Sidebar';

const Profil = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex min-vh-100">
    <Sidebar />

      {/* Main Content */}
      <Col md={10} className="flex-grow-1 p-4 pt-5 bg-light" style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3">
          <h4 className="fw-bold">Profil</h4>
          <div className="d-flex align-items-center gap-2">
            <FaUser size={20} />
            <span>User</span>
          </div>
        </div>

        <Card className="p-4">
          <Tab.Container defaultActiveKey="pengguna">
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="pengguna" className="fw-bold text-center">
                  Informasi Pengguna
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="umkm" className="text-center">
                  Informasi UMKM
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="pengguna">
                <h5 className="fw-bold">Eunike Clarissa</h5>
                <p className="text-muted mb-4">Terakhir update: 15 Mei 2025</p>

                <h6 className="fw-semibold">Informasi Pribadi</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Nama Lengkap</td>
                      <td>Eunike Clarissa</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Username</td>
                      <td>eunike_clarissa</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Nomor Telepon</td>
                      <td>+6283178654321</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Bergabung Sejak</td>
                      <td>1 Januari 2025</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-end">
                  <Button variant="primary">Edit</Button>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="umkm">
                <p>Informasi UMKM dapat ditampilkan di sini.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </Col>
    </div>
  );
};

export default Profil;
