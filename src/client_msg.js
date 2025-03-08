const templates = require ('./msg_types.js');
const { actions :act, reactions :react }  = require ('./commands.js');
//const {server : s , client:c} = templates;

//const m = 'msg';
//console.log(s.go[m]);
//console.log(com);

function getActionByCommand(command){
    return act[command].split('-')
}
 const getTemplateByAction = (action)=>{
    let template = templates;
    for (const part in action){
        template = template[action[part]]
    }
    return {...template};
 }

 const modifyTemplate = (templ,map_entries)=>{

  map_entries.forEach((value,key)=>{
    templ[key] = value;
  })
    
 }
const entryToMap = (entry,map_keys)=>{
  const map = new Map();
  map_keys.forEach((key, index) => {
    map.set(key, entry[index]);
  });
  return map;
}

const getReactionByAction = (action, agent)=>{
    let choice = react[agent];
    return choice[action];
}

const messageToMap = (message, map_keys)=>{
  // incomplet
  const map = new Map();
  map_keys.forEach(
    (key) => {
      map.set(key, message[key]);
    }
  )
}
/*
//test isolé des fonctions de retour des actions et template
console.log(getTemplateByAction(getActionByCommand('ls')));

//test integral a partir d'une entrée client ayant subie trim()
let entry = 's;leo;bonjour';
entry = entry.split(';');
//les clés de l'input pour le template
const map_keys =['command', 'to', 'msg'];
//test de formation de la map des entrees client
let map_entry = entryToMap(entry,map_keys); 

console.log(map_entry);

//on retire la commande pour recevoir le template
const command = map_entry.get('command');
map_entry.delete('command');
console.log(map_entry);
//de la commande a l'action et d'action au template
const my_action = getTemplateByAction(getActionByCommand(command));
console.log(my_action);

//test de modification du template pour les entrée client
modifyTemplate(my_action, map_entry);
console.log(my_action);
//insertion des metadonnées client
const sender_name = new Map();
sender_name.set('from', 'patricia');
modifyTemplate(my_action, sender_name);
console.log(JSON.stringify(my_action));

*/
module.exports =  {
  entryToMap,
  getActionByCommand,
  getTemplateByAction,
  modifyTemplate,
  getReactionByAction

}

/*maintenant commencent les fonctions de reponse pour les evenement on data
tant pour les serveurs que les clients 
scenario:
- on recois un paquet de messages 
- pour chaque message on verifie l'action 
- on retrouve la reaction conforme cad le template de la reaction
les reactions seront differentes pour les serveurs et client pour une meme
action
- on recupere aussi les autres données du message et on s'en sert pour 
creer une map de modifications a apporter 
- on utlise cette map pour modifier le template

const an_action = 'client-broadcast';
const an_agent = 'server';
let reaction = getReactionByAction(an_action, an_agent);

export{
  ,
  messageToMap
}*/