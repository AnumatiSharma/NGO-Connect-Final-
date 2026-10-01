import { useEffect, useState } from "react";
import { getMyRegistrations } from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyRegistrations() {
  const { token } = useAuth();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRegistrations = async () => {
      if (!token) {
        setError("Please login to view your registrations.");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyRegistrations(token);
        setRegistrations(data.registrations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">My Registrations</h1>
          <p className="mt-3 text-gray-500">
            Loading registrations...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">My Registrations</h1>

          <div className="mt-5 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Registrations
          </h1>

          <p className="mt-2 text-gray-600">
            View your registered events and their status.
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No registrations yet
            </h2>

            <p className="mt-2 text-gray-500">
              You have not registered for any events yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {registrations.map((registration) => {
              const status = registration.status?.toLowerCase();

              let statusClass = "bg-yellow-100 text-yellow-700";

              if (status === "approved") {
                statusClass = "bg-green-100 text-green-700";
              }

              if (status === "rejected") {
                statusClass = "bg-red-100 text-red-700";
              }

              return (
                <div
                  key={registration._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {registration.event?.title ||
                        "Event unavailable"}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass}`}
                    >
                      {registration.status || "pending"}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    {registration.event?.description ||
                      "No description available."}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                      📅{" "}
                      {registration.event?.date
                        ? new Date(
                            registration.event.date
                          ).toLocaleDateString()
                        : "Date not available"}
                    </p>

                    <p>
                      📍{" "}
                      {registration.event?.location ||
                        "Location not available"}
                    </p>
                  </div>

                  <div className="mt-5 rounded-lg bg-gray-50 p-4">
                    {status === "approved" ? (
                      <p className="text-sm font-medium text-green-700">
                        ✓ Your registration has been approved.
                      </p>
                    ) : status === "rejected" ? (
                      <p className="text-sm font-medium text-red-700">
                        Your registration was rejected.
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-yellow-700">
                        ⏳ Waiting for approval.
                      </p>
                    )}
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}

export default MyRegistrations;