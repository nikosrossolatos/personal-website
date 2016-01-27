var Skull = require('skull');
var Surge = require('surgejs-client');

(function() {
	// page initialization
	var skullContainer = document.getElementById('skull');
 	window.avatar = new Skull(skullContainer);

  var surge = new Surge();

  surge.on('response',function(data){
  	avatar.say(data.response);
  });

	var inputEl = document.getElementById('input-1');
	var form = document.getElementById('typing-form');

	surge.subscribe(form.dataset.channel);
	//TODO: need to replace Jquery Ajax 
	form.addEventListener("submit", function(ev){
		ev.preventDefault();
		var reply = inputEl.value;
		inputEl.value = ''
		$.post('/message', {message: reply}, function(data, textStatus, xhr) {
			if(data.response){
				if(reply.indexOf('cv')>=0 || reply.indexOf('resume')>=0){
					setTimeout(function(){
						window.location = "http://www.nickrossolatos.me/cv/nickrossolatos.pdf";
					},100);
				}
				avatar.response(false,reply);
			}
			else{
				avatar.say('...');
			}
		});
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