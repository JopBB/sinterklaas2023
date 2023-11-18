//TODO: js uitsplitsen over verschillende files voor de verschillende html files
// vervolgens hobby meegeven over de verschillende files heen? Kan dat? 


disliked = 0;

function dislike(){
	if(disliked === 3){
		alert("Deze jongen kan je toch niet afwijzen?!")
		return;
	}
	var currentCardNumber = disliked+1
	var nextCardNumber = disliked+2
	var currentCard = $(".card"+currentCardNumber);
	var nextCard = $(".card"+nextCardNumber);
	var currentNope = $(".nope"+currentCardNumber)

	currentNope.css("display", "inline-block")
	setTimeout(function(){
		currentCard.css("display", "none")
		nextCard.css("display", "inline-block")
		disliked++;
	}, 2000)

}

function like(){
	if(disliked === 3){
		like = $(".like");
		like.css("display", "inline-block")
		setTimeout(function(){
			window.location.assign('messages.html')
		}, 2000)
	}else{
		alert("Weet je dit zeker? Misschien komt je droomman nog wel later voorbij")
	}
}


messageCounter=0
gesprekAfgerond=false;
raadsel1=false;
raadsel2=false;
laatstehartje=false;

function sendMessage(){
	var input = $("#userInput");
	var message = $(".imessage");
	var newMessage = "<p class='from-me'>" + input.val() + "</p>"
	var inputval = input.val();
	var hartjelevel = $("#hartjelevel");
	var hartjeicon = $("#hartjeicon")

	message.append(newMessage);
	$(".imessage").scrollTop($(".imessage").height()+1000);

	if(laatstehartje){
		if(input.val().toLowerCase().includes("leuk") || input.val().toLowerCase().includes("knap") || input.val().toLowerCase().includes("mooi") || input.val().toLowerCase().includes("grappig") || input.val().toLowerCase().includes("fijn")){
			hartjelevel.html("4/4");
			hartjeicon.css("color","red");
			setTimeout(function(){
				message.append("<p class='from-them'>Ooh, ik moet er helemaal van blozen... Ik zal je helpen met het vinden van je cadeau! Zoek in de wijnkast, daar kan je hemt vast vinden!</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
			},3000)
		}
	}

	if(raadsel1 && !raadsel2 && !laatstehartje){
		if(input.val().toLowerCase().includes("schiphol")){
			setTimeout(function(){
				message.append("<p class='from-them'>Ooh ja! Goed gevonden, dankjewel!</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
				hartjelevel.html("2/4");
				hartjeicon.css("color","pink");
				setTimeout(function(){
					alert("Je hebt Jouke goed geholpen, hij vindt je weer wat leuker!")
					message.append("<p class='from-them'>Ik ben bijna bij het schip aangekomen, maar ik loop nu tegen nog een probleempje aan... Ik weet niet zeker of ik het schip wel op kom. Aan het schip hangt een laddertje van drie meter lengte met om de 20 cm een sport. Als het eb is, steken er acht sporten uit het water. Bij vloed stijgt het water met 1.65 meter. Het is nu vloed, en ik weet niet zeker of ik wel op de boot kom. Kan jij anders alvast even uitrekenen: hoeveel sporten er tijdens vloed nog boven het water uitkomen?</p>")
					$(".imessage").scrollTop($(".imessage").height()+1000);
					raadsel2=true;
				},2000)
			},3000)
		}else{
			setTimeout(function(){
				message.append("<p class='from-them'>Nee, het lijkt me niet dat ik via \""+inputval+"\" bij het schip kan komen! Probeer het nog eens?</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
			},3000)
		}
	}else if(raadsel1 && raadsel2 && !laatstehartje){
		if(input.val().includes("8") || input.val().toLowerCase().includes("acht")){
			setTimeout(function(){
				message.append("<p class='from-them'>Ooh... tuurlijk! Ik kan het schip op! Je bent de beste! Dankjewel!</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
				hartjelevel.html("3/4")
				hartjeicon.css("color","#ff5f79");
				setTimeout(function(){
					message.append("<p class='from-them'>Het schip is geblust dankzij jouw hulp!</p>");
					$(".imessage").scrollTop($(".imessage").height()+1000);
					alert("Jouke vindt je behoorlijk leuk inmiddels... Hoe zou je het laatste stukje van z'n hart kunnen veroveren?");
					laatstehartje = true;
				},2000)
			},3000)
		}else{
			setTimeout(function(){
				message.append("<p class='from-them'>Ik geloof niet dat dat klopt! Probeer het nog eens?</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
			},3000)
		}
	}
	if(messageCounter<1 && input.val().split(" ").length > 5){
		setTimeout(function(){
			message.append("<p class='from-them'>Haha, zelden zo'n goede openingszin gehoord!</p>")
			hartjelevel.html("1/4")
			hartjeicon.css("color","#fbe2e6");
			$(".imessage").scrollTop($(".imessage").height()+1000);
			setTimeout(function(){
				alert("Jouke vond je opmerking grappig, en hij vindt je daardoor een beetje leuker. Verover Jouke's hart (rechstbovenin) om je cadeautje te vinden!")
				message.append("<p class='from-them'>Kan ik je ergens mee helpen?</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
				messageCounter++;
			},3500)
		},2000)
	}else if(!raadsel1 && !raadsel2 && (input.val().toLowerCase().includes('cadeau') || input.val().toLowerCase().includes('kado')  )){
		setTimeout(function(){
			message.append("<p class='from-them'>Ik kan je helpen je cadeau te vinden! Maar ik heb eerst wat hulp nodig...</p>")
			$(".imessage").scrollTop($(".imessage").height()+1000);
			setTimeout(function(){
				message.append("<p class='from-them'>Ik moet een schip blussen, maar ik weet niet hoe ik er moet komen. Weet jij hoe ik er kan komen? Ik heb deze hint gekregen:</p>")
				message.append("<img src='./images/boot.jpg'>")
				raadsel1=true;
				setTimeout(function(){
					$(".imessage").scrollTop($(".imessage").height()+1000);
				},200)
			},5000)
		},2000)
	}
	input.val('')
	$(".imessage").scrollTop($(".imessage").height()+1000);
}	

function saveProfile(){
	window.location.assign('index.html');
}
