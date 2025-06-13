import React, { useState } from "react";
import { FaUser, FaBox, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Nav, Button, Form, Card } from "react-bootstrap";

const EditProfilUMKM = () => {
  const [formData, setFormData] = useState({
    namaUMKM: "",
    jenisUsaha: "",
    alamat: "",
    noTelepon: "",
    tahunBerdiri: "",
    deskripsi: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Disimpan:", formData);
    // Logic simpan ke database bisa ditambahkan di sini
  };

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

        <Card className="p-4">
          <h5 className="fw-bold mb-0">Batik Sleman</h5>
          <p className="text-muted">Terakhir update: 15 Mei 2025</p>

          <Form onSubmit={handleSubmit}>
            <h6 className="fw-semibold mt-4 mb-3">Informasi UMKM</h6>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Nama UMKM</Form.Label>
                  <Form.Control
                    name="namaUMKM"
                    value={formData.namaUMKM}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Jenis Usaha</Form.Label>
                  <Form.Control
                    name="jenisUsaha"
                    value={formData.jenisUsaha}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Nomor Telepon</Form.Label>
                  <Form.Control
                    name="noTelepon"
                    value={formData.noTelepon}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Tahun Berdiri</Form.Label>
                  <Form.Control
                    name="tahunBerdiri"
                    value={formData.tahunBerdiri}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Deskripsi Usaha</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary">
                Simpan
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilUMKM;
