// const data = [
// 	{
// 		name_customer: 'aayush jain',
// 		cust_number: '1234',
// 		invoice_id: 19874555,
// 		total_open_amount: 1000,
// 		due_in_date: '2021-06-07',
// 		clear_date: null,
// 		delay: 0,
// 		notes: 'hey hey hey',
// 	},
// 	{
// 		name_customer: 'WR co',
// 		cust_number: '0100000272',
// 		invoice_id: 1930425959,
// 		total_open_amount: 37708,
// 		due_in_date: '2020-04-13',
// 		clear_date: '2020-04-16',
// 		delay: 3,
// 		notes: 'invoice will be cleared late',
// 	},
// 	{
// 		name_customer: 'DARDEN D llc',
// 		cust_number: '0200229974',
// 		invoice_id: 1930538929,
// 		total_open_amount: 18132,
// 		due_in_date: '2020-12-14',
// 		clear_date: '2020-03-12',
// 		delay: -1,
// 		notes: 'invoice to be cleared timely',
// 	},
// 	{
// 		name_customer: 'SYSCO F',
// 		cust_number: '0200736337',
// 		invoice_id: 1930539475,
// 		total_open_amount: 7795,
// 		due_in_date: '2020-03-31',
// 		clear_date: '2020-04-03',
// 		delay: 3,
// 		notes: 'invoice will be cleared late',
// 	},
// ];
var data = [];
var page = 0;

const URL = 'http://localhost:8080/H2HBABBA2326';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateFormat = (d) => {
	let t = new Date(d);
	return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
};
const amountFormat = (amount) => {
	return amount / 1000 + 'K';
};

// //Display Table Data
const buildTable = (invoices) => {
	console.log(invoices, 'invoices');
	let table = document.getElementById('gridPanel__tableData');
	table.innerHTML = ""
	invoices.map((invoice) => {
		let row = `<tr>
								<td class="gridPanel__tableCheckbox">
									<label class="container" style="margin-left: 7px">
										<input type="checkbox" name="checkall" id="${invoice.invoice_id}" onclick="check(this)"/>
										<span class="checkimg"></span>
									</label>
								</td>
							  <td class="gridPanel__tableCustomerName">${invoice.name_customer}</td>
								<td class="gridPanel__tableCustomer">${invoice.cust_number}</td>
								<td class="gridPanel__tableInvoice">${invoice.invoice_id}</td>
								<td class="gridPanel__tableAmount">${amountFormat(invoice.total_open_amount)}</td>
								<td class="gridPanel__tableDue ${invoice?.delay > 0 ? 'red' : ''}">${dateFormat(invoice.due_in_date)}</td>
								<td class="gridPanel__tablePayDate">${invoice.clear_date ? dateFormat(invoice.clear_date) : '--'}</td>
								<td class="gridPanel__tableNotes">${invoice.notes}</td>
							</tr>`;
		table.innerHTML += row;
	});
};

const loadInitialTable = async () => {
	try {
		const res = await fetch(URL + `/GetInvoicesServlet?page_no=${page}`);
		const json_res = await res.json();
		json_res.map((d) => (d.checked = false));
		data = json_res;
		buildTable(data);
	} catch (e) {
		alert(e);
	}
};
loadInitialTable();

//pagination prev page
const prevPage = async () => {
	try {
		const res = await fetch(URL + `/GetInvoicesServlet?page_no=${--page}`);
		const json_res = await res.json();
		json_res.map((d) => (d.checked = false));
		data = json_res;
		buildTable(data);
		if (page == 0) {
			let prevBtn = document.getElementsByClassName('prevPage')[0];
			prevBtn.disabled = true;
			prevBtn.classList.remove('available');
		}
	} catch (e) {
		console.log(e);
	}
};

//pagination next page
const nextPage = async () => {
	try {
		const res = await fetch(URL + `/GetInvoicesServlet?page_no=${++page}`);
		const json_res = await res.json();
		json_res.map((d) => (d.checked = false));
		data = json_res;
		buildTable(data);
		let prevBtn = document.getElementsByClassName('prevPage')[0];
		prevBtn.disabled = true;
		prevBtn.classList.add('available');
	} catch (e) {
		console.log(e);
	}
};

//CheckAll/Single
const checkAll = (rows) => {
	let checkboxes = document.getElementsByName('checkall');
	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = rows.checked;
		data[i].checked = rows.checked;
		let row = document.getElementById(data[i].invoice_id).parentNode.parentNode.parentNode;
		if (rows.checked) {
			row.classList.add('select_row');
		} else row.classList.remove('select_row');
	}
	if (rows.checked) {
		disableHeaderAddBtn(true);
		disableHeaderEditBtn(true);
		disableHeaderDeleteBtn(false);
	} else {
		disableHeaderEditBtn(true);
		disableHeaderAddBtn(false);
		disableHeaderDeleteBtn(true);
	}
};

const check = (row) => {
	let tableRow = row.parentNode.parentNode.parentNode;
	let invoice = data.filter((d) => d.invoice_id == row.id);
	console.log(invoice);
	if (row.checked) {
		tableRow.classList.add('select_row');
		invoice[0].checked = true;
	} else {
		tableRow.classList.remove('select_row');
		invoice[0].checked = false;
	}
	let invoices_checked = data.filter((invoice) => invoice.checked === true);
	console.log(invoices_checked);
	let lenChecked = invoices_checked.length;
	if (lenChecked === 0) {
		disableHeaderAddBtn(false);
		disableHeaderEditBtn(true);
		disableHeaderDeleteBtn(true);
	} else if (lenChecked === 1) {
		disableHeaderAddBtn(true);
		disableHeaderEditBtn(false);
		disableHeaderDeleteBtn(false);
	} else {
		disableHeaderAddBtn(true);
		disableHeaderEditBtn(true);
		disableHeaderDeleteBtn(false);
	}
};

const disableHeaderAddBtn = (disable) => {
	let addBtn = document.getElementById('addBtn');
	addBtn.disabled = disable;
	disable ? addBtn.classList.add('disable') : addBtn.classList.remove('disable');
};
const disableHeaderEditBtn = (disable) => {
	let editBtn = document.getElementById('editBtn');
	editBtn.disabled = disable;
	disable ? editBtn.classList.add('disable') : editBtn.classList.remove('disable');
};
const disableHeaderDeleteBtn = (disable) => {
	let delBtn = document.getElementById('deleteBtn');
	delBtn.disabled = disable;
	disable ? delBtn.classList.add('disable') : delBtn.classList.remove('disable');
};

//Add Modal
let addmodal = document.getElementById('addModal');
let addbtn = document.getElementById('addBtn');
let addspan = document.getElementsByClassName('addclose')[0];
let addfooter = document.getElementsByClassName('addfclose')[0];
addbtn.onclick = function () {
	addmodal.style.display = 'block';
};
addspan.onclick = function () {
	addmodal.style.display = 'none';
};
addfooter.onclick = function () {
	addmodal.style.display = 'none';
};
let addclear = document.getElementsByClassName('modal__footerClear-add')[0];
let addForm = document.getElementById('addForm');
addclear.onclick = function () {
	addForm.reset();
};
let required_inputs = addForm.querySelectorAll('input[required]');
let addSubmit = addForm.querySelector('input[type="submit"]');
addForm.addEventListener('keyup', function () {
	let disabled = false;
	required_inputs.forEach(function (input, index) {
		if (input.value === '' || !input.value.replace(/\s/g, '').length) {
			disabled = true;
		}
	});
	if (disabled) {
		addSubmit.setAttribute('disabled', 'disabled');
		addSubmit.classList.add('disabled');
	} else {
		addSubmit.removeAttribute('disabled');
		addSubmit.classList.remove('disabled');
	}
});

const submitInvoice = async () => {
	let notes_input = addForm.querySelectorAll('textarea');
	let new_cust_number = required_inputs[1].value;
	let new_name_customer = required_inputs[0].value;
	let new_invoice_id = required_inputs[2].value;
	let new_total_open_amount = required_inputs[3].value;
	let new_due_in_date = required_inputs[4].value;
	let new_notes = notes_input[0].value;
	const send_data = {
		cust_number: new_cust_number,
		name_customer: new_name_customer,
		invoice_id: new_invoice_id,
		total_open_amount: new_total_open_amount,
		due_in_date: new_due_in_date,
		notes: new_notes,
	};
	console.log(JSON.stringify(send_data));
	await fetch(URL + '/AddInvoiceServlet', {
		method: 'POST',
		body: JSON.stringify(send_data),
	});
	window.location.reload();
};

//Edit Modal
let editmodal = document.getElementById('editModal');
let editbtn = document.getElementById('editBtn');
let editspan = document.getElementsByClassName('editclose')[0];
let editfooter = document.getElementsByClassName('editfclose')[0];
editbtn.onclick = function () {
	editmodal.style.display = 'block';
	let invoice = data.filter((d) => d.checked === true)[0];
	document.getElementById('editAmount').value = invoice.total_open_amount;
	document.getElementById('editNotes').value = invoice.notes;
};
editspan.onclick = function () {
	editmodal.style.display = 'none';
};
editfooter.onclick = function () {
	editmodal.style.display = 'none';
};
let editclear = document.getElementsByClassName('modal__footerClear-edit')[0];
let editForm = document.getElementById('editForm');
editclear.onclick = function () {
	editForm.reset();
};

const editInvoice = async () => {
	let notes_input = editForm.querySelectorAll('textarea');
	let editable_input = editForm.querySelectorAll('input');
	let edited_total_open_amount = editable_input[0].value;
	let edited_notes = notes_input[0].value;
	let edited_invoice_id = data.filter((d) => d.checked === true)[0].invoice_id;
	const edit_data = {
		invoice_id: edited_invoice_id,
		total_open_amount: edited_total_open_amount,
		notes: edited_notes,
	};
	console.log(JSON.stringify(edit_data));
	await fetch(URL + '/EditInvoiceServlet', {
		method: 'PUT',
		body: JSON.stringify(edit_data),
	});
	window.location.reload();
};

//DeleteModal
let deletemodal = document.getElementById('deleteModal');
let deletebtn = document.getElementById('deleteBtn');
let deletespan = document.getElementsByClassName('deleteclose')[0];
let deletefooter = document.getElementsByClassName('deletefclose')[0];
deletebtn.onclick = function () {
	deletemodal.style.display = 'block';
};
deletespan.onclick = function () {
	deletemodal.style.display = 'none';
};
deletefooter.onclick = function () {
	deletemodal.style.display = 'none';
};

window.onclick = function (event) {
	if (event.target == deletemodal) {
		deletemodal.style.display = 'none';
	} else if (event.target == addmodal) {
		addmodal.style.display = 'none';
	} else if (event.target == editmodal) {
		editmodal.style.display = 'none';
	}
};

const deleteInvoice = async () => {
	let checked_data = data.filter((d) => d.checked === true);
	let delete_invoice_ids = checked_data.map((d) => d.invoice_id);
	const delete_data = {
		invoice_ids: delete_invoice_ids,
	};
	console.log(JSON.stringify(delete_data));
	await fetch(URL + '/DeleteInvoiceServlet', {
		method: 'DELETE',
		body: JSON.stringify(delete_data),
	});
	window.location.reload();
};

function handleForm(event) {
	event.preventDefault();
}
document.addEventListener('submit', handleForm);

//search by invoice
let searchInvoice = document.getElementById('searchInvoice');
searchInvoice.addEventListener('keyup', function () {
	let filter = searchInvoice.value.toUpperCase();
	let table = document.getElementById('gridPanel__tableData');
	let tr = table.getElementsByTagName('tr');
	for (let i = 0; i < tr.length; i++) {
		let td = tr[i].getElementsByTagName('td')[3];
		if (td) {
			txtValue = td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
});
