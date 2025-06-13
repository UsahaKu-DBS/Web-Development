import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ProductForm = () => {
  return (
    <div className="p-4 w-100">
      <h4 className="mb-4">Tambah Produk Baru</h4>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control type="text" placeholder="Masukkan nama produk" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control type="text" placeholder="Masukkan kategori" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Harga Beli (Rp)</Form.Label>
              <Form.Control type="number" placeholder="Harga beli" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Harga Jual (Rp)</Form.Label>
              <Form.Control type="number" placeholder="Harga jual" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Stok Awal</Form.Label>
              <Form.Control type="number" placeholder="Stok awal" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Satuan</Form.Label>
              <Form.Control type="text" placeholder="Satuan" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Deskripsi Produk</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Deskripsi produk" />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="outline-primary" className="me-2">Batal</Button>
          <Button variant="primary">Simpan</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
