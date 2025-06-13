import React, { useState } from 'react';
import { Container, Row, Col, Nav, Form, Button, Card } from 'react-bootstrap';
import { FaChartLine, FaBox, FaUser, FaSignOutAlt } from 'react-icons/fa';

const TambahTransaksiPage = () => {
  const [formData, setFormData] = useState({
    tanggal: '',
    jenis: '',
    kategori: '',
    jumlah: '',
    keterangan: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setFormData({
      tanggal: '',
      jenis: '',
      kategori: '',
      jumlah: '',
      keterangan: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data disimpan:', formData);
    handleCancel(); // Reset form setelah submit
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white p-4 vh-100">
          <h5 className="fw-bold mb-1">UMKM Dashboard</h5>
          <p className="text-muted">Nama UMKM</p>
          <Nav defaultActiveKey="/transaksi" className="flex-column gap-2 mt-4">
            <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
              <FaChartLine /> Dashboard
            </Nav.Link>
            <Nav.Link href="#" className="text-white d-flex align-items-center gap-2 bg-secondary rounded px-2">
              💰 Transaksi
            </Nav.Link>
            <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
              📊 Laporan Keuangan
            </Nav.Link>
            <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
              <FaBox /> Produk
            </Nav.Link>
            <Nav.Link href="#" className="text-white d-flex align-items-center gap-2">
              <FaUser /> Profil
            </Nav.Link>
            <Nav.Link href="#" className="text-white d-flex align-items-center gap-2 mt-2">
              <FaSignOutAlt /> Keluar
            </Nav.Link>
          </Nav>
        </Col>

        {/* Konten */}
        <Col md={10} className="p-4 bg-light vh-100 overflow-auto">
          <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 shadow-sm rounded">
            <h4 className="mb-0">Transaksi</h4>
            <div className="d-flex align-items-center gap-2">
              <FaUser className="me-2" />
              <span className="fw-bold">User</span>
            </div>
          </div>

          <Card className="shadow-sm p-4">
            <h5 className="mb-4 fw-bold">Tambah Transaksi Baru</h5>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tanggal Transaksi</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Jenis Transaksi</Form.Label>
                    <Form.Control
                      as="select"
                      name="jenis"
                      value={formData.jenis}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Jenis</option>
                      <option value="Pemasukan">Pemasukan</option>
                      <option value="Pengeluaran">Pengeluaran</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                      type="text"
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Jumlah (Rp)</Form.Label>
                    <Form.Control
                      type="number"
                      name="jumlah"
                      value={formData.jumlah}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="outline-primary" onClick={handleCancel}>
                  Batal
                </Button>
                <Button type="submit" variant="primary">
                  Simpan
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TambahTransaksiPage;
