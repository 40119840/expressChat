var socket = io();

function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}

function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}

socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  console.log(from)
  var padding = (from == me) ? 'left' : 'right';
  var margin = (from == me) ? 'margin-left:-5%' : 'margin-right:-5%';
  var from2 = (from == me) ? 'User' : from;

  console.log(padding);
  $('#messages').append('<li style="margin: 10px; '+ margin +';padding: 8px;  background-color:' + color + '; border-radius: 10px; border-bottom-'+ padding +'-radius: 0px""><b style="color:black">' + from2 + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function(){
  var name = makeid();
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
