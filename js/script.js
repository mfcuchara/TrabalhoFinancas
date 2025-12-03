exibir_listagem()
resumo_financeiro()

function cadastro(){
    var salario = parseFloat(document.getElementById("salario").value).toFixed(2)
    if(isNaN(salario)){
        alert("Preencha este campo!")
        return
    }
    resumo_financeiro()
}


document.getElementById("formdespesas").addEventListener("submit", function(event){
    event.preventDefault();

    var data=document.getElementById("data").value
    var nome=document.getElementById("nome").value
    var valor=document.getElementById("valor").value

    var despesas={data:data, nome:nome, valor:valor}
    var lista_despesas=JSON.parse(localStorage.getItem('listagem')) || []
    lista_despesas.push(despesas)
    localStorage.setItem('listagem',JSON.stringify(lista_despesas))
    document.getElementById('formdespesas').reset()
    exibir_listagem()
    resumo_financeiro()

})

function exibir_listagem(){
    var lista_despesas=JSON.parse(localStorage.getItem('listagem'))  || []
    var output=document.getElementById('output')
    output.innerHTML=''
    for(let i=0;i<lista_despesas.length;i++){
        let li=document.createElement('li')
        li.textContent='Data: '+lista_despesas[i].data+' | Nome: '+lista_despesas[i].nome+' | Valor: R$ '+lista_despesas[i].valor
        output.appendChild(li)
        
    }
}

function deletar(){
    localStorage.removeItem('listagem')
    exibir_listagem()

    resumo_financeiro()

}

function resumo_financeiro(){
    var resumo=document.getElementById("resumo")
    resumo.innerHTML=""

    var salario = parseFloat(document.getElementById("salario").value).toFixed(2)
    if(isNaN(salario)){
        salario=0
    }

    var parSalario = document.createElement('p')
    parSalario.textContent = 'Salário: R$'  + salario
    resumo.appendChild(parSalario)

    var historico = JSON.parse(localStorage.getItem('listagem')) || []
    var totalDespesas = 0
    for(let i=0; i<historico.length; i++){
        totalDespesas = totalDespesas + parseFloat(historico[i].valor)

    }

    var parDespesas = document.createElement('p')
    parDespesas.textContent = 'Total das despesas: R$' + totalDespesas.toFixed(2)
    resumo.appendChild(parDespesas)

    var saldoFinal = salario - totalDespesas
    var total = document.createElement('p')
    total.textContent = 'Saldo final: R$' + saldoFinal.toFixed(2)
    resumo.appendChild(total)

}

    
