window.onload = () => {
    GetUtentesFormConsultasMedicosCount();
    GetMedicosByEspecialidade();
}

GetUtentesFormConsultasMedicosCount = () => {
    
    $.ajax({
        url: "http://localhost:3050/misc/GetUtentesFormConsultasMedicosCount",
        type: "GET",
        crossDomain: false,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'Access-Control-Allow-Origin': '*'
    })
    .then((response) => {
        console.log(response);
        document.querySelector('[data-id="medicosCount"]').textContent = response[0].medicos;
        document.querySelector('[data-id="consultasCount"]').textContent = response[0].consultas;
        document.querySelector('[data-id="formulariosCount"]').textContent = response[0].formularios;
        document.querySelector('[data-id="pacientesCount"]').textContent = response[0].doentes;
    })
    .catch((error) => {
        console.error(error)
    });
}

GetMedicosByEspecialidade = () => {
    $.ajax({
        url: "http://localhost:3050/misc/GetMedicosByEspecialidade",
        type: "GET",
        crossDomain: false,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'Access-Control-Allow-Origin': '*'
    })
    .then((response) => {
        let dermatologia = document.querySelector('[data-id="equipaMedicaDermatologia"]');
        let psiquiatria = document.querySelector('[data-id="equipaMedicaPsiquiatria"]');
        let cardiologia = document.querySelector('[data-id="equipaMedicaCardiologia"]');
        let otorrinolaringologia = document.querySelector('[data-id="equipaMedicaOtorrinolaringologia"]');
        let ortopedia = document.querySelector('[data-id="equipaMedicaOrtopedia"]');
        let neurologia = document.querySelector('[data-id="equipaMedicaNeurologia"]');

        response.forEach(med => {
            switch (med.nome_esp) {
                case 'Dermatologia': {
                    dermatologia.innerHTML += '<p class="u-text-medic">' + med.nome_m + ' - ' + med.email_m +'</p>'
                    break;
                }
                case 'Psiquiatria': {
                    psiquiatria.innerHTML += '<p class="u-text-medic">' + med.nome_m + ' - ' + med.email_m +'</p>'
                    break;
                }
                case 'Cardiologia': {
                    cardiologia.innerHTML += '<p class="u-text-medic">' + med.nome_m + ' - ' + med.email_m +'</p>'
                    break;
                }
                case 'Otorrinolaringologia': {
                    otorrinolaringologia.innerHTML += '<p class="u-text-medic">' + med.nome_m + ' - ' + med.email_m +'</p>'
                    break;
                }
                case 'Ortopedia': {
                    ortopedia.innerHTML += '<p class="u-text-medic">' + med.nome_m + ' - ' + med.email_m +'</p>'
                    break;
                }
                case 'Neurologia': {
                    neurologia.innerHTML += '<p class="u-text-medic">' + med.nome_m + ' - ' + med.email_m +'</p>'
                    break;
                }
            }
        });
    })
    .catch((error) => {
        console.error(error)
    });
}