
import { useEffect, useState } from "react";
import {
  getEvents,
  registerForEvent,
  getMyRegistrations,
} from "../services/api";

import { useAuth } from "../context/AuthContext";

function Events() {
  const { user, token } = useAuth();

  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const eventsData = await getEvents();
        setEvents(eventsData.events || []);

    
        if (user?.role === "volunteer" && token) {
          const registrationsData =
            await getMyRegistrations(token);

          setRegistrations(
            registrationsData.registrations || []
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user, token]);

  const getRegistrationForEvent = (eventId) => {
    return registrations.find(
      (registration) =>
        registration.event?._id === eventId ||
        registration.event === eventId
    );
  };

  const handleRegister = async (eventId) => {
    if (!user || !token) {
      alert("Please login to register for an event.");
      return;
    }

    try {
      setRegisteringId(eventId);
      setError("");

      const data = await registerForEvent(eventId, token);

      alert(data.message || "Registration successful");

      // Reload registrations after registering
      const registrationsData =
        await getMyRegistrations(token);

      setRegistrations(
        registrationsData.registrations || []
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setRegisteringId(null);
    }
  };

  const getButtonContent = (registration) => {
    if (!registration) {
      return "Register";
    }

    const status = registration.status?.toLowerCase();

    if (status === "pending") {
      return "Pending";
    }

    if (status === "approved") {
      return "Approved";
    }

    if (status === "rejected") {
      return "Register Again";
    }

    return "Register";
  };

  const getButtonClasses = (registration) => {
    if (!registration) {
      return "bg-emerald-700 text-white hover:bg-emerald-800";
    }

    const status = registration.status?.toLowerCase();

    if (status === "pending") {
      return "cursor-not-allowed bg-amber-100 text-amber-700";
    }

    if (status === "approved") {
      return "cursor-not-allowed bg-emerald-100 text-emerald-700";
    }

    if (status === "rejected") {
      return "bg-slate-800 text-white hover:bg-slate-900";
    }

    return "bg-emerald-700 text-white hover:bg-emerald-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Volunteer Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold text-emerald-950">
            Events
          </h1>

          <p className="mt-4 text-slate-500">
            Loading available events...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4faf7] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Volunteer Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold text-emerald-950">
            Events
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

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Volunteer Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-emerald-950">
            Find an opportunity
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Discover events where you can contribute your
            time, skills, and energy to your community.
          </p>
        </div>

        {/* No events */}
        {events.length === 0 ? (
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-12 text-center shadow-[0_10px_40px_rgba(6,45,36,0.06)]">
            <h2 className="text-2xl font-bold text-emerald-950">
              No events available
            </h2>

            <p className="mt-3 text-slate-500">
              There are no published volunteering events
              available right now.
            </p>
          </div>
        ) : (

          /* Event cards */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => {
              const registration =
                getRegistrationForEvent(event._id);

              const status =
                registration?.status?.toLowerCase();

              const buttonDisabled =
                registeringId === event._id ||
                status === "pending" ||
                status === "approved";

              return (
                <div
                  key={event._id}
                  className="group overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-[0_10px_40px_rgba(6,45,36,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(6,45,36,0.10)]"
                >

                  {/* Card header */}
                  <div className="bg-gradient-to-br from-emerald-50 via-white to-white p-6">

                    <div className="flex items-start justify-between gap-4">

                      <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-700">
                        {event.category}
                      </span>

                      {registration && (
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                            status === "approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {registration.status}
                        </span>
                      )}

                    </div>

                    <h2 className="mt-5 text-xl font-bold text-emerald-950">
                      {event.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {event.description}
                    </p>

                  </div>


                  {/* Event information */}
                  <div className="p-6">

                    <div className="space-y-3">

                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                          📅
                        </span>

                        <div>
                          <p className="text-xs text-slate-400">
                            Date
                          </p>

                          <p className="text-sm font-medium text-slate-700">
                            {event.date
                              ? new Date(
                                  event.date
                                ).toLocaleDateString()
                              : "Date unavailable"}
                          </p>
                        </div>
                      </div>


                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                          📍
                        </span>

                        <div>
                          <p className="text-xs text-slate-400">
                            Location
                          </p>

                          <p className="text-sm font-medium text-slate-700">
                            {event.location}
                          </p>
                        </div>
                      </div>


                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                          👥
                        </span>

                        <div>
                          <p className="text-xs text-slate-400">
                            Capacity
                          </p>

                          <p className="text-sm font-medium text-slate-700">
                            {event.capacity} volunteer slots
                          </p>
                        </div>
                      </div>

                    </div>


                    {/* Volunteer action */}
                    {user?.role === "volunteer" && (
                      <button
                        onClick={() =>
                          handleRegister(event._id)
                        }
                        disabled={buttonDisabled}
                        className={`mt-7 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${getButtonClasses(
                          registration
                        )}`}
                      >
                        {registeringId === event._id
                          ? "Registering..."
                          : getButtonContent(registration)}
                      </button>
                    )}

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

export default Events;
