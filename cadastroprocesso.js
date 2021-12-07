function gravar() {

    if (document.getElementById("dtinicio").value.length > 0 
        && document.getElementById("tipoacao").value.length > 0 
        && document.getElementById("nomecon").value.length > 0
		&& document.getElementById("nprincipal").value.length > 0
		&& document.getElementById("orgao").value.length > 0
		&& document.getElementById("natureza").value.length > 0
		&& document.getElementById("idcli").value.length > 0
		&& document.getElementById("idadvogado").value.length > 0
		
		
		) {



                var data = document.getElementById("dtinicio").value;
                var ano = data.substring(0, 4);
                var mes = data.substring(5, 7);
                var dia = data.substring(8, 10);

                var databrasil = dia + "/" + mes + "/" + ano
                
                var objeto = {
                    dtinicio: databrasil,
                    tipoacao: document.getElementById("tipoacao").value,
                    nomecon: document.getElementById("nomecon").value,
                    nprincipal: document.getElementById("nprincipal").value,
                    orgao: document.getElementById("orgao").value,
					natureza: document.getElementById("orgao").value,
                    cliente: {
                        idcli: document.getElementById("idcli").value

                    },
					advogado: {
                        id: document.getElementById("idadvogado").value

                    }
					
                }

                var cabecalho = {
                    method: "POST",
                    body: JSON.stringify(objeto),
                    headers: {
                        "Content-type": "application/json"
                    }
                }

                fetch("https://backend-rvs.herokuapp.com/novoprocesso", cabecalho)
                    .then(res => res.json())
                    .then(res => { 
                        document.getElementById("alertdata").innerHTML = 
                        "<div class='alert alert-success' role='alert'> Processo cadastrado com sucesso! </div>"
                        
                        window.location.reload(true);
                    })
                    .catch(err => { 
                        document.getElementById("alertdata").innerHTML = 
                        "<div class='alert alert-danger' role='alert'> Serviço indisponível no momento, tente mais tarde </div>";
                        //window.alert("ocorreu um erro") 
                    });

           
        
    
    }

     else {
        document.getElementById("alertdata").innerHTML =
            "<div class='alert alert-danger' role='alert'> Preencha todos os campos </div>";

    }
}

function carregardados(){
	carregarclientes();
	carregaradvogados();
}

function preencherclientes(lista) {
    var saida = "<option value ='0'>Selecione um Cliente...</option>";

    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            "<option value='" + lista[cont].idcli + "'>" + lista[cont].nomecli + "</option>";
    }
    document.getElementById("idcli").innerHTML = saida;
}

function carregarclientes() {
    fetch("https://backend-rvs.herokuapp.com/relatorioclientes")
        .then(res => res.json())
        .then(res => preencherclientes(res));
}


function preencheradvogados(lista) {
    var saida = "<option value ='0'>Selecione um Advogado...</option>";

    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            "<option value='" + lista[cont].idadvogado + "'>" + lista[cont].nome + "</option>";
			
    }
    document.getElementById("idadvogado").innerHTML = saida;
}

function carregaradvogados() {
    fetch("https://backend-rvs.herokuapp.com/listaadvogados")
        .then(res => res.json())
        .then(res => preencheradvogados(res));
}



