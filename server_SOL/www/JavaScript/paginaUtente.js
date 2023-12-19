const currentDate = new Date(); 

GetFormulariosNRespondidosUtente = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3050/formularioutente?id_utente=" + encodeURI(userSession.id),
                type: "GET",
                crossDomain: false,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                'Access-Control-Allow-OSrigin': '*'
            })
            .then((response) => {

                let container = document.querySelector('[data-id="formularioUtenteContainer"]');
                response.forEach(formUtente => {
                    container.innerHTML += '<div class="form-card"><div class="consultation-info"><span><strong class="form-info-1">Especialidade</strong>' + formUtente.especialidade + '</span><span><strong class="form-info-4">Data: </strong>' + formUtente.data_form_format + '</span></div><div class="text-form"><span class="text-form-1">Descrição: </span><span>' + formUtente.descricao_formulario + '</span></div><div class="line"></div><div class="consultation-booking"><button class="action-btn remove-btn btn-text remove-btn-2" onclick="eliminarFormulario('+ formUtente.id_formulario +')">Eliminar</button></div></div>';
                })
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

GetFormulariosRespondidosUtente = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3050/formulariorespondidosutente?id_utente=" + encodeURI(userSession.id),
                type: "GET",
                crossDomain: false,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                'Access-Control-Allow-OSrigin': '*'
            })
            .then((response) => {

                let container = document.querySelector('[data-id="formularioRespondidosUtenteContainer"]');
                response.forEach(formRespondido => {
                    container.innerHTML += '<div class="form-card"><div class="consultation-info"><span><strong class="form-info-1">Especialidade: </strong>' + formRespondido.especialidade + '</span><span><strong class="form-info-2">Data: </strong></span></div><div class="text-form"><span class="text-form-1">Descrição: </span><span>' + formRespondido.descricao_formulario + '</span></div><div class="line"></div><div class="text-form"><span class="text-form-1">Observações: </span><span>' + formRespondido.observacoes_medico + '</span></div><div class="consultation-booking"><a style="color:#4D77FF" class="more-details" id="accordionBtn3" onclick="toggleAccordion(\'accordionContent4\', \'accordionBtn4\')"><u>Mais detalhes</u></a><div class="accordion-content" id="accordionContent4"><p><strong class="form-info-details">Medicamento: </strong>' + formRespondido.medicamento + '</p><p><strong class="form-info-details">Descrição: </strong>' + formRespondido.descricao_medicamento + '</p><div class="line"></div><div class="exam-div"><p><strong class="form-info-details">Exame: </strong>' + formRespondido.exame + '</p><p><strong class="form-info-details">Descrição: </strong>' + formRespondido.descricao_exame + '</p></div><div class="line"></div><div class="appointment-div"><p><strong class="form-info-details">Consulta: </strong>' + formRespondido.estado_consulta + '</p></div></div></div></div>';
                })
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

enviarFormulario = () => {
    let especialidadeChooser = document.querySelector('[data-id="especialidadeChooser"]').value;
    let formularioDescricao = document.querySelector('[data-id="formularioDescricao"]').value;

    let userSession = JSON.parse(localStorage.getItem('userSession'));

    $.ajax({
            url: "http://localhost:3050/formulario?id_utente=" + encodeURI(userSession.id) + "&especialidade=" + encodeURI(especialidadeChooser) + "&descricao=" + encodeURI(formularioDescricao) + '&data_form=' +  currentDate,
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-Origin': '*'
        })
        .then((response) => {
            alert('Formulário submetido')
            console.log(response);
            GetFormulariosNRespondidos();
        })
        .catch((error) => {
            console.error(error)
        });
}

enviarReclamacao = () => {
    let reclamacaoDescricao = document.querySelector('[data-id="reclamacaoDescricao"]').value;
    let userSession = JSON.parse(localStorage.getItem('userSession'));
    

    $.ajax({
            url: "http://localhost:3050/reclamacao?id_utente=" + encodeURI(userSession.id) + "&descricao=" + encodeURI(reclamacaoDescricao) + "&data_recl" + encodeURI(currentDate),
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-Origin': '*'
        })
        .then((response) => {
            alert('Reclamação submetida')
            console.log(response);
        })
        .catch((error) => {
            console.error(error)
        });
}

eliminarFormulario = (id_formulario) => {
    $.ajax({
            url: "http://localhost:3050/eliminarformulario?id_formulario=" + id_formulario,
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-Origin': '*'
        })
        .then((response) => {
            alert('Formulário eliminado')
            console.log(response);
        })
        .catch((error) => {
            console.error(error)
        });
}

window.onload = () => {
    GetFormulariosNRespondidosUtente();
    GetFormulariosRespondidosUtente();
}