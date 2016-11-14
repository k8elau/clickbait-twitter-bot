var Twit = require('twit');
var fs = require('fs');
//load dogs.json
var dogBuffer = fs.readFileSync('./corpora/dogs.json');
dogs = JSON.parse(dogBuffer).dogs;

var adjectiveBuffer = fs.readFileSync('./corpora/adjs.json');
adjective = JSON.parse(adjectiveBuffer).adjs;

var verbBuffer = fs.readFileSync('./corpora/verbs.json');
verb = JSON.parse(verbBuffer).verbs;

var objectBuffer = fs.readFileSync('./corpora/objects.json');
objects = JSON.parse(objectBuffer).objects;

var occupationBuffer = fs.readFileSync('./corpora/occupations.json');
occupations = JSON.parse(occupationBuffer).occupations;

var moodBuffer = fs.readFileSync('./corpora/moods.json');
mood = JSON.parse(moodBuffer).moods;

var foodBuffer = fs.readFileSync('./corpora/menuItems.json');
food = JSON.parse(foodBuffer).menuItems;

var animalBuffer = fs.readFileSync('./corpora/common.json');
animal = JSON.parse(animalBuffer).animals;

var bodyBuffer = fs.readFileSync('./corpora/bodyParts.json');
bodyPart = JSON.parse(bodyBuffer).bodyParts;

var nounBuffer = fs.readFileSync('./corpora/nouns.json');
noun = JSON.parse(nounBuffer).nouns;

var interjectionBuffer = fs.readFileSync('./corpora/interjections.json');
interjection = JSON.parse(interjectionBuffer).interjections;

var adverbBuffer = fs.readFileSync('./corpora/adverbs.json');
adverb = JSON.parse(adverbBuffer).adverbs;

var firstBuffer = fs.readFileSync('./corpora/firstNames.json');
firstName = JSON.parse(firstBuffer).firstNames;

var lastBuffer = fs.readFileSync('./corpora/lastNames.json');
lastName = JSON.parse(lastBuffer).lastNames;

var shockBuffer = fs.readFileSync('./corpora/shocked.json');
shocked = JSON.parse(shockBuffer).shocked;

function getRandom(arr){
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function randomVerb(arr, past){
     var index = Math.floor(Math.random() * arr.length);
    if(past){
        return arr[index].past;
    }
    else return arr[index].present;
}

function randomNumber(){
    var randomNum = Math.floor(Math.random() * 12);
    return randomNum;
}

function listNumber(){
    var listNum = Math.floor(Math.random() * 100);
    return listNum;
}
// load .env
require('dotenv').config();

var config = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
}

var T = new Twit(config);


function tweet(){
    var pickOne = randomNumber();
    console.log(pickOne);
    if(pickOne == 0){
         var msg = 'Scientists ' + randomVerb(verb, false) + ' him! ' + getRandom(occupations) + ' discovers a new species of ' + getRandom(animal);
    }
    else if(pickOne == 1){
        var msg = 'We know what your favorite ' + getRandom(objects) + ' is based off your ' + getRandom(bodyPart);
    }
    else if (pickOne == 2){
        var msg = 'Feeling ' + getRandom(mood) + ' and not sure why? The answer may ' + getRandom(shocked) + ' you!';
    }
    else if(pickOne == 3){
        var msg = listNumber() + ' types of ' + getRandom(food) + 's that will make you feel ' + getRandom(mood);
    }
    else if(pickOne == 4){
        var msg = listNumber() + ' new types of ' + getRandom(noun) + 's that will ' + getRandom(shocked) + ' you!';
    }
    else if(pickOne == 5){
        var msg = 'Meet the ' + getRandom(occupations) + ' who ' + randomVerb(verb, true) + ' ' + listNumber() + ' ' + getRandom(animal) + 's.';
    }
    else if(pickOne == 6){
        var msg = 'This story about ' + getRandom(noun) + 's will make you ' + randomVerb(verb, false);
    }
    else if(pickOne == 7){
        var msg = 'We can guess when you ate your last ' + getRandom(food) + ' based on your favorite ' + getRandom(objects);
    }
    else if(pickOne == 8){
        var msg = 'This list of ' + getRandom(objects) + 's will make you cry ' + getRandom(adverb);
    }
    else if(pickOne == 9){
        var msg = getRandom(interjection) + '! ' + listNumber() + ' ' + getRandom(adjective) + ' ' + getRandom(objects) + 's that will blow your mind!';
    }
    else if(pickOne == 10){
         var msg = 'Meet ' + getRandom(firstName) + ' ' + getRandom(lastName) + ', the person with ' + listNumber() + ' ' + getRandom(dogs) +'s.';
    }
    else if(pickOne == 11){
        var msg = 'This ' + getRandom(animal) + ' ' + randomVerb(verb, true) + " for the first time. You won't  BELIEVE what happened after!";
    }

    
T.post('statuses/update', {status: msg}, 
      function(err, data, res){
    console.log(data);
});
}

setInterval(tweet, 1000 * 60 * 5);
tweet();