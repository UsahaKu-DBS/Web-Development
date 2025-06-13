const Boom = require('@hapi/boom');
const TransaksiModel = require('../models/TransaksiModel');
const ProdukModel = require('../models/ProdukModel');
const db = require('../config/database');

class DashboardController {
  static async getSummary(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      
      // Get current month dates
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      const tanggal_mulai = startOfMonth.toISOString().split('T')[0];
      const tanggal_selesai = endOfMonth.toISOString().split('T')[0];

      // Get financial summary
      const rekapKeuangan = await TransaksiModel.getRekapByUmkm(id_umkm, {
        tanggal_mulai,
        tanggal_selesai
      });

      // Get total produk
      const totalProduk = await db('produk')
        .where('id_umkm', id_umkm)
        .count('* as total')
        .first();

      // Get produk with low stock (stok_tersedia < 10)
      const produkStokRendah = await db('produk')
        .where('id_umkm', id_umkm)
        .where('stok_tersedia', '<', 10)
        .count('* as total')
        .first();

      // Get total transaksi bulan ini
      const totalTransaksi = await db('transaksi')
        .where('id_umkm', id_umkm)
        .whereBetween('tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .count('* as total')
        .first();

      // Get produk terlaris (berdasarkan quantity terjual)
      const produkTerlaris = await db('detail_transaksi_produk')
        .select(
          'produk.nama_produk',
          db.raw('SUM(detail_transaksi_produk.jumlah_produk) as total_terjual'),
          db.raw('SUM(detail_transaksi_produk.total_harga) as total_omzet')
        )
        .leftJoin('transaksi', 'detail_transaksi_produk.id_transaksi', 'transaksi.id_transaksi')
        .leftJoin('produk', 'detail_transaksi_produk.id_produk', 'produk.id_produk')
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pemasukan')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('produk.id_produk', 'produk.nama_produk')
        .orderBy('total_terjual', 'desc')
        .limit(5);

      // Get recent transactions
      const transaksiTerbaru = await db('transaksi')
        .select(
          'transaksi.id_transaksi',
          'transaksi.tanggal_transaksi',
          'transaksi.jumlah',
          'transaksi.keterangan',
          'kategori_transaksi.nama_kategori',
          'kategori_transaksi.jenis'
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .orderBy('transaksi.created_at', 'desc')
        .limit(10);

      // Get trend 7 hari terakhir
      const trendMingguan = await db('transaksi')
        .select(
          'transaksi.tanggal_transaksi',
          db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pemasukan" THEN transaksi.jumlah ELSE 0 END) as pemasukan'),
          db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pengeluaran" THEN transaksi.jumlah ELSE 0 END) as pengeluaran')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('transaksi.tanggal_transaksi', '>=', db.raw('DATE_SUB(CURDATE(), INTERVAL 7 DAY)'))
        .groupBy('transaksi.tanggal_transaksi')
        .orderBy('transaksi.tanggal_transaksi');

      return h.response({
        status: 'success',
        data: {
          periode: {
            tanggal_mulai,
            tanggal_selesai,
            keterangan: 'Bulan ini'
          },
          ringkasan_keuangan: {
            total_pemasukan: parseFloat(rekapKeuangan.total_pemasukan) || 0,
            total_pengeluaran: parseFloat(rekapKeuangan.total_pengeluaran) || 0,
            saldo_bersih: parseFloat(rekapKeuangan.saldo_bersih) || 0
          },
          statistik: {
            total_produk: parseInt(totalProduk.total) || 0,
            produk_stok_rendah: parseInt(produkStokRendah.total) || 0,
            total_transaksi: parseInt(totalTransaksi.total) || 0
          },
          produk_terlaris: produkTerlaris.map(item => ({
            nama_produk: item.nama_produk,
            total_terjual: parseInt(item.total_terjual),
            total_omzet: parseFloat(item.total_omzet)
          })),
          transaksi_terbaru: transaksiTerbaru.map(item => ({
            id_transaksi: item.id_transaksi,
            tanggal: item.tanggal_transaksi,
            jumlah: parseFloat(item.jumlah),
            keterangan: item.keterangan,
            kategori: item.nama_kategori,
            jenis: item.jenis
          })),
          trend_mingguan: trendMingguan.map(item => ({
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

  static async getAnalytics(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const { periode = '30' } = request.query; // default 30 hari

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(periode));
      const tanggal_mulai = startDate.toISOString().split('T')[0];
      const tanggal_selesai = new Date().toISOString().split('T')[0];

      // Perbandingan dengan periode sebelumnya
      const prevStartDate = new Date(startDate);
      prevStartDate.setDate(prevStartDate.getDate() - parseInt(periode));
      const tanggal_mulai_prev = prevStartDate.toISOString().split('T')[0];
      const tanggal_selesai_prev = startDate.toISOString().split('T')[0];

      // Current period data
      const currentData = await TransaksiModel.getRekapByUmkm(id_umkm, {
        tanggal_mulai,
        tanggal_selesai
      });

      // Previous period data
      const prevData = await TransaksiModel.getRekapByUmkm(id_umkm, {
        tanggal_mulai: tanggal_mulai_prev,
        tanggal_selesai: tanggal_selesai_prev
      });

      // Calculate growth
      const calculateGrowth = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
      };

      const currentPemasukan = parseFloat(currentData.total_pemasukan) || 0;
      const currentPengeluaran = parseFloat(currentData.total_pengeluaran) || 0;
      const currentSaldo = parseFloat(currentData.saldo_bersih) || 0;

      const prevPemasukan = parseFloat(prevData.total_pemasukan) || 0;
      const prevPengeluaran = parseFloat(prevData.total_pengeluaran) || 0;
      const prevSaldo = parseFloat(prevData.saldo_bersih) || 0;

      // Top kategori pengeluaran
      const topKategoriPengeluaran = await db('transaksi')
        .select(
          'kategori_transaksi.nama_kategori',
          db.raw('SUM(transaksi.jumlah) as total')
        )
        .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
        .where('transaksi.id_umkm', id_umkm)
        .where('kategori_transaksi.jenis', 'pengeluaran')
        .whereBetween('transaksi.tanggal_transaksi', [tanggal_mulai, tanggal_selesai])
        .groupBy('kategori_transaksi.id_kategori', 'kategori_transaksi.nama_kategori')
        .orderBy('total', 'desc')
        .limit(5);

      return h.response({
        status: 'success',
        data: {
          periode: {
            tanggal_mulai,
            tanggal_selesai,
            hari: parseInt(periode)
          },
          perbandingan: {
            pemasukan: {
              current: currentPemasukan,
              previous: prevPemasukan,
              growth: calculateGrowth(currentPemasukan, prevPemasukan)
            },
            pengeluaran: {
              current: currentPengeluaran,
              previous: prevPengeluaran,
              growth: calculateGrowth(currentPengeluaran, prevPengeluaran)
            },
            saldo_bersih: {
              current: currentSaldo,
              previous: prevSaldo,
              growth: calculateGrowth(currentSaldo, prevSaldo)
            }
          },
          top_kategori_pengeluaran: topKategoriPengeluaran.map(item => ({
            kategori: item.nama_kategori,
            total: parseFloat(item.total),
            persentase: currentPengeluaran > 0 ? ((parseFloat(item.total) / currentPengeluaran) * 100) : 0
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

module.exports = DashboardController;