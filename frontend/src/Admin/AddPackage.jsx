import { useState } from "react";
import axios from "axios";

const AddPackage = () => {
  const [form, setForm] = useState({ heading: "", description: "", price: "", daysNights: "" });
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.heading);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("daysNights", form.daysNights);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await axios.post("http://localhost:5000/api/package/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Package added successfully!");
    } catch (error) {
      alert("Error adding package");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="p-6 bg-white shadow-md rounded-lg w-96" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="text-xl font-bold mb-4">Add Package</h2>
        <input className="p-2 border rounded w-full" placeholder="Package Heading" onChange={(e) => setForm({ ...form, heading: e.target.value })} required />
        <textarea className="p-2 border rounded w-full mt-2" placeholder="Package Description" onChange={(e) => setForm({ ...form, description: e.target.value })} required></textarea>
        <input className="p-2 border rounded w-full mt-2" type="number" placeholder="Package Price" onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" placeholder="No. of Days & Nights" onChange={(e) => setForm({ ...form, daysNights: e.target.value })} required />
        <input className="p-2 border rounded w-full mt-2" type="file" onChange={(e) => setThumbnail(e.target.files[0])} required />
        <button className="bg-green-500 text-white p-2 rounded mt-3 w-full">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackage;
