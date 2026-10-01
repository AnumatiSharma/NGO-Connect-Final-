import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function CoordinatorDashboard() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        if (!token) {
          throw new Error("Please login again.");
        }

        const response = await fetch(`${API_URL}/events/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events");
        }

        const myEvents = data.events || [];
        setEvents(myEvents);

        let pending = 0;
        let approved = 0;
        let rejected = 0;

        for (const event of myEvents) {
          const response = await fetch(
            `${API_URL}/registrations/event/${event._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) continue;

          const data = await response.json();

          for (const registration of data.registrations || []) {
            if (registration.status === "pending") pending++;
            if (registration.status === "approved") approved++;
            if (registration.status === "rejected") rejected++;
          }
        }

        setStats({ pending, approved, rejected });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16 text-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Coordinator Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Manage your events
            </h1>

            <p className="mt-3 text-gray-600">
              Create events and manage volunteer registrations.
            </p>
          </div>

          <Link
            to="/coordinator/events/create"
            className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            + Create Event
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Overview
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">My Events</p>
              <p className="mt-2 text-3xl font-bold text-emerald-700">
                {events.length}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {stats.approved}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {stats.rejected}
              </p>
            </div>

          </div>
        </section>

        {/* Events */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                My Events
              </h2>

              <p className="mt-1 text-gray-600">
                Events created by you.
              </p>
            </div>

            <Link
              to="/coordinator/events/create"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              + Create Event
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="mt-6 rounded-xl bg-white p-10 text-center shadow-sm">
              <p className="text-4xl">📅</p>

              <h3 className="mt-4 text-xl font-semibold">
                No events yet
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first event to get started.
              </p>

              <Link
                to="/coordinator/events/create"
                className="mt-5 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
              >
                Create Event
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  {event.category && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {event.category}
                    </span>
                  )}

                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                      📅{" "}
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "Date not available"}
                    </p>

                    <p>
                      📍 {event.location || "Location not available"}
                    </p>

                    <p>
                      👥 {event.capacity || 0} volunteers
                    </p>
                  </div>

                  <Link
                    to={`/coordinator/events/${event._id}`}
                    className="mt-6 block rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    Manage Event
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default CoordinatorDashboard;