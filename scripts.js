var request = new XMLHttpRequest();

request.open('GET','https://ghibliapi.herokuapp.com/films', true);

request.onload = function() {

}

request.send();

var data = JSON.parse(this.response);

data.forEach(move => {
    console.log
})
