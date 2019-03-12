var express = require('express');
var app = express();
var fs = require("fs");


app.get('/motivet',(req,res) =>{
    return res.send('MOTIVET');
    
});

var open_data = fs.readFileSync('horoscopes.json');
var horos_data = JSON.parse(open_data);
// console.log(horos_data);

var signList = ['aries', 'tauras', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
var dateObj = new Date();
var month = dateObj.getUTCMonth();
const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var todaysDate = monthName[month] + " " + day + ", " + year;
console.log(todaysDate);

// console.log(obj);

app.get('/horoscope', (req, res) => {
  var dailyData = JSON.parse(fs.readFileSync('dailyHoroscope.json'));
  var count = 0;
  for (var i = 0; i < dailyData.length; i++){
    if (dailyData[i][0]['Date'] == 'Mar 10, 2019'){
      count++;
    }
  }if (count == 0){
    dailyData.push(horos_data);
    fs.writeFileSync('dailyHoroscope.json', JSON.stringify(dailyData));
    res.json(dailyData);
  }if (count > 0){
    res.json(dailyData);
  }
});

var data = fs.readFileSync('horoscopes.json');
var obj = JSON.parse(data);
app.get('/horoscope/:user', (req, res) => {
    var sign = req.params.user;
    for (var i = 0; i < obj.length; i++){
      if (obj[i]['Sign'] == sign && obj[i]['Date'] == todaysDate){
        return res.json(obj[i]);
      }
    }return res.json({errorMsg: "Sorry! You've entered something wrong!"});
});

var open_jokes = fs.readFileSync('jokes_santa.json');
var jokes_data = JSON.parse(open_jokes);
// console.log(jokes_data);

app.get('/motivet/Alljokes',(req,res) =>{
    return res.json(jokes_data)
})



app.get('/motivet/random_jokes',(req,res) => {
    // var user_jokes = req.params.jokes;
    var min = 1;
    var max = jokes_data.length;
    var random_number = Math.floor(Math.random() * (+max - +min) + +min);
    var r_number = String(random_number);
    // console.log(jokes_data[random_number]);
    for(var j = 0; j < jokes_data.length; j++){
        var dict_j = jokes_data[j];
        var list_k = Object.keys(dict_j);
        var dict_key = list_k[0];
        if (r_number == dict_key){
            var new_dict = {'joke':dict_j[dict_key]};
            return res.json(new_dict);
        }
    }

});


var new_id = app.listen(8359,function(){
    console.log('cod cal raha hai');
});








