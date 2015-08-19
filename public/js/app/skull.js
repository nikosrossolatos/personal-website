/*
*	Skull module v.0.1
*	Feel free to use it anywhere you like
*/
var Element = require('element');
var responsesArray = ['Why dont you contact him?','I\'ll let him know','My master is busy right now'];
var badWords = ['fuck','asshole','retard','screw','crap'];
var shamingResponses = ['You should be ashamed!','Oh really?','Wanna think about saying that again?','Be careful little lad with yar grammar'];
var previousResponse;
var visitorName;

module.exports = function Avatar(el){
	var avatar = new Skull(el);
	return avatar;
}

function Skull(el){
	this.responsesArray = responsesArray;
	this.parent = el;
	this.messageIterator = 0;
	this._generateAvatar();
	this.render();
}
Skull.prototype._generateAvatar = function(){
	this.headContainer = Element({
		tag:'div',
		class:'skull-head'
	});

	this.head = Element({
		tag:'img',
		class:'skull-upperhead',
		src:'/img/skull.svg'
	});

	this.headFallback = Element({
		tag:'img',
		src:'/img/skull-head.png',
		alt:'skull head'
	});

	this.mouth = Element({
		tag:'img',
		class:'skull-mouth',
		id:'skull-mouth',
		src:'/img/skull-mouth.svg'
	});
	this.mouthFallback = Element({
		tag:'img',
		src:'/img/skull-mouth.png',
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

	var that = this;
	$.get('/personas', function(data) {
		/*optional stuff to do after success */
		visitorName = data.name;
		if(!visitorName){
			that.response('Hello stranger !');
		}
		else{
			that.response('Hello '+visitorName+' !');
		}
	});
	
}
Skull.prototype.destroy = function(){
	removeChildren(this.parent);
}

Skull.prototype.say = function(text){
	var delay = 1400;
	this.speak(delay);
	this.message.textContent = '';
	//TODO: needs fix Just in case the function hasn't stopped before next response
	this.messageIterator = 0;
	this.typingEffect(text);
	previousResponse = text;
}
Skull.prototype.response = function (text,reply) {
	var response = text || getAnswer(reply);
	var that = this;
	$.post('/message', {message: response}, function(data, textStatus, xhr) {
		var x = that.say(response);
		return response;
	});
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
	el.textContent+=text[this.messageIterator];
	var that = this;
	this.messageIterator++;
	if(el.textContent.length < text.length){
		setTimeout(function(){
			that.typingEffect(text);
		},30)
	}
	else{
		this.messageIterator = 0;
	}
}
function getRandomAnswer(array){
	return array[Math.floor(Math.random() * array.length)];
}
function getAnswer(reply){
	reply = reply.toLowerCase();
	if (badWords.some(function(v) { return reply.indexOf(v) >= 0; })) {
	    // There's at least one
	    return getRandomAnswer(shamingResponses);
	}
	else if(reply.indexOf('hi')>=0 || reply.indexOf('hello')>=0){
		if(visitorName){
			return 'What would you like of my master today '+visitorName+'?'
		}
		return 'What is your name lad?'
	}
	else if(previousResponse=='What is your name lad?'){
		if(reply.split(' ').length===1){
			visitorName = reply.capitalizeFirstLetter();
		}
		else{
			var pos = reply.indexOf('my name is ')
			visitorName = pos>-1? reply.substring(pos+10,reply.length): ''
			visitorName = visitorName.capitalizeFirstLetter();
		}
		$.ajax({
			url: '/personas/',
			type: 'PUT',
			data: {name: visitorName},
		});		
		return 'Hi there '+visitorName+'. What would you like of my master?'
		//TODO: Swap out Jquery for some lightweight AJAX lib
	}
	else if(previousResponse=='Oh no no. Facebook is private. Unless you are a girl ;) ' && reply.indexOf('im a girl')>-1){
		return 'Okay i\'ll tell you. But keep it a secret okay?'
	}
	else if(previousResponse=='Okay i\'ll tell you. But keep it a secret okay?' && (reply=='okay'>-1 || reply == 'ok' )){
		return 'Its Nikos Rossolatos. Shhhhhh~'
	}
	return getRandomAnswer(responsesArray);
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
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}