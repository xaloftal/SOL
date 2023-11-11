--
--	CREATE Crud
--

--Insercao de medicacao
create or replace procedure inserir_medicamento(nom varchar(60))
as $$
declare med int;
begin
	--ver se já existe o medicamento
	select count(*) into med
	from medicamento md
	where lower(md.nome_med) like lower(nom);
	
	if (med > 0)
	then
		raise notice 'Medicamento já existe';
		return;
	end if;
	
	--inserir medicamento na tabela
	insert into medicamento(nome_med) values (nom);
	
end; $$ Language PLPGSQL


--Insercao de exames
create or replace procedure inserir_exame(nom varchar(60))
as $$
declare exa int;
begin
	
	
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


