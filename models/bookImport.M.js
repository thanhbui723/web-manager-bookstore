var { conn, sql } = require('../connect');

class BookImportModel {


    async readAllBook(result) {
        var pool = await conn;
        var sqlString = 'execute readAllBook';
        return await pool.request()
            .query(sqlString, function(err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            })
    }

    // Nhập thêm sách
    async Add(newData, result) {
        var pool = await conn;
        var sqlString = 'execute p_nhapsach @TenSach = @tensach,@TacGia=@tacgia,@TheLoai=@theloai,@SoLuong=@soluong,@DonGia=@dongia';
        return await pool.request()
            .input('tensach', sql.NVarChar, newData.TenSach)
            .input('tacgia', sql.NVarChar, newData.TacGia)
            .input('theloai', sql.NVarChar, newData.TheLoai)
            .input('soluong', sql.Numeric, newData.SoLuong)
            .input('dongia', sql.Numeric, newData.DonGia)
            .query(sqlString, function(err, data) {
                if (!err) {
                    result(null, newData);
                } else {
                    result(true, null);
                }
            });
    }
}

module.exports = new BookImportModel;