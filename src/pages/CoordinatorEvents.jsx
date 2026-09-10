import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function CoordinatorEvents() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    capacity: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/events/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load events"
          );
        }

        const myEvents = data.events || [];

        setEvents(myEvents);
        if (eventId) {
          const event = myEvents.find(
            (item) => item._id === eventId
          );

          if (event) {
            setSelectedEvent(event);

            setFormData({
              title: event.title || "",
              description: event.description || "",
              category: event.category || "",
              date: event.date
                ? event.date.substring(0, 10)
                : "",
              location: event.location || "",
              capacity: event.capacity || "",
            });

            loadRegistrations(event._id);
          } else {
            setError("Event not found.");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [eventId]);

  
  const loadRegistrations = async (id) => {
    try {
      setRegistrations([]);

      const response = await fetch(
        `${API_URL}/registrations/event/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load registrations"
        );
      }

      setRegistrations(data.registrations || []);
    } catch (err) {
      setError(err.message);
    }
  };
  const viewRegistrations = async (event) => {
    setSelectedEvent(event);
    await loadRegistrations(event._id);
  };

  
  const updateStatus = async (registrationId, status) => {
    try {
      const response = await fetch(
        `${API_URL}/registrations/${registrationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setRegistrations((current) =>
        current.map((registration) =>
          registration._id === registrationId
            ? {
                ...registration,
                status,
              }
            : registration
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const updateEvent = async (e) => {
    e.preventDefault();

    if (!selectedEvent) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${API_URL}/events/${selectedEvent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            date: formData.date,
            location: formData.location,
            capacity: Number(formData.capacity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update event"
        );
      }

      const updatedEvent = data.event;

      setSelectedEvent(updatedEvent);

      setEvents((current) =>
        current.map((event) =>
          event._id === updatedEvent._id
            ? updatedEvent
            : event
        )
      );

      setEditing(false);

      alert("Event updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  
  const deleteEvent = async () => {
    if (!selectedEvent) return;

   const confirmed = window.confirm(
  `Are you sure you want to delete "${selectedEvent.title}"?\n\nThis action cannot be undone.`
);

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/events/${selectedEvent._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete event"
        );
      }

      alert("Event deleted successfully");

      navigate("/coordinator/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Coordinator Event Management
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your events and registered volunteers.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/coordinator/dashboard")
            }
            className="rounded-lg border bg-white px-4 py-2 font-medium hover:bg-gray-100"
          >
            ← Dashboard
          </button>
        </div>

      
        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

      
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event._id}
              className={`rounded-xl border bg-white p-6 shadow-sm ${
                selectedEvent?._id === event._id
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <h2 className="text-xl font-semibold">
                {event.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {event.description}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                📍 {event.location}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                📅{" "}
                {event.date
                  ? new Date(event.date).toLocaleDateString()
                  : "No date"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                👥 Capacity: {event.capacity}
              </p>

              <button
                onClick={() => viewRegistrations(event)}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                View Registrations
              </button>
            </div>
          ))}
        </div>

     
        {events.length === 0 && (
          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              You have not created any events yet.
            </p>
          </div>
        )}

        {selectedEvent && (
          <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex flex-wrap items-start justify-between gap-4">

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedEvent.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  Manage this event
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => setEditing(!editing)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {editing ? "Cancel Edit" : "Edit Event"}
                </button>

                <button
                  onClick={deleteEvent}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete Event
                </button>

              </div>
            </div>

        
            {editing && (
              <form
                onSubmit={updateEvent}
                className="mt-8 rounded-xl border bg-gray-50 p-6"
              >
                <h3 className="text-xl font-semibold">
                  Edit Event
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <div>
                    <label className="text-sm font-medium">
                      Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Capacity
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      min="1"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      required
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}

          
            <div className="mt-8">

              <h3 className="text-xl font-semibold">
                Registered Volunteers
              </h3>

              {registrations.length === 0 ? (
                <p className="mt-6 text-gray-500">
                  No volunteers have registered yet.
                </p>
              ) : (
                <div className="mt-6 space-y-4">

                  {registrations.map((registration) => (
                    <div
                      key={registration._id}
                      className="rounded-lg border p-4"
                    >
                      <p className="font-semibold">
                        {registration.volunteer?.name}
                      </p>

                      <p className="text-sm text-gray-600">
                        {registration.volunteer?.email}
                      </p>

                      <p className="text-sm text-gray-600">
                        {registration.volunteer?.phone}
                      </p>

                      <p className="mt-2 text-sm">
                        Status:{" "}
                        <span className="font-medium">
                          {registration.status}
                        </span>
                      </p>

                      <div className="mt-4 flex gap-3">

                        <button
                          onClick={() =>
                            updateStatus(
                              registration._id,
                              "approved"
                            )
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 text-white"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              registration._id,
                              "rejected"
                            )
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-white"
                        >
                          Reject
                        </button>

                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default CoordinatorEvents;