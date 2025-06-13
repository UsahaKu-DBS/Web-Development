import React, { useState } from 'react';
import { Card, Button, Form, Table, Badge, Row, Col } from 'react-bootstrap';
import { FaBox, FaSignOutAlt, FaChartLine, FaUser } from 'react-icons/fa';
import { Nav } from "react-bootstrap";
import Sidebar from '../components/Sidebar'; // Jika Anda gunakan custom Sidebar
// Jika Sidebar hanya ada di Dashboard, Anda bisa pindahkan ke sini juga langsung.

const dataProduk = [
  { id: 'P001', nama: 'Produk A', kategori: 'Kategori A', beli: 200000, jual: 250000, stok: 15 },
  { id: 'P002', nama: 'Produk B', kategori: 'Kategori B', beli: 180000, jual: 225000, stok: 8 },
  { id: 'P003', nama: 'Produk C', kategori: 'Kategori C', beli: 280000, jual: 340000, stok: 3 },
  { id: 'P004', nama: 'Produk D', kategori: 'Kategori D', beli: 100000, jual: 125000, stok: 0 },
  { id: 'P005', nama: 'Produk E', kategori: 'Kategori E', beli: 150000, jual: 180000, stok: 12 },
];

const Produk = () => {
  const [search, setSearch] = useState('');

  const getStatus = (stok) => {
    if (stok === 0) return <Badge bg="danger">Habis</Badge>;
    if (stok <= 5) return <Badge bg="warning" text="dark">Stok Menipis</Badge>;
    return <Badge bg="success">Tersedia</Badge>;
  };

  const filteredData = dataProduk.filter(p =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex min-vh-100">
    <Sidebar />

      {/* Main Content */}
      <Col md={10} className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3">
          <h4 className="fw-bold">Stok Produk</h4>
          <div className="d-flex align-items-center gap-2">
            <FaUser size={20} />
            <span>User</span>
          </div>
        </div>

        {/* Statistik Produk */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          <StatCard title="Total Produk" value="127" trend="5 jenis produk" />
          <StatCard title="Stok Tersedia" value="89" trend="Kondisi baik" />
          <StatCard title="Stok Menipis" value="25" trend="Perlu restok" />
          <StatCard title="Stok Habis" value="13" trend="Segera restok" />
        </div>

        {/* Peringatan Stok */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Peringatan Stok</h5>
            <ul className="mt-3">
              <li><span className="text-danger fw-bold">Produk D - Stok Habis</span><br /><small>Produk ini sudah habis sejak 2 hari yang lalu</small></li>
              <li className="mt-2"><span className="text-warning fw-bold">Produk C - Stok Menipis</span><br /><small>Tersisa 3 unit, di bawah batas minimum</small></li>
            </ul>
          </Card.Body>
        </Card>

        {/* Daftar Produk */}
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Daftar Stok Produk</h5>
              <Button variant="primary">+ Tambah</Button>
            </div>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Cari"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Select>
                  <option>Semua Status</option>
                  <option>Tersedia</option>
                  <option>Stok Menipis</option>
                  <option>Habis</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select>
                  <option>Semua Kategori</option>
                  <option>Kategori A</option>
                  <option>Kategori B</option>
                  <option>Kategori C</option>
                  <option>Kategori D</option>
                  <option>Kategori E</option>
                </Form.Select>
              </Col>
            </Row>

            <Table hover responsive>
              <thead className="table-light">
                <tr>
                  <th>ID Produk</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga Beli</th>
                  <th>Harga Jual</th>
                  <th>Stok</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.kategori}</td>
                    <td>Rp {item.beli.toLocaleString()}</td>
                    <td>Rp {item.jual.toLocaleString()}</td>
                    <td>{item.stok}</td>
                    <td>{getStatus(item.stok)}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2">✏️</Button>
                      <Button variant="outline-danger" size="sm">🗑️</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

const StatCard = ({ title, value, trend }) => (
  <div className="bg-white p-3 shadow-sm rounded" style={{ width: "250px" }}>
    <h6>{title}</h6>
    <h5 className="fw-bold">{value}</h5>
    <small className="text-muted">{trend}</small>
  </div>
);

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export default Produk;
