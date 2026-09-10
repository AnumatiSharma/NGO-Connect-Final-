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
        setLoading(true);
        setError("");

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
      <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-emerald-950">
            My Registrations
          </h1>

          <p className="mt-4 text-slate-500">
            Loading your registrations...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-emerald-950">
            My Registrations
          </h1>

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Volunteer Activity
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-emerald-950">
            My Registrations
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Track the events you have registered for and monitor
            your registration status.
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-12 text-center shadow-[0_10px_40px_rgba(6,45,36,0.06)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700">
              ✓
            </div>

            <h2 className="mt-6 text-2xl font-bold text-emerald-950">
              No registrations yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-500">
              You haven't registered for any events yet.
              Browse available opportunities and find one
              that's right for you.
            </p>

          </div>
        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {registrations.map((registration) => {

              const status = registration.status?.toLowerCase();

              let statusClasses =
                "bg-amber-50 text-amber-700 border-amber-200";

              if (status === "approved") {
                statusClasses =
                  "bg-emerald-50 text-emerald-700 border-emerald-200";
              }

              if (status === "rejected") {
                statusClasses =
                  "bg-red-50 text-red-700 border-red-200";
              }

              return (
                <div
                  key={registration._id}
                  className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-[0_10px_40px_rgba(6,45,36,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(6,45,36,0.10)]"
                >

                  <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                          Event
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-emerald-950">
                          {registration.event?.title ||
                            "Event unavailable"}
                        </h2>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${statusClasses}`}
                      >
                        {registration.status || "pending"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">

                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {registration.event?.description ||
                        "No event description available."}
                    </p>

                    <div className="mt-6 space-y-3">

                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                          📅
                        </span>

                        <div>
                          <p className="text-xs text-slate-400">
                            Date
                          </p>

                          <p className="font-medium text-slate-700">
                            {registration.event?.date
                              ? new Date(
                                  registration.event.date
                                ).toLocaleDateString()
                              : "Date not available"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                          📍
                        </span>

                        <div>
                          <p className="text-xs text-slate-400">
                            Location
                          </p>

                          <p className="font-medium text-slate-700">
                            {registration.event?.location ||
                              "Location not available"}
                          </p>
                        </div>
                      </div>
                    </div>

                  
                    <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                      {status === "approved" ? (
                        <p className="text-sm font-medium text-emerald-700">
                          ✓ Your registration has been approved.
                        </p>
                      ) : status === "rejected" ? (
                        <p className="text-sm font-medium text-red-700">
                          Your registration was rejected.
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-amber-700">
                          ⏳ Your registration is waiting for approval.
                        </p>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;