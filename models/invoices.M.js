var {conn, sql} = require('../connect')

exports.all = async() => {
    var pool = await conn;
    var sqlString = "Select * from HOADON";
    // return pool.request().query(sqlString, (data)).then(result=>{
    //     return result.recordset;
    // });

    return await pool.query(sqlString);
    
}

exports.add = async(id_customer, sumPrice, time) => {
  var pool = await conn;
  var sqlString = `INSERT INTO HOADON (MaKH,TongTien,ThoiGian) VALUES ('${id_customer}', '${sumPrice}', '${time}')`;
  await pool.query(sqlString);
  var idReturnString = 'SELECT SCOPE_IDENTITY()'
  var id = await pool.query(idReturnString);
  return parseInt(Object.values(id.recordset[0]));
}