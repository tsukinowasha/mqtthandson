(function() {
  var length = 8
  var r = Math.random().toString(36).slice(-length);

  var clientId = "handson-" + r;

  $("#sl").text("サーバー名 (clientId:" + clientId + ")");

  var topic = "handson/chat"; // fixed topic name

  var client;

  $("#connect").on('click', function(){
    var username = $("#username").val();
    var password = $("#password").val();
    var server =  $("#server").val();
    client = new Paho.MQTT.Client(server, 8080, clientId);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    try {
      client.connect({onSuccess:onConnect, onFailure: onFailure,
                      userName:username, password:password, useSSL: false});
    } catch(e) {
      alert(e);
    }
  });
  $("#disconnect").on('click', function(){
    $("#status").text("Disonnected");
    client.disconnect();
  });
  $("#clear").on('click', function(){
    $("#body").val("");
  });
  $("#msg").on("keypress", function(e){
    if ( e.which == 13 ) {
      var body = $("#msg").val();
      var message = new Paho.MQTT.Message(body);
      message.destinationName = topic;
      client.send(message);
      $("#msg").val("");
	}
  });

  function onFailure(e){
    alert("connection failed");
  };
  function onConnect() {
    $("#status").text("Connected");
    client.subscribe(topic);
  };
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
      alert("コネクション切断"+responseObject.errorMessage);
  };
  function onMessageArrived(message) {
    var m = message.payloadString + "\n";
    $("#body").val($("#body").val() + m)
  };

}).call(this);