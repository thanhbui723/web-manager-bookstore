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

exports.get = async(username, password) => {
  var pool = await conn;
  var sqlString = `Select * from QUANTRIVIEN where TaiKhoan = '${username}' and MatKhau = '${password}'`;
  return (await pool.query(sqlString)).recordset[0];
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
// (async () => {
//     await exports.abc().then(a=>{console.log(a);});
// })()

// exports.abc().then(a=>{console.log(a);});
// exports.abc().then(a=>{console.log(a);})



