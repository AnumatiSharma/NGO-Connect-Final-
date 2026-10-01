import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  const dashboardPath =
    user?.role === "coordinator" || user?.role === "admin"
      ? "/coordinator/dashboard"
      : "/dashboard";

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">

        <section className="bg-emerald-900 px-6 py-20 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

            <div>
              <p className="text-sm font-semibold text-emerald-300">
                NGO CONNECT
              </p>

              <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
                Connect.
                <br />
                <span className="text-emerald-300">
                  Volunteer.
                </span>
                <br />
                Make an Impact.
              </h1>

              <p className="mt-5 text-lg text-emerald-100">
                Discover volunteering opportunities, connect with NGOs,
                and help make a difference in your community.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 text-gray-900 shadow-lg">

              <h2 className="text-2xl font-bold">
                Welcome to NGO Connect
              </h2>

              <p className="mt-3 text-gray-600">
                Login or create an account to get started.
              </p>

              <Link
                to="/login"
                className="mt-6 block rounded-lg bg-emerald-700 px-5 py-3 text-center font-semibold text-white hover:bg-emerald-800"
              >
                Log In
              </Link>

              <div className="my-5 text-center text-sm text-gray-400">
                OR
              </div>

              <Link
                to="/register"
                className="block rounded-lg border border-emerald-700 px-5 py-3 text-center font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                Sign Up
              </Link>

            </div>

          </div>
        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-emerald-900 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

          <div>
            <p className="text-sm font-medium text-emerald-300">
              Welcome back, {user.name} 👋
            </p>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              Together,
              <br />
              <span className="text-emerald-300">
                we create impact.
              </span>
            </h1>

            <p className="mt-5 text-lg text-emerald-100">
              Discover volunteering opportunities, connect with NGOs,
              and make a difference in your community.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                to="/events"
                className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500"
              >
                Explore Events
              </Link>

              <Link
                to={dashboardPath}
                className="rounded-lg border border-emerald-300 px-6 py-3 font-semibold text-emerald-100 hover:bg-emerald-800"
              >
                My Dashboard
              </Link>

            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
            alt="Volunteers working together"
            className="h-80 w-full rounded-xl object-cover"
          />

        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <h2 className="text-3xl font-bold text-gray-900">
            Find your way to contribute
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            NGO Connect helps you discover opportunities and connect
            with organizations working in the community.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                Find Opportunities
              </h3>

              <p className="mt-3 text-gray-600">
                Discover volunteering events and initiatives from NGOs.
              </p>

              <Link
                to="/events"
                className="mt-4 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Explore Events →
              </Link>

            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                Connect with NGOs
              </h3>

              <p className="mt-3 text-gray-600">
                Discover organizations and support causes that matter
                to you.
              </p>

              <Link
                to="/ngos"
                className="mt-4 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Discover NGOs →
              </Link>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                Track Your Journey
              </h3>

              <p className="mt-3 text-gray-600">
                Manage your registrations and volunteering activities.
              </p>

              <Link
                to={dashboardPath}
                className="mt-4 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Open Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl rounded-xl bg-emerald-900 p-10 text-center text-white">
          <h2 className="text-3xl font-bold">
            Ready for your next opportunity?
          </h2>

          <p className="mt-3 text-emerald-100">
            Explore current events and find a way to contribute your
            time and skills.
          </p>

          <Link
            to="/events"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500"
          >
            Explore Opportunities
          </Link>

        </div>
      </section>

    </main>
  );
}
export default Home;