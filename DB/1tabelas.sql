--
--	CRIAÇÃO DAS TABELAS
--

create table Utente(
	id_utente	serial			not null,
	nome_u		varchar(60)		not null,
	nif_u		int,
	email_u		varchar(60)		not null,
	tele_u		int
)

create table Medico(
	nome_m		varchar(60)		not null,
	
)