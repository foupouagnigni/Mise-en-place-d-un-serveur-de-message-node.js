const Entry = {
    'q': [],
    //hello: 'h',
    'ls':[],
    'b':['msg'],
    's':['to','msg'],
    'cg':['group'],
    'j': ['group'],
    'bg':['group', 'msg'],
    'members':['group'],
    'messages': ['group'],
    'invite':['group', 'dest'],
    'kick': ['group', 'dest', 'reason'],
    'ban':['group', 'dest', 'reason'],
    'unban': ['group', 'dest'],
    'states':['group']
}
//on s'en sert pour preparer les templates
const reactions = {
    server : {
        'client-hello':['server-hello', 'client-broadcast'],
        'client-send': ['server-send_report', 'client-send'],
        'client-broadcast': ['server-send_report','client-broadcast' ],
        'client-list-clients': 'server-list-clients',
        'client-quit': 'server-go',
        'client-error': 'server-diag'

    },

    client:{
        'server-hello':''

    }
}
//correspondance commandes-client et actions transmises au serveur
const actions ={
    'q': 'client-quit',
    'h': 'client-hello',
    'ls': 'client-list-clients',
    'b': 'client-broadcast',
    's': 'client-send',
    'cg': 'cgroupe',
    'j':'join',
    'bg': 'gbroadcast',
    'members': 'members',
    'messages': 'msgs',
    'groups': 'groups',
    'invite': 'invite',
    'ban': 'ban',
    'kick': 'kick',
    'unban':'unban',
    'leave': 'leave',
    'states': 'states'

}

module.exports = {
    Entry ,
    actions,
    reactions
}

/*console.log(commandes);
for (const key in commandes){
    console.log(key);
}*/