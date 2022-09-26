/*
******************************
*                            *
*    KẾT NỐI TỚI DATABASE    *
*         SQL SERVER         *
*                            *
******************************

<!> Yêu cầu: cài đặt mssql và msnodesqlv8
+ Cấu hình database cho việc kết nối.
+ Kết nối tới database.

*/

var sql = require('mssql/msnodesqlv8');

var config = {
    server: 'localhost',        // Giữ nguyên
    user: 'sa',            // Thay đổi
    password: '123456',          // Thay đổi
    database: 'QuanLyNhaSach1',  // Thay đổi
    driver: 'msnodesqlv8'       // Giữ nguyên
}

const conn = new sql.ConnectionPool(config)
.connect().then(pool => {
    return pool;
});

module.exports = {
    conn: conn,
    sql: sql
}