
	var socket = io.connect('http://localhost:8080');
	var displayMessage=""; //string of messages
	
	socket.on('messages', function (data){
		//alert(data.alertBox);
	});

	socket.on('submission', function (data){
		displayMessage += data.clientName + " : "+data.content + "<br>";
		display();
		// console.log(data);
		//alert(data.content);
	});

	socket.on('getOthersNames', function (data){

		displayMessage += "Available users: " + data.list + "<br>";
		display();
		// console.log(data);
	});


	function setClientName() {
   
    	var nickName = document.getElementsByName("Nickname")[0].value;
    	socket.emit('setClientName', nickName);

    	hideNameForm();
    	showChatRoom();


	}

	function hideNameForm(){
		document.getElementById("alias").style.display="none";
	}

	function showChatRoom(){
		document.getElementById("chatroom").style.display="block";
		var nickName = document.getElementsByName("Nickname")[0].value;
		displayMessage = nickName + " has joined the chatroom" + "<br>";
		socket.emit('getOthersNames');
		display();

	}

	function clientMessage(){
		var thisMessage = document.getElementsByName("messageContent")[0].value;
		var username = document.getElementsByName("Nickname")[0].value;

		socket.emit('submission', thisMessage);
		document.getElementsByName("messageContent")[0].value ="";
		displayMessage += username + " : "+ thisMessage + "<br>";
		display();
	}

	function display(){
		document.getElementById("chatbox").innerHTML= displayMessage;

	}



		// videoloading

//--------------------
// GET USER MEDIA CODE
//--------------------
navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

var video;
var webcamStream;
      
function startWebcam() {
if (navigator.getUserMedia) {
   navigator.getUserMedia (

      // constraints
      {
         video: true,
         audio: false
      },

      // successCallback
      function(localMediaStream) {
          video = document.querySelector('video');
         video.src = window.URL.createObjectURL(localMediaStream);
          webcamStream = localMediaStream.getTracks()[0];
      },

      // errorCallback
      function(err) {
         console.log("The following error occured: " + err);
      }
   );
} else {
   console.log("getUserMedia not supported");
}  
}
      
      function stopWebcam() {
      webcamStream.stop();
      }



