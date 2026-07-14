"use client";
import { useState } from "react";
import { createListing } from "../api";

const emptyForm = {
  supplierId: "",
  title: "",
  description: "",
  category: "",
  materialType: "",
  unit: "",
  price: "",
  stockQuantity: "",
  deliveryDays: "",
};

export default function AddListingForm({ onCreated, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [creating, setCreating] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.supplierId || !form.title || !form.category ||
        !form.materialType || !form.unit || !form.price ||
        !form.stockQuantity || !form.deliveryDays) {
      alert("Please fill in all required fields.");
      return;
    }

    setCreating(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity, 10),
        deliveryDays: parseInt(form.deliveryDays, 10),
      };

      const created = await createListing(payload, file);
      onCreated?.(created);
      setForm(emptyForm);
      setFile(null);
    } catch (error) {
      alert(error?.message || "Error creating listing!");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 border rounded-xl space-y-3 bg-zinc-50">
      <div className="grid grid-cols-2 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Supplier ID"
          value={form.supplierId}
          onChange={(e) => handleChange("supplierId", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          className="border p-2 rounded col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Material Type (enum dəyəri)"
          value={form.materialType}
          onChange={(e) => handleChange("materialType", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Unit (enum dəyəri)"
          value={form.unit}
          onChange={(e) => handleChange("unit", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Stock Quantity"
          value={form.stockQuantity}
          onChange={(e) => handleChange("stockQuantity", e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Delivery Days"
          value={form.deliveryDays}
          onChange={(e) => handleChange("deliveryDays", e.target.value)}
        />
        <input
          className="border p-2 rounded col-span-2"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button onClick={onCancel} className="text-zinc-500" disabled={creating}>
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={creating}
        >
          {creating ? "Saving..." : "Save Listing"}
        </button>
      </div>
    </div>
  );
}