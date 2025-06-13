import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegisterDone = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <Card className="p-4 shadow-sm text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <Card.Body>
          {/* Header */}
          <h4 className="fw-bold mb-1">Daftar Akun Baru</h4>
          <p className="text-muted mb-4">Isi form di bawah ini untuk mendaftarkan UMKM Anda</p>

          {/* Stepper */}
          <div className="d-flex justify-content-between align-items-center mb-4 px-5">
            <div className="text-center">
              <div className="rounded-circle bg-success text-white" style={{ width: 32, height: 32, lineHeight: '32px' }}>1</div>
              <small className="d-block mt-2 text-success">Informasi Pemilik</small>
            </div>
            <div className="flex-grow-1 mx-2 border-top border-2 border-muted"></div>
            <div className="text-center">
              <div className="rounded-circle bg-success text-white" style={{ width: 32, height: 32, lineHeight: '32px' }}>2</div>
              <small className="d-block mt-2 text-success">Informasi UMKM</small>
            </div>
            <div className="flex-grow-1 mx-2 border-top border-2 border-muted"></div>
            <div className="text-center">
              <div className="rounded-circle bg-primary text-white" style={{ width: 32, height: 32, lineHeight: '32px' }}>3</div>
              <small className="d-block mt-2 text-primary">Selesai</small>
            </div>
          </div>

          {/* Sukses */}
          <FaCheckCircle size={64} className="text-success mb-3" />
          <h5 className="fw-bold">Pendaftaran Berhasil!</h5>
          <p className="text-muted mb-4">
            Akun UMKM Anda telah berhasil dibuat. Silakan login untuk mulai menggunakan platform Usahaku.
          </p>

          <Button variant="primary" className="mb-3">Login Sekarang</Button>

          <div className="text-muted">
            <FaHome className="me-2" />
            <Link to="/" className="text-decoration-none text-muted">Kembali ke Beranda</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterDone;
