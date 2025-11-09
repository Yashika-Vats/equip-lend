import { useState } from "react";
import axios from "axios";

export default function AddEquipment() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8080/api/equipments/add", {
        name,
        category
      });
      alert("Equipment added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add equipment");
    }
  };

  return (
    <div>
      <h2>Add Equipment</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
