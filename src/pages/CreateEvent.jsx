import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API= "https://ngo-connect-backend.vercel.app/api";

function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", category: "",
    date: "", location: "", capacity: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity),
        }),
      });
      

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create event");
      alert("Event created successfully!");
      navigate("/coordinator/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Create New Event</h1>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <form onSubmit={submit} className="mt-6 space-y-4">
       <input name="title" placeholder="Event Title" value={form.title} onChange={change} required className="w-full border p-2" />
       <textarea name="description" placeholder="Description" value={form.description} onChange={change} required className="w-full border p-2" />

       <select name="category" value={form.category} onChange={change} required className="w-full border p-2">
          <option value="">Select Category</option>
          <option>Environment</option>
          <option>Education</option>
          <option>Health</option>
          <option>Community</option>
          <option>Food</option>
          <option>Other</option>
        </select>

      <input type="date" name="date" value={form.date} onChange={change} required className="w-full border p-2" />
      <input type="text" name="location" placeholder="Location" value={form.location} onChange={change} required className="w-full border p-2" />
      <input type="number" name="capacity" placeholder="Capacity" min="1" value={form.capacity} onChange={change} required className="w-full border p-2" />

        <button
          disabled={loading}
          className="rounded bg-emerald-700 px-5 py-2 text-white"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>

        <button type="button" onClick={() => navigate("/coordinator/dashboard")}
          className="ml-3 border px-5 py-2">
          Cancel
        </button>
      </form>
    </main>
  );
}
export default CreateEvent;