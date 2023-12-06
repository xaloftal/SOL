--
--	READ cRud
--

--view medicos
create or replace view consultas
as
	select *
	from consulta c
		inner join medico m using (id_medico)
		inner join especialidade e using (id_especialidade)
		left join formulario_consulta using (id_formulario)