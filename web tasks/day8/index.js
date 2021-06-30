const data = [
	{
		id: 1,
		name: 'Bruce Wayne',
		subject1: 80,
		subject2: 45,
		subject3: 90,
	},
	{
		id: 2,
		name: 'Diana',
		subject1: 56,
		subject2: 74,
		subject3: 78,
	},
	{
		id: 3,
		name: 'Clark Kent',
		subject1: 67,
		subject2: 78,
		subject3: 90,
	},
	{
		id: 4,
		name: 'Barry Allen',
		subject1: 89,
		subject2: 35,
		subject3: 64,
	},
	{
		id: 5,
		name: 'Arthur Curry',
		subject1: 76,
		subject2: 65,
		subject3: 100,
	},
	{
		id: 6,
		name: 'Victor Stone',
		subject1: 99,
		subject2: 87,
		subject3: 64,
	},
];

function getMaxMarks(students) {
	students.map((student) => {
		const { subject1: sub1, subject2: sub2, subject3: sub3 } = student;
		let max_marks = Math.max(sub1, sub2, sub3);
		student.max_marks = max_marks;
	});
}

function buildTable(students) {
	let table = document.getElementById('table__data');
	getMaxMarks(students);
	students.map((student) => {
		let row = ` <tr>
							  	<td>${student.id}</td>
									<td>${student.name}</td>
									<td>${student.subject1}</td>
									<td>${student.subject2}</td>
									<td>${student.subject3}</td>
									<td>${student.max_marks}
							  <tr>`;
		table.innerHTML += row;
	});
}

buildTable(data);
