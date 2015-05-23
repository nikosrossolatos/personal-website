/*
*	Skull module v.0.1
*	Feel free to use it anywhere you like
*/
var Element = require('element');
var responsesArray = ['You should be ashamed !','Oh really?','Let me take a screenshot of that','Why dont you contact him?'];

module.exports = function Avatar(el){
	var avatar = new Skull(el);
	return avatar;
}

function Skull(el){
	this.responsesArray = responsesArray;
	this.parent = el;
	this.test = 0;
	this._generateAvatar();
	this.render();
}
Skull.prototype._generateAvatar = function(){
	this.headContainer = Element({
		tag:'div',
		class:'skull-head'
	});

	this.head = Element({
		tag:'object',
		type:'image/svg+xml',
		class:'skull-upperhead',
		data:'/images/skull.svg'
	});

	this.headFallback = Element({
		tag:'img',
		src:'/images/skull-head.png',
		alt:'skull head'
	});

	this.mouth = Element({
		tag:'object',
		type:'image/svg+xml',
		class:'skull-mouth',
		id:'skull-mouth',
		data:'/images/skull-mouth.svg'
	});
	this.mouthFallback = Element({
		tag:'img',
		src:'/images/skull-mouth.png',
		alt:'skull head'
	});
	this.messageContainer = Element({
		tag:'div',
		class:'skull-message'
	});
	this.message = Element({
		tag:'h1',
		id:'skull-message',
		text:''
	});
	this.blinker = Element({
		tag:'span',
		class:'blinker'
	});
}

Skull.prototype.render = function(){
	this.head.appendChild(this.headFallback);
	this.headContainer.appendChild(this.head);
	this.mouth.appendChild(this.mouthFallback);
	this.headContainer.appendChild(this.mouth);
	this.parent.appendChild(this.headContainer);
	this.message.appendChild(this.blinker);
	this.messageContainer.appendChild(this.message);
	this.parent.appendChild(this.messageContainer);
	this.speak(1600);
	this.response('Hello stranger !');
}
Skull.prototype.destroy = function(){
	removeChildren(this.parent);
}

Skull.prototype.response = function (text) {
	var response = text || getRandomAnswer(this.responsesArray);
	var delay = 1400;
	this.speak(delay);
	this.message.textContent = '';
	this.typingEffect(response);
}
Skull.prototype.speak = function(delay){
	var that = this;
	this.mouth.className = 'skull-mouth speak';
	setTimeout(function(){
		that.mouth.className = 'skull-mouth'
	}, delay)
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
Skull.prototype.typingEffect = function(text){
	var el = this.message;
	el.textContent+=text[this.test];
	var that = this;
	this.test++;
	if(el.textContent.length < text.length){
		setTimeout(function(){
			that.typingEffect(text);
		},30)
	}
	else{
		this.test = 0;
	}
}

function getRandomAnswer(array){
	return array[Math.floor(Math.random() * array.length)];
}
function removeChildren(node){
	while (node.firstChild) {
    	node.removeChild(node.firstChild);
	}
}
function removeElement(node) {
    if(node.parentNode){
		node.parentNode.removeChild(node);
	}
}