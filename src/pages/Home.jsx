import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f4faf7]">
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-6 py-16 lg:px-8">
            <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg backdrop-blur lg:mx-0">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>

                <p className="font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  NGO Connect
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Connect.
                  <br />
                  <span className="text-emerald-300">
                    Volunteer.
                  </span>
                  <br />
                  Make an Impact.
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-emerald-100 lg:mx-0">
                  Discover meaningful volunteering opportunities,
                  connect with NGOs, and use your time and skills
                  to create positive change in your community.
                </p>

              </div>
              <div className="rounded-[2rem] border border-white/20 bg-white p-7 shadow-2xl sm:p-10">

                <div className="text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M19 8v6" />
                      <path d="M22 11h-6" />
                    </svg>
                  </div>

                  <h2 className="mt-5 text-3xl font-bold text-emerald-950">
                    Welcome to NGO Connect
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Login to your account or create a new account
                    to get started.
                  </p>

                </div>

                <Link
                  to="/login"
                  className="mt-8 flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md"
                >
                  Log In
                </Link>


       
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-sm text-slate-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <Link
                  to="/register"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-emerald-700 px-6 py-3.5 font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  Sign Up
                </Link>


                <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                  Join NGO Connect and discover opportunities to
                  make a real difference.
                </p>

              </div>

            </div>

          </div>
        </section>

      </main>
    );
  }


  const dashboardPath =
    user.role === "coordinator" || user.role === "admin"
      ? "/coordinator/dashboard"
      : "/dashboard";

  return (
    <main className="min-h-screen bg-[#f7fcf9]">
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-emerald-200">
              Welcome back, {user.name} 👋
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Together,
              <br />
              <span className="text-emerald-300">
                we create impact.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100">
              Discover volunteering opportunities, connect with
              NGOs, and continue making a difference in your
              community.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/events"
                className="rounded-full bg-white px-7 py-3.5 font-semibold text-emerald-900 shadow-lg transition hover:-translate-y-1 hover:bg-emerald-50"
              >
                Explore Events →
              </Link>

              <Link
                to={dashboardPath}
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition hover:bg-white/20"
              >
                My Dashboard
              </Link>

            </div>

          </div>


          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
              alt="Volunteers working together"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Make a difference
            </p>

            <h2 className="mt-3 text-3xl font-bold text-emerald-950 sm:text-4xl">
              Find your way to contribute.
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              NGO Connect makes it easier to discover opportunities
              and connect with organizations creating positive change.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Opportunities */}
            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80"
                alt="Volunteers helping the community"
                className="h-52 w-full object-cover"
              />

              <div className="p-7">

                <h3 className="text-xl font-bold text-emerald-950">
                  Find Opportunities
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Discover volunteering events and initiatives
                  from NGOs working in your community.
                </p>

                <Link
                  to="/events"
                  className="mt-5 inline-block font-semibold text-emerald-700"
                >
                  Explore events →
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80"
                alt="Community volunteers"
                className="h-52 w-full object-cover"
              />

              <div className="p-7">

                <h3 className="text-xl font-bold text-emerald-950">
                  Connect with NGOs
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Discover organizations and support causes that
                  matter to you.
                </p>

                <Link
                  to="/ngos"
                  className="mt-5 inline-block font-semibold text-emerald-700"
                >
                  Discover NGOs →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80"
                alt="People collaborating"
                className="h-52 w-full object-cover"
              />

              <div className="p-7">

                <h3 className="text-xl font-bold text-emerald-950">
                  Track Your Journey
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Manage your registrations and keep track of your
                  volunteering activities.
                </p>

                <Link
                  to={dashboardPath}
                  className="mt-5 inline-block font-semibold text-emerald-700"
                >
                  Open dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-emerald-950 px-8 py-14 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready for your next opportunity?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
            Explore current events and find a way to contribute
            your time and skills.
          </p>

          <Link
            to="/events"
            className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-emerald-900 transition hover:-translate-y-1 hover:bg-emerald-50"
          >
            Explore Opportunities →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;
