const GetContasMedico = () => {
    $.ajax({
            url: "http://localhost:3050/GetContasMedico",
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
            let containerMedico = document.querySelector('[data-id="contaMedicoContainer"]');
            response.forEach(contaMedico => {
                console.log(contaMedico);
                containerMedico.innerHTML += '<div class="account-card"><div class="consultation-info"><span><strong class="account-info-1">Nome: </strong>' + contaMedico.nome_m + '</span><span><strong class="account-info-2">Especialidade: </strong>' + contaMedico.nome_esp + '</span><span><strong class="account-info-3">Email: </strong>' + contaMedico.email + '</span></div><div class="line"></div><div class="consultation-booking"><button class="action-btn remove-btn btn-text remove-btn-2" onclick="deleteAccountMedico(\'' + contaMedico.email + '\')">Eliminar</button></div></div></div>';
            })

            updateModalBtns();
        })
        .catch((error) => {
            console.error(error)
        });
}

const GetContasUtente = () => {
    $.ajax({
            url: "http://localhost:3050/GetContasUtente",
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
            let containerUtente = document.querySelector('[data-id="contaUtenteContainer"]');
            response.forEach(contaUtente => {
                console.log(contaUtente);
                containerUtente.innerHTML += '<div class="account-card"><div class="consultation-info"><span><strong class="account-info-4">Nome: </strong>' + contaUtente.nome_u + '</span><span><strong class="account-info-5">Email: </strong>' + contaUtente.email + '</span></div><a style="color:#4D77FF" class="more-details"><u>Mais detalhes</u></a><div class="accordion-content-1"><span><strong class="account-info-1">Data de nascimento: </strong>' + contaUtente.dat_nasc + '</span><span><strong class="account-info-2">NIF: </strong>' + contaUtente.nif_u + '</span><span><strong class="account-info-3">Telefone: </strong>' + contaUtente.tele_u + '</span></div><div class="consultation-booking"><div class="line"></div><button class="action-btn remove-btn btn-text remove-btn-2" onclick="deleteAccountUtente(\'' + contaUtente.email_u + '\')">Eliminar</button></div></div>';
            })
        })
        .catch((error) => {
            console.error(error)
        });
}

const deleteAccountMedico = (email) => {

    $.ajax({
            url: "http://localhost:3050/EliminarConta?email=" + email,
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
            document.querySelector(`[data-id="contaMedicoContainer"]`).innerHTML = '';
            alert('Conta eliminada com sucesso.');
            GetContasMedico();
        })
        .catch((error) => {
            alert('Eliminação sem sucesso')
        });
}

const deleteAccountUtente = (email) => {

    $.ajax({
            url: "http://localhost:3050/EliminarConta?email=" + email,
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
            document.querySelector(`[data-id="contaUtenteContainer"]`).innerHTML = '';
            alert('Conta eliminada com sucesso.');
            GetContasUtente();
        })
        .catch((error) => {
            alert('Eliminação sem sucesso')
        });
}

function toggleAccordion(contentId, btnId) {
    var content = document.getElementById(contentId);
    var btn = document.getElementById(btnId);

    // Toggle the accordion content
}