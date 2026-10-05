import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://ngo-connect-backend.vercel.app/api";

function Profile() {
  const { user, token, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    skills: user?.skills || "",
    interests: user?.interests || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      skills: user?.skills || "",
      interests: user?.interests || "",
    });

    setError("");
    setSuccess("");
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      login(data.user, token);
      setEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">
            Please login to view your profile.
          </p>

          <Link
            to="/login"
            className="mt-5 inline-block rounded-lg bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your personal and volunteer information.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="bg-emerald-800 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-emerald-800">
                {user.name?.charAt(0)?.toUpperCase() || "V"}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-emerald-100">
                  {user.email}
                </p>

                <p className="mt-1 capitalize text-emerald-200">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-lg bg-green-50 p-4 text-green-700">
                {success}
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Account Information
              </h2>

              {!editing && (
                <button
                  onClick={handleEdit}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="mt-1 w-full rounded-lg border bg-gray-100 px-3 py-2"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Email cannot be changed.
                  </p>
                </div>

                <div>
                  <label className="font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Example: Teaching, First Aid"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-medium">Interests</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Example: Education, Environment"
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="rounded-lg border px-5 py-2 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="mt-1 font-semibold">
                    {user.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 break-all font-semibold">
                    {user.email || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="mt-1 font-semibold">
                    {user.phone || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="mt-1 font-semibold">
                    {user.address || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Skills</p>
                  <p className="mt-1 font-semibold">
                    {user.skills || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Interests</p>
                  <p className="mt-1 font-semibold">
                    {user.interests || "Not provided"}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <Link
                to="/dashboard"
                className="rounded-lg bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800"
              >
                ← Dashboard
              </Link>

              <Link
                to="/my-registrations"
                className="rounded-lg border px-5 py-2 text-emerald-700 hover:bg-gray-50"
              >
                My Registrations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;