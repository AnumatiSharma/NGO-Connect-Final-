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
          const data = await getMyRegistrations(token);
          setRegistrations(data.registrations || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user, token]);

  const getRegistration = (eventId) => {
    return registrations.find(
      (item) =>
        item.event?._id === eventId || item.event === eventId
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
      const registrationsData = await getMyRegistrations(token);
      setRegistrations(registrationsData.registrations || []);
    } catch (err) {
      alert(err.message);
    } finally {
      setRegisteringId(null);
    }
  };

  if (loading){
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="mt-3 text-gray-500">
            Loading events...
          </p>
        </div>
      </main>
    );
  }

  if (error){
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
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
          <p className="text-sm font-medium text-emerald-700">
            Volunteer Opportunities
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">Find an Event</h1>
          <p className="mt-2 text-gray-600">Find volunteering opportunities and register for events.</p>
        </div>

        {events.length === 0 ?(
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No events available
            </h2>

            <p className="mt-2 text-gray-500">
              There are no published events right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const registration = getRegistration(event._id);
              const status = registration?.status?.toLowerCase();
              const isDisabled =
                registeringId === event._id ||
                status === "pending" ||
                status === "approved";
              let buttonText = "Register";

              if (registeringId === event._id) {
                buttonText = "Registering...";
              } else if (status === "pending") {
                buttonText = "Pending";
              } else if (status === "approved") {
                buttonText = "Approved";
              } else if (status === "rejected") {
                buttonText = "Register Again";
              }

              return (
                <div key={event._id} className="rounded-xl bg-white p-6 shadow-sm">
                  <div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      {event.category}
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-gray-900"> {event.title} </h2>
                    <p className="mt-2 text-sm text-gray-600"> {event.description}</p>
                  </div>

              
                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                      📅{" "}
                      {event.date ? new Date(event.date).toLocaleDateString() : "Date unavailable"}
                    </p>

                    <p> 📍 {event.location}</p>

                    <p>👥 {event.capacity} volunteer slots </p>
                  </div>

                  {registration && (
                    <p className="mt-4 text-sm">
                      Status:{" "}
                      <span className="font-semibold capitalize">
                        {registration.status}
                      </span>
                    </p>
                  )}

                  {user?.role === "volunteer" && (
                    <button
                      onClick={() => handleRegister(event._id)}
                      disabled={isDisabled}
                      className={`mt-5 w-full rounded-lg px-4 py-2 font-medium ${
                        status === "pending"
                          ? "cursor-not-allowed bg-yellow-100 text-yellow-700"
                          : status === "approved"
                          ? "cursor-not-allowed bg-green-100 text-green-700"
                          : status === "rejected"
                          ? "bg-gray-800 text-white hover:bg-gray-900"
                          : "bg-emerald-700 text-white hover:bg-emerald-800"
                      }`}
                    >
                      {buttonText}
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        )}
      </div>
    </main>
  );
}
export default Events;