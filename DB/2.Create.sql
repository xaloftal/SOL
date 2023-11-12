--
--	CREATE Crud
--


--Inserir especialidades
create or replace procedure inserir_especialidade(_nom varchar(60))
as $$
declare c_esp int;
begin
	-- ver se já existe na tabela
	select count(*) into c_esp
	from especialidade e
	where upper(e.nome_esp) like upper(_nom);
	
	if (c_esp > 0)
	then
		raise notice 'Especialidade já inserida';
		return;
	end if;
	
	--inserir na tabela
	
	insert into especialidade (nome_esp) values (_nom);
	
end; $$ Language PLPGSQL

--teste

call inserir_especialidade('Cardiologia');
select * from especialidade


--Insercao de formas farmaceuticas
create or replace procedure inserir_forma_farmaceutica(_cod int, _nom varchar(60))
as $$
declare c_cod int;
		c_nom int;
begin
	-- ver se já existe forma farmaceutica com o codigo
	select count(*) into c_cod
	from forma_farmaceutica ff
	where ff.id_forma_farmaceutica = _cod;
	
	if (c_cod > 0)
	then
		raise notice 'Codigo de forma farmaceutica ja utilizado';
		return;
	end if;
	
	-- ver se já existe forma pelo nome
	select count(*) into c_nom
	from forma_farmaceutica ff
	where upper(ff.descricao_forma) like upper(_nom);
	
	if (c_nom > 0)
	then
		raise notice 'Forma farmaceutica ja existe';
		return;
	end if;
	
	--inserir forma na tabela
	insert into forma_farmaceutica(id_forma_farmaceutica, descricao_forma) values (_cod, _nom);
	
end; $$ Language PLPGSQL

--teste 
call inserir_forma_farmaceutica(029, 'Cápsula');
select * from forma_farmaceutica


--Insercao de medicacao
create or replace procedure inserir_medicamento(_nom varchar(60), _form varchar(60))
as $$
declare med int;
		form int;
begin
	--ver se já existe o medicamento
	select count(*) into med
	from medicamento md
	where lower(md.nome_med) like lower(_nom);
	
	if (med > 0)
	then
		raise notice 'Medicamento nao existe';
		return;
	end if;
	
	
	-- ver se existe forma farmaceutica e encontrar id
	select ff.id_forma_farmaceutica into form
	from forma_farmaceutica ff
	where upper(ff.descricao_forma) like upper(_form);
	
	if (form is null)
	then 
		raise notice 'Forma farmaceutica nao existente';
		return;
	end if;
	
	--inserir medicamento na tabela
	insert into medicamento(nome_med, id_forma_farmaceutica ) values (_nom, form);
	
end; $$ Language PLPGSQL

--teste
call inserir_medicamento('Rantudil', 'Cápsula');
select * from medicamento 
inner join forma_farmaceutica using (id_forma_farmaceutica)



--Insercao de exames
create or replace procedure inserir_exame(_nom varchar(60))
as $$
declare exa int;
begin
	-- verificar se exame já existe
	select count(*) into exa
	from exame e
	where upper(e.nome_exame) like upper(_nom);
	
	if (exa > 0)
	then 
		raise notice 'Exame já existe';
		return;
	end if;
	
	--inserir exame na tabela
	insert into exame(nome_exame) values (_nom);
	
end; $$ Language PLPGSQL

--teste
call inserir_exame ('Ecocardiograma')
select * from exame


--Sign up de medico
create or replace procedure signup_medico (_nom varchar(60), _email varchar(60), _pass varchar(60), _esp varchar(60))
as $$
declare c_ema int;
		esp int;
begin
	--verificar se não tem um email igual na tabela login
	select count(*) into c_ema
	from login l
	where lower(l.email) like lower(_email);
	
	if (c_ema > 0)
	then
		raise notice 'Email já utilizado';
		return;
	end if;
	
	
	--ir buscar o id da especialidade
	select id_especialidade into esp
	from especialidade e
	where upper(e.nome_esp) like upper(_esp);
	
	if (esp is null)
	then 
		raise notice 'Especialidade nao conhecida';
		return;		
	end if;
	
	
	--inserir o login na tabela dos logins primeiro
	
	insert into login (email, password) values (_email, _pass);	
	
	--inserir na tabela medico
	
	insert into medico (nome_m, email_m, id_especialidade) values (_nom, _email, esp);	
	
end; $$ Language PLPGSQL

--teste
call signup_medico('José Marques', 'josemarques@med.sol.com', '123asd', 'Cardiologia' );
select * from medico

--Sign up de utente
create or replace procedure signup_utente(_nom varchar(60), _ema varchar(60), _pass varchar(60), _nif int, _tele int, _dat date)
as $$
declare c_ema int;
begin
	--verficar email na tabela login
	select count(*) into c_ema
	from login l
	where lower(l.email) like lower(_ema);
	
	if (c_ema > 0)
	then
		raise notice 'Email já registado';
		return;
	end if;
	
	--inserir na tabela login
	
	insert into login(email, password) values (_ema , _pass);
	
	--inserir na tabela utente
	
	insert into utente(nome_u, email_u, nif_u, tele_u, dat_nasc) values (_nom, _ema, _nif, _tele, _dat);
	
end; $$ Language PLPGSQL

--teste
call signup_utente('Antónia Miranda', 'antoniamiranda@gmail.com', '456fgh', '271970888', '914850911', '1970-12-05' );
select * from utente


--sign up de administrador
create or replace procedure signup_adm
as $$
begin
	--verificar se existe email
	
	--inserir em login
	
	--inserir da tabela administrativo
	
	
end; $$ Language PLPGSQL

