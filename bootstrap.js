var URL ='htpp://www;url.com';

casper.options.pageSettings.loadImages = false;
casper.options.clientScripts.push('js/jquery-2.1.4.min.js');

casper.on('step.error', function(failure) {
  this.capture('fail.png');
});


function successfullLogin(casp){
	login(casp, 'xxxzzzz', 'qweqweqw');
}

function login(casp, user, password){
	casp.fill('form',{
		'email' : user,
		'password' : password
		}, true
	);
}

function logout(casp){
	casp.click("#logout a");
}

function random(minv, maxv){
	if (maxv < minv){
         return 0;
       }
	return Math.floor(Math.random()*(maxv-minv+1)) + minv;
}

function gerarNome(){
	var name = '';
 	var minlength = 10;
    	var maxlength = 10;
	var vocals = 'aeiouyh' + 'aeiou' + 'aeiou';
	var cons = "bcdfghjklmnpqrstvwxz" + "bcdfgjklmnprstvw" + 'bcdfgjklmnprst';

	var allchars = vocals + cons;
	var length = random(4, maxlength);
	if (length < 1) length = 1;
	var consnum = 1

	for (var i = 0; i < length; i++){
          if (consnum == 2){
            touse = vocals;
            consnum = 0;
          }else{
            touse = allchars;
          }
          c = touse.charAt(random(0, touse.length - 1));
          name = name + c;
          if (cons.indexOf(c) != -1){
            consnum++
          };
	}

	return name;
}

