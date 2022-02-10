const set = new HashSet();
const valuesElt = document.querySelector('#values');
const actionElt = document.querySelector('#action');
const inputElt = document.querySelector('#value');

const autoAddRemove = () => {
	let action = '';
	if (document.querySelector('#auto-add').checked) {
		const value = floor(random(rangeMin.valueAsNumber, rangeMax.valueAsNumber));
		const output = set.add(value);
		action += `Adding ${ value } - ${ output }`;
	}
	if (document.querySelector('#auto-remove').checked) {
		const value = floor(random(rangeMin.valueAsNumber, rangeMax.valueAsNumber));
		const output = set.remove(value);
		action += `\nRemoving ${ value } - ${ output }`;
	}
	actionElt.textContent = action.trim();
};

const addListeners = () => {
	document.querySelector('#add').addEventListener('click', () => {
		const value = inputElt.valueAsNumber;
		const output = set.add(value);
		actionElt.innerHTML = `Adding ${ value } - ${ output }`;
	});
	document.querySelector('#remove').addEventListener('click', () => {
		const value = inputElt.valueAsNumber;
		const output = set.remove(value);
		actionElt.innerHTML = `Removing ${ value } - ${ output }`;
	});
};

function setup() {
	createCanvas(windowWidth * .75, windowHeight * .75);

	setInterval(autoAddRemove, 250);
	addListeners();

	noStroke();
	ellipseMode(CENTER);
	textAlign(CENTER, CENTER);
}

let rainbowOffset = 0;

function draw() {
	background(0);

	let cols = set.buckets.length;
	stroke(255);
	strokeWeight(1);
	let colW = width / cols;
	stroke(150);
	line(0, colW / 2, width, colW / 2);
	for (let i = 0; i < cols; i++) {
		push();
		fill(255);
		textSize(colW / 3);
		text(i, i * colW + colW / 2, colW / 3);
		pop();
		line(i * colW, 0, i * colW, height);
		push();
		translate(0, colW);

		let node = set.buckets[i];
		let y = 0;
		while (node) {
			let item = node.element;
			let x = i * colW + colW / 2;

			push();
			colorMode(HSB);
			// fill(map(item, 0, set.max, 0, 255), 255, 255, 100);
			let hue = node.color;
			if (hue > 255) {
				hue = 255 - hue % 255;
			}
			fill(hue, 255, 255, 100);
			ellipse(x, y * colW * .85, colW * .7, colW * .7);
			pop();

			noStroke();
			fill(0);
			textSize(colW / 3);
			text(item, x, y * colW * .85);
			++y;
			node = node.next;
		}
		pop();
	}
	valuesElt.innerHTML = set.nodes.map(n => `<span style="color: hsl(${ n.color }, 100%, 50%);">${ n.element }</span>`).join(', ');
	info.textContent = `Array Length: ${ set.buckets.length } - Load Factor: ${ round(set.loadFactor * 100) }% (threshold: ${ round(HashSet.loadThreshold * 100) }%) - Size: ${ set.size }`;
	rainbowOffset += 1;
}

const addMany = (count = 10) => {
	let added = 0;
	for (let i = 0; i < count; i++) {
		added += set.add(floor(random(0, 50)));
	}
	return added;
};

const removeMany = (count = 10) => {
	let removed = 0;
	for (let i = 0; i < count; i++) {
		removed += set.remove(floor(random(0, 50)));
	}
	return removed;
};


