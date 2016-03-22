casper.options.pageSettings.loadImages = false;
casper.options.clientScripts.push('js/jquery-2.1.4.min.js');

casper.on('step.error', function(failure) {
  this.capture('fail.png');
});

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


casper.test.begin('Deve criar um atendimento com nome e depois encontrar o registro na listagem',1, function suite(test){


	var womanName = gerarNome();

	casper.start('http://crmlaravel-dsv.pmcanoas.rs.gov.br',function(){

		this.fill('form',{
					'email' : 'mauricio.sganderla@canoastec.rs.gov.br',
					'password' : 'Canoas@123'
					}, true
				);
	});

	casper.then(function(){
		this.click('#new_register');
	});

	casper.then(function(){

		this.click('#woman_hasnt_cpf');
		this.fill('#div-register form',{
					'woman[name]' : womanName
					},true
				)
	});


	casper.then(function(){
		this.click('#woman_menu');
	});


	casper.then(function(){
		this.fill('#form_woman_search',{
				'name' : womanName
				}, true
			);
	});



	casper.then(function(){

		test.assertEval(function(womanName) {
            			return $(".table-list-women table tbody tr td:contains('"+womanName+"')").length >= 1;
        	}, "Encontrado o registro "+womanName+"", {womanName : womanName});

	});


	casper.run(function(){
		this.click("#logout a");
		test.done();
	});




});