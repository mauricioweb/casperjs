

casper.test.begin('Deve informar login invalido ao informar credenciais errada',2, function suite(test){

	casper.start(URL,function(){
		login(this, 'mauricioteste@gmail.com', '123');
	});

	casper.then(function(){
		test.assertExists('div.alert-danger', 'Há um elemento de erro');
		test.assertTextExists('Login ou senha inválidos.', 'O texto de login/senha inválido é: Login ou senha inválidos.');
	});

	casper.run(function(){
		test.done();
	});

});


casper.test.begin('Usuário/Senha devem ser obrigatórios para logar',3, function suite(test){

	casper.start(URL,function(){

		this.fill('form',{
					}, true
				);

	});

	casper.then(function(){
		test.assertExists('div.alert-danger', 'Há um elemento de erro');
		test.assertTextExists('O campo email é necessário.', 'O texto de senha obrigatório é: O campo email é necessário.');
		test.assertTextExists('O campo senha é necessário.', 'O texto de senha obrigatório é: O senha email é necessário.');
	});

	casper.run(function(){
		test.done();
	});

});

