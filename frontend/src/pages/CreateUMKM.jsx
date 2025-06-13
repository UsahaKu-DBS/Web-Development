import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateUMKM = () => {
  const navigate = useNavigate();
  const [umkm, setUmkm] = useState({
    nama_umkm: '',
    no_telp: '',
    alamat: '',
    jenis_usaha: '',
    tahun_berdiri: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUmkm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data UMKM
      const res = await axios.post('http://localhost:3001/api/umkm', umkm);
      const id_umkm = res.data.id_umkm;
      const id_user = localStorage.getItem('registered_user_id');

      console.log(id_user);
      

      // Update user dengan ID UMKM
      await axios.put(`http://localhost:3001/api/users/${id_user}/connect-umkm`, { id_umkm });

      // Bersihkan dan navigasi
      localStorage.removeItem('registered_user_id');
      alert('UMKM berhasil dibuat! Silakan login.');
      navigate('/login');
    } catch (err) {
      alert('Gagal membuat UMKM: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <Card className="p-5 shadow-sm" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Body>
          <h4 className="fw-bold text-center">Daftar Akun Baru</h4>
          <p className="text-center text-muted">Isi form di bawah ini untuk mendaftarkan UMKM Anda</p>

          {/* Stepper */}
          <div className="d-flex justify-content-between align-items-center my-4 px-4">
            <div className="text-center mx-5">
              <div className="rounded-circle bg-success text-white" style={{ width: 32, height: 32, lineHeight: '32px' }}>1</div>
              <small className="d-block mt-2 text-success">Informasi Pemilik</small>
            </div>
            <div className="flex-grow-1 mx-2 border-top border-2 border-muted"></div>
            <div className="text-center mx-5">
              <div className="rounded-circle bg-primary text-white" style={{ width: 32, height: 32, lineHeight: '32px' }}>2</div>
              <small className="d-block mt-2 text-primary">Informasi UMKM</small>
            </div>
            <div className="flex-grow-1 mx-2 border-top border-2 border-muted"></div>
            <div className="text-center mx-5">
              <div className="rounded-circle bg-light border text-muted" style={{ width: 32, height: 32, lineHeight: '32px' }}>3</div>
              <small className="d-block mt-2 text-muted">Selesai</small>
            </div>
          </div>

          {/* Form UMKM */}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="namaUMKM">
                  <Form.Label>Nama UMKM</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_umkm"
                    value={umkm.nama_umkm}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama UMKM Anda"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="noTeleponUMKM">
                  <Form.Label>No Telepon UMKM</Form.Label>
                  <Form.Control
                    type="text"
                    name="no_telp"
                    value={umkm.no_telp}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nomor telepon UMKM"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="alamatUMKM" className="mb-3">
              <Form.Label>Alamat UMKM</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="alamat"
                value={umkm.alamat}
                onChange={handleChange}
                required
                placeholder="Masukkan alamat lengkap UMKM Anda"
              />
            </Form.Group>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="jenisUsaha">
                  <Form.Label>Jenis Usaha</Form.Label>
                  <Form.Select
                    name="jenis_usaha"
                    value={umkm.jenis_usaha}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jenis Usaha</option>
                    <option>Jasa</option>
                    <option>Perdagangan</option>
                    <option>Manufaktur</option>
                    <option>Lainnya</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tahunBerdiri">
                  <Form.Label>Tahun Berdiri</Form.Label>
                  <Form.Control
                    type="number"
                    name="tahun_berdiri"
                    value={umkm.tahun_berdiri}
                    onChange={handleChange}
                    required
                    placeholder="Tahun UMKM berdiri"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Tombol */}
            <div className="d-flex justify-content-between">
              <Button variant="outline-primary" onClick={() => navigate(-1)}>Kembali</Button>
              <Button variant="primary" type="submit">Selesai</Button>
            </div>
          </Form>

          {/* Footer */}
          <div className="text-center mt-4">
            <FaHome className="me-2" />
            <Link to="/" className="text-decoration-none text-muted">Kembali ke Beranda</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateUMKM;
