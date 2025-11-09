import axios from "axios";

function EquipmentList({ equipment, setEquipment, role }) {
  const editEquipment = (id) => {
    const newName = prompt("New name:");
    const newCategory = prompt("New category:");
    const newQty = prompt("New quantity:");
    if(!newName || !newCategory || !newQty) return;
    const eq = equipment.find(e => e.id === id);
    axios.put(`/api/equipment/${id}`, { ...eq, name: newName, category: newCategory, quantity: Number(newQty) })
      .then(res => setEquipment(equipment.map(e => e.id === id ? res.data : e)))
      .catch(err => console.error(err));
  };

  const deleteEquipment = (id) => {
    if(!window.confirm("Delete this equipment?")) return;
    axios.delete(`/api/equipment/${id}`)
      .then(res => setEquipment(equipment.filter(e => e.id !== id)))
      .catch(err => console.error(err));
  };

  const borrowEquipment = (id) => {
    const eq = equipment.find(e => e.id === id);
    if(!eq.available) return alert("Already borrowed!");
    axios.put(`/api/equipment/${id}`, { ...eq, available: false })
      .then(res => setEquipment(equipment.map(e => e.id === id ? res.data : e)))
      .catch(err => console.error(err));
  };

  const returnEquipment = (id) => {
    const eq = equipment.find(e => e.id === id);
    if(eq.available) return alert("Already available!");
    axios.put(`/api/equipment/${id}`, { ...eq, available: true })
      .then(res => setEquipment(equipment.map(e => e.id === id ? res.data : e)))
      .catch(err => console.error(err));
  };

  return (
    <ul>
      {equipment.map(eq => (
        <li key={eq.id}>
          {eq.name} - {eq.category} - Qty: {eq.quantity} - {eq.available ? "Available" : "Not Available"}
          {role === "admin" && <>
            <button onClick={() => editEquipment(eq.id)}>Edit</button>
            <button onClick={() => deleteEquipment(eq.id)}>Delete</button>
          </>}
          {role === "student" && (eq.available 
            ? <button onClick={() => borrowEquipment(eq.id)}>Borrow</button>
            : <button onClick={() => returnEquipment(eq.id)}>Return</button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default EquipmentList;
