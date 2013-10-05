module.exports  = {

  register : function(client, plugins){

    client.on('user_joined', function(user){
      client.say('@'+user.name+' Hi');
    });


  }

};