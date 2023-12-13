--Enums

create type estado as 
	enum ('Existente', 'Submetido', 'Agendado', 'Concluido', 'Respondido',
		  'Cancelado', 'Inativo' );

