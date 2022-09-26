var {conn, sql} = require('../connect');

class CustomerModel{
    
    // Đọc danh sách khách hàng
    async readAll(result){
        var pool = await conn;
        var sqlString = 'execute docDSKhachHang';
        return await pool.request()
        .query(sqlString, function(err,data){
            if(data.recordset.length > 0){
                result(null,data.recordset);
            }else{
                result(true,null);
            }
        })
    }
    
    // Thêm 1 khách hàng mới
    async create(newData, result){
        var pool = await conn;
        // E.g. execute themKhachHang @TenKH = 'HaiDang', @DiaChi = 'LongAn', @DienThoai = 0783526371, @Email = 'ddad@gmail.com'
        var sqlString = 'execute themKhachHang @TenKH = @tenkh, @DiaChi = @diachi, @DienThoai = @dienthoai, @Email = @email';
        return await pool.request()
        .input('tenkh', sql.NVarChar, newData.TenKH)
        .input('diachi', sql.NVarChar, newData.DiaChi)
        .input('dienthoai', sql.NVarChar, newData.DienThoai)
        .input('email',sql.VarChar, newData.Email)
        .query(sqlString, function(err,data){
            if(!err) {
                result(null,newData);
            }else{
                result(true,null);
            }
        });
    }

    // Cập nhật 1 khách hàng
    async update(newData, result){
        var pool = await conn;
        // E.g. execute suaKhachHang @MaKH = 1, @TenKH = N'Khách hàng 1', @DiaChi = N'Đồng Nai', @DienThoai = 9343434567, @Email = null
        var sqlString = 'execute suaKhachHang @MaKH = @makh, @TenKH = @tenkh, @DiaChi = @diachi, @DienThoai = @dienthoai, @Email = @email';
        return await pool.request()
        .input('makh', sql.Numeric, newData.MaKH)
        .input('tenkh', sql.NVarChar, newData.TenKH)
        .input('diachi', sql.NVarChar, newData.DiaChi)
        .input('dienthoai', sql.NVarChar, newData.DienThoai)
        .input('email',sql.VarChar, newData.Email)
        .query(sqlString, function(err,data){
            if(!err) {
                result(null,newData);
            }else{
                result(true,null);
            }
        });
    }

    // Xóa 1 khách hàng
    async delete(id, result){
        var pool = await conn;
        // E.g. execute xoaKhachHang @MaKH = 3
        var sqlString = 'execute xoaKhachHang @MaKH = @makh';
        return await pool.request()
        .input('makh', sql.Numeric, id)
        .query(sqlString, function(err,data){
            if(!err){
                result(null,data);
            }else{
                result(true,null);
            }
        });
    }

    // Thêm phiếu thu tiền ở trang Khách hàng
    async invoice(data, result){
        var pool = await conn;
        // E.g  declare @kq  int
        //      execute @kq = themPhieuThuTien @MaHD = 2, @SoTienThu = 1
        //      select @kq as KetQua
        var sqlString = `declare @kq  int
                        execute @kq = themPhieuThuTien @MaHD = @mahd, @SoTienThu = @sotienthu
                        select @kq as KetQua`;
        return await pool.request()
        .input('mahd', sql.Numeric, data.MaHD)
        .input('sotienthu', sql.Numeric, data.SoTienThu)
        .query(sqlString, function(err,data){
            if(!err){
                result(null,data.recordset[0].KetQua,data);
            }else{
                result(true,-1,null);
            }
        });
    }
    async all(name, address, phoneNumber, email){
        var pool = await conn;
        var sqlString = "Select * from KHACHHANG";
        return await pool.query(sqlString);
    }
    async updateDebt(id, debt){
        var pool = await conn;
        var sqlString = `UPDATE KHACHHANG SET TienNo = TienNo + '${debt}' WHERE MaKH = '${id}';`;
        return await pool.query(sqlString);
    }
    async get(name, address, phoneNumber, email){
      var pool = await conn;
      var sqlString = `Select MaKH from KHACHHANG where TenKH = N'${name}' and DiaChi = N'${address}' and DienThoai = '${phoneNumber}' and Email='${email}'`;
      var id = await pool.query(sqlString);
      if(id.recordset[0])
        return parseInt(Object.values(id.recordset[0]));
      return null;
    }
    
    async add(name, address, phoneNumber, email, debt){
      var pool = await conn;
      var sqlString = `INSERT INTO KHACHHANG (TenKH,DiaChi,DienThoai,Email,TienNo) VALUES (N'${name}', N'${address}', '${phoneNumber}', '${email}', '${debt}')`;
      await pool.query(sqlString);
      var idReturnString = 'SELECT SCOPE_IDENTITY()'
      var id = await pool.query(idReturnString);
      return parseInt(Object.values(id.recordset[0]));
    }
    
}

module.exports = new CustomerModel;