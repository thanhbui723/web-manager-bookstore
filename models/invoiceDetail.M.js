var {conn, sql} = require('../connect')

exports.all = async() => {
    var pool = await conn;
    var sqlString = "Select * from CHITIETHOADON";
    // return pool.request().query(sqlString, (data)).then(result=>{
    //     return result.recordset;
    // });
    return await pool.query(sqlString);
}

exports.add = async(id_invoice, id_book, amount) => {
  var pool = await conn;
  var sqlString = `INSERT INTO CHITIETHOADON (MaHD,MaSach,SoLuong) VALUES ('${id_invoice}', '${id_book}', '${amount}')`;
  await pool.query(sqlString);
  var idReturnString = 'SELECT SCOPE_IDENTITY()'
  var id = await pool.query(idReturnString);
  return parseInt(Object.values(id.recordset[0]));
  
}