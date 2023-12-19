const populateDropdownMedicamento = (data) => {
    const dropdown = $("#medicamentoDropdown");

    dropdown.empty();

    dropdown.append(`<option value="-1">Escolha um</option>`);

    data.forEach(item => {
        dropdown.append(`<option value="${item.id_medicamento}">${item.nome_med}</option>`);
    });
};

const populateDropdownExame = (data) => {
    const dropdown = $("#exameDropdown");

    dropdown.empty();

    dropdown.append(`<option value="-1">Escolha um</option>`);

    data.forEach(item => {
        dropdown.append(`<option value="${item.id_exame}">${item.nome_exame}</option>`);
    });
};

const GetMedicamentos = () => {
    $.ajax({
            url: "http://localhost:3050/medicamento",
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
            populateDropdownMedicamento(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

const GetExames = () => {
    $.ajax({
            url: "http://localhost:3050/exame",
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
            populateDropdownExame(response);
        })
        .catch((error) => {
            console.error(error)
        });
}

const GetFormulariosNaoRespondidos = () => {
    $.ajax({
            url: "http://localhost:3050/formulario",
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

            let container = document.querySelector('[data-id="formularioContainer"]');
            response.forEach(form => {
                container.innerHTML += '<div class="form-card"><div class="form-info"><span><strong class="form-info-item-1">Utente: </strong>' + form.utente + '</span><span><strong class="form-info-item-2">Data:</strong>' + form.data_form_format + '</span></div><div class="text-form"><span class="text-form-1">Descrição:</span><span>' + form.descricao_formulario + '</span></div><div class="line"></div><div class="form-validation"><a class="ignore-btn" onclick="ignoreForm(' + form.id_formulario + ')">Ignorar</a><button class="myBtn validation-btn validation-btn-txt" id="validate-button">Validar</button></div></div></div><div id="myModalFormResponse" class="modal"><div class="modal-content"><div class="modal-header"><h3>Responder a formulário</h3><span class="close">&times;</span></div><div class="modal-body"><div class="form-obv-modal-card"><p class="form-answer-letter">Escreva aqui as suas observações</p><textarea data-id="formObsField" id="complaintAnswer" name="complaintAnswer" rows="10" cols="50" class="complaint-answer-box"></textarea></div><div class="form-prescription-modal-card"><p class="form-answer-letter">Quer prescrever?</p><div class="form-radio-input"><input type="checkbox" data-id="check-prescrever" id="sim" name="check-prescrever" value="TESTE1"/></div></div><button class="accordion-btn accordion" id="accordionBtn2" onclick="toggleAccordion(\'accordionContent2\', \'accordionBtn2\')">Medicação</button><div class="accordion-content" id="accordionContent2"><div class="medication-card" id="prescription-container"><label for="medicamento" class="form-answer-letter">Nome</label><select id="medicamentoDropdown" name="medicamento"></select><br><label class="form-answer-letter">Indicações</label><input type="text" data-id="medicamento-indicacoes" placeholder="" size="30"/></div><button class="plus-btn" onclick="addMedicationCard()">+</button></div><button class="accordion-btn accordion" id="accordionBtn3" onclick="toggleAccordion(\'accordionContent3\', \'accordionBtn3\')">Exames</button><div class="accordion-content" id="accordionContent3"><div class="exam-card" id="prescription-container"><label for="exame" class="form-answer-letter">Nome</label><select id="exameDropdown" name="exame"></select><br><label class="form-answer-letter">Indicações</label><input type="text" data-id="exame-indicacoes" placeholder="" size="30"/></div><button class="plus-btn" onclick="addMedicationCard()">+</button></div><div class="form-prescription-modal-card"><p class="form-answer-letter">Consulta?</p><div class="form-radio-input"><input type="checkbox" data-id="checkbox-consulta"/></div> </div></div><div class="modal-footer"><button class="submit-btn btn-text" onclick="submitForm(' + form.id_formulario + ')">Submeter</button> </div></div></div>';
                updateModalBtns();
            })

        })
        .catch((error) => {
            console.error(error)
        });
}

const GetFormulariosRespondidos = () => {
    $.ajax({
            url: "http://localhost:3050/formulariorespondidos",
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

            let containerAnswers = document.querySelector('[data-id="formularioRespondidosContainer"]');
            response.forEach(formAnswer => {
                containerAnswers.innerHTML += '<div class="form-card"><div class="form-info"><span><strong class="form-info-item-1">Utente: </strong>' + formAnswer.id_utente + '</span><span><strong class="form-info-item-2">Data:</strong>' + formAnswer.data_formulario + '</span></div><div class="text-form"><span class="text-form-1">Descrição:</span><span>' + formAnswer.descricao_formulario + '</span></div><div class="line"></div><div class="text-form"><span class="text-form-1">Observações:</span><span>' + formAnswer.observacoes_medico + '</span></div><a  style="color:#4D77FF" class="more-details" id="accordionBtn2" onclick="toggleAccordion(\'accordionContent1\', \'accordionBtn1\')"><u>Mais detalhes</u></a><div class="accordion-content" id="accordionContent2"><p><strong class="form-info-details">Medicamento: </strong>' + formAnswer.medicamento + '</p><p><strong class="form-info-details">Descrição: </strong>' + formAnswer.descricao_medicamento + '</p><div class="line"></div><div class="exam-div"><p><strong class="form-info-details">Exame: </strong>' + formAnswer.exame + '</p><p><strong class="form-info-details">Descrição:</strong>' + formAnswer.descricao_exame + '</p></div><div class="line"></div><div class="appointment-div"><p><strong class="form-info-details">Consulta: </strong>' + formAnswer.estado_consulta + '</p></div></div></div>';
            })

        })
        .catch((error) => {
            console.error(error)
        });
}

////////////////

const submitForm = (id_formulario) => {
    let obs = document.querySelector('[data-id="formObsField"]').value;
    let userSession = JSON.parse(localStorage.getItem('userSession'));

    $.ajax({
            url: "http://localhost:3050/formulario/responder?id_form=" + id_formulario + "&id_med=" + encodeURI(userSession.id) + "&obsv=" + encodeURI(obs),
            type: "PUT",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {

        })
        .catch((error) => {
            console.error(error)
            alert('Erro ao ignorar formulário')
        });

    if (document.querySelector('[data-id="check-prescrever"]').checked) {

        let prescricao = { medicamento: {}, exame: {}};
        const medicamenteChoice = document.querySelector('select[id="medicamentoDropdown"]').value;

        if (medicamenteChoice != '-1') {
            prescricao.medicamento.id = medicamenteChoice;
            prescricao.medicamento.obs = document.querySelector('[data-id="medicamento-indicacoes"]').value;
        }

        const exameChoice = document.querySelector('select[id="exameDropdown"]').value;

        if (exameChoice != '-1') {
            prescricao.exame.id = exameChoice;
            prescricao.exame.obs = document.querySelector('[data-id="exame-indicacoes"]').value;
        }

        $.ajax({
                url: "http://localhost:3050/formulario/prescricao?id_form=" + id_formulario,
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
                const id_prescricao = response[0].id_prescricao;

                if (medicamenteChoice != '-1') {
                    InserirPrescricaoMedicamento(prescricao.medicamento, id_prescricao);
                }

                if (exameChoice != '-1') {
                    InserirPrescricaoExame(prescricao.exame, id_prescricao);
                }

            })
            .catch((error) => {
                console.error(error)
                alert('Erro ao ignorar formulário')
            });
    }

    if (document.querySelector('[data-id="checkbox-consulta"]').checked) {
        $.ajax({
                url: "http://localhost:3050/formulario/prescricao/consulta?id_formulario=" + id_formulario + "&id_medico=" + encodeURI(userSession.id),
                type: "POST",
                crossDomain: false,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                'Access-Control-Allow-Origin': '*'
            })
            .catch((error) => {
                console.error(error)
                alert('Erro ao ignorar formulário')
            });
    }
}

const InserirPrescricaoMedicamento = (medicamento, id_prescricao) => {
    $.ajax({
            url: "http://localhost:3050/formulario/prescricao/medicamento?id_medicamento=" + medicamento.id + "&descricao=" + encodeURI(medicamento.obs) + "&id_prescricao=" + id_prescricao,
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {

        })
        .catch((error) => {
            console.error(error)
            alert('Erro')
        });

}

const InserirPrescricaoExame = (exame, id_prescricao) => {
    $.ajax({
            url: "http://localhost:3050/formulario/prescricao/exame?id_exame=" + exame.id + "&descricao=" + encodeURI(exame.obs) + "&id_prescricao=" + id_prescricao,
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {})
        .catch((error) => {
            console.error(error)
            alert('Erro')
        });

}

const answerForm = (id_formulario) => {
    $.ajax({
            url: "http://localhost:3050/formulario?id_form=" + id_formulario,
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {
            alert
        })
        .catch((error) => {
            alert('Erro ao registar')
        });

}

const ignoreForm = (id_formulario) => {
    let userSession = JSON.parse(localStorage.getItem('userSession'));
    $.ajax({
            url: "http://localhost:3050/formulario?id_form=" + id_formulario + "&id_med=" + encodeURI(userSession.id),
            type: "PUT",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {
            document.querySelector('[data-id="formularioContainer"]').innerHTML = ''
            GetFormularios();
            alert('Formulário ignorado')
        })
        .catch((error) => {
            console.error(error)
            alert('Erro ao ignorar formulário')
        });

}




$(document).ready(function () {
    GetFormulariosRespondidos();
    GetFormulariosNaoRespondidos();
    GetExames();
    GetMedicamentos();
});