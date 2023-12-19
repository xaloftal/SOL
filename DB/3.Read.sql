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
		inner join utente u using (id_utente)
		inner join medico md using (id_medico)
		inner join especialidade esp using (id_especialidade)
		left join formulario_consulta fc using (id_consulta) -- pode não ser de formulario
		left join formulario f using (id_formulario)		
		left join consulta_prescricao cp on c.id_consulta = cp.id_consulta
		left join prescricao p using (id_prescricao)
		left join consulta_consulta cc on c.id_consulta = cc.id_consulta -- ver se esta consulta teve origem noutra
		left join consulta cor on cor.id_consulta = cc.consulta_origem -- infos da consulta origem
		left join medico mdor on cor.id_medico = mdor.id_medico
		left join especialidade espor on espor.id_especialidade = mdor.id_especialidade
		-- estados das contas
		left join utilizador uti on uti.email = md.email_m
		left join utilizador ut on ut.email = mdor.email_m
		left join utilizador util on util.email = u.email_u
		
		
--view prescricoes de formulario
drop view prescricoes_formularios
create or replace view prescricoes_formularios
as
	select p.id_prescricao, p.validade validade_prescricao, --info prescricao
		m.id_medicamento, m.nome_med medicamento, pm.descricao_pres_med descricao_medicamento, ff.descricao_forma forma_farmaceutica, -- medicamentos
		e.id_exame, e.nome_exame exame, pe.descricao_pres_exame descricao_exame, -- exames
		mdf.id_medico, mdf.nome_m nome_medico, mdf.email_m email_medico, -- info do medioco
		u.id_utente, u.nome_u nome_utente, u.nif_u nif_utente, u.email_u email_utente, u.dat_nasc data_nascimento,  -- info utente
		f.id_formulario, -- formulario
		p.estado_p estado_prescricao, e.estado_e estado_exame, m.estado_m estado_medicamento, ff.estado_ff estado_forma, f.estado_f estado_formulario -- estados
	from prescricao p
	left join prescricao_exame pe using (id_prescricao)
	left join exame e using (id_exame)
	left join prescricao_medicamento pm using (id_prescricao)
	left join medicamento m using (id_medicamento)
	left join forma_farmaceutica ff using (id_forma_farmaceutica)		
	left join formulario_prescricao fp using (id_prescricao)
	left join formulario f using (id_formulario)
	left join medico mdf on f.id_medico = mdf.id_medico
	left join utente u using (id_utente)


select * from consultas

		
--view prescricoes de consultas
create or replace view prescricoes_consultas
as
	select p.id_prescricao, p.validade validade_prescricao, --info prescricao
		m.id_medicamento, m.nome_med medicamento, pm.descricao_pres_med descricao_medicamento, ff.descricao_forma forma_farmaceutica, -- medicamentos
		e.id_exame, e.nome_exame exame, pe.descricao_pres_exame descricao_exame, -- exames
		mdc.id_medico, mdc.nome_m nome_medico, mdc.email_m email_medico, -- info do medioco
		u.id_utente, u.nome_u nome_utente, u.nif_u nif_utente, u.email_u email_utente, u.dat_nasc data_nascimento,  -- info utente
		p.estado_p estado_prescricao, e.estado_e estado_exame, m.estado_m estado_medicamento, ff.estado_ff estado_forma, c.estado_c estado_consulta, -- estados
		c.id_consulta -- consulta
	from prescricao p
		left join prescricao_exame pe using (id_prescricao)
		left join exame e using (id_exame)
		left join prescricao_medicamento pm using (id_prescricao)
		left join medicamento m using (id_medicamento)
		left join forma_farmaceutica ff using (id_forma_farmaceutica)
		inner join consulta_prescricao cp using (id_prescricao)
		inner join consulta c using (id_consulta)
		inner join medico mdc on c.id_medico = mdc.id_medico
		inner join utente u using (id_utente)
		
		
--ver formularios
create or replace view formularios
as
	select c.id_consulta, f.id_formulario ,u.id_utente, m.id_medico, e.id_especialidade, --ids
		f.descricao_form descricao_formulario, f.data_form data_formulario, e.nome_esp especialidade, f.observacoes_med observacoes_medico, --form
		m.nome_m medico, m.email_m email_medico, --med
		u.nome_u utente, u.nif_u nif_utente, u.email_u email_utente, u.dat_nasc data_nascimento, --ute
		f.estado_f estado_formulario, c.estado_c estado_consulta --estados
	from formulario f
		inner join utente u using (id_utente)		
		inner join especialidade e using (id_especialidade)
		left join medico m on m.id_medico = f.id_medico
		left join formulario_consulta fc using (id_formulario) -- ver infos da consulta
		left join consulta c using (id_consulta)
		
		
--ver reclamacoes
create or replace view reclamacoes
as
	select a.id_adm, u.id_utente, r.id_reclamacao, -- ids
		r.descricao_rec descricao, r.data_recl data_reclamacao, r.resposta_recl resposta, -- rec
		u.nome_u utente, u.nif_u nif_utente, u.email_u email_utente, u.dat_nasc data_nascimento, -- utente
		a.nome_a administrativo, a.email_a email_administrativo, -- adm
		r.estado_r estado_reclamacao-- estado
	from reclamacao r
		inner join utente u using (id_utente)
		left join administrativo a using (id_adm)
