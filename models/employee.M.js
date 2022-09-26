var {conn, sql} = require('../connect');

class EmployeeModel{
    
    // Đọc danh sách tài khoản - nhân viên
    async readAll(result){
        var pool = await conn;
        var sqlString = 'execute docDSTaiKhoanNV';
        return await pool.request()
        .query(sqlString, function(err,data){
            if(data.recordset.length > 0){
                result(null,data.recordset);
            }else{
                result(true,null);
            }
        })
    }
    
    // Thêm 1 tài khản - nhân viên
    async create(newData, result){
        var pool = await conn;
        // E.g. execute themTaiKhoanNV @TenNV = @tennv, @TenTK = @tentk, @MatKhau = @matkhau
        var sqlString = 'execute themTaiKhoanNV @TenNV = @tennv, @TenTK = @tentk, @MatKhau = @matkhau';
        return await pool.request()
        .input('tennv', sql.NVarChar, newData.TenNV)
        .input('tentk', sql.VarChar, newData.TenTK)
        .input('matkhau', sql.VarChar, newData.MatKhau)
        .query(sqlString, function(err,data){
            if(!err) {
                result(null,newData);
            }else{
                result(true,null);
            }
        });
    }

    // Cập nhật 1 tài khoản - nhân viên
    async update(newData, result){
        var pool = await conn;
        // E.g. execute suaTaiKhoanNV @MaNV = 1, @TenNV = N'Nhân viên 1', @TenTK = 'nv1@smilehouse.com', @MatKhau = 12123
        var sqlString = 'execute suaTaiKhoanNV @MaNV = @manv, @TenNV = @tennv, @TenTK = @tentk, @MatKhau = @matkhau';
        return await pool.request()
        .input('manv', sql.Numeric, newData.MaNV)
        .input('tennv', sql.NVarChar, newData.TenNV)
        .input('tentk', sql.VarChar, newData.TenTK)
        .input('matkhau', sql.VarChar, newData.MatKhau)
        .query(sqlString, function(err,data){
            if(!err) {
                result(null,newData);
            }else{
                result(true,null);
            }
        });
    }

    // Xóa 1 tài khoản - nhân viên
    async delete(id, result){
        var pool = await conn;
        // E.g. execute xoaTaiKhoanNV @MaNV = 2
        var sqlString = 'execute xoaTaiKhoanNV @MaNV = @manv';
        return await pool.request()
        .input('manv', sql.Numeric, id)
        .query(sqlString, function(err,data){
            if(!err){
                result(null,data);
            }else{
                result(true,null);
            }
        });
    }

}

module.exports = new EmployeeModel;