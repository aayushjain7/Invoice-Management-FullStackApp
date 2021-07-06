package com.higradius;

import java.sql.*;

public class ConnectToDB {
	static final String DB_URI = "jdbc:mysql://localhost:3306/invoices";
	static final String USERNAME = "root";
	static final String PASSWORD = "Aay7ush!";
	
	public static Connection connectDB() throws Exception {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection(DB_URI, USERNAME, PASSWORD);
		return con;
	}
	
}
