const Boom = require('@hapi/boom');
const TransaksiModel = require('../models/TransaksiModel');
const db = require('../config/database');

class LaporanController {
  static async arusKas(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const { tanggal_mulai, tanggal_selesai } = request.query;

      if (!tanggal_mulai || !tanggal_selesai) {
        throw Boom.badRequest('Tanggal mulai dan tanggal selesai harus diisi');
      }

      // Get rekap data
      const rekap = await TransaksiModel.getRekapByUmkm(id_umkm, {
        tanggal_mulai,
        tanggal_selesai
      });

      // Get detail transaksi per kategori
      const detailKategori = await db('transaksi')
        .select(
          'kategori_transaksi.nama_kategori',
          'kategori_transaksi.jenis',
          db.raw('SUM(transaksi.jumlah) as total')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('kategori_transaksi.id_kategori', 'kategori_transaksi.nama_kategori', 'kategori_transaksi.jenis')
        .orderBy('kategori_transaksi.jenis', 'desc');

      // Get trend harian
      const trendHarian = await db('transaksi')
        .select(
          'transaksi.tanggal_transaksi',
          db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pemasukan" THEN transaksi.jumlah ELSE 0 END) as pemasukan'),
          db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pengeluaran" THEN transaksi.jumlah ELSE 0 END) as pengeluaran')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('transaksi.tanggal_transaksi')
        .orderBy('transaksi.tanggal_transaksi');

      return h.response({
        status: 'success',
        data: {
          periode: {
            tanggal_mulai,
            tanggal_selesai
          },
          rekap: {
            total_pemasukan: parseFloat(rekap.total_pemasukan) || 0,
            total_pengeluaran: parseFloat(rekap.total_pengeluaran) || 0,
            saldo_bersih: parseFloat(rekap.saldo_bersih) || 0
          },
          detail_kategori: detailKategori.map(item => ({
            nama_kategori: item.nama_kategori,
            jenis: item.jenis,
            total: parseFloat(item.total)
          })),
          trend_harian: trendHarian.map(item => ({
            tanggal: item.tanggal_transaksi,
            pemasukan: parseFloat(item.pemasukan),
            pengeluaran: parseFloat(item.pengeluaran),
            saldo_harian: parseFloat(item.pemasukan) - parseFloat(item.pengeluaran)
          }))
        }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async labaRugi(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const { tanggal_mulai, tanggal_selesai } = request.query;

      if (!tanggal_mulai || !tanggal_selesai) {
        throw Boom.badRequest('Tanggal mulai dan tanggal selesai harus diisi');
      }

      // Get pendapatan (pemasukan)
      const pendapatan = await db('transaksi')
        .select(
          'kategori_transaksi.nama_kategori',
          db.raw('SUM(transaksi.jumlah) as total')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pemasukan')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('kategori_transaksi.id_kategori', 'kategori_transaksi.nama_kategori');

      // Get beban (pengeluaran)
      const beban = await db('transaksi')
        .select(
          'kategori_transaksi.nama_kategori',
          db.raw('SUM(transaksi.jumlah) as total')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pengeluaran')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('kategori_transaksi.id_kategori', 'kategori_transaksi.nama_kategori');

      // Calculate totals
      const totalPendapatan = pendapatan.reduce((sum, item) => sum + parseFloat(item.total), 0);
      const totalBeban = beban.reduce((sum, item) => sum + parseFloat(item.total), 0);
      const labaRugiBersih = totalPendapatan - totalBeban;

      return h.response({
        status: 'success',
        data: {
          periode: {
            tanggal_mulai,
            tanggal_selesai
          },
          pendapatan: {
            detail: pendapatan.map(item => ({
              kategori: item.nama_kategori,
              jumlah: parseFloat(item.total)
            })),
            total: totalPendapatan
          },
          beban: {
            detail: beban.map(item => ({
              kategori: item.nama_kategori,
              jumlah: parseFloat(item.total)
            })),
            total: totalBeban
          },
          laba_rugi_bersih: labaRugiBersih,
          margin_keuntungan: totalPendapatan > 0 ? ((labaRugiBersih / totalPendapatan) * 100) : 0
        }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async laporanPenjualan(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const { tanggal_mulai, tanggal_selesai } = request.query;

      if (!tanggal_mulai || !tanggal_selesai) {
        throw Boom.badRequest('Tanggal mulai dan tanggal selesai harus diisi');
      }

      // Get penjualan produk
      const penjualanProduk = await db('detail_transaksi_produk')
        .select(
          'produk.nama_produk',
          'produk.harga_jual',
          db.raw('SUM(detail_transaksi_produk.jumlah_produk) as total_terjual'),
          db.raw('SUM(detail_transaksi_produk.total_harga) as total_omzet')
        )
        .leftJoin('transaksi', 'detail_transaksi_produk.id_transaksi', 'transaksi.id_transaksi')
        .leftJoin('produk', 'detail_transaksi_produk.id_produk', 'produk.id_produk')
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pemasukan')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('produk.id_produk', 'produk.nama_produk', 'produk.harga_jual')
        .orderBy('total_omzet', 'desc');

      // Get total penjualan
      const totalPenjualan = await db('transaksi')
        .select(
          db.raw('SUM(transaksi.jumlah) as total_omzet'),
          db.raw('COUNT(transaksi.id_transaksi) as total_transaksi')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pemasukan')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .first();

      return h.response({
        status: 'success',
        data: {
          periode: {
            tanggal_mulai,
            tanggal_selesai
          },
          ringkasan: {
            total_omzet: parseFloat(totalPenjualan.total_omzet) || 0,
            total_transaksi: parseInt(totalPenjualan.total_transaksi) || 0,
            rata_rata_per_transaksi: totalPenjualan.total_transaksi > 0 
              ? (parseFloat(totalPenjualan.total_omzet) / parseInt(totalPenjualan.total_transaksi)) 
              : 0
          },
          penjualan_produk: penjualanProduk.map(item => ({
            nama_produk: item.nama_produk,
            harga_jual: parseFloat(item.harga_jual),
            total_terjual: parseInt(item.total_terjual),
            total_omzet: parseFloat(item.total_omzet)
          }))
        }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async laporanPengeluaran(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const { tanggal_mulai, tanggal_selesai } = request.query;

      if (!tanggal_mulai || !tanggal_selesai) {
        throw Boom.badRequest('Tanggal mulai dan tanggal selesai harus diisi');
      }

      // Get pengeluaran per kategori
      const pengeluaranKategori = await db('transaksi')
        .select(
          'kategori_transaksi.nama_kategori',
          db.raw('SUM(transaksi.jumlah) as total'),
          db.raw('COUNT(transaksi.id_transaksi) as jumlah_transaksi')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pengeluaran')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('kategori_transaksi.id_kategori', 'kategori_transaksi.nama_kategori')
        .orderBy('total', 'desc');

      // Get total pengeluaran
      const totalPengeluaran = await db('transaksi')
        .select(
          db.raw('SUM(transaksi.jumlah) as total_pengeluaran'),
          db.raw('COUNT(transaksi.id_transaksi) as total_transaksi')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pengeluaran')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .first();

      // Get trend mingguan
      const trendMingguan = await db('transaksi')
        .select(
          db.raw('WEEK(transaksi.tanggal_transaksi) as minggu'),
          db.raw('YEAR(transaksi.tanggal_transaksi) as tahun'),
          db.raw('SUM(transaksi.jumlah) as total_pengeluaran')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pengeluaran')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('tahun', 'minggu')
        .orderBy(['tahun', 'minggu']);

      return h.response({
        status: 'success',
        data: {
          periode: {
            tanggal_mulai,
            tanggal_selesai
          },
          ringkasan: {
            total_pengeluaran: parseFloat(totalPengeluaran.total_pengeluaran) || 0,
            total_transaksi: parseInt(totalPengeluaran.total_transaksi) || 0,
            rata_rata_per_transaksi: totalPengeluaran.total_transaksi > 0 
              ? (parseFloat(totalPengeluaran.total_pengeluaran) / parseInt(totalPengeluaran.total_transaksi)) 
              : 0
          },
          pengeluaran_kategori: pengeluaranKategori.map(item => ({
            kategori: item.nama_kategori,
            total: parseFloat(item.total),
            jumlah_transaksi: parseInt(item.jumlah_transaksi),
            persentase: totalPengeluaran.total_pengeluaran > 0 
              ? ((parseFloat(item.total) / parseFloat(totalPengeluaran.total_pengeluaran)) * 100)
              : 0
          })),
          trend_mingguan: trendMingguan.map(item => ({
            minggu: `${item.tahun}-W${item.minggu}`,
            total_pengeluaran: parseFloat(item.total_pengeluaran)
          }))
        }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }
}

module.exports = LaporanController;