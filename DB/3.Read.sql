--
--	READ cRud
--

--view consulta
create or replace view consultas
as
	select c.id_consulta consulta, md.nome_m medico, md.email_m email_medico, esp.nome_esp especialidade, c.horario data_consulta, c.observacoes observacoes_consulta,--info consulta e medico
		 u.nome_u utente, u.email_u email_utente, u.nif_u nif, u.dat_nasc data_nascimento, --info utente
		 f.data_form data_formulario, f.id_medico medico_formulario, f.descricao_form descricao_formulario, -- formulario
		 mdor.nome_m medico_anterior, mdor.email_m email_medico_anterior, espor.nome_esp especialidade_anterior, cor.horario data_consulta_anterior, cor.observacoes observacoes_anterior, --consulta origem
		 p.id_prescricao prescricao, p.validade validade_prescricao -- prescricoes
	from consulta c
		inner join medico md using (id_medico)
		inner join especialidade esp using (id_especialidade)
		left join formulario_consulta fc using (id_consulta)
		inner join formulario f using (id_formulario)
		inner join utente u using (id_utente)
		left join consulta_prescricao cp on c.id_consulta = cp.id_consulta
		inner join prescricao p using (id_prescricao)
		left join consulta_consulta cc on c.id_consulta = cc.id_consulta -- ver se esta consulta teve origem noutra
		inner join consulta cor on cor.id_consulta = cc.consulta_origem -- infos da consulta origem
		inner join medico mdor on cor.id_medico = mdor.id_medico
		inner join especialidade espor on espor.id_especialidade = mdor.id_especialidade
		
		
		
--view prescricoes
create or replace view prescricoes
as
	select *
	from prescricoes p
		left join prescricao_exame pe using (id_prescricao)
		inner join exame e using (id_exame)
		left join prescricao_medicamento pe using