const net = require('net');
const { config: dotenvConfig } = require('dotenv');
const { server } = require('../msg_types');
const { getTemplateByAction, getReactionByAction } = require('../client_msg');
const { operations,  msg_provider } = require('../operate')

dotenvConfig()
const host = process.env.HOST;
const port = process.env.PORT;
const clients = new Map();
const groupes = new Map()
const events  = []


var serverdebug = net.createServer((socket)=>{
    //console.log('CONNECTED from ' + socket.remoteAddress + ':' + socket.remotePort);
    console.log(`Connecté depuis ${socket.remoteAddress}:${socket.remotePort}`);
    
    let pseudo = "";

    socket.on('data', function(data) {
            let msg = JSON.parse(data);
           // console.log('DATA received from ' + socket.remoteAddress + ':' + data);
            console.log(`données reçues depuis  ${socket.remoteAddress}:${data}`);

            let reply_samples = {}
             getReactionByAction(msg.action, 'server').forEach((element) => {
                console.log(element);
                const template= getTemplateByAction(element.split('-'))
                console.log(template);
                reply_samples[element]=template
                console.log(reply_samples);
            });
            console.log(reply_samples);

            const messenger = msg_provider[msg.action]
            console.log(messenger);
            const message = messenger(msg,reply_samples)
            console.log(message);
            const executor = operations['agents'][msg.action]
            executor(
              message,
              {
                targets: clients
              }
            )

            /*switch(msg.action){
                case 'client-hello': 
                if (pseudo ==""){
                  pseudo = msg.name;
                }
                    socket.write(JSON.stringify({"sender-ip":socket.remoteAddress+':'+socket.remotePort,"sender-name":msg.name,"action":"server-hello","msg":"Hello"}));
                    clients.set(msg.name, socket);
                    broadcast(socket, pseudo, JSON.stringify(
                      {from: pseudo,
                           msg: `${pseudo} is connected`,
                           action:'client-hello-client'})
                    );

                break;
                case 'client-broadcast':
                  
                broadcast(socket,msg.from, JSON.stringify(
                  {from: msg.from,
                       msg: msg.msg,
                       action:'client-broadcast_report'}
                    )
                          )
                    break;
                case 'client-send':
                    sendMessage(socket, msg.to,JSON.stringify(
                      {from: msg.name,
                           msg: msg.msg,
                           action:'client-send_report'}
      ) )
                    break;
                case 'client-list-clients':
                  const list = Array.from(clients.keys());
                  serverDebug(list);
                  serverDebug(JSON.stringify(list));
                  
                    socket.write(JSON.stringify({
                      msg: list,
                      action: 'server-list-clients'
                    })
                        )
                    break;    
                    case 'client-quit':
                      socket.write(JSON.stringify({
                        msg: 'you have the authorization to go',
                        action: 'server-go'
                      })
                          )
                      break;
                    //case 'client-error':
                      break;
                default:
                   // console.log(msg);
                    serverDebug(msg);

            }*/
        });
        socket.on('end', () => {
          clients.delete(pseudo);
         
          console(`${pseudo} a quitté le chat`);
        })

        socket.on('error' , (err)=>{
          console(`erreur du client ${pseudo}`)
        })

    }).listen(port, host);
