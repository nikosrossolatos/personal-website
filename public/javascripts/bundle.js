(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (args) {
	var ret = document.createElement(args.tag);
	delete args.tag;
	ret.textContent = args.text || "";
	delete args.text;
	if (args.data_attr) {
		for (var key in args.data_attr) {
			ret.setAttribute('data-'+key, args.data_attr[key]);
		}
	}
	delete args.data_attr;
	for (var key in args) {
		ret.setAttribute(key, args[key]);
	}
	return ret;
}
},{}],2:[function(require,module,exports){
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
},{"element":1}],3:[function(require,module,exports){
var Skull = require('skull');
(function() {
   // page initialization
  	var skullContainer = document.getElementById('skull');
   	var avatar = new Skull(skullContainer);
   	
	var inputEl = document.getElementById('input-1');
	var form = document.getElementById('typing-form');
	var contactButton = document.getElementById('contact');
	contactButton.addEventListener('click',function(){
		avatar.response('My master\'s email is nikos@panelsensor.com !');
	});
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		inputEl.value = ''
		avatar.response()
	}, false);
	inputEl.addEventListener( 'focus', onInputFocus );
	inputEl.addEventListener( 'blur', onInputBlur );
	function onInputFocus( ev ) {
		inputEl.parentNode.className =  'input input--filled';
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			inputEl.parentNode.className = 'input'
		}
	}
})();
},{"skull":2}]},{},[3]);
