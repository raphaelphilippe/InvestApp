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

        //
        let trs = tabela.querySelectorAll('tr');
        console.log('11 ' + trs.length);
        
        if (trs.length > 0) {
            
            for (let i = 0; i < trs.length; i++) {
                let tr = trs[i];
                let tds = tr.querySelectorAll('td');
                console.log('22 ' + tds.length);
                
                if (tds.length > 0) {
                    
                    for (let i = 0; i < tds.length; i++) {
                        let td = tds[i];
    
                        if (td.className === 'ativo') {
                            let ativo = td.innerText;
                            
                            //let cotacao = buscaCotacao(ativo);
                            //console.log(cotacao);
    
                            //if (cotacao != undefined) {
                                
                                let tdCotacao = tds[1];
                                let tdVarDia = tds[2];
                                //tdCotacao.innerText = buscaCotacao(ativo);
                                buscaCotacao(ativo, tdCotacao, tdVarDia);
                                //tdCotacao.innerText = retornaBlast();
                            //}
                        }
                        
                    }
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

    //console.log(url);

    let cotacao;

    request.open('GET', proxy + url);

    //request.setRequestHeader('Access-Control-Allow-Origin', '*');
    //request.setRequestHeader('Accept', '*/*');
    //request.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //request.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //request.setRequestHeader('Content-Type', 'application/json'); //Obrigatorio API
    //request.setRequestHeader('access_token', 'MEUTOKEN'); //Obrigatorio API

    request.send();

    request.addEventListener('readystatechange', () => {
        
        if (request.status === 200){
            let ativoResultado = JSON.parse(request.responseText);
            
            console.log(ativoResultado.results[ativo]['price']);

            cotacao = ativoResultado.results[ativo]['price'];

            tdCotacao.innerText = cotacao;
            tdVarDia.innerText = ativoResultado.results[ativo]['change_percent'];

            //let cotacao = ativoResultado.name;
            //console.log(cotacao);
            //console.log(request.responseText);           
        } else {
           
            return 'N/A';
        }

    });

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

function retornaBlast() {
    
    return 10000;
}


window.addEventListener('load', () => {
    atualizaCotacoes();
})

