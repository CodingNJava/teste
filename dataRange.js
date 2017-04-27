let dataTipo = $('input[name=data]:checked');
let valTipo = dataTipo.val();

const data = new Date();
let dia = data.getDay();
let mes = data.getMonth() + 1;
let ano = data.getFullYear();

if( dia<10 ){
    dia = `0${dia}`;
}

if( mes<10 ){
    mes = `0${mes}`;
}

const hoje = `${dia}-${mes}-${ano}`;


console.log(`Data: ${hoje}. Horario de brasilia.`)

const dataIni = $('#dataIni').val();
const dataFin = $('#dataFni').val();

//datas que vao no submit
let dataInicial = '';
let dataFinal   = '';


$(function(){
    console.log(valTipo);
    if(valTipo == "3"){
        
        dataInicial= `01-${mes}-${ano}`
        dataFinal  = `${hoje}`;
        
        $('#dataIni').val(dataInicial);
        $('#dataFin').val(dataFinal);
        
    }

});



$('input[name=data]').change(function(){
    
    let tipo = parseInt($(this).val(), 10);
    
    switch (tipo) {
    case 1:
        console.log("30 dias");

       function getTrintaDias() {
            var agora = new Date();
            var trintaDias = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - 30);
            return trintaDias ;
        }

        const trintaDias = getTrintaDias();
        let trintaDiasDia= trintaDias.getDate();
        let trintaDiasMes= trintaDias.getMonth() + 1;
        let trintaDiasAno= trintaDias.getFullYear();

        if( trintaDiasDia<10 ){
            trintaDiasDia = `0${trintaDiasDia}`;
        }

        if( trintaDiasMes<10 ){
            trintaDiasMes = `0${trintaDiasMes}`;
        }

        const trintaDiasAtras = `${trintaDiasDia}-${trintaDiasMes}-${trintaDiasAno}`;

        console.log(trintaDiasAtras);

        
        dataInicial= `${trintaDiasAtras}`;
        dataFinal  = `${hoje}`;
        
        $('#dataIni').val(dataInicial);
        $('#dataFin').val(dataFinal);
        break;
    case 2:
        console.log("15 dias");
        function getQuinzeDias() {
            var agora = new Date();
            var quinzeDias = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - 15);
            return quinzeDias ;
        }

        const quinzeDias = getQuinzeDias();
        let quinzeDiasDia= quinzeDias.getDate();
        let quinzeDiasMes= quinzeDias.getMonth() + 1;
        let quinzeDiasAno= quinzeDias.getFullYear();

        if( quinzeDiasDia<10 ){
            quinzeDiasDia = `0${quinzeDiasDia}`;
        }

        if( quinzeDiasMes<10 ){
            quinzeDiasMes = `0${quinzeDiasMes}`;
        }

        const quinzeDiasAtras = `${quinzeDiasDia}-${quinzeDiasMes}-${quinzeDiasAno}`;

        console.log(quinzeDiasAtras);

        
        dataInicial= `${quinzeDiasAtras}`;
        dataFinal  = `${hoje}`;
        
        $('#dataIni').val(dataInicial);
        $('#dataFin').val(dataFinal);
        break; 

    default:
        console.log(`Mes atual`)
        dataInicial= `01-${mes}-${ano}`;
        dataFinal  = `${hoje}`;
        
        $('#dataIni').val(dataInicial);
        $('#dataFin').val(dataFinal);
        break;
    }
});
