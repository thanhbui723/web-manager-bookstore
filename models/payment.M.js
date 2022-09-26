var {conn, sql} = require('../connect');

class PaymentModel{
  
    // Đọc danh sách khách hàng từ trang Phiếu thu tiền
    async readAllCustomer(result){
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

    // Thêm phiếu thu tiền
    async create(data, result){
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
    async add(id_invoice, sumPrice, time){
        var pool = await conn;
        var sqlString = `INSERT INTO PHIEUTHUTIEN (MaHD,SoTienThu,ThoiGian) VALUES ('${id_invoice}', '${sumPrice}', '${time}')`;
        return await pool.query(sqlString);
      }
}

module.exports = new PaymentModel;
