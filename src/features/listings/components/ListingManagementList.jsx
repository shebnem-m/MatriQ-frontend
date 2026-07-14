"use client";
import { useEffect, useState } from "react";
import { fetchListings, deleteListing, updateListing } from "../api";
import Image from "next/image";
import AddListingForm from "./AddListingForm";


const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8080";

const getImageSrc = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_HOST}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function ListingManagementList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

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
      alert(error?.message || "Yeniləmə xətası!");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteListing(id);
      setListings(listings.filter((l) => l.id !== id));
    } catch (error) {
      const rawMessage = error?.message || "";
      if (rawMessage.toLowerCase().includes("foreign key") || rawMessage.toLowerCase().includes("constraint")) {
        alert("This listing cannot be deleted because it has existing orders. Deactivate it instead.");
      } else {
        alert(rawMessage || "Failed to delete listing.");
      }
    }
  };

  const handleCreated = (created) => {
    setListings((prev) => [...prev, created]);
    setShowAddForm(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showAddForm ? "Cancel" : "+ Add Listing"}
        </button>
      </div>

      {showAddForm && (
        <AddListingForm
          onCreated={handleCreated}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {listings.map((listing) => (
        <div key={listing.id} className="flex items-center gap-6 p-6 border rounded-xl">
          {editingId === listing.id ? (
            <div className="flex gap-4 w-full">
              <input className="border p-1 w-full" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
              <input className="border p-1 w-20" type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})} />
              <button onClick={handleSave} className="text-green-600">Save</button>
              <button onClick={() => setEditingId(null)} className="text-zinc-500">Cancel</button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 relative bg-zinc-100 rounded-lg overflow-hidden">
                {listing.imageUrl && (
                  <Image src={getImageSrc(listing.imageUrl)} alt={listing.title} fill sizes="64px" className="object-cover" unoptimized />
                )}
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