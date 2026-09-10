import {
  ExternalLink,
  MapPin,
  Heart,
  Users,
  GraduationCap,
  Utensils,
  Baby,
} from "lucide-react";

const ngos = [
  {
    name: "Goonj",
    category: "Community Development",
    description:
      "Goonj works on rural development and channels unused material from urban households to communities while addressing basic needs and local development.",
    location: "Madan Pur Khadar, New Delhi, India",
    address:
      "Goonj Centre of Circularity, Madan Pur Khadar, Near Sunder Public School, New Delhi – 110076",
    website: "https://goonj.org/",
    map:
      "https://www.google.com/maps/search/?api=1&query=Goonj+Madan+Pur+Khadar+New+Delhi",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=85",
  },

  {
    name: "Smile Foundation",
    category: "Education & Healthcare",
    description:
      "Smile Foundation works across India in education, healthcare, livelihood and women empowerment, supporting underserved children and families.",
    location: "Yusuf Sarai, New Delhi, India",
    address:
      "161 B/4, 3rd Floor, Gulmohar House, Yusuf Sarai Community Centre, New Delhi – 110049",
    website: "https://www.smilefoundationindia.org/",
    map:
      "https://www.google.com/maps/search/?api=1&query=Smile+Foundation+Yusuf+Sarai+New+Delhi",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=85",
  },

  {
    name: "The Akshaya Patra Foundation",
    category: "Food & Education",
    description:
      "The Akshaya Patra Foundation works to address classroom hunger by providing nutritious meals to children studying in government and government-aided schools.",
    location: "Rajajinagar, Bengaluru, India",
    address:
      "Hare Krishna Hill, West of Chord Road, Rajajinagar, Bengaluru – 560010",
    website: "https://www.akshayapatra.org/",
    map:
      "https://www.google.com/maps/search/?api=1&query=Akshaya+Patra+Foundation+Rajajinagar+Bengaluru",
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1000&q=85",
  },

  {
    name: "CRY – Child Rights and You",
    category: "Child Rights",
    description:
      "CRY works with communities and partner organizations to improve children's access to education, healthcare, protection and their basic rights.",
    location: "New Delhi, India",
    address:
      "632, Lane No. 3, Westend Marg, Near Saket Metro Station, Saiyad-ul-Ajaib, New Delhi – 110030",
    website: "https://www.cry.org/",
    map:
      "https://www.google.com/maps/search/?api=1&query=CRY+Child+Rights+and+You+New+Delhi",
    icon: Baby,
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=85",
  },

  {
    name: "Pratham Education Foundation",
    category: "Education",
    description:
      "Pratham works to improve the quality of education and learning outcomes for children and young people across India.",
    location: "Mumbai, Maharashtra, India",
    address: "Mumbai, Maharashtra, India",
    website: "https://www.pratham.org/",
    map:
      "https://www.google.com/maps/search/?api=1&query=Pratham+Education+Foundation+Mumbai",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
  },
];

function NGOs() {
  return (
    <main className="min-h-screen bg-[#f4faf7]">
      <section className="relative overflow-hidden border-b border-emerald-900/10 bg-gradient-to-br from-[#e9f8f1] via-white to-[#effbf5] px-6 py-20 sm:py-24">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              <Heart size={16} />
              Discover NGOs
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-emerald-950 sm:text-6xl">
              Organizations creating
              <span className="text-emerald-700"> real impact.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Explore trusted nonprofit organizations working across India.
              Learn about their missions, discover where they operate, and
              connect with organizations making a difference.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Featured organizations
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950">
              Discover NGOs
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Explore organizations working in education, healthcare,
              community development, child rights and food security.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {ngos.map((ngo) => {
              const Icon = ngo.icon;
              return (
                <article
                  key={ngo.name}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-[0_8px_30px_rgba(6,45,36,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(6,45,36,0.10)]"
                >
                  <div className="relative h-52 overflow-hidden bg-emerald-900">
                    <img
                      src={ngo.image}
                      alt={`${ngo.name} community work`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=85";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/65 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-sm">
                      <Icon size={14} />
                      {ngo.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl font-bold tracking-tight text-emerald-950">
                      {ngo.name}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                      {ngo.description}
                    </p>

                    <div className="mt-6 rounded-2xl bg-[#f3faf6] p-4">
                      <div className="flex gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                            Location
                          </p>

                          <p className="mt-1 text-sm font-medium leading-6 text-slate-700">
                            {ngo.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={ngo.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md"
                      >
                        <MapPin size={17} />
                        View Location
                      </a>

                      <a
                        href={ngo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                      >
                        <ExternalLink size={17} />
                        Official Website
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-emerald-950 px-7 py-12 text-center shadow-[0_20px_50px_rgba(6,45,36,0.15)] sm:px-12">
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-emerald-200">
                <Heart size={27} />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                Ready to make a difference?
              </h2>

              <p className="mt-4 text-emerald-100">
                Find volunteering opportunities and turn your time and
                skills into meaningful community impact.
              </p>

              <a
                href="/events"
                className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Explore Volunteer Opportunities →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NGOs;