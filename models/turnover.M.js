var { conn, sql } = require('../connect')

exports.all = async (month, year) => {
    var pool = await conn;
    var sqlString = `Select kh.TenKH, hd.TongTien, hd.ThoiGian from
                    HOADON hd join KHACHHANG kh on kh.MaKH = hd.MaKH 
                    where month(hd.ThoiGian) = '${month}' and year(hd.ThoiGian) = '${year}'`;

    return (await pool.query(sqlString)).recordset;
}

