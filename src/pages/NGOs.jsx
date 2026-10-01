const ngos = [
  {
    name: "Goonj",
    category: "Community Development",
    description:
      "Goonj works on rural development and channels unused material from urban households to communities while addressing basic needs and local development.",
    location: "Madan Pur Khadar, New Delhi, India",
    website: "https://goonj.org/",
    map: "https://www.google.com/maps/search/?api=1&query=Goonj+Madan+Pur+Khadar+New+Delhi",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Smile Foundation",
    category: "Education & Healthcare",
    description:
      "Smile Foundation works across India in education, healthcare, livelihood and women empowerment, supporting underserved children and families.",
    location: "Yusuf Sarai, New Delhi, India",
    website: "https://www.smilefoundationindia.org/",
    map: "https://www.google.com/maps/search/?api=1&query=Smile+Foundation+Yusuf+Sarai+New+Delhi",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "The Akshaya Patra Foundation",
    category: "Food & Education",
    description:
      "The Akshaya Patra Foundation works to address classroom hunger by providing nutritious meals to children studying in government and government-aided schools.",
    location: "Rajajinagar, Bengaluru, India",
    website: "https://www.akshayapatra.org/",
    map: "https://www.google.com/maps/search/?api=1&query=Akshaya+Patra+Foundation+Rajajinagar+Bengaluru",
    image:
      "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "CRY – Child Rights and You",
    category: "Child Rights",
    description:
      "CRY works with communities and partner organizations to improve children's access to education, healthcare, protection and their basic rights.",
    location: "New Delhi, India",
    website: "https://www.cry.org/",
    map: "https://www.google.com/maps/search/?api=1&query=CRY+Child+Rights+and+You+New+Delhi",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Pratham Education Foundation",
    category: "Education",
    description:
      "Pratham works to improve the quality of education and learning outcomes for children and young people across India.",
    location: "Mumbai, Maharashtra, India",
    website: "https://www.pratham.org/",
    map: "https://www.google.com/maps/search/?api=1&query=Pratham+Education+Foundation+Mumbai",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
  },
];

function NGOs() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-emerald-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-emerald-300">
            Discover NGOs
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Organizations creating real impact.
          </h1>

          <p className="mt-4 max-w-2xl text-emerald-100">
            Explore nonprofit organizations working in education,
            healthcare, community development and other areas.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Discover NGOs
          </h2>

          <p className="mt-2 text-gray-600">
            Learn about organizations and the causes they support.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ngos.map((ngo) => (
              <div
                key={ngo.name}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >

                <img src={ngo.image} alt={ngo.name} className="h-48 w-full object-cover"/>
                <div className="p-5">
                  <p className="text-sm font-medium text-emerald-700">
                    {ngo.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    {ngo.name}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    {ngo.description}
                  </p>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>📍 {ngo.location}</p>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <a href={ngo.map} target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-emerald-800"
                    >
                      View Location
                    </a>

                    <a
                      href={ngo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg border border-emerald-700 px-3 py-2 text-center text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                    >
                      Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl rounded-xl bg-emerald-900 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Ready to make a difference?
          </h2>

          <p className="mt-3 text-emerald-100">
            Find volunteering opportunities and contribute your
            time and skills.
          </p>

          <a href="/events" className="mt-5 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-emerald-900 hover:bg-gray-100">
            Explore Events
          </a>
        </div>
      </section>
    </main>
  );
}
export default NGOs;