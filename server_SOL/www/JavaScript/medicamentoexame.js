
$(document).ready(function() {
    const populateDropdownMedicamento = (data) => {
        const dropdown = $("#medicamentoDropdown");

        // Clear existing options
        dropdown.empty();

        // Add options from the API response
        data.forEach(item => {
            dropdown.append(`<option value="${item.id_medicamento}">${item.nome_med}</option>`);
        });
    };

    const populateDropdownExame = (data) => {
        const dropdown = $("#exameDropdown");

        // Clear existing options
        dropdown.empty();

        // Add options from the API response
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
                "Access-Control-Allow-Origin":"*"
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
    GetMedicamentos();

    const GetExames = () => {
        $.ajax({
            url: "http://localhost:3050/exame",
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
            populateDropdownExame(response);
        })
        .catch((error) => {
            console.error(error)
        });
    }
    GetExames();
});
