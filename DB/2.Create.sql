--
--	CREATE Crud
--

--Insercao de formas farmaceuticas



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
	insert into medicamento(nome_med, id_forma_farmaceutica ) values (_nom, _form);
	
end; $$ Language PLPGSQL

--teste
call inserir_medicamento()


--Insercao de exames
create or replace procedure inserir_exame(_nom varchar(60))
as $$
declare exa int;
begin
	-- verificar se exame já existe
	select count(*) into exa
	from exame e
	where upper(e.)
	
	--inserir exame na tabela
	insert into exame(nome_)
	
end; $$ Language PLPGSQL


--Sign up de medico
create or replace procedure signup_medico (nom varchar(60), mail varchar(60), pass varchar(60), esp varchar(60))
as $$
begin
	--verificar se não tem um email igual na tabela login
	
	--inserir o login na tabela dos logins primeiro
	
	--ir buscar o id da especialidade
	
	--inserir na tabela medico
	
end; $$ Language PLPGSQL


