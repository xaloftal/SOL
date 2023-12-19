GetFormulariosNRespondidos = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3050/formulario?id_utente=" + encodeURI(userSession.id),
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
                response.forEach(form => {
                    container.innerHTML += '';
                })
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

GetFormulariosRespondidos = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3050/formulariorespondidos?id_utente=" + encodeURI(userSession.id),
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
                response.forEach(form => {
                    container.innerHTML += '';
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
            url: "http://localhost:3050/formulario?id_utente=" + encodeURI(userSession.id) + "&especialidade=" + encodeURI(especialidadeChooser) + "&descricao=" + encodeURI(formularioDescricao),
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
        })
        .catch((error) => {
            console.error(error)
        });
}

enviarReclamacao = () => {
    let reclamacaoDescricao = document.querySelector('[data-id="reclamacaoDescricao"]').value;

    $.ajax({
            url: "http://localhost:3050/reclamacao?id_utente=" + 1 + "&descricao=" + reclamacaoDescricao,
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