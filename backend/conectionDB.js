import mysql from "mysql";
const connection = mysql.createConnection({
    host: "mysql-holobooksdb.alwaysdata.net",
    user: "411557",
    password: "holodamin06",
    database: "holobooksdb_db"
});


connection.connect((error) => {
    if(error){
        throw error;
    }else{
        console.log("Conexion exitosa");
    }
});

export default connection;