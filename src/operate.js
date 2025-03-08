
/*
chaque operation recois une map de messages
elle retire les messages dont elle a besoin par leur nom
 */
const agents = {
     Server :{
        broadcast: (auth_socket, auth_name, message, targets,callback) => {
          // Logique pour la diffusion à tous les clients
          for (const [name, client] of targets.entries()) {
    
            if (name !== auth_name) {
              client.write(message['client-broadcast'] );
              callback(name)
            
            } else {}
          }
        },
        privateMessage: () => {
          // Logique pour les messages privés
        },
        createGroup: () => {
          // Logique pour la création de groupe
        },
        manageGroup: () => {
          // Logique pour la gestion des groupes
        },
        // Autres fonctions du serveur...
      },
      
      // Module contenant les fonctions pour les opérations du client
       Client:{
        displayMessage: () => {
          // Logique pour afficher les messages côté client
        },
        processData: () => {
          // Logique pour le traitement des données renvoyées par le serveur
        },
        // Autres fonctions du client...
      }
      
}

const msg_provider = {
    'client-broadcast': (input, models)=> {
        // sequence d'opérations en cas de broadcast 
        //ici on modifie les templates pour les passer aux agents
        const subject = { ...models['client-broadcast'] };
        subject.from = input.from;
        subject.msg = input.msg;

        const report = {...models['server-broadcast_report']};
        report.from = input.from;
            return {
                'client-broadcast': subject,
                'server-broadcast_report': report
            };
      },
      'client-hello': (input, models)=> {
        // sequence d'opérations en cas de broadcast 
        //ici on modifie les templates pour les passer aux agents
        const subject = { ...models['server-hello'] };
        subject.from = input.name;
        subject.msg = `hello ${input.name} !`;

        const broad = {...models['client-broadcast']};
        broad.from = input.name;
        broad.msg = `${input.name} is connected`
            return {
                'server-hello': subject,
                'client-broadcast': broad
            };
      },
    // Autres situations avec leurs clés d'opérations et paramètres...
  };

  const operations={
    server:{
        //l'appel se fait par passage d'un actors conforme
        //les actors sont des regstres du serveur
        'client-broadcast':(msgs, actors)=>{
            agents.server.broadcast(
                actors.auth_socket,
                actors.auth_name,
                msgs,
                actors.targets,
                (a_name)=>{
                  message['server-broadcast_report'].to = a_name;
              auth_socket.write(message['server-broadcast_report'])
                }
            )

        },
        'client-hello':(msgs, actors)=>{
          actors.auth_socket.write(JSON.stringify(msgs['server-hello']))
          actors.clients.set(actors.auth_name, actors.auth_socket)
          agents.server.broadcast(
              actors.auth_socket,
              actors.auth_name,
              msgs,
              actors.clients,
              (a_name)=>{
                
              }
          )

      },

    }
  }

module.exports = {
  msg_provider,
  operations,
  agents
}
  /*
  passons aux scenarios de tests 

  le serveur ou le client reçois des données
  le message est scruté et les operations sont declenchées par l'action 
  le reste des données est pris en compte pour alimenter les operations
  les operations font appel aux templates et les modifient % à l'input


  */