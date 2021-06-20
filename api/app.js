const express = require('express')

const app = express()

app.get( '/export', (req, res) => {
  console.log(req.body)
  res.send('Map saved!')

})

var server = app.listen(4444, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
