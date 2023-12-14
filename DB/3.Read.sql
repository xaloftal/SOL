--
--	READ cRud
--


--view consulta
create or replace view consultas
as
	select c.id_consulta, md.nome_m medico, md.email_m email_medico, esp.nome_esp especialidade, c.horario data_consulta, c.observacoes observacoes_consulta,--info consulta e medico
		 u.nome_u utente, u.email_u email_utente, u.nif_u nif, u.dat_nasc data_nascimento, --info utente
		 f.data_form data_formulario, f.id_medico medico_formulario, f.descricao_form descricao_formulario, -- formulario
		 mdor.nome_m medico_anterior, mdor.email_m email_medico_anterior, espor.nome_esp especialidade_anterior, cor.horario data_consulta_anterior, cor.observacoes observacoes_anterior, --consulta origem
		 p.id_prescricao, p.validade validade_prescricao, -- prescricoes
		 uti.estado_l estado_medico, util.estado_l estado_utente, ut.estado_l estado_medico_origem, -- estados pessoas
		 f.estado_f estado_formulario, c.estado_c estado_consulta, cor.estado_c estado_consulta_anterior, p.estado_p esatdo_prescricao, -- estado
		 cc.consulta_origem, f.id_formulario, u.id_utente, md.id_medico, mdor.id_medico id_medico_anterior -- ids
	from consulta c
		inner join medico md using (id_medico)
		inner join especialidade esp using (id_especialidade)
		left join formulario_consulta fc using (id_consulta) -- pode não ser de formulario
		inner join formulario f using (id_formulario)
		inner join utente u using (id_utente)
		left join consulta_prescricao cp on c.id_consulta = cp.id_consulta
		inner join prescricao p using (id_prescricao)
		left join consulta_consulta cc on c.id_consulta = cc.id_consulta -- ver se esta consulta teve origem noutra
		inner join consulta cor on cor.id_consulta = cc.consulta_origem -- infos da consulta origem
		inner join medico mdor on cor.id_medico = mdor.id_medico
		inner join especialidade espor on espor.id_especialidade = mdor.id_especialidade
		-- estados das contas
		inner join utilizador uti on uti.email = md.email_m
		inner join utilizador ut on ut.email = mdor.email_m
		inner join utilizador util on util.email = u.email_u
		
		
		
		
		
--view prescricoes de formulario

create or replace view prescricoes_formularios
as
	select p.id_prescricao, p.validade validade_prescricao, --info prescricao
		m.id_medicamento, m.nome_med medicamento, pm.descricao_pres_med descricao_medicamento, ff.descricao_forma forma_farmaceutica, -- medicamentos
		e.id_exame, e.nome_exame exame, pe.descricao_pres_exame descricao_exame, -- exames
		mdf.id_medico, mdf.nome_m nome_medico, mdf.email_m email_medico, -- info do medioco
		u.id_utente, u.nome_u nome_utente, u.nif_u nif_utente, u.email_u email_utente, u.dat_nasc data_nascimento,  -- info utente
		p.estado_p estado_prescricao, e.estado_e estado_exame, m.estado_m estado_medicamento, ff.estado_ff estado_forma, f.estado_f estado_formulario -- estados
	from prescricao p
	left join prescricao_exame pe using (id_prescricao)
	inner join exame e using (id_exame)
	left join prescricao_medicamento pm using (id_prescricao)
	inner join medicamento m using (id_medicamento)
	inner join forma_farmaceutica ff using (id_forma_farmaceutica)		
	left join formulario_prescricao fp using (id_prescricao)
	inner join formulario f using (id_formulario)
	inner join medico mdf on f.id_medico = mdf.id_medico
	inner join utente u using (id_utente)




		
--view prescricoes de consultas
create or replace view prescricoes_consultas
as
	select *
	from prescricao p
		left join prescricao_exame pe using (id_prescricao)
		inner join exame e using (id_exame)
		left join prescricao_medicamento pm using (id_prescricao)
		inner join medicamento m using (id_medicamento)
		inner join forma_farmaceutica ff using (id_forma_farmaceutica)
		left join consulta_prescricao cp using (id_prescricao)
		inner join consulta c using (id_consulta)
		inner join medico mdc on c.id_medico = mdc.id_medico
		
		
