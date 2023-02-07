const express = require('express');
const app = express();
const port = 3000;

// Example data set
const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// Get all data
app.get('/api/data', (req, res) => {
  res.send(data);
});

// Create a new data item
app.post('/api/data', (req, res) => {
  // Create a new data item with the id as the length of the data set + 1
  const newData = { id: data.length + 1, name: req.body.name };
  data.push(newData);
  res.send(newData);
});

// Update an existing data item
app.put('/api/data/:id', (req, res) => {
  // Find the data item to update by its id
  const updateData = data.find(item => item.id === parseInt(req.params.id));
  updateData.name = req.body.name;
  res.send(updateData);
});

// Delete an existing data item
app.delete('/api/data/:id', (req, res) => {
  // Find the data item to delete by its id
  const deletedData = data.find(item => item.id === parseInt(req.params.id));
  data.splice(data.indexOf(deletedData), 1);
  res.send(deletedData);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
