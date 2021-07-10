package com.higradius;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.sql.*;

/**
 * Servlet implementation class AddInvoiceServlet
 */
@WebServlet("/AddInvoiceServlet")
public class AddInvoiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddInvoiceServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			BufferedReader br = request.getReader();
			String new_invoice = "", line=null;
			while ((line = br.readLine()) != null)
			      new_invoice+=line.trim();
			System.out.println(new_invoice);
			new_invoice =  new_invoice.substring(1, new_invoice.length() - 1);
			String invoice_values[] = new_invoice.split(",");
			for(int i=0; i<invoice_values.length; i++) {
				invoice_values[i] = invoice_values[i].split(":")[1].trim();
				invoice_values[i] = invoice_values[i].substring(1, invoice_values[i].length() - 1);
				System.out.println(invoice_values[i]);
			}
			
			String cust_number = invoice_values[0];
			String name_customer = invoice_values[1];
			String invoice_id = invoice_values[2];
			String total_open_amount = invoice_values[3];
			String due_in_date = invoice_values[4];
			String notes = invoice_values[5];
			
			Connection con = ConnectToDB.connectDB();
			String query = "INSERT INTO invoices (cust_number, name_customer, invoice_id, total_open_amount, due_in_date, notes) values (?, ?, ?, ?, ?, ?)";
			PreparedStatement smt = con.prepareStatement(query);
			
			smt.setString(1, cust_number);
			smt.setString(2, name_customer);
			smt.setString(3, invoice_id);
			smt.setString(4, total_open_amount);
			smt.setString(5,  due_in_date);
			smt.setString(6, notes);
			
			smt.executeUpdate();
			
			response.setStatus(200);
			smt.close();
			con.close();
		} catch(Exception e) {
			System.out.println(e);
		}
	}

}
