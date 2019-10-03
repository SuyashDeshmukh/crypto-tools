var t1 = new Terminal();
t1.setHeight("80vh");
t1.setWidth("90%");
document.getElementById("terminal").appendChild(t1.html);

let n = 26;

document.getElementById("inputN").addEventListener("change", () => {
	n = document.getElementById("inputN").value;
	multInverse();
});

document.getElementById("clearButton").addEventListener("click", () => {
	t1.clear();
});

document.getElementById("helpButton").addEventListener("click", () => {
	t1.print("help");
});

function addCalculationToList(input, output, attributes = []) {
	let list = document.getElementById("test");
	let listItem = document.createElement("li");
	input = input.trim();
	let padString = "";
	console.log(input.length);
	console.log(20 - input.length)
	if (input.length > 20) {
		padString = "\n";
	} else {
		for (let i = 0; i < 20 - input.length; i++) {
			padString = padString.concat(" ");
		}
	}
	console.log(input + padString + "= " + output);

	listItem.innerHTML = input + padString + "= " + output;

	attributes.forEach(attribute => {
		listItem.attributes[attribute.name] = attribute.value;
	});

	list.prepend(listItem);
}

async function inputHandler(input) {
	if (input.length === 1 && input.charCodeAt(0) > 96 && input.charCodeAt(0) < 123) {
		let output = (input.charCodeAt(0) - 97) % n;
		t1.print(output);
		addCalculationToList(input, output);
		return;
	}

	if (input === "clear" || input === "cls") {
		t1.clear();
		return;
	}

	if (input === "help" || input === "h") {
		t1.print("help", "red"); //  todo
		return;
	}

	if (eval(input) == undefined) {
		return;
	}

	if (eval(input) < 0) {
		x = -1 * eval(input);
		let output = 26 - (x % n);
		t1.print(output);
		addCalculationToList(input, output);
		return;
	}
	let output = eval(input) % n;
	t1.print(output);
	addCalculationToList(input, output);
}

function inputLoop() {
	t1.input("", async input => {
		inputHandler(input);
		inputLoop();
	});
}

let inv26 = multInverse();

function multInverse() {
	let multiplicativeInversesModN = [];

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if ((i * j) % n == 1) {
				multiplicativeInversesModN.push({ i, j });
			}
		}
	}

	let tableBody = document.getElementById("inverseTableBody");

	var table = document.getElementById("inverseTableBody");
	//or use :  var table = document.all.tableid;
	for (var i = table.rows.length - 1; i > 0; i--) {
		table.deleteRow(i);
	}

	for (let key of multiplicativeInversesModN) {
		let row = tableBody.insertRow();
		let td = document.createElement("td");
		let td1 = document.createElement("td");
		let text = document.createTextNode(key.i);
		let data = document.createTextNode(key.j);

		td.appendChild(text);
		td1.appendChild(data);

		row.appendChild(td);
		row.appendChild(td1);
	}

	return multiplicativeInversesModN;
}

inputLoop();
