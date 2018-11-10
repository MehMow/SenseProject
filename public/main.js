var titles = [];
var artists = [];
var artistsAndTitles = [];
spotToken = "BQBfC3PIARgPYo-Uh40USx1lBuU6R3kH6qxchIzTFmPCyE37lv3zQefraiv3xzSdSSF6oAb8tFepVzqUk9A"

function getSpotify() {

	//var url = "https://api.spotify.com/v1/playlists/025d4gXaQI75nCzydaXHby?si=ayFlKNj6SAKFQLT6mryGtA"
	var url ="https://api.spotify.com/v1/playlists/5wUdQ63jkJs3WXukbJc96l/tracks?grant_type=client_credentials&oauth_consumer_key=91e4192115f047bfb488ac4251d2f70c&oauth_token=BQCqqMFSrOwhJgaUABILOFAg8VkjfZ1lSR9ZgwBEIIBHYrW1jw8nLtFlS65pVJDVbMjwud4RM9V3T60uzpw&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1541275098&oauth_nonce=DJ90F7&oauth_version=1.0&oauth_signature=m/vkfR6JF64K85Vr3ggYKk7I2/Y=&grant_type=client_credentials&grant_type=client_credentials"
	//function(result){
		//	 console.log(result.items[0].album_group)
		//})



	$.ajax({
		url: url, 
		method: "GET", 
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + spotToken)
		},
		success: function (result) {
			for (var i = 0; i < result.items.length; i++) {
				console.log(result.items[i].track.artists[0].name)
				console.log(result.items[i].track.name)
				//document.getElementById("testoutput").innerHTML = result.items[i].track.name//total_tracks//album_group
				artistsAndTitles.push(result.items[i].track.artists[0].name)
				artistsAndTitles.push(result.items[i].track.name)

			}

			//console.log("artist: " + artistsAndTitles[4])

			getLinks(artistsAndTitles)

		}

	})

}

//getSpotify()


function getLinks(array) {
	for (var i = 0; i < array.length; i+=2) {
			//for (var i = 0; i <1; i+=2) {

		var artist = array[i].split(" ")
		var title = array[i + 1].split(" ")
		var url =  'http://api.genius.com/search?q=' 

		//console.log("artist: " + artist[0])
	//	console.log("title: " + title[0])


		for (var j = 0; j < artist.length; j++) {
			url += artist[j] + '%20'
		}
		for (var j = 0; j < title.length; j++) {
			if (j + 1 >= title.length) {
				url += title[j]
			} else {
				url += title[j] + '%20'
			}
		}

		$.post("/lyrics", {"url": url}, function(data){
			//console.log(data)
			data = JSON.parse(data)
			console.dir(data.response.hits[0].result.url)
		})

		//DATA SCRAPPING 

		// // ***8
		// $.get(data.response.hits[0].result.url, function( data ) {
  // 			var text = data
  // 			console.log(text)
		// })
		// //var pText = text.match(<div class="lyrics">)[1];
		// // *****




		//getLyrics(data.response.hits[0].result.url)

		//console.log("url: " + url)
		
	// 	$.ajax({
	// 		url: url, 
	// 		method: "GET", 
	// 		beforeSend: function (xhr) {
	// 			xhr.setRequestHeader("Authorization", "Bearer lrAOh-ZubBQPMEc411VLuG2wIXUNZ3zWyJ7VnLA_96mijnGcFcLuFqik6AkQoGTu")
	// 		},
	// 		success: function (result) {
	// 			var songURL = result.hits[0].url


	// 			getLyrics(songURL)
	// 	}

	// })

	}
}


//function getLyrics(url) {
	//var daLyrics = document.getElementsByClassName("lyrics")

	// **********
	// $.ajax({
	// 		url: url, 
	// 		method: "GET", 
	// 		beforeSend: function (xhr) {
	// 			xhr.setRequestHeader("Authorization", "Bearer ImDec_vm3bNeNlJnHmIUQUyyqlH6Pxrv_Ufz8ylTbAhPExzkeb5n5l2deBnNRGsT")
	// 		},
	// 		success: function (result) {
	// 			$(".lyrics").text()
	// 			//console.log(document.getElementById("lyrics").innerHTML)
	// 	}
	// })
	//*******
//}

// function getLyrics(url) {
// 	$.ajax({
// 		url: url
// 		method: "GET"
// 		beforeSend: function (xhr) {
// 			xhr.setRequestHeader("Authorization", "Bearer ImDec_vm3bNeNlJnHmIUQUyyqlH6Pxrv_Ufz8ylTbAhPExzkeb5n5l2deBnNRGsT")
// 		},
// 		success: function (answer) { 
// 			console.log(document.getElementById("lyrics").innerHTML)
// 	})
// }



function getTracks() {
	var url = "https://api.spotify.com/v1/me/top/tracks"


	$.get({
		url: url, 
		method: "GET", 
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + spotToken)
		},
		success: function (result) {
			console.log("artists")
			console.log(result.items[0].name)
		}

	})


}

//getSongs()