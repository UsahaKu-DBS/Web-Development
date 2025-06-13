import React from 'react';
import { Container, Row, Col, Table, Button, Form, Badge, InputGroup, FormControl, Nav } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaChartLine, FaBox, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const TransaksiPage = () => {
  const transaksi = [
    { tanggal: '15 Mei 2025', keterangan: 'Penjualan Produk A', kategori: 'Penjualan', jumlah: 'Rp 750.000', status: 'Pemasukan' },
    { tanggal: '14 Mei 2025', keterangan: 'Pembelian Produk B', kategori: 'Produksi', jumlah: 'Rp 1.200.000', status: 'Pengeluaran' },
    { tanggal: '12 Mei 2025', keterangan: 'Penjualan Produk C', kategori: 'Penjualan', jumlah: 'Rp 450.000', status: 'Pemasukan' },
    { tanggal: '10 Mei 2025', keterangan: 'Biaya Operasional', kategori: 'Operasional', jumlah: 'Rp 350.000', status: 'Pengeluaran' },
    { tanggal: '8 Mei 2025', keterangan: 'Penjualan Produk D', kategori: 'Penjualan', jumlah: 'Rp 680.000', status: 'Pemasukan' },
  ];

  return (
    <div className="d-flex min-vh-100">
        <Sidebar />

        {/* Konten */}
        <Col md={10} className="p-4 bg-light vh-100 overflow-auto">
          <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 shadow-sm rounded">
            <h4 className="mb-0">Transaksi</h4>
            <div className="d-flex align-items-center gap-2">
              <FaUser className="me-2" />
              <span className="fw-bold">User</span>
            </div>
          </div>

          <Button variant="primary" className="mb-3">+ Transaksi Baru</Button>

          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="mb-3">Daftar Transaksi</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control placeholder="Cari" />
              </Col>
              <Col md={3}>
                <Form.Select>
                  <option>Filter</option>
                  <option>Pemasukan</option>
                  <option>Pengeluaran</option>
                </Form.Select>
              </Col>
            </Row>

            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.tanggal}</td>
                    <td>{t.keterangan}</td>
                    <td>{t.kategori}</td>
                    <td>{t.jumlah}</td>
                    <td>
                      <Badge bg={t.status === 'Pemasukan' ? 'success' : 'danger'}>
                        {t.status}
                      </Badge>
                    </td>
                    <td>
                      <FaEdit className="text-primary me-3 cursor-pointer" />
                      <FaTrash className="text-danger cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </div>
  );
};

export default TransaksiPage;
