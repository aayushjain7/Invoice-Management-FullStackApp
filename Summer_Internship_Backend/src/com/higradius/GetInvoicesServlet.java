package com.higradius;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.sql.*;
import java.util.*;
import java.io.*;

/**
 * Servlet implementation class GetInvoicesServlet
 */
@WebServlet("/GetInvoicesServlet")
public class GetInvoicesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetInvoicesServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			Connection con = ConnectToDB.connectDB();
			Statement smt = con.createStatement();
			String query = "SELECT name_customer, cust_number, invoice_id, total_open_amount, due_in_date, clear_date, delay, notes from invoices LIMIT 10";
			ResultSet rs = smt.executeQuery(query);
			
			ArrayList<InvoicePojo> invoices = new ArrayList<>();
			while(rs.next()) {
				InvoicePojo invoice = new InvoicePojo();
				invoice.setName_customer(rs.getString("name_customer"));
				invoice.setCust_number(rs.getString("cust_number"));
				invoice.setInvoice_id(rs.getLong("invoice_id"));
				invoice.setTotal_open_amount(rs.getLong("total_open_amount"));
				invoice.setDue_in_date(rs.getString("due_in_date"));
				invoice.setClear_date(rs.getString("clear_date"));
				invoice.setDelay(rs.getLong("delay"));
				invoice.setNotes(rs.getString("notes"));
				invoices.add(invoice);
			}
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			String res = gson.toJson(invoices);
			
			out.print(res);
			System.out.println(res);
			response.setStatus(200);
			out.flush();
			smt.close();
			con.close();
		} catch(Exception e) {
			System.out.println(e);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
