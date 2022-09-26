var { conn, sql } = require('../connect');

class bookManagementModel {

    // Đọc danh sách khách hàng
    async readAll(result) {
            var pool = await conn;
            var sqlString = 'select*from Sach';
            return await pool.request().query(sqlString, function(err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            })
        }
        //Them sach
    async Add(newData, result) {
            var pool = await conn;
            var sqlString = 'execute themSach @TenSach = @tensach, @TacGia = @tacgia, @TheLoai = @theloai, @LuongTon = @luongton,@DonGia = @dongia';
            return await pool.request()
                .input('tensach', sql.NVarChar, newData.TenSach)
                .input('tacgia', sql.NVarChar, newData.TacGia)
                .input('theloai', sql.NVarChar, newData.TheLoai)
                .input('luongton', sql.Numeric, newData.LuongTon)
                .input('dongia', sql.Numeric, newData.DonGia)
                .query(sqlString, function(err, data) {
                    if (!err) {
                        result(null, newData);
                    } else {
                        result(true, null);
                    }
                });
        }
        //Cập nhật sách
    async update(newData, result) {
        var pool = await conn;
        var sqlString = 'execute suaSach  @TenSach = @tensach, @TacGia = @tacgia, @TheLoai = @theloai, @LuongTon = @luongton,@DonGia = @dongia, @MaSach = @masach';
        return await pool.request()
            .input('masach', sql.Numeric, newData.MaSach)
            .input('tensach', sql.NVarChar, newData.TenSach)
            .input('tacgia', sql.NVarChar, newData.TacGia)
            .input('theloai', sql.NVarChar, newData.TheLoai)
            .input('luongton', sql.Numeric, newData.LuongTon)
            .input('dongia', sql.Numeric, newData.DonGia)
            .query(sqlString, function(err, data) {
                if (!err) {
                    result(null, newData);
                } else {
                    result(true, null);
                }
            });
    }

    // Xóa 1 sách
    async delete(id, result) {
        var pool = await conn;
        var sqlString = 'execute xoaSach @MaSach = @masach';
        return await pool.request()
            .input('masach', sql.Numeric, id)
            .query(sqlString, function(err, data) {
                if (!err) {
                    result(null, data);
                } else {
                    result(true, null);
                }
            });
    }


}
module.exports = new bookManagementModel;