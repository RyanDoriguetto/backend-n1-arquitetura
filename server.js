const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let itens = [];

app.post('/itens', (req, res) => {
  const item = req.body;
  item.id = itens.length + 1;
  itens.push(item);
  res.status(201).send('Item criado!');
});

app.get('/itens', (req, res) => {
  res.json(itens);
});

app.put('/itens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const novoItem = req.body;
  const index = itens.findIndex(item => item.id === id);
  if (index !== -1) {
    novoItem.id = id;
    itens[index] = novoItem;
    res.send('Item atualizado!');
  } else {
    res.status(404).send('Item não encontrado!');
  }
});

app.delete('/itens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = itens.findIndex(item => item.id === id);
  if (index !== -1) {
    itens.splice(index, 1);
    res.send('Item deletado!');
  } else {
    res.status(404).send('Item não encontrado!');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
