import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData, {
        withCredentials: true,
      });

      const { user } = response.data;
      // Simpan user ke localStorage atau context
      localStorage.setItem('user', JSON.stringify(user)); // ✅ ini penting
      console.log('Login sukses:', user);
      // Redirect ke dashboard, dsb
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-5 shadow rounded-4" style={{ minWidth: '360px' }}>
        <h4 className="fw-bold mb-2">Selamat Datang di Usahaku</h4>
        <p className="text-muted mb-4">Masuk untuk mengelola UMKM Anda</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="fw-semibold">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Masukkan Username Anda"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Masukkan Password Anda"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Masuk
          </Button>

          <div className="d-flex justify-content-between">
            <a href="#" className="text-primary text-decoration-none">Lupa Password?</a>
            <a href="/register" className="text-primary text-decoration-none">Daftar Baru</a>
          </div>

          <div className="text-center my-3 position-relative">
            <hr />
            <span className="bg-white px-2 text-muted position-absolute top-50 start-50 translate-middle">ATAU</span>
          </div>

          <div className="text-center">
            <a href="/" className="text-dark text-decoration-none">
              <FaHome className="me-2" />
              Kembali ke Beranda
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
