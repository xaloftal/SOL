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
	set id_adm = _adm, resposta_recl = _resp
	where id_reclamacao = _recl;
		

end; $$ Language PLPGSQL


-- pedir consulta por formulario (med)

create or replace procedure pedido_consulta(_med int, _form int, _cons int, _observ varchar(300))
as $$
declare form_cons int;
		cons_cons int;
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
		
		update formulario
		set id_medico = _med,
			observacoes_med = _observ
		where id_formulario = _form;
		
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
		
		
		
	
	end if;	
	
	
	
		
end; $$ Language PLPGSQL


create or replace procedure pedido_consulta_cons(_med int, _cons int, _observ varchar(300))
as $$
declare form_cons int;
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
	
	
	update formulario
	set id_medico = _med,
		observacoes_med = _observ
	where id_formulario = _form;
		
end; $$ Language PLPGSQL