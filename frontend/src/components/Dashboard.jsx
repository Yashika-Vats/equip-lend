import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ role, setRole }) {
  const [equipment, setEquipment] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/equipment")
      .then(res => setEquipment(res.data))
      .catch(err => console.error(err));
  }, []);

  const addEquipment = () => {
    axios.post("http://localhost:8080/api/equipment", { name, category, quantity, available: true })
      .then(res => setEquipment([...equipment, res.data]))
      .catch(err => console.error(err));
    setName(""); setCategory(""); setQuantity(1);
  };

  const borrowEquipment = (id) => {
    const eq = equipment.find(e => e.id === id);
    if(!eq.available) return alert("Already borrowed!");
    axios.put(`http://localhost:8080/api/equipment/${id}`, { ...eq, available: false })
      .then(res => setEquipment(equipment.map(e => e.id === id ? res.data : e)))
      .catch(err => console.error(err));
  };

  const returnEquipment = (id) => {
    const eq = equipment.find(e => e.id === id);
    if(eq.available) return alert("Already available!");
    axios.put(`http://localhost:8080/api/equipment/${id}`, { ...eq, available: true })
      .then(res => setEquipment(equipment.map(e => e.id === id ? res.data : e)))
      .catch(err => console.error(err));
  };

  const filtered = equipment.filter(eq => eq.category.toLowerCase().includes(searchCategory.toLowerCase()));

  return (
    <div className="card">
      <h1>Dashboard ({role})</h1>
      <input placeholder="Search by category" value={searchCategory} onChange={e=>setSearchCategory(e.target.value)} />
      <ul>
        {filtered.map(eq => (
          <li key={eq.id}>
            {eq.name} - {eq.category} - Qty: {eq.quantity} - {eq.available ? "Available" : "Not Available"}
            {role === "student" && eq.available && <button onClick={()=>borrowEquipment(eq.id)}>Borrow</button>}
            {role === "student" && !eq.available && <button onClick={()=>returnEquipment(eq.id)}>Return</button>}
          </li>
        ))}
      </ul>

      {role === "admin" && (
        <>
          <h2>Add Equipment</h2>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
          <input type="number" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} />
          <button onClick={addEquipment}>Add</button>
        </>
      )}

      <button style={{ marginTop: "20px" }} onClick={()=>setRole(null)}>Logout</button>
    </div>
  );
}

export default Dashboard;
