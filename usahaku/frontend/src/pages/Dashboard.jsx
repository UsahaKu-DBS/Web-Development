// src/pages/Dashboard.jsx

import React from 'react';
import LogoutButton from '../components/LogoutButton'; // sesuaikan path-nya
import { FaArrowUp, FaArrowDown, FaUser, FaBox, FaWallet, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3">
          <h4 className="fw-bold">Dashboard</h4>
          <div className="d-flex align-items-center gap-2">
            <FaUser size={20} />
            <span>{user?.nama_lengkap || 'User123'}</span>
          </div>
        </div>

        {/* Card Statistics */}
        <div className="d-flex flex-wrap gap-3">
          <StatCard
            title="Total Pemasukan"
            value="Rp 5.250.000"
            icon={<FaArrowUp className="text-success" />}
            trend="↑ 12% dari bulan lalu"
            trendColor="text-success"
            bgColor="bg-light-success"
          />
          <StatCard
            title="Total Pengeluaran"
            value="Rp 3.180.000"
            icon={<FaArrowDown className="text-danger" />}
            trend="↑ 5% dari bulan lalu"
            trendColor="text-danger"
          />
          <StatCard
            title="Saldo Bersih"
            value="Rp 2.070.000"
            icon={<FaWallet className="text-warning" />}
            trend="↑ 8% dari bulan lalu"
            trendColor="text-success"
          />
          <StatCard
            title="Total Produk"
            value="24"
            icon={<FaBox className="text-primary" />}
            trend="↑ 2 produk baru"
            trendColor="text-success"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, trendColor }) => {
  return (
    <div className="bg-white p-3 shadow-sm rounded" style={{ width: "250px" }}>
      <div className="mb-2 d-flex align-items-center gap-2">
        <div>{icon}</div>
        <h6 className="mb-0">{title}</h6>
      </div>
      <h5 className="fw-bold mb-1">{value}</h5>
      <small className={trendColor}>{trend}</small>
    </div>
  );
};

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // atau gunakan navigate('/login')
};

export default Dashboard;
