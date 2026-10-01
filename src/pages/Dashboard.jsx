import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getEvents, getMyRegistrations } from "../services/api";

function Dashboard() {
  const { user, token, logout } = useAuth();

  const [stats, setStats] = useState({
    availableEvents: 0,
    registrations: 0,
    approved: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const eventsData = await getEvents();
        const registrationsData = await getMyRegistrations(token);

        const registrations = registrationsData.registrations || [];

        const approved = registrations.filter(
          (item) => item.status?.toLowerCase() === "approved"
        ).length;

        const pending = registrations.filter(
          (item) => item.status?.toLowerCase() === "pending"
        ).length;

        setStats({
          availableEvents: eventsData.events?.length || 0,
          registrations: registrations.length,
          approved,
          pending,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700"> Volunteer Dashboard  </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">  Welcome back, {user?.name || "Volunteer"}  </h1>

            <p className="mt-2 text-gray-600">  Find volunteering opportunities and manage your registrations. </p>
          </div>

          <button  onClick={logout}
            className="w-fit rounded-lg border border-red-200 px-5 py-2 text-red-600 hover:bg-red-50">  Log out  </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your Profile
              </h2>

              <p className="text-gray-500">
                Your account information
              </p>
            </div>

            <Link
              to="/profile"
              className="w-fit rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
            >
              View Profile
            </Link>
          </div>

          <div className="mt-6 grid gap-5 border-t pt-6 sm:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{user?.name || "—"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="break-all font-semibold">
                {user?.email || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-semibold capitalize text-emerald-700">
                {user?.role || "volunteer"}
              </p>
            </div>

          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

   
        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Volunteering Overview
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-gray-500">Available Events</p>
              <p className="mt-2 text-3xl font-bold">
                {loading ? "—" : stats.availableEvents}
              </p>

              <Link
                to="/events"
                className="mt-4 inline-block text-sm text-emerald-700"
              >
                Browse Events →
              </Link>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-gray-500">My Registrations</p>
              <p className="mt-2 text-3xl font-bold">
                {loading ? "—" : stats.registrations}
              </p>

              <Link
                to="/my-registrations"
                className="mt-4 inline-block text-sm text-emerald-700"
              >
                View Registrations →
              </Link>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-gray-500">Approved</p>
              <p className="mt-2 text-3xl font-bold">
                {loading ? "—" : stats.approved}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Accepted registrations
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-gray-500">Pending</p>
              <p className="mt-2 text-3xl font-bold">
                {loading ? "—" : stats.pending}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Waiting for approval
              </p>
            </div>

          </div>
        </section>

        <section className="mt-8 rounded-xl bg-emerald-900 p-6 text-white">
          <h2 className="text-2xl font-bold">
            Quick Access
          </h2>
          <p className="mt-2 text-emerald-100">
            Quickly access the main volunteer features.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              to="/events"
              className="rounded-lg bg-white p-5 text-gray-900 hover:bg-gray-100"
            >
              <h3 className="font-bold">Browse Events</h3>
              <p className="mt-2 text-sm text-gray-600">
                Find volunteering opportunities.
              </p>
            </Link>

            <Link
              to="/profile"
              className="rounded-lg bg-white p-5 text-gray-900 hover:bg-gray-100"
            >
              <h3 className="font-bold">My Profile</h3>
              <p className="mt-2 text-sm text-gray-600">
                View your volunteer information.
              </p>
            </Link>

            <Link
              to="/my-registrations"
              className="rounded-lg bg-white p-5 text-gray-900 hover:bg-gray-100"
            >
              <h3 className="font-bold">My Registrations</h3>
              <p className="mt-2 text-sm text-gray-600">
                Track your event registrations.
              </p>
            </Link>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;