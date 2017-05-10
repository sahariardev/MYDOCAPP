var express = require('express');
var router = express.Router();
var firebase=require('firebase');
var config = {
    apiKey: "AIzaSyB6S1AmO5c8iO_fUH1xSI4ARkqrPXmXiQ0",
    authDomain: "mydocs-b1e22.firebaseapp.com",
    databaseURL: "https://mydocs-b1e22.firebaseio.com",
    storageBucket: "mydocs-b1e22.appspot.com",
  };
  firebase.initializeApp(config);
var id=0;


router.get('/', function(req, res, next) {
  var data;
    
     var json=firebase.database().ref().child('docs');
    json.once('value',snap=>{
      data=snap.val();
        res.send(data);
    });
     
     
    
    
    
    
});

router.get('/data/:id',function(req,res,next){
   var key=req.params.id;
    var singleItem=firebase.database().ref().child('docs').child(key);
    singleItem.once('value',snap=>{
      data=snap.val();
        
        res.send(data);
     
        
    });
     

    
    
});


router.post('/',function(req,res,next){
   
    /*var data=firebase.database().ref().child('docs');
    data.on('value',snap=>{
        
        if(snap.val()!=null)
            {
                id=snap.val().length;
                console.log(id+" here befor e condition");
            }
        else{
            id=1;
            console.log(id+" here  else condition");
        }
        
         
  
    });*/
    
    var postsRef = firebase.database().ref().child("docs");
    var newPostRef = postsRef.push();
    console.log("hey "+req.body.snippet);
    newPostRef.set({    
    title: req.body.title,
    client: req.body.client,
    tag:req.body.tag,
    description:req.body.description,    
    snippet : req.body.snippet
  });
    
   
    
  res.send("Sucessfully entered"); 
 
    
});

module.exports = router;