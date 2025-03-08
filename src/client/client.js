const dotenv = require('dotenv').config();
//const debug = require('debug');
const yargs = require('yargs/yargs');
//const yargs = _yargs(hideBin(process.argv));
const debug = require('debug');

const net = require('net');
const readline = require('readline');

const { entryToMap, getActionByCommand, getTemplateByAction, modifyTemplate } = require('../client_msg.js');
const { Entry: in_comms, actions, reactions: samples } = require('../commands.js');

// Utilisation de dotenv pour charger les variables d'environnement


// Création du client
const client = new net.Socket();

//import os from 'os';
/*require('dotenv').config();
const yargs = require('yargs');
const clientLogger = debug('app:client');

var net = require('net');
//creation du client
var client = new net.Socket();
const readline = require('readline');
const os = require('os');*/
//recuperation des parametres de connexion
const host = process.env.HOST;
const port = process.env.PORT;
//definition des aguments et commandes en ligne
const argv = yargs(process.argv.slice(2))
  .options({
    name: {
      alias: 'n',
      description: 'Le nom de l\'utilisateur',
      type: 'string',
      demandOption: true, // Rend l'argument obligatoire
    }
  })
  .argv;
const name = argv.name;
  //par defaut le nom de l'utilisateur doit être son ip ou un  par defaut
  //création d'un logger personnalisé pour le client
const clientLogger = debug('app:'+ name)
clientLogger(`nom de l'utilisateur : ${name}`);

/*


*/

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });  

client.connect(port, host, function() {
    //console.log('Connected');
    clientLogger(`Connecté au serveur ${host}:${port}`);
    client.write(JSON.stringify({"action":"client-hello","name":`${name}`}))
    process.stdout.write('>');
});
process.on(
    'SIGINT', 
    ()=> {
        client.write(JSON.stringify({
            from: name,
            code:'error_code',
            msg: 'error_msg',
            action : 'client-error'
        }));
        clientLogger('quit requested by SIGINT');
        client.end();

    }
);
const pattern = '}{';
client.on('data', function(data) {
    //clientLogger(`received : ${data}`);
    //clientLogger(data.toJSON())
    let sub = data.toString().replaceAll(pattern,'}${');
    sub = sub.split('$');
    //clientLogger(sub)
    //console.log(sub);
    sub.forEach((dat)=>{
        dat = JSON.parse(dat);
        switch(dat.action){
            case 'server-hello':
                clientLogger('Welcome to the tchat');
                //console.log('welcome to the chat');
                break;
            case 'client-broadcast':
                clientLogger(`received : ${dat.msg} from : ${dat.from}`);
                //console.log(`received : ${dat.msg} from : ${dat.from}`);

                client.write(JSON.stringify(
                    {from: name,
                         to: dat.name ,
                         action:'ack-client-broadcast'}
    ))
                break;
            case 'client-send':
                clientLogger(`received : ${dat.msg} from : ${dat.from}`);
    
                client.write(JSON.stringify(
                    {from: name,
                         to: dat.name ,
                         action:'ack-client-send'}
    ))
                break;
            case 'server-list-clients':
                
                clientLogger('client-list :'+ dat.msg);
                //clientLogger ();
                //dat.msg.forEach(element => {
                //    clientLogger(element);
                //});
    
                    break;    
            case 'server-go':
                client.end();
                    break;
            
            case '':
                    break;
            case 'ack-client-broadcast':
                    break;
            case 'ack-client-send':
                    break;
            default:
               // clientLogger(`recceived : ${JSON.parse(data)}`);
               clientLogger('cannot recognize')
                           clientLogger(dat);
    
    
        }

    } )
    
    process.stdout.write('>');
});


reader.resume();

reader.on('line', (input) => {
    let data = input.toString().trim();
     data = data.split(';');
    // clientLogger(data)

    let comm = data[0]

    data.splice(0,1)
    //clientLogger(data)
    const entries = entryToMap(data,in_comms[comm]);
    entries.set('from', name)
    //console.log(entries);
    comm = getTemplateByAction(getActionByCommand(comm));
    //clientLogger(comm)
    modifyTemplate(comm, entries)
    //clientLogger(comm)
    client.write(JSON.stringify(comm))


    /*switch(dataSplit[0]){
        case 'hello':
            client.write(JSON.stringify({"action":"client-hello","name":`${name}`}))
                break;
        case 'b':
            clientLogger(`performing broadcast`);

            client.write(JSON.stringify(
                {from: name,
                     msg: dataSplit[1] ,
                     action:'client-broadcast'}
))
            break;
        case 's':
            clientLogger(`performing client send`);

            client.write(JSON.stringify(
                            {from: name,
                                 to: dataSplit[1] ,
                                 msg: dataSplit[2] ,
                                 action:'client-send'}
            ))

            break;
        case 'q':
            clientLogger(`performing client quit...`);
            client.write(JSON.stringify({
                from: name,
                action : 'client-quit'
            }));
            break;
        case 'ls':
            client.write(JSON.stringify({
                from: name,
                action : 'client-list-clients'
            }))
            
            break;
        default: 
                client.write(JSON.stringify({"action":data,"name":`${name}`}))
                break;
        }*/
        process.stdout.write('>');

    }
  );

  client.on('end', () => {
    clientLogger('Connexion fermée.');
    process.exit();
    // Réagir à la fermeture de la connexion côté client
  });


