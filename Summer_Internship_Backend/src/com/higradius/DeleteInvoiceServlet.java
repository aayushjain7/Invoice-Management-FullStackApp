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
 * Servlet implementation class DeleteInvoiceServlet
 */
@WebServlet("/DeleteInvoiceServlet")
public class DeleteInvoiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteInvoiceServlet() {
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
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			BufferedReader br = request.getReader();
			String delete_json = "", line=null;
			while ((line = br.readLine()) != null)
			      delete_json+=line.trim();
			delete_json = delete_json.split(":")[1].trim();
			delete_json = delete_json.substring(1, delete_json.length()-2);
			System.out.println(delete_json);
			
			String delete_ids[] = delete_json.split(",");
			Connection con = ConnectToDB.connectDB();
			String query = "DELETE FROM invoices WHERE invoice_id = ?";
			for(int i=0; i<delete_ids.length; i++) {
				PreparedStatement smt = con.prepareStatement(query);
				System.out.println(delete_ids[i].trim());
				smt.setString(1, delete_ids[i].trim());
				smt.executeUpdate();
				smt.close();
			}

			con.close();
			
		} catch(Exception e) {
			System.out.println(e);
		}
	}

}
