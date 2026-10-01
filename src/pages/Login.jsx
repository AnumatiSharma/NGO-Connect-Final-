import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const data = await loginUser(formData);
      login(data.user, data.token);
      if (data.user.role === "coordinator") {
        navigate("/coordinator/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900"> Login </h1>

        <p className="mt-2 text-gray-600"> Login to your NGO Connect account </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>

            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <input type="password"  name="password"  value={formData.password}  onChange={handleChange}  placeholder="Enter your password"  required
              className="mt-1 w-full rounded-lg border px-3 py-2"  />
          </div>

          <button type="submit"  disabled={loading}  className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"  >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button  type="button"  onClick={() => navigate("/register")}  className="font-semibold text-emerald-700 hover:text-emerald-800">
            Register
          </button>
        </p>
      </div>
    </main>
  );
}
export default Login;