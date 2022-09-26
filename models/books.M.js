var {conn, sql} = require('../connect')

exports.all = async() => {
    var pool = await conn;
    var sqlString = "Select * from SACH";
    // return pool.request().query(sqlString, (data)).then(result=>{
    //     return result.recordset;
    // });
    return (await pool.query(sqlString)).recordset;
    // return pool.query(sqlString).then((result) => {
    //     sql.close();
    //     return result.recordset;
    //   }).catch((err) => console.log(err));
}

exports.get = async() => {
  var pool = await conn;
  var sqlString = "Select * from SACH where id = 'S001'";
  // return pool.request().query(sqlString, (data)).then(result=>{
  //     return result.recordset;
  // });

  return pool.query(sqlString).then((result) => {
      sql.close();
      return result.recordset;
    }).catch((err) => console.log(err));
}
exports.update = async(id, rest) => {
  var pool = await conn;
  var sqlString = `Update SACH set LuongTon = '${rest}' where MaSach = '${id}' `;
  // return pool.request().query(sqlString, (data)).then(result=>{
  //     return result.recordset;
  // });
  return (await pool.query(sqlString)).recordset;
  // return pool.query(sqlString).then((result) => {
  //     sql.close();
  //     return result.recordset;
  //   }).catch((err) => console.log(err));
}
exports.getByKeyword = async(keyword) => {
  var pool = await conn;
  var sqlString = `Select * from SACH where TenSach like  N'%${keyword}%' or TheLoai like  N'%${keyword}%' or TacGia like  N'%${keyword}%'`;
  return (await pool.query(sqlString)).recordset;
}




