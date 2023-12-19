let reclamacao = [];

const GetReclamacao = () => {
    $.ajax({
        url: "http://localhost:3050/reclamacao",
        type: "GET",
        crossDomain: false,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'Access-Control-Allow-OSrigin': '*'
    })
    .then((response) => {
      reclamacao = response;
      let container = document.querySelector('[data-id="reclamacaoContainer"]');
      response.forEach(reclamacao => {
        console.log(reclamacao);
        container.innerHTML += '<div class="complaint-info"><span><strong class="complaint-info-item-1">Utente: </strong>' + reclamacao.id_utente + '</span><span><strong class="complaint-info-item-2">Data: </strong>' + reclamacao.data_recl_format + '</span></div><div class="text-complaint"><span class="text-complaint-1">Descrição: </span><span>' + reclamacao.descricao_rec + '</span></div><div class="line"></div><div class="consultation-booking"><button class="myBtn action-btn btn-text">Responder</button></div></div><div id="myModalComplaint" class="modal"><div class="modal-content"><div class="modal-header"><h3>Responder a reclamação</h3><span class="close">&times;</span></div><div class="modal-body"><div class="consultation-answer-modal-card"><p class="complaint-letter">Escreva aqui a sua resposta:</p><textarea id="complaintAnswer" name="complaintAnswer" rows="10" cols="50" class="complaint-answer-box" data-id="reclamacaoResposta"></textarea></div></div><div class="modal-footer"><button class="submit-btn btn-text" onclick="responderReclamacao('+ reclamacao.id_reclamacao +')">Submeter</button></div></div></div>';
        updateModalBtns();
    })
    })
    .catch((error) => {
        console.error(error)
    });
}

const GetPedidoConsulta = () => {
  $.ajax({
        url: "http://localhost:3050/consulta",
        type: "GET",
        crossDomain: false,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'Access-Control-Allow-OSrigin': '*'
    })
    .then((response) => {
      
      let container = document.querySelector('[data-id="consultaSolicitadaContainer"]');
      response.forEach(consulta => {
        console.log(consulta);
        container.innerHTML += '<div class="consultation-card"><div class="consultation-info"><span><strong class="info-item-1">Especialidade:</strong>' + consulta.especialidade + '</span><span><strong class="info-item-2">Médico:</strong>' + consulta.medico + '</span><span><strong class="info-item-3">Utente: </strong>' + consulta.utente + '</span><span><strong class="info-item-4"></div><div class="text-appointment"><span class="text-appointment-1">Descrição: </span><span>' + consulta.descricao_formulario + '</span></div><div class="line"></div><div class="consultation-booking"><button class="myBtn action-btn-2 btn-text">Validar</button></div></div></div><div id="myModalAppointment" class="modal"><div class="modal-content"><div class="modal-header"><h3>Marcar consulta</h3><span class="close">&times;</span></div><div class="modal-body"><div class="consultation-card-date"><label for="appointmentDateTime" class="appointment-letter">Data:</label><input type="date" id="appointmentDateTime" name="appointmentDateTime" class="appointment-date-box"><label for="appointmentDateTime" class="appointment-letter" style="padding-left: 15vh;">Hora:</label><input type="time" id="appointmentDateTime" name="appointmentDateTime" class="appointment-time-box"></div></div><div class="modal-footer"><button class="submit-btn btn-text" onclick="submitAppointment()">Marcar</button></div></div></div>';
        updateModalBtns();  
        })
    })
    .catch((error) => {
        console.error(error)
    });
}

const responderReclamacao = (id_reclamacao) => {
    let userSession = JSON.parse(localStorage.getItem('userSession'));
    let reclamacaoResposta = document.querySelector('[data-id="reclamacaoResposta"]').value;

  $.ajax({
        url: "http://localhost:3050/responderreclamacao?id_recl="  + id_reclamacao + "&id_adm=" + encodeURI(userSession.id) + "&resp=" + reclamacaoResposta,
        type: "PUT",
        crossDomain: false,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'Access-Control-Allow-Origin': '*'
    })
    .then((response) => {
      alert('Reclamação respondida')  
      console.log(response);
    })
    .catch((error) => {
        console.error(error)
    });
}