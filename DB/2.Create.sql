--
--	CREATE Crud
--

-- inserir um login
create or replace procedure inserir_login(_ema varchar(60), _pass varchar(60))
as $$
declare ema int;
begin
	--verificar se existe email
	select count(*) into ema
	from login l
	where lower(l.email) like lower(_ema);
	
	if (ema > 0)
	then
		raise notice 'Email já registado';
		return;
	end if;
	
	--inserir em login
	
	insert into login(email, password, estado_l) values (_ema , _pass, 'Existente');
end; $$ Language PLPGSQL


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
	
	insert into especialidade (nome_esp, estado_e) values (_nom, 'Existente');
	
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
	insert into forma_farmaceutica(id_forma_farmaceutica, descricao_forma, estado_ff) values (_cod, _nom, 'Existente');
	
end; $$ Language PLPGSQL

--teste 
call inserir_forma_farmaceutica(004, 'Solução oral');
select * from forma_farmaceutica


--Insercao de medicacao
create or replace procedure inserir_medicamento(_nom varchar(60), _form varchar(60))
as $$
declare med int;
		form int;
begin

	-- ver se existe forma farmaceutica e encontrar id
	select ff.id_forma_farmaceutica into form
	from forma_farmaceutica ff
	where upper(ff.descricao_forma) like upper(_form);
	
	if (form is null)
	then 
		raise notice 'Forma farmaceutica nao existente';
		return;
	end if;
	
	--ver se já existe o medicamento com a mesma forma farmaceutica
	select count(*) into med
	from medicamento md inner join forma_farmaceutica ff using (id_forma_farmaceutica)
	where lower(md.nome_med) like lower(_nom) and ff.id_forma_farmaceutica = form;
	
	if (med > 0)
	then
		raise notice 'Medicamento ja existe com a forma farmaceutica inserida';
		return;
	end if;	
	
	
	--inserir medicamento na tabela
	insert into medicamento(nome_med, id_forma_farmaceutica, estado_m ) values (_nom, form, 'Existente');
	
end; $$ Language PLPGSQL

--teste
call inserir_medicamento('Rantudil', 'Cápsula');
call inserir_medicamento('Ziagen', 'Comprimido revestido por película');
call inserir_medicamento('Ziagen', 'Solução oral')
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
	insert into exame(nome_exame, estado_e) values (_nom, 'Existente');
	
end; $$ Language PLPGSQL

--teste
call inserir_exame ('Ecocardiograma')
select * from exame



--Sign up de medico
create or replace procedure signup_medico (_nom varchar(60), _email varchar(60), _pass varchar(60), _esp varchar(60))
as $$
declare esp int;
begin
	--ir buscar o id da especialidade
	select id_especialidade into esp
	from especialidade e
	where upper(e.nome_esp) like upper(_esp);
	
	if (esp is null)
	then 
		raise notice 'Especialidade nao conhecida';
		return;		
	end if;
	
	--verificar email e inserir login
	call inserir_login(_email, _pass);
	
	--inserir na tabela medico
	
	insert into medico (nome_m, email_m, id_especialidade) values (_nom, _email, esp);	
	
end; $$ Language PLPGSQL

--teste
call signup_medico('José Marques', 'josemarques@med.sol.com', '123asd', 'Cardiologia' );
select * from medico




--Sign up de utente
create or replace procedure signup_utente(_nom varchar(60), _ema varchar(60), _pass varchar(60), _nif int, _tele int, _dat date)
as $$
begin

	--verificar email e inserir na tabela
	call inserir_login(_ema, _pass);
	
	--inserir na tabela utente
	
	insert into utente(nome_u, email_u, nif_u, tele_u, dat_nasc) values (_nom, _ema, _nif, _tele, _dat);
	
end; $$ Language PLPGSQL

--teste
call signup_utente('Antónia Miranda', 'antoniamiranda@gmail.com', '456fgh', '271970888', '914850911', '1970-12-05' );
select * from utente u
inner join login l on l.email = u.email_u




--sign up de administrador
create or replace procedure signup_adm(_nom varchar(60), _ema varchar(60), _pass varchar(60))
as $$
begin
	
	--ver email e inserir em login
	call inserir_login(_ema, _pass);
	
	--inserir da tabela administrativo
	insert into administrativo (nome_a, email_a) values (_nom, _ema);	
	
end; $$ Language PLPGSQL

--teste
call signup_adm('Pedro Dinis', 'pedrodinis@adm.sol.com', '789jkl');
select * from administrativo a inner join login l on l.email = a.email_a



--inserir reclamação
create or replace procedure criar_reclamacao(_utente int, _desc varchar(500), _dat timestamp)
as $$
begin
	--inserir na tabela
	insert into reclamacao (id_utente, descricao_rec, data_recl, estado_r) values (_utente, _desc, _dat, 'Submetido');
end; $$ Language PLPGSQL

--teste
call criar_reclamacao(1, 'Resposta muito demorada.', '2023-11-14 10:44:00'::timestamp)
select * from reclamacao inner join utente using (id_utente)


--inserir formulario
create or replace procedure criar_formulario(_desc varchar(500), _dat timestamp)
as $$
begin
	--inserir da tabela
	insert into formulario(descricao_form, data_form, estado_f) values (_desc, _dat, 'Submetido');
end; $$ Language PLPGSQL



create or replace procedure inserir_prescricao()
as $$
begin
	
end; Language PLPGSQL
