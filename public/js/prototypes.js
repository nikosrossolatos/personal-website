Array.prototype.findIndexBy = function (property, value) {
	for (var i = 0, len = this.length; i < len; i++) {
		if (this[i][property] === value) {
			return i;
		}
	}
	return false;
}

Array.prototype.findPersonaBy = function(property,value){
	console.log('run find');
	console.log('length is '+this.length);
	for (var i = 0, len = this.length; i < len; i++) {
		console.log(this[i])
		if (this[i].persona_id._id === value) {
			return i;
		}
	}
	return false;
}