--
--	CRIAÇÃO DAS TABELAS
--

-- utilizadores
create table utente(
	id_utente	serial			not null		primary key,
	nome_u		varchar(60)		not null,
	nif_u		int,
	email_u		varchar(60)		unique,
	tele_u		int,
	
	constraint fk_utente_login foreign key (email_u) references login(email)
)

create table medico(
	id_medico	serial			not null		primary key,
	nome_m		varchar(60)		not null,
	email_m		varchar(60)		not null,
	
	constraint fk_medico_login foreign key (email_m) references login(email)
)

create table gestor(
	id_gestor	serial			not null		primary key,
	nome_g		varchar(60)		not null,
	email_g		varchar(60)		not null,
	
	constraint fk_gestor_login foreign key (email_g) references login(email)
)

create table administrativo(
	id_adm		serial			not null		primary key,
	nome_a		varchar(60)		not null,
	email_a		varchar(60)		not null,
	
	constraint fk_adm_login foreign key (email_a) references login(email)
)

-- login
create table login(
	email		varchar(60)		unique,
	password	varchar(60),
	
	primary key (email, password)	
)


-- reclamacao

create table reclamacao(
	id_reclamacao	serial		not null		primary key,
	descricao		varchar(60) not null,
	
	--relacoes
	gestor_resp	int,
	adm_resp	int,
	utente_rec 	int,
	
	constraint fk_gestor_resposta_rec foreign key (gestor_resp) references gestor(id_gestor),
	constraint fk_adm_resposta_rec foreign key (adm_resp) references administrativo(id_adm),
	constraint fk_utente_rec foreign key (utente_rec) references utente(id_utente)	
)


-- consultas

create table formulario(
	
)