--	
--	TESTES
--

-- Create
select * from login
call inserir_login('josemarques@med.sol.com', '123asd')


call inserir_especialidade('Cardiologia');
select * from especialidade
update especialidade set estado_e = 'Inativo' where id_especialidade = 1


call inserir_forma_farmaceutica(004, 'Solução oral');
select * from forma_farmaceutica
update forma_farmaceutica set estado_ff = 'Inativo' where id_forma_farmaceutica = 4


call inserir_medicamento('Rantudil', 'Cápsula');
call inserir_medicamento('Ziagen', 'Comprimido revestido por película');
call inserir_medicamento('Ziagen', 'Solução oral')
select * from medicamento 
inner join forma_farmaceutica using (id_forma_farmaceutica)


call inserir_exame ('Ecocardiograma')
select * from exame


call signup_medico('José Marques', 'josemarques@med.sol.com', '123asd', 'Cardiologia' );
select * from medico


call signup_utente('Antónia Miranda', 'antoniamiranda@gmail.com', '456fgh', '271970888', '914850911', '1970-12-05' );
select * from utente u
inner join login l on l.email = u.email_u


call signup_adm('Pedro Dinis', 'pedrodinis@adm.sol.com', '789jkl');
select * from administrativo a inner join login l on l.email = a.email_a


call criar_reclamacao(1, 'Resposta muito demorada.', '2023-11-14 10:44:00'::timestamp)
select * from reclamacao inner join utente using (id_utente)




--teste
select * from administrativo
call resposta_recla_adm(1, 1, 'Pedimos desculpa pelo inconveniente. O sistema encontra-se em manutenção')
select u.nome_u nome_utente,  r.descricao_rec descricao_reclamacao, r.resposta_recl resposta, a.nome_a nome_administrativo 
from reclamacao r inner join administrativo a using (id_adm) inner join utente u using (id_utente);
