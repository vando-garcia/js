const moduloSync = (function () {

    const btnSync = document.querySelector('#btnSync');
    btnSync.addEventListener('click', async function() {
        btnSync.classList.replace('botaoSync--sincronizando', 'botaoSync--esperando');
        btnSync.disabled = true;

        const infoUsuario = {
            usuario: 'vandogarcia_10@hotmail.com',
            cartoes: moduloMural.getCartoes() //Array com o conteúdo dos cartões
        }

        let url = 'https://ceep.herokuapp.com/cartoes/salvar';
        const configuracao = {
            method:'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(infoUsuario)
        }
        try {
            const resposta = await fetch(url, configuracao);
            const dados = await resposta.json();
            moduloNotificacao.notificar(`${dados.quantidade} cartões salvos com sucesso no servidor!`);
        }
        catch(erro) {
            moduloNotificacao.notificar('Não foi possivel salvar seus cartões!');
            console.error(erro);
        }

        btnSync.disabled = false
        btnSync.classList.replace('botaoSync--sincronizando', 'botaoSync--esperando');

    }); 
    return {
        sincronizar() {
            btnSync.click();
        }
    }


}) ();