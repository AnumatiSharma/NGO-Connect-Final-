import { useState } from "react";

const API_URL = "https://ngo-connect-backend.vercel.app/api";

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!certificateId.trim()) {
      setError("Please enter a certificate ID.");
      setCertificate(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCertificate(null);

      const response = await fetch(
        `${API_URL}/certificates/verify/${encodeURIComponent(
          certificateId.trim()
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Certificate could not be verified."
        );
      }

      setCertificate(data.certificate);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Verify Certificate
        </h1>

        <p className="mt-2 text-gray-600">
          Enter a certificate ID to verify it.
        </p>

        <form
          onSubmit={handleVerify}
          className="mt-6 rounded-xl bg-white p-6 shadow-sm"
        >
          <label className="text-sm font-medium">
            Certificate ID
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Enter certificate ID"
              className="flex-1 rounded-lg border px-3 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {certificate && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

            <div className="rounded-lg bg-green-50 p-4">
              <h2 className="text-xl font-bold text-green-700">
                ✓ Certificate Verified
              </h2>

              <p className="mt-1 text-green-600">
                This certificate is valid.
              </p>
            </div>

            <div className="mt-6 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Volunteer Name
                </p>
                <p className="font-semibold">
                  {certificate.volunteer?.name || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Event
                </p>
                <p className="font-semibold">
                  {certificate.event?.title || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Event Date
                </p>
                <p className="font-semibold">
                  {certificate.event?.date
                    ? new Date(
                        certificate.event.date
                      ).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>
                <p className="font-semibold">
                  {certificate.event?.location || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Certificate ID
                </p>
                <p className="break-all font-semibold">
                  {certificate.certificateId}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Issued On
                </p>
                <p className="font-semibold">
                  {certificate.issuedAt
                    ? new Date(
                        certificate.issuedAt
                      ).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default VerifyCertificate;