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

--teste
select * from administrativo
call resposta_recla_adm(1, 1, 'Pedimos desculpa pelo inconveniente. O sistema encontra-se em manutenção')

select u.nome_u nome_utente,  r.descricao_rec descricao_reclamacao, r.resposta_recl resposta, a.nome_a nome_administrativo 
from reclamacao r inner join administrativo a using (id_adm) inner join utente u using (id_utente);