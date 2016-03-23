casper.test.begin('Deve redirecionar para pagina de listagem de mulher ao logar',2, function suite(test){

	casper.start(URL,function(){
		successfullLogin(this);
	});

	casper.then(function(){
		test.assertExists('#dropdown-user', 'Há o elemento com nome do usuário');
		test.assertTextExists('Listar Mulheres', 'Ao logar deve redirecionar para a tela de listagem de mulheres');
	});

	casper.run(function(){
		logout(this);
		test.done();
	});

});