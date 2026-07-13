"use client";
import { useEffect, useState } from "react";
import { fetchListings, deleteListing, updateListing } from "../api";
import Image from "next/image";

export default function ListingManagementList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const loadListings = async () => {
    try {
      const data = await fetchListings();
      setListings(Array.isArray(data) ? data : (data || []));
    } catch (error) {
      console.error("Xəta:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadListings(); }, []);

  const handleEditClick = (listing) => {
    setEditingId(listing.id);
    setEditForm(listing);
  };

  const handleSave = async () => {
    try {
      await updateListing(editingId, editForm);
      setListings(listings.map(l => l.id === editingId ? editForm : l));
      setEditingId(null);
    } catch (error) {
      alert("Yeniləmə xətası!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteListing(id);
    setListings(listings.filter((l) => l.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <div key={listing.id} className="flex items-center gap-6 p-6 border rounded-xl">
          {editingId === listing.id ? (
            // EDIT FORM
            <div className="flex gap-4 w-full">
              <input className="border p-1 w-full" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
              <input className="border p-1 w-20" type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})} />
              <button onClick={handleSave} className="text-green-600">Save</button>
              <button onClick={() => setEditingId(null)} className="text-zinc-500">Cancel</button>
            </div>
          ) : (
            // VIEW MODE
            <>
              <div className="w-16 h-16 relative bg-zinc-100 rounded-lg overflow-hidden">
                {listing.imageUrl && <Image src={listing.imageUrl} alt={listing.title} fill className="object-cover" />}
              </div>
              <span className="w-40">{listing.title}</span>
              <span className="w-24">${listing.price?.toFixed(2)}</span>
              <div className="flex-1 text-right gap-4 flex justify-end">
                <button onClick={() => handleEditClick(listing)} className="text-blue-600 hover:text-blue-800">Edit</button>
                <button onClick={() => handleDelete(listing.id)} className="text-red-600">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}