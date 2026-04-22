const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('inventory.db');

app.use(cors());
app.use(express.json());

// Create table
db.exec(`CREATE TABLE IF NOT EXISTS equipment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  quantity INTEGER,
  status TEXT DEFAULT 'Available'
)`);

// Seed data
const count = db.prepare('SELECT COUNT(*) as c FROM equipment').get();
if (count.c === 0) {
  const insert = db.prepare('INSERT INTO equipment (name, category, quantity, status) VALUES (?, ?, ?, ?)');
  insert.run('Cardiac Monitor', 'Monitoring', 10, 'Available');
  insert.run('Anesthesia Workstation', 'Anesthesia', 5, 'Available');
  insert.run('Blood Gas Analyzer', 'Diagnostics', 8, 'In Use');
  insert.run('ACT Machine', 'Diagnostics', 3, 'Available');
  insert.run('CPB Machine', 'Surgery', 2, 'Maintenance');
}

// Routes
app.get('/api/equipment', (req, res) => {
  const { search } = req.query;
  let items;
  if (search) {
    items = db.prepare(`SELECT * FROM equipment WHERE name LIKE ? OR category LIKE ?`)
              .all(`%${search}%`, `%${search}%`);
  } else {
    items = db.prepare('SELECT * FROM equipment').all();
  }
  res.json(items);
});

app.post('/api/equipment', (req, res) => {
  const { name, category, quantity, status } = req.body;
  const result = db.prepare('INSERT INTO equipment (name, category, quantity, status) VALUES (?, ?, ?, ?)')
                   .run(name, category, quantity, status);
  res.json({ id: result.lastInsertRowid, name, category, quantity, status });
});

app.put('/api/equipment/:id', (req, res) => {
  const { name, category, quantity, status } = req.body;
  db.prepare('UPDATE equipment SET name=?, category=?, quantity=?, status=? WHERE id=?')
    .run(name, category, quantity, status, req.params.id);
  res.json({ message: 'Updated' });
});

app.delete('/api/equipment/:id', (req, res) => {
  db.prepare('DELETE FROM equipment WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Server on port 5000'));