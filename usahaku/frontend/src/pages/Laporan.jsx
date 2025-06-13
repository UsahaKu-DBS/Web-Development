import React from 'react';
import { Container, Row, Col, Card, Nav, Form, Button, Table } from 'react-bootstrap';
import { FaChartLine, FaBox, FaUser, FaSignOutAlt, FaMoneyBillWave } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const LaporanPage = () => {
  return (
    <div className="d-flex min-vh-100">
        <Sidebar />

        {/* Konten */}
        <Col md={10} className="p-4 bg-light vh-100 overflow-auto">
          <div className="bg-white p-3 shadow-sm rounded d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Laporan</h4>
            <div className="d-flex align-items-center gap-2">
              <FaUser />
              <span className="fw-bold">User</span>
            </div>
          </div>

          <Card className="p-3 shadow-sm mb-4">
            <Form>
              <Row>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Jenis Laporan</Form.Label>
                    <Form.Select>
                      <option>Arus Kas</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Periode</Form.Label>
                    <Form.Select>
                      <option>Bulan Ini</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button variant="primary" className="w-100">
                    Tampilkan Laporan
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="p-3 shadow-sm">
            <h5 className="fw-bold mb-3">Ringkasan Arus Kas</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                  <th>Presentase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Saldo Awal</td>
                  <td>Rp 1.800.000</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Total Pemasukan</td>
                  <td>Rp 5.250.000</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td className="ps-4">- Penjualan Produk</td>
                  <td>Rp 4.950.000</td>
                  <td>94.3%</td>
                </tr>
                <tr>
                  <td className="ps-4">- Lain-lain</td>
                  <td>Rp 300.000</td>
                  <td>5.7%</td>
                </tr>
                <tr>
                  <td>Total Pengeluaran</td>
                  <td>Rp 3.180.000</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td className="ps-4">- Pembelian Bahan</td>
                  <td>Rp 1.850.000</td>
                  <td>58.2%</td>
                </tr>
                <tr>
                  <td className="ps-4">- Operasional</td>
                  <td>Rp 930.000</td>
                  <td>29.2%</td>
                </tr>
                <tr>
                  <td className="ps-4">- Lain-lain</td>
                  <td>Rp 400.000</td>
                  <td>12.6%</td>
                </tr>
                <tr className="fw-bold">
                  <td>Saldo Akhir</td>
                  <td>Rp 3.870.000</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
    </div>
  );
};

export default LaporanPage;
