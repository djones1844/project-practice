const express = require("express");
const app = express();
const fs = require("fs");
let data = fs.readFileSync('data.json');
let jsonData = JSON.parse(data);

const PORT = 3000
app.use(express.json())

app.post('/url', async (req, res, next) => {
  try {
    const id = makeid()
    const info = req.body.url
    addInfo(id, info)
    res.send(id)
  } catch (err) {
    console.log(err)
  }
})

app.get('/:id', async (req, res, next) => {
  const id = req.params.id
  const book = jsonData[id]

  res.send(`{"url": "${book}"}`)
})

const makeid = () => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < 10) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

function addInfo(a, b) {
  jsonData[a] = b
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync('data.json', jsonString, 'utf-8', (err) => {
    if (err) throw err;
  });
}

app.listen(PORT, () => console.log(`Started at port: ${PORT}`))