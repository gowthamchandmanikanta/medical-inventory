import { useState, useEffect } from 'react';

const styles = {
  app: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', fontFamily: "'Segoe UI', sans-serif" },
  container: { maxWidth: '1100px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { color: 'white', fontSize: '2.5rem', fontWeight: '700', margin: '0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginTop: '8px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' },
  statCard: (color) => ({ flex: 1, minWidth: '150px', background: color, borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', color: 'white' }),
  statNum: { fontSize: '2.2rem', fontWeight: '800', margin: '0' },
  statLabel: { fontSize: '0.85rem', opacity: 0.9, marginTop: '4px' },
  card: { background: 'white', borderRadius: '20px', padding: '25px', marginBottom: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
  searchInput: { width: '100%', padding: '14px 20px', borderRadius: '12px', border: '2px solid #e8e8e8', fontSize: '16px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' },
  formRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' },
  input: { flex: 1, minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '2px solid #e8e8e8', fontSize: '14px', outline: 'none' },
  select: { padding: '12px 16px', borderRadius: '10px', border: '2px solid #e8e8e8', fontSize: '14px', outline: 'none', background: 'white' },
  addBtn: { padding: '12px 28px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  updateBtn: { padding: '12px 28px', background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  cancelBtn: { padding: '12px 20px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '14px 16px', textAlign: 'left', color: '#666', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #f0f0f0' },
  td: (even) => ({ padding: '16px', background: even ? '#fafafa' : 'white', fontSize: '14px', borderBottom: '1px solid #f0f0f0' }),
  editBtn: { padding: '7px 16px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginRight: '8px', fontWeight: '600' },
  deleteBtn: { padding: '7px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  badge: (status) => ({
    padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
    background: status === 'Available' ? '#d5f5e3' : status === 'In Use' ? '#fdebd0' : '#fadbd8',
    color: status === 'Available' ? '#1e8449' : status === 'In Use' ? '#d35400' : '#c0392b'
  }),
  empty: { textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '16px' }
};

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', category: '', quantity: '', status: 'Available' });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(`http://localhost:5000/api/equipment?search=${search}`);
    setItems(await res.json());
  };

  useEffect(() => { fetchItems(); }, [search]);

  const handleSubmit = async () => {
    if (!form.name) return alert('Enter equipment name');
    const url = editId ? `http://localhost:5000/api/equipment/${editId}` : 'http://localhost:5000/api/equipment';
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ name: '', category: '', quantity: '', status: 'Available' });
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await fetch(`http://localhost:5000/api/equipment/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const handleEdit = (item) => { setForm(item); setEditId(item.id); };

  return (
    <div style={styles.app}>
      <div style={styles.container}>

        <div style={styles.header}>
          <h1 style={styles.title}>🏥 Medical Equipment Inventory</h1>
          <p style={styles.subtitle}>Afford Medical Technologies — Equipment Management System</p>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statCard('linear-gradient(135deg, #667eea, #764ba2)')}>
            <p style={styles.statNum}>{items.length}</p>
            <p style={styles.statLabel}>Total Equipment</p>
          </div>
          <div style={styles.statCard('linear-gradient(135deg, #11998e, #38ef7d)')}>
            <p style={styles.statNum}>{items.filter(i => i.status === 'Available').length}</p>
            <p style={styles.statLabel}>Available</p>
          </div>
          <div style={styles.statCard('linear-gradient(135deg, #f093fb, #f5576c)')}>
            <p style={styles.statNum}>{items.filter(i => i.status === 'In Use').length}</p>
            <p style={styles.statLabel}>In Use</p>
          </div>
          <div style={styles.statCard('linear-gradient(135deg, #fc4a1a, #f7b733)')}>
            <p style={styles.statNum}>{items.filter(i => i.status === 'Maintenance').length}</p>
            <p style={styles.statLabel}>Maintenance</p>
          </div>
        </div>

        <div style={styles.card}>
          <input style={styles.searchInput} placeholder="🔍  Search by name or category..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div style={styles.card}>
          <h3 style={{ margin: '0 0 16px', color: '#333' }}>{editId ? '✏️ Edit Equipment' : '➕ Add New Equipment'}</h3>
          <div style={styles.formRow}>
            <input style={styles.input} placeholder="Equipment Name" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} />
            <input style={styles.input} placeholder="Category" value={form.category}
              onChange={e => setForm({...form, category: e.target.value})} />
            <input style={{...styles.input, maxWidth: '120px'}} placeholder="Quantity" type="number" value={form.quantity}
              onChange={e => setForm({...form, quantity: e.target.value})} />
            <select style={styles.select} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Available</option>
              <option>In Use</option>
              <option>Maintenance</option>
            </select>
            <button style={editId ? styles.updateBtn : styles.addBtn} onClick={handleSubmit}>
              {editId ? 'Update' : 'Add Equipment'}
            </button>
            {editId && <button style={styles.cancelBtn} onClick={() => { setEditId(null); setForm({ name: '', category: '', quantity: '', status: 'Available' }); }}>Cancel</button>}
          </div>
        </div>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['ID', 'Equipment Name', 'Category', 'Quantity', 'Status', 'Actions'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan="6" style={styles.empty}>No equipment found</td></tr>
              ) : items.map((item, i) => (
                <tr key={item.id}>
                  <td style={styles.td(i % 2)}>{item.id}</td>
                  <td style={{...styles.td(i % 2), fontWeight: '600'}}>{item.name}</td>
                  <td style={styles.td(i % 2)}>{item.category}</td>
                  <td style={styles.td(i % 2)}>{item.quantity}</td>
                  <td style={styles.td(i % 2)}><span style={styles.badge(item.status)}>{item.status}</span></td>
                  <td style={styles.td(i % 2)}>
                    <button style={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;