import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const API_URL = "http://localhost:5000/api";

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
    setError("");
    setSuccess("");

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      skills: user?.skills || "",
      interests: user?.interests || "",
    });

    setEditing(true);
  };

  const handleCancel = () => {
    setError("");
    setSuccess("");

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      skills: user?.skills || "",
      interests: user?.interests || "",
    });

    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      // Update AuthContext + localStorage
      login(data.user, token);

      setSuccess("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border bg-white p-8 text-center">
            <p className="text-slate-600">
              Please log in to view your profile.
            </p>

            <Link
              to="/login"
              className="mt-5 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Volunteer Account
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-emerald-950">
            My Profile
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Manage your personal and volunteer information.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-[0_10px_40px_rgba(6,45,36,0.06)]">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 px-8 py-10 text-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-emerald-800 shadow-lg">
                {user.name?.charAt(0)?.toUpperCase() || "V"}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="mt-1 text-emerald-100">
                  {user.email}
                </p>

                <span className="mt-3 inline-block rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold capitalize text-emerald-50">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
                {success}
              </div>
            )}

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  Account Information
                </p>

                <h3 className="mt-1 text-2xl font-bold text-emerald-950">
                  Your Details
                </h3>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Email cannot be changed from your profile.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Example: Event management, First aid, Teaching"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interests
                  </label>

                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Example: Education, Healthcare, Environment"
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-emerald-700 px-7 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving Changes..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>

                </div>

              </form>
            ) : (

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {user.name || "Not provided"}
                  </p>
                </div>


                
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email Address
                  </p>

                  <p className="mt-2 break-all text-lg font-semibold text-slate-900">
                    {user.email || "Not provided"}
                  </p>
                </div>
              
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {user.phone || "Not provided"}
                  </p>
                </div>


            
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Address
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {user.address || "Not provided"}
                  </p>
                </div>


            
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Skills
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {user.skills || "Not provided"}
                  </p>
                </div>


          
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Interests
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {user.interests || "Not provided"}
                  </p>
                </div>

              </div>
            )}


      
            {!editing && (
              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                    🤝
                  </div>

                  <div>
                    <h3 className="font-bold text-emerald-950">
                      Volunteer Account
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                      Keep your profile information up to date so
                      coordinators can better understand your
                      volunteering skills and interests.
                    </p>
                  </div>

                </div>

              </div>
            )}


    
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/dashboard"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                ← Back to Dashboard
              </Link>

              <Link
                to="/my-registrations"
                className="rounded-xl border border-emerald-200 bg-white px-6 py-3 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                My Registrations
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;
