--
--	CREATE Crud
--

-- inserir um login
create or replace procedure inserir_login(_ema varchar(60), _pass varchar(60))
as $$
declare _log estado;
begin
	--verificar se existe email
	select estado_l into _log
	from utilizador l
	where lower(l.email) like lower(_ema);
	
	if (_log = 'Existente')
	then
		raise notice 'Email já registado';
		return;
		
	elsif (_log = 'Inativo')
	then
		raise notice 'Conta inativa';
		return;
		
	elsif (_log is null)
	then 
		--inserir em login
		insert into utilizador(email, password, estado_l) values (_ema , _pass, 'Existente');		
	end if;

end; $$ Language PLPGSQL



--Inserir especialidades
create or replace procedure inserir_especialidade(_nom varchar(60))
as $$
declare c_esp estado;
begin
	-- ver se já existe na tabela
	select estado_e into c_esp
	from especialidade e
	where upper(e.nome_esp) like upper(_nom);
	
	if (c_esp = 'Existente')
	then
		raise notice 'Especialidade já inserida';
		return;
	elsif (c_esp = 'Inativo')
	then
		raise notice 'Especialidade inativa, a ser ativada';
		update especialidade set estado_e = 'Existente' where upper(nome_esp) like upper(_nom);
	elsif (c_esp is null)
	then
		--inserir na tabela
		insert into especialidade (nome_esp, estado_e) values (_nom, 'Existente');
	end if;
	
end; $$ Language PLPGSQL



--Insercao de formas farmaceuticas
create or replace procedure inserir_forma_farmaceutica(_cod int, _nom varchar(60))
as $$
declare c_cod int;
		ecod estado;
		c_des varchar(60);
		c_nom int;
begin
	-- ver se já existe forma farmaceutica com o codigo
	select count(*) , estado_ff, descricao_forma into c_cod, ecod, c_des
	from forma_farmaceutica ff
	where ff.id_forma_farmaceutica = _cod;
	
	if (c_cod > 0)
	then
		raise notice 'Codigo de forma farmaceutica ja utilizado';
		return;
	end if;
	
	-- ver se já existe forma pelo nome
	select count(*), estado_ff into c_nom, ecod
	from forma_farmaceutica ff
	where upper(ff.descricao_forma) like upper(_nom);
	
	if (c_nom > 0 and ecod = 'Existente')
	then
		raise notice 'Forma farmaceutica ja existe';
		return;
		
	--se já existe mas não esta ativo
	elsif (c_nom > 0 and ecod = 'Inativo'and c_cod > 0)
	then
		raise notice 'Forma farmaceutica inativa, a ativar..';
		update forma_farmaceutica set estado_ff = 'Existente' where id_forma_farmaceutica = _cod and descricao_forma = _nom;
	
	elsif (c_nom = 0 and c_cod = 0)
	then 
		insert into forma_farmaceutica(id_forma_farmaceutica, descricao_forma, estado_ff) values (_cod, _nom, 'Existente');
	end if;	
	
end; $$ Language PLPGSQL



--Insercao de medicacao
create or replace procedure inserir_medicamento(_nom varchar(60), _form varchar(60))
as $$
declare med int;
		form int;
begin

	-- ver se existe forma farmaceutica e encontrar id
	select ff.id_forma_farmaceutica into form
	from forma_farmaceutica ff
	where upper(ff.descricao_forma) like upper(_form) and ff.estado_ff = 'Existente';
	
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



--Insercao de exames
create or replace procedure inserir_exame(_nom varchar(60))
as $$
declare exa estado;
begin
	-- verificar se exame já existe
	select estado_e into exa 
	from exame e
	where upper(e.nome_exame) like upper(_nom);
	
	if (exa = 'Existente')
	then 
		raise notice 'Exame já existe';
		return;
		
	--se for inativo, volta-se a ativar
	elsif (exa = 'Inativo')
	then 
		update exame set estado_e = 'Existente' where upper(e.nome_exame) like upper(_nom);
		raise notice 'Alterou-se o estado';
		
	--inserir exame na tabela
	elsif (exa is null)
	then 
		insert into exame(nome_exame, estado_e) values (_nom, 'Existente');
	end if;
		
end; $$ Language PLPGSQL




--Sign up de medico
create or replace procedure signup_medico (_nom varchar(60), _email varchar(60), _pass varchar(60), _esp varchar(60))
as $$
declare esp int;
begin
	--ir buscar o id da especialidade
	select id_especialidade into esp
	from especialidade e
	where upper(e.nome_esp) like upper(_esp) and e.estado_e = 'Existente';
	
	if (esp is null)
	then 
		raise notice 'Especialidade nao conhecida ou inativa';
		return;		
	end if;
	
	--verificar email e inserir login
	call inserir_login(_email, _pass);
	
	--inserir na tabela medico
	
	insert into medico (nome_m, email_m, id_especialidade) values (_nom, _email, esp);	
	
end; $$ Language PLPGSQL





--Sign up de utente
create or replace procedure signup_utente(_nom varchar(60), _ema varchar(60), _pass varchar(60), _nif int, _tele int, _dat date)
as $$
begin

	--verificar email e inserir na tabela
	call inserir_login(_ema, _pass);
	
	--inserir na tabela utente
	
	insert into utente(nome_u, email_u, nif_u, tele_u, dat_nasc) values (_nom, _ema, _nif, _tele, _dat);
	
end; $$ Language PLPGSQL




--sign up de administrador
create or replace procedure signup_adm(_nom varchar(60), _ema varchar(60), _pass varchar(60))
as $$
begin
	
	--ver email e inserir em login
	call inserir_login(_ema, _pass);
	
	--inserir da tabela administrativo
	insert into administrativo (nome_a, email_a) values (_nom, _ema);	
	
end; $$ Language PLPGSQL




--inserir reclamação
create or replace procedure criar_reclamacao(_utente int, _desc varchar(500), _dat timestamp)
as $$
declare rec int;
begin
	select count(*) into rec
	from reclamacao r
	where r.id_utente = _utente 
		and upper(r.descricao_rec) like upper(_desc) 
		and r.data_recl <= current_date - interval '1 month';
	
	if (rec is null)
	then
		--inserir na tabela
		insert into reclamacao (id_utente, descricao_rec, data_recl, estado_r) values (_utente, _desc, _dat, 'Submetido');
	elsif (rec > 0)
	then 
		raise notice 'reclamacao já feita no ultimo mes';
	end if;
end; $$ Language PLPGSQL







--inserir formulario
create or replace procedure criar_formulario(_utente int, _desc varchar(500), _dat timestamp, _esp varchar(60), out id_form int)
as $$
declare esp int;
begin
	--encontrar especialidade
	select id_especialidade into esp
	from especialidade e
	where lower(_esp) like lower(e.nome_esp)
		  and e.estado_e = 'Existente';
		  
	if (esp is null)
	then
		raise notice 'Especialidade nao valida';
	end if;
	
	--inserir na tabela
	insert into formulario(id_utente, descricao_form, data_form, estado_f, id_especialidade) 
	values (_utente, _desc, _dat, 'Submetido', esp )
	returning id_formulario into id_form;
	
end; $$ Language PLPGSQL




--criar a prescricao 
create or replace procedure inserir_prescricao(_form int, _cons int, _val timestamp, out id_pres int)
as $$
begin
	--criar a prescricao
	insert into prescricao (validade, estado_p) values (_val, 'Existente') returning id_prescricao into id_pres;
	
	--criar a relacao 
	--se for de formulario
	if (_form is not null)
	then
		insert into formulario_prescricao (id_prescricao, id_formulario) values (id_pres, _form);
		
	-- se for de consulta
	elsif (_cons is not null)
	then
		insert into consulta_prescricao(id_prescricao, id_consulta) values (id_pres, _cons);
		
	--se não for associado com nada
	else
		raise notice 'Não associado com formulario ou consulta';
	end if;
	
end; $$ Language PLPGSQL



--
-- procedimentos de ligacao
--



--inserir medicamentos na prescricao
create or replace procedure inserir_medicamento_prescricao(_descricao varchar(500), _med int, _pres int)
as $$
begin
	insert into prescricao_medicamento(id_medicamento, id_prescricao, descricao_pres_med) values (_med, _pres, _descricao);
end; $$ Language PLPGSQL




--inserir exames na prescricao
create or replace procedure inserir_exame_prescricao(_desc varchar(500), _exa int, _pres int)
as $$
begin
	insert into prescricao_exame(id_exame, id_prescricao, descricao_pres_exa) values (_exa, _pres, _desc);
end; $$ Language PLPGSQL




--consulta por formulario

create or replace procedure criar_consulta_form(_med int, _ute int, _horari timestamp, _form int, _observ varchar(300))
as $$
declare 
	form_cons int;
	horar int;
	id_cons int;
begin
	--verificar se existe consulta vindo do formulario
	if (_form is not null)
	then
		select count(*) into form_cons
		from formulario_consulta fc
		where fc.id_formulario = _form;	
		
		if (form_cons > 0)
		then
			raise notice 'Formulario com consulta já marcada';
			return;
		end if;
	end if;	
	
	--verificar se existe consulta com o medico no mesmo horario
	select count(*) into horar
	from consulta c 
	where c.horario = horari and mc.medico_cons = _med;	
	
	if (horar > 0)
	then
		raise notice 'medico não disponivel no horario';
		return;
	end if;
	
	--inserir
	insert into consulta (horario, observacoes, id_medico, estado_c, id_utente) 
	values (_horari, _observ, _med, 'Agendado', _ute)
	returning id_consulta into id_cons;
	
	insert into formulario_consulta (id_formulario, id_consulta) values (_form, id_cons);
	
	
	--guardar o medico que viu o formulario
	update formulario set id_medico = _med, estado_f = 'Respondido' where id_formulario = id_form ;
		
end; $$ Language PLPGSQL




--criar uma consulta por uma consulta
create or replace procedure criar_consulta_cons (_med int, _ute int, _cons int, _hora timestamp, _obser varchar(300))
as $$
declare ccons int;
		cmedhor int;
		id_cons int;
begin
	--verificar se consulta já gerou outra consulta
	select count(*) into ccons
	from consulta_consulta cc
	where cc.consulta_origem = _cons;
	
	if (ccons > 0)
	then
		raise notice 'Consulta já originou uma consulta';
	end if;
	
	
	--verificar se médico está disponivel no horário
	select count(*) into cmedhor
	from consulta c
	where c.id_medico = _med and c.horario = _hora;
	
	if (cmedhor > 0)
	then	
		raise notice 'Medico ja tem consulta marcada no horario';
	end if;
	
	--inserir nas tabelas	
	--criar nova consulta
	insert into consulta (horario, observacoes, id_medico, estado_c, id_utente) 
	values (_horari, _observ, _med, 'Agendado', _ute)
	returning id_consulta into id_cons;
	
	--criar a relacao 
	insert into consulta_consulta (consulta_origem, id_consulta) values (_cons, id_cons);	
	
end; $$ Language PLPGSQL