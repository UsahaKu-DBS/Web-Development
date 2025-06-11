const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
  nama: Joi.string().max(100).required(),
  no_telp: Joi.string().max(20).required(),
  username: Joi.string().alphanum().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  umkm: Joi.object({
    nama_umkm: Joi.string().max(255).required(),
    alamat: Joi.string().required(),
    no_telp: Joi.string().max(20).required(),
    jenis_usaha: Joi.string().max(100).required()
  }).required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const produkSchema = Joi.object({
  nama_produk: Joi.string().max(255).required(),
  harga_beli: Joi.number().precision(2).positive().required(),
  harga_jual: Joi.number().precision(2).positive().required(),
  stok_awal: Joi.number().integer().min(0).default(0),
  stok_tersedia: Joi.number().integer().min(0).default(0),
  kategori: Joi.string().max(100).optional(),
  deskripsi: Joi.string().optional()
});

const transaksiSchema = Joi.object({
  tanggal_transaksi: Joi.date().required(),
  id_kategori: Joi.number().integer().positive().required(),
  jumlah: Joi.number().precision(2).positive().required(),
  keterangan: Joi.string().optional(),
  detail_produk: Joi.array().items(
    Joi.object({
      id_produk: Joi.number().integer().positive().required(),
      jumlah_produk: Joi.number().integer().positive().required(),
      harga_satuan: Joi.number().precision(2).positive().required()
    })
  ).optional()
});

const kategoriTransaksiSchema = Joi.object({
  nama_kategori: Joi.string().max(100).required(),
  jenis: Joi.string().valid('pemasukan', 'pengeluaran').required()
});

const updateProdukSchema = Joi.object({
  nama_produk: Joi.string().max(255).optional(),
  harga_beli: Joi.number().precision(2).positive().optional(),
  harga_jual: Joi.number().precision(2).positive().optional(),
  stok_awal: Joi.number().integer().min(0).optional(),
  stok_tersedia: Joi.number().integer().min(0).optional(),
  kategori: Joi.string().max(100).optional(),
  deskripsi: Joi.string().optional()
});

const updateTransaksiSchema = Joi.object({
  tanggal_transaksi: Joi.date().optional(),
  id_kategori: Joi.number().integer().positive().optional(),
  jumlah: Joi.number().precision(2).positive().optional(),
  keterangan: Joi.string().optional(),
  detail_produk: Joi.array().items(
    Joi.object({
      id_produk: Joi.number().integer().positive().required(),
      jumlah_produk: Joi.number().integer().positive().required(),
      harga_satuan: Joi.number().precision(2).positive().required()
    })
  ).optional()
});

const laporanQuerySchema = Joi.object({
  tanggal_mulai: Joi.date().required(),
  tanggal_selesai: Joi.date().required(),
  jenis: Joi.string().valid('pemasukan', 'pengeluaran').optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  produkSchema,
  updateProdukSchema,
  transaksiSchema,
  updateTransaksiSchema,
  kategoriTransaksiSchema,
  laporanQuerySchema
};