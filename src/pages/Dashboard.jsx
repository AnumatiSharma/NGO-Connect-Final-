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
        setLoading(true);
        setError("");

        // available events
        const eventsData = await getEvents();

        // volunteer registrations
        const registrationsData =
          await getMyRegistrations(token);

        const registrations =
          registrationsData.registrations || [];

        const pending = registrations.filter(
          (registration) =>
            registration.status?.toLowerCase() === "pending"
        ).length;

        const approved = registrations.filter(
          (registration) =>
            registration.status?.toLowerCase() === "approved"
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
    <div className="min-h-screen bg-[#f4faf7]">

      {/* Header */}
      <section className="border-b border-emerald-900/10 bg-gradient-to-br from-[#effbf5] via-white to-[#e8f8f1]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>
              <div className="mb-5 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
                Volunteer Dashboard
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
                Welcome back, {user?.name || "Volunteer"}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Discover meaningful volunteering opportunities,
                manage your registrations, and make a difference
                in your community.
              </p>
            </div>

            <button
              onClick={logout}
              className="w-fit rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-md"
            >
              Log out
            </button>

          </div>

        </div>
      </section>


      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Profile */}
        <section className="rounded-3xl border border-emerald-900/10 bg-white p-7 shadow-[0_10px_40px_rgba(6,45,36,0.06)] sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
                Your account
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-emerald-950">
                Your Profile
              </h2>
            </div>

            <Link
              to="/profile"
              className="w-fit rounded-full bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              View Profile →
            </Link>

          </div>

          <div className="mt-8 grid gap-6 border-t border-slate-100 pt-7 sm:grid-cols-3">

            <div>
              <p className="text-sm text-slate-500">
                Name
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {user?.name || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="mt-1 break-all text-lg font-semibold text-slate-900">
                {user?.email || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Account type
              </p>

              <p className="mt-1 text-lg font-semibold capitalize text-emerald-700">
                {user?.role || "volunteer"}
              </p>
            </div>

          </div>

        </section>



        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}


      
        <section className="mt-10">

          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-700">
              Your activity
            </p>

            <h2 className="mt-1 text-2xl font-bold text-emerald-950">
              Volunteering Overview
            </h2>
          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)]">

              <p className="text-sm font-medium text-slate-500">
                Available Events
              </p>

              <p className="mt-3 text-4xl font-bold text-emerald-950">
                {loading ? "—" : stats.availableEvents}
              </p>

              <Link
                to="/events"
                className="mt-5 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Browse events →
              </Link>

            </div>


      
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)]">

              <p className="text-sm font-medium text-slate-500">
                My Registrations
              </p>

              <p className="mt-3 text-4xl font-bold text-emerald-950">
                {loading ? "—" : stats.registrations}
              </p>

              <Link
                to="/my-registrations"
                className="mt-5 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                View registrations →
              </Link>

            </div>


    
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)]">

              <p className="text-sm font-medium text-slate-500">
                Approved
              </p>

              <p className="mt-3 text-4xl font-bold text-emerald-950">
                {loading ? "—" : stats.approved}
              </p>

              <p className="mt-5 text-sm text-slate-500">
                Accepted registrations
              </p>

            </div>


        
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)]">

              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <p className="mt-3 text-4xl font-bold text-emerald-950">
                {loading ? "—" : stats.pending}
              </p>

              <p className="mt-5 text-sm text-slate-500">
                Waiting for approval
              </p>

            </div>

          </div>

        </section>


        
        <section className="mt-12 rounded-3xl bg-emerald-950 p-7 text-white shadow-[0_15px_45px_rgba(6,45,36,0.15)] sm:p-9">

          <p className="text-sm font-medium uppercase tracking-wider text-emerald-300">
            Quick access
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Make your next move
          </h2>

          <p className="mt-2 text-emerald-100">
            Find opportunities, manage your profile, or track
            the events you have joined.
          </p>


          <div className="mt-7 grid gap-4 md:grid-cols-3">

            <Link
              to="/events"
              className="rounded-2xl bg-white p-6 text-emerald-950 transition hover:-translate-y-1 hover:bg-emerald-50"
            >
              <p className="text-lg font-bold">
                Browse Events
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore volunteering opportunities available
                in your community.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                Find opportunities →
              </span>
            </Link>


            <Link
              to="/profile"
              className="rounded-2xl bg-white p-6 text-emerald-950 transition hover:-translate-y-1 hover:bg-emerald-50"
            >
              <p className="text-lg font-bold">
                My Profile
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                View and update your volunteer information.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                View profile →
              </span>
            </Link>


            <Link
              to="/my-registrations"
              className="rounded-2xl bg-white p-6 text-emerald-950 transition hover:-translate-y-1 hover:bg-emerald-50"
            >
              <p className="text-lg font-bold">
                My Registrations
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Track pending and approved event registrations.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                Track registrations →
              </span>
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;
