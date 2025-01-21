import mysql from "mysql";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "holobooks_db"
});


connection.connect((error) => {
    if(error){
        throw error;
    }else{
        console.log("Conexion exitosa");
    }
});

export default connection;