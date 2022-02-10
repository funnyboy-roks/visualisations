/**
 * Implementation of a hashset, used for visualisation
 */
class HashSet {
	static loadThreshold = 0.95;

	constructor() {
		this.size = 0;
		this.buckets = new Array(13);
	}

	/**
	 * Adds an element to the hashset
	 * @param {Number} element
	 * @returns {Boolean}
	 */
	add(element) {
		let hash = HashSet.hash(element, this.buckets.length);
		if(this.size / this.buckets.length > 0.9) {
			this.inflate();
		}
		if (!this.buckets[hash]) {
			this.buckets[hash] = new HashNode(element);
			this.size++;
			return true;
		}
		let current = this.buckets[hash];
		while (current) {
			if (current.element === element) {
				return false;
			}
			current = current.next;
		}
		this.buckets[hash] = new HashNode(element, this.buckets[hash]);
		this.size++;
		return true;
	}

	/**
	 * Removes an element from the hashset
	 * @param {Number} element
	 */
	remove(element) {
		let index = HashSet.hash(element, this.buckets.length);
		if (!this.buckets[index]) {
			return false;
		}

		let prev = null;
		let current = this.buckets[index];
		while (current) {
			if (current.element === element) {
				if (prev) {
					prev.next = current.next;
				} else {
					this.buckets[index] = current.next;
				}
				this.size--;
				return true;
			}
			prev = current;
			current = current.next;
		}
		return false;
	}

	/**
	 * Checks if an element is in the hashset
	 * @param {Number} element
	 * @returns {boolean}
	 */
	contains(element) {
		let index = HashSet.hash(element, this.buckets.length);
		if (!this.buckets[index]) {
			return false;
		}
		let current = this.buckets[index];
		while (current) {
			if (current.element === element) {
				return true;
			}
			current = current.next;
		}
		return false;
	}

	inflate(newSize = Math.floor(this.buckets.length * 1.5)) {
		let newBuckets = new Array(newSize);
		for (let i = 0; i < this.buckets.length; i++) {
			let current = this.buckets[i];
			while (current) {
				let hash = HashSet.hash(current.element, newBuckets.length);
				if (!newBuckets[hash]) {
					newBuckets[hash] = new HashNode(current.element);
				} else {
					newBuckets[hash] = new HashNode(current.element, newBuckets[hash]);
				}
				current = current.next;
			}
		}
		this.buckets = newBuckets;
	}

	/**
	 * Returns the hash of an element
	 * @param {Number} element
	 * @param {Number} length
	 * @returns {number}
	 */
	static hash(element, length) {
		return Math.abs(Math.floor(element)) % length;
	}

	/**
	 * Returns a 1d array with the values (used for visualisation)
	 * @returns {Number[]}
	 */
	get flatten() {
		let result = [];
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				let current = this.buckets[i];
				while (current) {
					result.push(current.element);
					current = current.next;
				}
			}
		}
		return result;
	}

	get nodes() {
		let result = [];
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				let current = this.buckets[i];
				while (current) {
					result.push(current);
					current = current.next;
				}
			}
		}
		return result;
	}

	get max() {
		let max = -Infinity;
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i]) {
				let current = this.buckets[i];
				while (current) {
					if(max < current.element) {
						max = current.element;
					}
					current = current.next;
				}
			}
		}
		return max === -Infinity ? 50 : max;
	}

	get loadFactor() {
		return this.size / this.buckets.length;
	}
}

class HashNode {

	/**
	 *
	 * @param {Number} element
	 * @param {HashNode} next
	 */
	constructor(element, next = null) {
		this.element = element;
		this.next = next;
		this.color = Math.round(Math.random() * 255);
	}


}
