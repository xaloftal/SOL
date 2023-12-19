--
--	UPDATE crUd
--

-- resposta adm a reclamacao
create or replace procedure resposta_recla_adm(_recl int, _adm int, _resp varchar(500))
as $$
declare adm int;
		gest int;
begin
	--verifica se reclamacao existe e se sim, verificar se tem respostas
	select id_adm, id_gestor into adm, gest
	from reclamacao r
	where r.id_reclamacao = _recl;
	
	if (adm is not null or gest is not null )
	then
		raise notice 'Reclamacao já respondida';
		return;	
	end if;
	
	update reclamacao
	set id_adm = _adm, resposta_recl = _resp, estado_r = 'Respondido'
	where id_reclamacao = _recl;
		

end; $$ Language PLPGSQL


-- pedir consulta (med)
drop procedure pedido_consulta
create or replace procedure pedido_consulta(_med int, _form int, _cons int)
as $$
declare form_cons int;
		cons_cons int;
		ute int;
		consf int;
		consc int;
begin
	-- se vier de formulario (_cons null)
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

		
		-- ir buscar o utente
		select id_utente into ute
		from formulario
		where id_formulario = _form;
		
		
		-- criar o pedido de consulta
		insert into consulta ( id_medico, estado_c, id_utente) 
		values ( _med, 'Submetido', ute)
		returning id_consulta into consf;
	
		insert into formulario_consulta (id_formulario, id_consulta) values (_form, consf);
		
		
	-- se vier de consulta (_form null)
	elsif (_cons is not null)
	then
		select count(*) into cons_cons
		from consulta_consulta cc
		where cc.consulta_origem = _cons;
		
		if (cons_cons > 0)
		then 	
			raise notice 'Consulta com consulta ja marcada';
			return;
		end if;
		
		-- ir buscar o utente
		select id_utente into ute
		from consulta
		where id_consulta = _cons;
		
		
		-- criar o pedido de consulta
		insert into consulta ( id_medico, estado_c, id_utente) 
		values ( _med, 'Submetido', ute)
		returning id_consulta into consc;
	
		insert into consulta_consulta (consulta_origem, id_consulta) values (_cons, consc);		
	
	end if;	
		
end; $$ Language PLPGSQL


-- responder formulario (med)
create or replace procedure responder_formulario(_form int, _med int, _obs varchar(500))
as $$
begin			
	-- update ao formulario
	update formulario
	set id_medico = _med,
		observacoes_med = _obs,
		estado_f = 'Respondido'
	where id_formulario = _form;
	
end; $$ Language PLPGSQL



select * from medico

-- anotacoes consulta (med)
create or replace procedure responder_consulta(_cons int,  _obs varchar(500))
as $$
begin			
	-- update ao formulario
	update consulta
	set observacoes = _obs,
		estado_c = 'Concluido'
	where id_consulta= _cons;
	
end; $$ Language PLPGSQL