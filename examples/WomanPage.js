casper.test.begin('Deve criar um atendimento com nome e depois encontrar o registro na listagem',1, function suite(test){


	var womanName = gerarNome();

	casper.start(URL,function(){
		successfullLogin(this);
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
		logout(this);
		test.done();
	});




});