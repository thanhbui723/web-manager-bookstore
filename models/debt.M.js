var {conn, sql} = require('../connect')

exports.all = async(month, year) => {
    var pool = await conn;
    var sqlString = `Select kh.TenKH, pg.SoTienNo, pg.ThoiGian from PHIEUGHINO pg
                    join HOADON hd on pg.MaHD = hd.MaHD join KHACHHANG kh on kh.MaKH = hd.MaKH 
                    where month(pg.ThoiGian) = '${month}' and year(pg.ThoiGian) = '${year}'`;

    return (await pool.query(sqlString)).recordset;    
}
exports.add = async(id_invoice, sumPrice, time) => {
    var pool = await conn;
    var sqlString = `INSERT INTO PHIEUGHINO (MaHD,SoTienNo,ThoiGian) VALUES ('${id_invoice}', '${sumPrice}', '${time}')`;
    return await pool.query(sqlString);
  }
