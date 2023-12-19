--
--	DELETE cruD
--

-- ignorar formulario
create or replace procedure ignorar_formulario (_form int, _med int)
as $$
begin
	update formulario
	set id_medico = _med,
		estado_f = 'Cancelado'
	where id_formulario = _form;		
end; $$ Language PLPGSQL

-- eliminar form (ute)
create or replace procedure eliminar_formulario(_form int)
as $$
begin
	update formulario
	set estado_f = 'Cancelado'
	where if_formulario = _form;
end; $$ Language PLPGSQL



--eliminar conta
create or replace procedure eliminar_conta (_email varchar(60))
as $$
begin
	update utilizador
	set estado_l = 'Inativo'
	where email = _email;
end; $$ Language PLPGSQL