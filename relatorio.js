function logout(){
    window.location = "index.php";
}


function carregardados() {
    
    var usuariologado = localStorage.getItem("logado");
    if (usuariologado == null) {
        window.location = "loginadvogado.html";
    } else {
        carregaradvogados();
        carregarclientes();
        var usuariojson = JSON.parse(usuariologado);
        document.getElementById("foto").innerHTML =
            "<img  class='img-fluid' alt='Foto não encontrada'src=imagens/" + usuariojson.foto + ">";
        document.getElementById("dados").innerHTML =
            "<h3>" + usuariojson.nome + "<br>" + usuariojson.email + "<br></h3><br><br><br>" +
            "<button type='button' class='btn btn-outline-danger' onclick='logout()''>Logout</button>";
    }
}

function montartabela(lista){
    var saida = 
    "<table align='center' class='table table-hover'><thead class='thead-dark'> <tr>" +
    "<th>Processo</th>   <th>Cliente</th>  <th>Data de Inicio</th> <th>Advogado</th></tr></thread>";

    for (cont=0;cont<lista.length;cont++){
        saida+=
        "<tr>" +
        "<td>" +" <button id='idprocesso' value = '"+ lista[cont].idprocesso +"'onclick = 'direcionar()'</button>"+ "</td>" + 
        "<td>" + lista[cont].cliente.nomecli + "</td>" + 
        "<td>" + lista[cont].dtinicio + "</td>" + 
        "<td>" + lista[cont].advogado.nome + "</td>" + 
        "</tr>";


    }

    saida += "</table>";
    document.getElementById("resultado").innerHTML=saida;

}



function filtrar(){

    
    if(
        document.getElementById("chkadvogado").checked==false && 
        document.getElementById("chkcliente").checked==false &&
        document.getElementById("chkdata").checked==false
        )
        {
            fetch("https://backend-rvs.herokuapp.com/listaprocessosordenado")
            .then(res => res.json())
            .then(res => montartabela(res))
            .catch(err => {window.alert("Sem processos")});
    }else {
        var rota = "relatoriopor";
        if(document.getElementById("chkaadvogado").checked==true){
            rota+="idadvogado";
        }
        if(document.getElementById("chkcliente").checked==true){
            rota+="cliente";
        }
        if(document.getElementById("chkdata").checked==true){
            rota+="data";
            var data = document.getElementById("txtdata").value;
                var ano = data.substring(0, 4);
                var mes = data.substring(5, 7);
                var dia = data.substring(8, 10);

                var databrasil = dia + "/" + mes + "/" + ano
        }
        
      var objeto = {
          nomecli : document.getElementById("cmdcliente").value,
          dtinicio : databrasil,
          advogado : {
              id : document.getElementById("cmdadvogado").value
          }
      };


      var cabecalho = {
          method:"POST",
          body: JSON.stringify(objeto),
          headers : {
              "content-type" : "application/json"
          }
      }

      fetch("https://backend-rvs.herokuapp.com/" + rota , cabecalho)
      .then(res=> res.json())
      .then(res => montartabela(res))
      .catch(err => {window.alert("Sem processos")});   

    }

}


function direcionar(){
	
	
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

function preencherclientes(lista) {
    var saida = "<option value ='0'>Selecione um Cliente...</option>";

    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            "<option value='" + lista[cont].idcli + "'>" + lista[cont].nomecli + "</option>";
	    
    }
    document.getElementById("idcli").innerHTML = saida;
	console.log(lista[0]);
}

function carregarclientes() {
    fetch("https://backend-rvs.herokuapp.com/relatorioclientes")
        .then(res => res.json())
        .then(res => preencherclientes(res));
		
}



    
