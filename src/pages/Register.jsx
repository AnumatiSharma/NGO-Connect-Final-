import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "volunteer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(formData);
      login(data.user, data.token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-gray-900">Create Account </h1>
        <p className="mt-2 text-gray-600">  Join NGO Connect and start volunteering.</p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-red-600">  {error}</div>
        )}

        <form  onSubmit={handleSubmit}  className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm" >
          <div>
            <label className="text-sm font-medium"> Full Name </label>
            <input  type="text"  name="name"  value={formData.name}  onChange={handleChange}  placeholder="Enter your name"  required  className="mt-1 w-full rounded-lg border px-3 py-2"  />
          </div>

          <div>
            <label className="text-sm font-medium">  Email  </label>
            <input  type="email"  name="email"  value={formData.email}  onChange={handleChange}  placeholder="Enter your email"  required  className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>

          <div>
            <label className="text-sm font-medium"> Password  </label>

            <input type="password"  name="password" value={formData.password}  onChange={handleChange}  placeholder="Create a password"   required  className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>

          <div>
            <label className="text-sm font-medium">   Phone </label>

            <input type="tel" name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">   Account Type </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
            >
              <option value="volunteer">Volunteer</option>
              <option value="coordinator">Coordinator</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          > Login
          </button>
        </p>
      </div>
    </main>
  );
}

export default Register;