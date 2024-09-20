  const express = require('express');
  const app = express();
  const path = require('path');


  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'src', 'public')));

  // Route to serve the main HTML file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
  });


  // first API endpoint... 
  app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
  });


  // API unix/utc..
  let regDate = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  let regMs = /^\d+$/
  app.get("/api/:date?",(req,res)=>{
    let dateInput = req.params.date
    let date;
    if(regDate.test(dateInput) || regMs.test(dateInput) ){
      date = regDate.test(dateInput)?new Date((dateInput)): new Date(parseInt(dateInput));
      res.json({unix:Number(date) , utc: date.toUTCString()})
    }else{
      res.json({"error":"Invalid Date"})
    }
  })

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });