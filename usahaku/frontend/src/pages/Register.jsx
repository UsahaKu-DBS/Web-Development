import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
      nama_lengkap: '',
      no_telp: '',
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      umkm: {
        // sementara kosong, akan diisi di form CreateUMKM
        nama_umkm: '',
        alamat: '',
        jenis: ''
      }
  });

  // Menangani perubahan input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok.');
      return;
    }
    try {
      const payload = {
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telp: form.no_telp,
        username: form.username,
        password: form.password,
        umkm: {
          nama_umkm: '-',    // dummy
          alamat: '-',       // dummy
          no_telp: '-',      // dummy
          jenis_usaha: '-'   // dummy
        }
      };
// console.log('Payload:', payload);

      const res = await axios.post('http://localhost:3001/api/auth/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const id_user = res.data.data.user.id_user;
      localStorage.setItem('registered_user_id', id_user);
      navigate('/create-umkm');
    } catch (err) {
      alert('Gagal registrasi: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light vh-100">
      <Card className="p-5 shadow-sm" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Body>
          <h4 className="fw-bold text-center">Daftar Akun Baru</h4>
          <p className="text-center text-muted">Isi form di bawah ini untuk mendaftarkan UMKM Anda</p>
          <hr />

          {/* Progress Step */}
          <div className="d-flex justify-content-between align-items-center my-4 px-4">
            <div className="text-center mx-5">
              <div className="rounded-circle bg-primary text-white mx-auto" style={{ width: 32, height: 32, lineHeight: '32px' }}>1</div>
              <small className="d-block mt-2 text-primary">Informasi Pemilik</small>
            </div>
            <div className="text-center mx-5">
              <div className="rounded-circle bg-light border text-muted mx-auto" style={{ width: 32, height: 32, lineHeight: '32px' }}>2</div>
              <small className="d-block mt-2 text-muted">Informasi UMKM</small>
            </div>
            <div className="text-center mx-5">
              <div className="rounded-circle bg-light border text-muted mx-auto" style={{ width: 32, height: 32, lineHeight: '32px' }}>3</div>
              <small className="d-block mt-2 text-muted">Selesai</small>
            </div>
          </div>
          <hr />

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="namaLengkap">
                  <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              name="nama_lengkap"
              value={form.nama_lengkap}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              required
            />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="noTelepon">
                  <Form.Label>No Telepon</Form.Label>
                  <Form.Control
                    type="text"
                    name="no_telp"
                    value={form.no_telp}
                    onChange={handleChange}
                    placeholder="Masukkan nomor telepon Anda"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Buat username Anda"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukkan email Anda"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Buat password Anda"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="konfirmasiPassword">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi password Anda"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Tombol */}
            <div className="d-flex justify-content-between">
              <Button variant="outline-primary" type="button" onClick={() => navigate('/')}>
                Batal
              </Button>
              <Button variant="primary" type="submit">
                Lanjutkan
              </Button>
            </div>
          </Form>

          {/* Footer */}
          <div className="text-center mt-4">
            <FaHome className="me-2" />
            <Link to="/" className="text-decoration-none text-muted">
              Kembali ke Beranda
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
