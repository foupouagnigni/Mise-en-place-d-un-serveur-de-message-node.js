var net = require('net');

require('dotenv').config();
const debug = require('debug');
const serverDebug = debug('app:server');
//recupération des parametres de connection
const host = process.env.HOST;
const port = process.env.PORT;


const clients = new Map();
function broadcast(ssender,sender, message) {
  for (const [name, client] of clients.entries()) {
    
    if (name !== sender) {
      client.write(message );
      ssender.write(JSON.stringify({
        from: 'server',
        action: 'server-broadcast-report',
        to: name  
      }))
    } else {}
  }
}
 function sendMessage(emitter, receiver_id,msg){
  receiver = clients.get(receiver_id);
  receiver.write(msg);


 }


var serverdebug = net.createServer((socket)=>{
    //console.log('CONNECTED from ' + socket.remoteAddress + ':' + socket.remotePort);
    serverDebug(`Connecté depuis ${socket.remoteAddress}:${socket.remotePort}`);
    let pseudo = "";

    socket.on('data', function(data) {
            msg = JSON.parse(data);
           // console.log('DATA received from ' + socket.remoteAddress + ':' + data);
            serverDebug(`données reçues depuis  ${socket.remoteAddress}:${data}`);
            switch(msg.action){
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
                           action:'client-send'}
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

            }
        });
        socket.on('end', () => {
          clients.delete(pseudo);
          broadcast(socket, pseudo,JSON.stringify({msg:`${pseudo} a quitté le chat.\n`}));
          serverDebug(`${pseudo} a quitté le chat`);
        })

        socket.on('error' , (err)=>{
          serverDebug(`erreur du client ${pseudo}`)
        })

    }).listen(port, host);

