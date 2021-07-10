package com.higradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditInvoiceServlet
 */
@WebServlet("/EditInvoiceServlet")
public class EditInvoiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditInvoiceServlet() {
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
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			BufferedReader br = request.getReader();
			String edit_invoice = "", line=null;
			while ((line = br.readLine()) != null)
			      edit_invoice+=line.trim();
			System.out.println(edit_invoice);
			edit_invoice =  edit_invoice.substring(1, edit_invoice.length() - 1);
			String invoice_edit[] = edit_invoice.split(",");
			for(int i=0; i<invoice_edit.length; i++) {
				invoice_edit[i] = invoice_edit[i].split(":")[1].trim();
				if(!Character.isDigit(invoice_edit[i].charAt(0)))
					invoice_edit[i] = invoice_edit[i].substring(1, invoice_edit[i].length() - 1);
				System.out.println(invoice_edit[i]);
			}
			
			String invoice_id = invoice_edit[0];
			String total_open_amount = invoice_edit[1];
			String notes = invoice_edit[2];
			
			Connection con = ConnectToDB.connectDB();
			String query = "UPDATE invoices SET total_open_amount = ?, notes = ? WHERE invoice_id = ?";
			PreparedStatement smt = con.prepareStatement(query);
			
			smt.setString(1, total_open_amount);
			smt.setString(2, notes);
			smt.setString(3, invoice_id);
			System.out.println(smt);
			smt.executeUpdate();
			
			response.setStatus(200);	
			smt.close();
			con.close();
		} catch(Exception e) {
			System.out.println(e);
		}
	}

}
