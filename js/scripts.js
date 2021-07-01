function atualizaCotacoes() {
    let tabela = document.querySelector('table');

    if (tabela != null) {
        
        //console.log('pegou a tabela');

        let tds = tabela.querySelectorAll('td');

        //console.log(tds.length)

        for (let i = 0; i < tds.length; i++) {
            
            let td = tds[i];

            if (td.innerText != '') {
                //console.log(td.innerText);
            }
        }

        let ths = tabela.querySelectorAll('th[scope=row]');

        if (ths.length > 0) {
            //console.log(ths.length)

        }

        let ativos = tabela.querySelectorAll('td[class=ativo]');

        for (let i = 0; i < ativos.length; i++) {
            
            let ativo = ativos[i].innerText;

            //console.log(ativo);

            //let cotacao = buscaCotacao(ativo);

            //console.log('depois da funcao : ' + cotacao);

        }

        //Busca pelas <tr> e em seguida pelas <td>
        let trs = tabela.querySelectorAll('tr');
        
        if (trs.length > 0) {
            
            for (let i = 0; i < trs.length; i++) {
                let tr = trs[i];
                let tds = tr.querySelectorAll('td');
                
                if (tds.length > 0) {
                    
                    let td = tds[0];
                    let ativo = td.innerText;    
                    let tdCotacao = tds[1];
                    let tdVarDia = tds[2];
                    buscaCotacao(ativo, tdCotacao, tdVarDia);
                }
            }   
        }
    }
}

function buscaCotacao(ativo, tdCotacao, tdVarDia) {
    
    let request = new XMLHttpRequest();
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = `https://api.hgbrasil.com/finance/stock_price?key=b167f9b0&symbol=${ativo}`
    //url = `http://viacep.com.br/ws/23094100/json/`;

    request.addEventListener('readystatechange', () => {
        
        if (request.status === 200){
            let ativoResultado = JSON.parse(request.responseText);
            tdCotacao.innerText =   ativoResultado.results[ativo]['price'];
            tdVarDia.innerText =    ativoResultado.results[ativo]['change_percent'];

        } else {
            tdCotacao.innerText =   'N/A';
            tdVarDia.innerText =    'N/A';
        }

    });

    request.open('GET', proxy + url);

    //request.setRequestHeader('Access-Control-Allow-Origin', '*');
    //request.setRequestHeader('Accept', '*/*');
    //request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //request.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //request.setRequestHeader('Content-Type', 'application/json'); //Obrigatorio API
    //request.setRequestHeader('access_token', 'MEUTOKEN'); //Obrigatorio API

    request.send();

}

//XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
//var newSend = function(vData) {
//    this.setRequestHeader('x-my-custom-header', 'some value');
//    this.realSend(vData);
//};
//XMLHttpRequest.prototype.send = newSend;

//Access-Control-Allow-Origin: https://perfil.treinaweb.com.br
//Access-Control-Allow-Methods: POST, GET
//Access-Control-Allow-Headers: *
//Access-Control-Max-Age: 86400



window.addEventListener('load', () => {
    atualizaCotacoes();
})

