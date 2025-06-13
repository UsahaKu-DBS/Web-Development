import React from 'react';
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';

const TambahProduk = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 shadow-sm rounded">
            <h4 className="mb-0">Transaksi</h4>
            <div className="d-flex align-items-center gap-2">
                <i className="bi bi-person-circle fs-4"></i>
                <span className="fw-bold">User</span>
            </div>
        </div>
        <ProductForm />
      </div>
    </div>
  );
};

export default TambahProduk;
