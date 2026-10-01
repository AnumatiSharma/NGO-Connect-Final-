import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function CoordinatorEvents() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    capacity: "",
  });

  useEffect(() => {
    const getEvents = async () => {
      try {
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

        if (eventId) {
          const event = myEvents.find((item) => item._id === eventId);

          if (!event) {
            setError("Event not found.");
            return;
          }

          selectEvent(event);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [eventId]);

  const selectEvent = async (event) => {
    setSelectedEvent(event);

    setForm({
      title: event.title || "",
      description: event.description || "",
      category: event.category || "",
      date: event.date ? event.date.substring(0, 10) : "",
      location: event.location || "",
      capacity: event.capacity || "",
    });

    await getRegistrations(event._id);
  };

  const getRegistrations = async (id) => {
    try {
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

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/registrations/${id}/status`,
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
        throw new Error(data.message || "Failed to update status");
      }

      setRegistrations((items) =>
        items.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const markAttendance = async (id, attendance) => {
    try {
      const response = await fetch(
        `${API_URL}/registrations/${id}/attendance`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ attendance }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to mark attendance"
        );
      }

      setRegistrations((items) =>
        items.map((item) =>
          item._id === id ? { ...item, attendance } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const generateCertificate = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/certificates/generate/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate certificate"
        );
      }

      alert(
        `Certificate generated successfully!\n\nCertificate ID: ${data.certificate.certificateId}`
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateEvent = async (e) => {
    e.preventDefault();

    if (!selectedEvent) return;

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/events/${selectedEvent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            category: form.category,
            date: form.date,
            location: form.location,
            capacity: Number(form.capacity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event");
      }

      setSelectedEvent(data.event);

      setEvents((items) =>
        items.map((event) =>
          event._id === data.event._id ? data.event : event
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

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedEvent.title}"?`
    );

    if (!confirmDelete) return;

    try {
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
        throw new Error(data.message || "Failed to delete event");
      }

      alert("Event deleted successfully");
      navigate("/coordinator/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-10 text-center">
        Loading events...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Event Management
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your events and registered volunteers.
            </p>
          </div>

          <button
            onClick={() => navigate("/coordinator/dashboard")}
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

        {!eventId && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event._id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold">
                  {event.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {event.description}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  <p>📍 {event.location}</p>
                  <p>
                    📅{" "}
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "No date"}
                  </p>
                  <p>👥 Capacity: {event.capacity}</p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/coordinator/events/${event._id}`)
                  }
                  className="mt-5 rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
                >
                  Manage Event
                </button>
              </div>
            ))}
          </div>
        )}

        {!eventId && events.length === 0 && (
          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              You have not created any events yet.
            </p>
          </div>
        )}

        {selectedEvent && (
          <section className="mt-10 rounded-xl bg-white p-6 shadow-sm">

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedEvent.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  Manage this event
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(!editing)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {editing ? "Cancel" : "Edit Event"}
                </button>

                <button
                  onClick={deleteEvent}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            {editing && (
              <form
                onSubmit={updateEvent}
                className="mt-8 rounded-xl bg-gray-50 p-6"
              >
                <h3 className="text-xl font-semibold">
                  Edit Event
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  {[
                    ["title", "Title", "text"],
                    ["category", "Category", "text"],
                    ["date", "Date", "date"],
                    ["capacity", "Capacity", "number"],
                    ["location", "Location", "text"],
                  ].map(([name, label, type]) => (
                    <div
                      key={name}
                      className={
                        name === "location"
                          ? "md:col-span-2"
                          : ""
                      }
                    >
                      <label className="text-sm font-medium">
                        {label}
                      </label>

                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        min={name === "capacity" ? "1" : undefined}
                        className="mt-1 w-full rounded-lg border px-3 py-2"
                        required
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
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
                  className="mt-6 rounded-lg bg-emerald-700 px-5 py-2 text-white disabled:opacity-50"
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
                <p className="mt-5 text-gray-500">
                  No volunteers have registered yet.
                </p>
              ) : (
                <div className="mt-5 space-y-4">
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
                          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
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
                          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>

                      {registration.status === "approved" && (
                        <div className="mt-5 border-t pt-4">
                          <p className="font-medium">
                            Attendance
                          </p>

                          <p className="mt-1 text-sm text-gray-600">
                            Current:{" "}
                            {registration.attendance === "not_marked"
                              ? "Not Marked"
                              : registration.attendance}
                          </p>

                          <div className="mt-3 flex gap-3">
                            <button
                              onClick={() =>
                                markAttendance(
                                  registration._id,
                                  "present"
                                )
                              }
                              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                            >
                              ✓ Present
                            </button>

                            <button
                              onClick={() =>
                                markAttendance(
                                  registration._id,
                                  "absent"
                                )
                              }
                              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                              ✕ Absent
                            </button>
                          </div>

                          {registration.attendance === "present" && (
                            <div className="mt-5 border-t pt-4">
                              <p className="font-medium">
                                Certificate
                              </p>

                              <p className="mt-1 text-sm text-gray-600">
                                This volunteer is eligible for a certificate.
                              </p>

                              <button
                                onClick={() =>
                                  generateCertificate(
                                    registration._id
                                  )
                                }
                                className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                              >
                                🎓 Generate Certificate
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>
        )}
      </div>
    </main>
  );
}

export default CoordinatorEvents;