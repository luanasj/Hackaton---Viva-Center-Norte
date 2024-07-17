const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
	console.log(message.body);
    if(message.hasMedia){
        client.sendMessage(message.from, 'Aguarde um momento');
        //fetch post ou fetch patch
        setTimeout(() => {
            client.sendMessage(message.from, 'Cumpom válido! Você gostaria de conferir seu saldo de cashback? \n 4.Sim \n 5.Não \n 6.Quero enviar outro Cupom');
        }, 3000);
    } else if(message.body.includes("cupom") || message.body.includes("fiscal") || message.body.includes("nota")){
        client.sendMessage(message.from, 'Envie uma foto do seu cupom fiscal para liberar o Cashback');  
    } else {
        switch (message.body.toLocaleLowerCase()) {
            case "1":
              client.sendMessage(message.from, 'Okay, vamos precisar de algumas informações');
              break;
            case '2':
                client.sendMessage(message.from, 'okay, pode mandar um Oi caso mude de idéia!');
              break;
            case "oi" || "olá":
                client.sendMessage(message.from, 'Quer fazer o seu cadastro e ganhar cupons exclusivos para compras no Center Norte?');
                client.sendMessage(message.from, '1. Quero! \n 2. Não, obrigado(a) \n 3. Outro' );
              break;
            case "3":
                client.sendMessage(message.from, 'Acesse o aplicativo Center Norte para mais informações. \n Disponível na AppStore e PlayStore.' );
              break;
            case '4':
                customerId = 5
                fetch(`http://localhost:8000/wallet/${customerId}`, {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then((dados)=>{
                    client.sendMessage(message.from, 'Seu saldo atual de cashback é' + dados.balance + 'válido até' + dados.transactions[1].deadline);
                    client.sendMessage(message.from, 'Acesse o aplicativo Center Norte para mais informações. \n Disponível na AppStore e PlayStore.' )
                })
                client.sendMessage(message.from, 'Seu saldo atual de cashback é' + 'variavel' + 'válido até' + 'data');
                client.sendMessage(message.from, 'Acesse o aplicativo Center Norte para mais informações. \n Disponível na AppStore e PlayStore.' );          
              break;
            case '5':
                client.sendMessage(message.from, 'Okay, se precisar de mais alguma coisa é só mandar um Oi!' ); 
                break;   
            case '6':
                client.sendMessage(message.from, 'Envie uma foto do seu cupom fiscal para liberar o Cashback');   
                break;   
            default:
                client.sendMessage(message.from, 'Hm, acho que não consigo te ajudar com isso. Você já tentou acessar o app Center Norte? Talvez nele você encontre o que precisa!' );    
                break;      
          }
    }

    
});

client.initialize();


// start json-server:
// json-server --watch db.json --port 8000