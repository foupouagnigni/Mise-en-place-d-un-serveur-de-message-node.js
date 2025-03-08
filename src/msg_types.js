const client = {
    hello: {
        name: 'sender_name',
        action: 'client-hello',
        
    },
    send: {
        from: 'sender_name',
        to: 'receiver_name',
        msg: 'message_content',
        action: 'client-send'
    },

    broadcast:{
        from: 'sender_name',
        msg: 'msg_content',
        action: 'client-broadcast'
    },
    list:{
        clients:{
        from: 'sender_name',
        action: 'client-list-clients'
    }
},
    quit : {
        from: 'sender_name',
        action: 'client-quit'

    },
    error:{
        code : 'error_code',
        msg: 'error_msg',
        action: 'client-error'
    }

}
const cgroupe = {from: 'sender_name', group: 'group_name' ,action:'cgroupe'}

const join = {from: 'sender_name' ,group: 'group_name', action:'members'}
const gbroadcast = {from: 'sender_name' ,group: 'group_name', msg: 'message_content' ,action:'gbroadcast'}
const members = {from: 'sender_name' ,group: 'group_name', action:'members'}
const msgs = {from: 'sender_name' ,group: 'group_name', action:'msgs'}
const groups =  {name: 'sender_name' ,action:'groups'}
const leave = {from: 'sender_name',group: 'group_name' ,action:'leave'}
const invite = {from: 'sender_name' , group: 'group_name', dest: 'receiver_name', action:'invite'}
const kick = {from: 'sender_name' , group: 'group_name', dest: 'receiver_name', reason: 'reason', action:'kick'}
const ban= {from: 'sender_name' , group: 'group_name', dest: 'receiver_name', reason: 'reason', action:'ban'}
const states = {from: 'sender_name' , group: 'group_name', action:'states'}

const server = {
    hello: {
        from:'sender_name',
        action:'server-hello',
        msg: 'msg_content'
    },
    braodcast_report: {
        from: 'server',
        action: 'server-broadcast_report',
        to: ''  
      },
    send_report:{
        from: 'server',
        action: 'server-send_report',
        to:''
    },
    list:{
        clients:{
        msg: [],
        action: 'server-list-clients'
      }
    },
      go:{
        msg: 'you have the authorization to go',
        action: 'server-go'
      },

      diag: {
        msg:'diag_msg',
        action: 'server-diag'
      }


}

module.exports =  {
    client ,
    server,
    cgroupe,
    join,
    gbroadcast,
    members,
    msgs,
    groups,
    leave,
    invite,
    kick,
    ban,
    states
     };