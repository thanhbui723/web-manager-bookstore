var {conn, sql} = require('../connect');

class RegulationModel{
    
    // Đọc danh sách quy định
    async readAll(result){
        var pool = await conn;
        var sqlString = 'execute docQuyDinh';
        return await pool.request()
        .query(sqlString, function(err,data){
            if(data.recordset.length > 0){
                result(null,data.recordset);
            }else{
                result(true,null);
            }
        })
    }
    
    // Thêm 1 quy định mới
    async create(newData, result){
        var pool = await conn;
        var sqlString = 'execute themQuyDinh @NoiDung = @noidung';
        return await pool.request()
        .input('noidung', sql.NVarChar, newData.NoiDung)
        .query(sqlString, function(err,data){
            if(!err) {
                result(null,newData);
            }else{
                result(true,null);
            }
        });
    }

    // Cập nhật 1 quy định
    async update(newData, result){
        var pool = await conn;
        var sqlString = 'execute suaQuyDinh @STT = @stt, @NoiDung = @noidung';
        return await pool.request()
        .input('stt', sql.Numeric, newData.STT)
        .input('noidung', sql.NVarChar, newData.NoiDung)
        .query(sqlString, function(err,data){
            if(!err) {
                result(null,newData);
            }else{
                result(true,null);
            }
        });
    }

    // Xóa 1 quy định
    async delete(id, result){
        var pool = await conn;
        var sqlString = 'execute xoaQuyDinh @STT = @stt';
        return await pool.request()
        .input('stt', sql.Numeric, id)
        .query(sqlString, function(err,data){
            if(!err){
                result(null,data);
            }else{
                result(true,null);
            }
        });
    }

}

module.exports = new RegulationModel;