--
--	CRIAÇÃO DAS TABELAS 
--	


	--
	--	ENTIDADES
	--
	
	
--atributos 

create table forma_farmaceutica(
	id_forma_farmaceutica	int  primary key,
	descricao_forma 	varchar(60),
	estado_ff		estado
);


create table especialidade(
	id_especialidade	serial		primary key,
	nome_esp		varchar(60),
	estado_e	estado
);


create table medicamento(
	id_medicamento	serial		primary key,
	nome_med		varchar(60),
	id_forma_farmaceutica int,
	estado_m		estado, --enum
	
	constraint form_farm_fk foreign key (id_forma_farmaceutica) references forma_farmaceutica(id_forma_farmaceutica)
);



create table exame(
	id_exame	serial		primary key,
	nome_exame	varchar(60),
	estado_e	estado
);


create table prescricao(
	id_prescricao	serial	primary key,
	validade		timestamp,
	estado_p		estado
);



-- utilizador
create table utilizador(
	email		varchar(60)		unique,
	password	varchar(60),
	estado_l	estado,
	
	primary key (email, password)	
)



-- utilizadores

create table utente(
	id_utente	serial			not null		primary key,
	nome_u		varchar(60)		not null,
	nif_u		int				unique,
	email_u		varchar(60)		unique,
	tele_u		int				unique,
	dat_nasc	date,
	
	constraint fk_utente_login foreign key (email_u) references utilizador(email)
);


create table medico(
	id_medico	serial			not null		primary key,
	nome_m		varchar(60)		not null,
	email_m		varchar(60)		not null,
	
	--relacao
	id_especialidade int,
	
	constraint fk_medico_login foreign key (email_m) references utilizador(email),
	constraint fk_medico_esp foreign key (id_especialidade) references especialidade(id_especialidade)
);

-- não vai ser implementado nesta versão
create table gestor(
	id_gestor	serial			not null		primary key,
	nome_g		varchar(60)		not null,
	email_g		varchar(60)		not null,
	
	constraint fk_gestor_login foreign key (email_g) references utilizador(email)
);


create table administrativo(
	id_adm		serial			not null		primary key,
	nome_a		varchar(60)		not null,
	email_a		varchar(60)		not null,
	
	constraint fk_adm_login foreign key (email_a) references utilizador(email)
);



-- reclamacao

create table reclamacao(
	id_reclamacao	serial		not null		primary key,
	descricao_rec	varchar(500) not null,
	data_recl		timestamp,
	resposta_recl	varchar(500),
	estado_r		estado,
	
	--relacoes
	id_gestor	int,
	id_adm	int,
	id_utente 	int,
	
	constraint fk_gestor_resposta_rec foreign key (id_gestor) references gestor(id_gestor),
	constraint fk_adm_resposta_rec foreign key (id_adm) references administrativo(id_adm),
	constraint fk_utente_rec foreign key (id_utente) references utente(id_utente)	
);


-- consultas

create table formulario(
	id_formulario 	serial		not null		primary key,
	descricao_form  varchar(500) not null,
	data_form		timestamp,
	estado_f		estado,
	
	--relacao
	id_especialidade	int,
	id_utente	int,
	id_medico	int,
	
	
	constraint fk_form_esp foreign key (id_especialidade) references especialidade(id_especialidade),
	constraint fk_form_uten foreign key (id_utente) references utente(id_utente),
	constraint fk_form_med foreign key (id_medico) references medico(id_medico)
);



create table consulta(
	id_consulta		serial 		not null		primary key,
	observacoes 	varchar(300),
	horario			timestamp,
	estado_c		estado,
	
	--relacao
	id_medico		int,
	
	constraint fk_cons_med foreign key (id_medico) references medico(id_medico)
);



	--
	-- TABELAS RELACAO
	--

--origina
create table formulario_consulta(
	id_consulta 	int,
	id_formulario	int,
	
	constraint pk_form_cons primary key (id_consulta, id_formulario),
	constraint fk_con foreign key (id_consulta) references consulta(id_consulta),
	constraint fk_form foreign key (id_formulario) references formulario(id_formulario)
);


--tem origem

create table consulta_consulta(
	consulta_origem int,
	id_consulta		int,
	
	constraint pk_cons_cons primary key(consulta_origem, id_consulta),
	constraint con_fk foreign key (id_consulta) references consulta(id_consulta),
	constraint consori_fk foreign key (consulta_origem) references consulta(id_consulta)
);


--prescreve
create table consulta_prescricao(
	id_consulta 	int,
	id_prescricao	int,
	
	constraint pk_cons_medic primary key(id_prescricao, id_consulta),
	constraint con_fk foreign key (id_consulta) references consulta(id_consulta),
	constraint pres_fk foreign key (id_prescricao) references prescricao(id_prescricao)
);

--passa
create table formulario_prescricao(
	id_formulario   int,
	id_prescricao	int,
	
	constraint pk_form_pres primary key (id_formulario, id_prescricao),
	constraint form_fk foreign key (id_formulario) references formulario(id_formulario),
	constraint pres_fk foreign key (id_prescricao) references prescricao(id_prescricao)
);

--examina
create table prescricao_exame(
	id_prescricao 	int,
	id_exame		int,
	descricao_pres_exame	varchar(500),
	
	constraint pk_pres_exa primary key (id_prescricao, id_exame),
	constraint exa_fk foreign key (id_exame) references exame(id_exame),
	constraint pres_fk foreign key (id_prescricao) references prescricao(id_prescricao)	
);

--medica
create table prescricao_medicamento(
	id_medicamento 	int,
	id_prescricao	int,
	descricao_pres_med	varchar(500),
	
	constraint pk_pres_med primary key (id_medicamento, id_prescricao),
	constraint med_fk foreign key (id_medicamento) references medicamento(id_medicamento),
	constraint pres_fk foreign key (id_prescricao) references prescricao(id_prescricao)
);