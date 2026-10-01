import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${API_URL}/certificates/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load certificates");
        }

        setCertificates(data.certificates || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [token]);

  const printCertificate = (index) => {
    const certificates = document.querySelectorAll(".certificate");

    certificates.forEach((certificate) => {
      certificate.classList.remove("print-certificate");
    });

    certificates[index].classList.add("print-certificate");

    setTimeout(() => {
      window.print();

      setTimeout(() => {
        certificates[index].classList.remove("print-certificate");
      }, 500);
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center">
        Loading certificates...
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @media print {
            body {
              background: white !important;
            }

            nav,
            footer,
            .hide-print {
              display: none !important;
            }

            .certificate {
              display: none !important;
              box-shadow: none !important;
              width: 100% !important;
              margin: 0 !important;
            }

            .print-certificate {
              display: block !important;
            }

            @page {
              size: A4 landscape;
              margin: 10mm;
            }
          }
        `}
      </style>

      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">

          <div className="hide-print mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Certificates
            </h1>

            <p className="mt-2 text-gray-600">
              Certificates earned through your NGO Connect events.
            </p>
          </div>

          {error && (
            <div className="hide-print rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {!error && certificates.length === 0 && (
            <div className="hide-print rounded-xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">🎓</div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                No Certificates Yet
              </h2>

              <p className="mt-2 text-gray-500">
                Your certificate will appear here after you attend an event
                and your attendance is marked present.
              </p>
            </div>
          )}

          {certificates.length > 0 && (
            <div className="space-y-8">
              {certificates.map((certificate, index) => (
                <div key={certificate._id}>

                  <div className="certificate overflow-hidden rounded-2xl border-4 border-emerald-700 bg-white shadow-lg">

                    <div className="border-b border-emerald-100 bg-emerald-50 px-8 py-6 text-center">
                      <div className="text-4xl">❤</div>

                      <h2 className="mt-2 text-3xl font-bold text-emerald-900">
                        NGO CONNECT
                      </h2>

                      <p className="mt-1 text-sm uppercase tracking-widest text-emerald-700">
                        Connect • Volunteer • Impact
                      </p>
                    </div>

                    <div className="px-6 py-10 text-center sm:px-12">

                      <p className="text-sm uppercase tracking-widest text-gray-500">
                        Certificate of Participation
                      </p>

                      <h3 className="mt-6 text-2xl font-semibold text-gray-700">
                        This certificate is proudly presented to
                      </h3>

                      <div className="mx-auto mt-5 max-w-2xl border-b-2 border-emerald-600 pb-3">
                        <p className="text-3xl font-bold text-emerald-800 sm:text-4xl">
                          {certificate.volunteer?.name || "Volunteer"}
                        </p>
                      </div>

                      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        In recognition of valuable participation and contribution to the NGO Connect community through the following event:
                      </p>

                      <h4 className="mt-6 text-2xl font-bold text-gray-900">
                        {certificate.event?.title || "NGO Event"}
                      </h4>

                      <div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">

                        {certificate.event?.date && (
                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs uppercase text-gray-500">
                              Event Date
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                              {new Date
                              (certificate.event.date).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        {certificate.event?.location && (
                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs uppercase text-gray-500">
                              Location
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                              {certificate.event.location}
                            </p>
                          </div>
                        )}

                      </div>

                      <div className="mt-10 grid gap-6 border-t pt-6 text-sm sm:grid-cols-2">
                        <div>
                          <p className="text-gray-500">
                            Certificate ID
                          </p>

                          <p className="mt-1 break-all font-mono font-semibold">
                            {certificate.certificateId}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Issued On
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {new Date(certificate.issuedAt).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                      <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        <div className="border-t border-gray-400 pt-2">
                          <p className="text-sm font-medium text-gray-700">
                            NGO Connect
                          </p>

                          <p className="text-xs text-gray-500">
                            Organization
                          </p>
                        </div>

                        <div className="border-t border-gray-400 pt-2">
                          <p className="text-sm font-medium text-gray-700">
                            Authorized Coordinator
                          </p>

                          <p className="text-xs text-gray-500">
                            Certificate Issuer
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-700 px-6 py-3 text-center text-sm text-white">
                      Thank you for making a difference through volunteering.
                    </div>
                  </div>

                  <div className="hide-print mt-4 text-center">
                    <button
                      onClick={() => printCertificate(index)}
                      className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      🖨️ Print / Download Certificate
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Certificates;