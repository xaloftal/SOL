--
--	UPDATE crUd
--

-- resposta adm a reclamacao
create or update procedure resposta_recla_adm(_recl int, _adm int, _resp varchar(500))
as $$
declare adm int;
		gest int;
begin
	--verifica se reclamacao existe e se sim, verificar se tem respostas
	select id_adm, id_gestor into adm, gest
	from reclamacao r
	where r.id_reclamacao = _recl
	
	if (adm is not null or gest is not null )
	then
		raise notice 'Reclamacao já respondida';
		return;	
	end if;
	
	update reclamacao
	set id_adm = _adm
		

end; $$ Language PLPGSQL