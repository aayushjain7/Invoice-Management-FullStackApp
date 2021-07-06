const data = [
	{
		id: 1,
		checked: false,
		cust_name: 'Aayush Jain',
		cust_no: 163265156,
		invoice_no: 516845156,
		invoice_amount: 25000,
		due_date: '2020-06-29',
		clear_date: '2020-06-31',
		delay: 2,
		notes: 'invoice will be cleared late',
	},
	{
		id: 2,
		checked: false,
		cust_name: 'Varnika Sharma',
		cust_no: 163265156,
		invoice_no: 917846056,
		invoice_amount: 35900,
		due_date: '2020-06-29',
		clear_date: '2020-06-21',
		delay: -8,
		notes: 'invoice to be cleared timely',
	},
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateFormat = (d) => {
	let t = new Date(d);
	return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
}
const amountFormat = (amount) => {
	return amount/1000+'K';
}

//Display Table Data
const buildTable = (invoices) => {
	let table = document.getElementById('gridPanel__tableData');
	invoices.map((invoice) => {
		let row = `<tr>
								<td class="gridPanel__tableCheckbox">
									<label class="container" style="margin-left: 7px">
										<input type="checkbox" name="checkall" id="${invoice.id}" onclick="check(this)"/>
										<span class="checkimg"></span>
									</label>
								</td>
							  <td class="gridPanel__tableCustomerName">${invoice.cust_name}</td>
								<td class="gridPanel__tableCustomer">${invoice.cust_no}</td>
								<td class="gridPanel__tableInvoice">${invoice.invoice_no}</td>
								<td class="gridPanel__tableAmount">${amountFormat(invoice.invoice_amount)}</td>
								<td class="gridPanel__tableDue ${invoice.delay > 0 ? 'red' : ''}">${dateFormat(invoice.due_date)}</td>
								<td class="gridPanel__tablePayDate">${dateFormat(invoice.clear_date)}</td>
								<td class="gridPanel__tableNotes">${invoice.notes}</td>
							</tr>`;
		table.innerHTML += row;
	});
}
buildTable(data);

//CheckAll/Single
const checkAll = (rows) => {
	let checkboxes = document.getElementsByName('checkall');
	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = rows.checked;
		data[i].checked = rows.checked;
		let row = document.getElementById(data[i].id).parentNode.parentNode.parentNode;
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
}

const check = (row) => {
	let tableRow = row.parentNode.parentNode.parentNode;
	let invoice = data.filter((d) => d.id == row.id);
	if (row.checked) {
		tableRow.classList.add('select_row');
		invoice[0].checked = true;
	} else {
		tableRow.classList.remove('select_row');
		invoice[0].checked = false;
	}
	let invoices_checked = data.filter((invoice) => invoice.checked===true)
	console.log(invoices_checked)
	let lenChecked = invoices_checked.length;
	if(lenChecked===0){
		disableHeaderAddBtn(false);
		disableHeaderEditBtn(true);
		disableHeaderDeleteBtn(true);
	} else if (lenChecked===1) {
		disableHeaderAddBtn(true);
		disableHeaderEditBtn(false);
		disableHeaderDeleteBtn(false);
	} else {
		disableHeaderAddBtn(true);
		disableHeaderEditBtn(true);
		disableHeaderDeleteBtn(false);
	}
}

const disableHeaderAddBtn = (disable) => {
	let addBtn = document.getElementById('addBtn');
	addBtn.disabled = disable;
	disable ? addBtn.classList.add('disable') : addBtn.classList.remove('disable');
}
const disableHeaderEditBtn = (disable) => {
	let editBtn = document.getElementById('editBtn');
	editBtn.disabled = disable;
	disable ? editBtn.classList.add('disable') : editBtn.classList.remove('disable');
}
const disableHeaderDeleteBtn = (disable) => {
	let delBtn = document.getElementById('deleteBtn');
	delBtn.disabled = disable;
	disable ? delBtn.classList.add('disable') : delBtn.classList.remove('disable');
}

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
addclear.onclick = function () {
	document.getElementById('addForm').reset();
};
let addForm = document.getElementById('addForm');
let required_inputs = addForm.querySelectorAll('input[required]');
let register = addForm.querySelector('input[type="submit"]');
addForm.addEventListener('keyup', function () {
	let disabled = false;
	console.log(required_inputs);
	required_inputs.forEach(function (input, index) {
		if (input.value === '' || !input.value.replace(/\s/g, '').length) {
			disabled = true;
		}
	});
	if (disabled) {
		register.setAttribute('disabled', 'disabled');
		register.classList.add('disabled');
	} else {
		register.removeAttribute('disabled');
		register.classList.remove('disabled');
	}
});

//Edit Modal
let editmodal = document.getElementById('editModal');
let editbtn = document.getElementById('editBtn');
let editspan = document.getElementsByClassName('editclose')[0];
let editfooter = document.getElementsByClassName('editfclose')[0];
editbtn.onclick = function () {
	editmodal.style.display = 'block';
	let invoice = data.filter(d => d.checked===true)[0];
	document.getElementById('editAmount').value = invoice.invoice_amount;
	document.getElementById('editNotes').value = invoice.notes;
};
editspan.onclick = function () {
	editmodal.style.display = 'none';
};
editfooter.onclick = function () {
	editmodal.style.display = 'none';
};
let editclear = document.getElementsByClassName('modal__footerClear-edit')[0];
editclear.onclick = function () {
	document.getElementById('editForm').reset();
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

//search by invoice
let searchInvoice = document.getElementById('searchInvoice');
searchInvoice.addEventListener('keyup', function() {
	let filter = searchInvoice.value.toUpperCase();
	let table = document.getElementById("gridPanel__tableData");
	let tr = table.getElementsByTagName('tr');
	for(let i=0; i<tr.length; i++){
		let td = tr[i].getElementsByTagName("td")[3];
		if (td) {
			txtValue = td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
		}
	}
})
