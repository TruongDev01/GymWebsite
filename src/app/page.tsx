import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function Home() {
  const session = await getSessionCookie();

  const trainers = await prisma.trainerProfile.findMany({
    include: {
      user: true,
    },
    take: 4, // Show top 4 trainers on landing page
    orderBy: {
      rating: 'desc'
    }
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-100 min-w-max">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined !text-3xl">fitness_center</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">GymPro</h2>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium leading-normal text-slate-300 transition-colors hover:text-primary" href="#home">Home</Link>
            <Link className="text-sm font-medium leading-normal text-slate-300 transition-colors hover:text-primary" href="#services">Services</Link>
            <Link className="text-sm font-medium leading-normal text-slate-300 transition-colors hover:text-primary" href="#equipment">Equipment</Link>
            <Link className="text-sm font-medium leading-normal text-slate-300 transition-colors hover:text-primary" href="#packages">Packages</Link>
            <Link className="text-sm font-medium leading-normal text-slate-300 transition-colors hover:text-primary" href="#trainers">Trainers</Link>
            <Link className="text-sm font-medium leading-normal text-slate-300 transition-colors hover:text-primary" href="#blog">Blog</Link>
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <form action={async () => {
                "use server";
                const { deleteSessionCookie } = await import("@/lib/auth");
                await deleteSessionCookie();
                const { redirect } = await import("next/navigation");
                redirect("/login");
              }}>
                <Button type="submit" variant="outline" className="h-9 px-4 text-xs hover:border-border-dark">
                  Log Out (<span className="text-primary">{String(session.name || session.email)}</span>)
                </Button>
              </form>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="hidden sm:flex h-9 text-sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button className="h-9 text-sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-surface-dark">
            <div className="absolute inset-0 z-0">
              <img
                alt="Gym Hero background"
                className="h-full w-full object-cover opacity-60 mix-blend-overlay"
                src="https://i.pinimg.com/736x/b3/ac/a1/b3aca1acdb94be7c688269f89ee0ee9a.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
            </div>
            <div className="relative z-10 flex min-h-[600px] flex-col items-center justify-center px-6 py-16 text-center sm:px-12 lg:px-16">
              <div className="max-w-3xl flex flex-col items-center">
                <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl uppercase text-center">
                  AWAKEN YOUR <br />
                  <span className="text-primary">HIDDEN POTENTIAL</span>
                </h1>
                <p className="mb-8 mx-auto max-w-xl text-lg text-slate-300 font-light text-center">
                  International standard gym system with modern equipment and professional coaching team, ready to accompany you to conquer every goal.
                </p>
                <Link href="/register">
                  <Button className="h-14 rounded-full px-10 text-base shadow-lg shadow-primary/30 hover:scale-105">
                    EXPLORE OUR PACKAGES
                    <span className="material-symbols-outlined ml-2 text-lg">arrow_downward</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-border-dark bg-surface-dark p-6 shadow-xl shadow-black/20 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-black text-white">05+</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Branches</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-black text-white">50+</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Expert Trainers</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-black text-white">100+</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Equipment</p>
            </div>
            <div className="text-center border-l border-white/5">
              <p className="text-3xl font-black text-white">2k+</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Members</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Our Services</h2>
                <h3 className="text-3xl font-bold text-white sm:text-4xl">Comprehensive Training</h3>
                <p className="mt-4 text-slate-400">We provide a variety of services to meet all your fitness needs, from muscle gain, fat loss to endurance training.</p>
              </div>
              <button className="group flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-light">
                View all services
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group glass-panel relative overflow-hidden rounded-2xl p-6 hover:bg-surface-dark transition-all duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">fitness_center</span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Gym &amp; Cardio</h4>
                <p className="text-sm text-slate-400">The most modern weight area and cardio machines imported from the USA.</p>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10"></div>
              </div>
              <div className="group glass-panel relative overflow-hidden rounded-2xl p-6 hover:bg-surface-dark transition-all duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">self_improvement</span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Yoga &amp; Pilates</h4>
                <p className="text-sm text-slate-400">Balance body and mind with classes ranging from basic to advanced levels.</p>
              </div>
              <div className="group glass-panel relative overflow-hidden rounded-2xl p-6 hover:bg-surface-dark transition-all duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">sports_martial_arts</span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Kickboxing</h4>
                <p className="text-sm text-slate-400">Relieve stress, increase reflexes, and maximize calorie burning.</p>
              </div>
              <div className="group glass-panel relative overflow-hidden rounded-2xl p-6 hover:bg-surface-dark transition-all duration-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">person_check</span>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Personal Trainer</h4>
                <p className="text-sm text-slate-400">Personalized 1:1 training roadmap ensures the fastest results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Team Section */}
        <section id="trainers" className="bg-background-dark py-20 border-t border-border-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Expert Team</h2>
              <h3 className="text-3xl font-bold text-white sm:text-4xl">Meet Our Top Trainers</h3>
              <p className="mt-4 max-w-2xl text-slate-400">Professional coaches with years of experience who will push your limits and help you achieve your dream physique.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="group relative overflow-hidden rounded-2xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-gray-800">
                    <img
                      alt={`Trainer ${trainer.user.name}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      src={trainer.imageUrl || '/default-avatar.png'}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm fill-current">
                          {i < Math.floor(trainer.rating)
                            ? 'star'
                            : (i === Math.floor(trainer.rating) && trainer.rating % 1 > 0 ? 'star_half' : 'star_border')
                          }
                        </span>
                      ))}
                      <span className="text-xs text-slate-300 ml-1">({trainer.rating.toFixed(1)})</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">{trainer.user.name}</h4>
                    <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">{trainer.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Environment Section */}
        <section id="equipment" className="border-y border-border-dark bg-[#120c0d] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Training Environment</h2>
              <h3 className="text-3xl font-bold text-white sm:text-4xl">Modern Equipment</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                <img alt="Modern treadmills row" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-LB9cKpG9cATg-MMCl-rdNety2DxqcQEGIrC2gxtx_Ax7nr8UCJOT8I3HbiaATvrKyV3rsSmA72sJIaPUukd2ln6avJIiew6eHyr4SPQO6we2l70iHcBTjxpv0Ik7dTqLT-HAyBSvXZ1wGJLrdeo2dkRMWuAdzyR5xsFkObUE0RD4ePoHpltSdNe90QCQVGAvlpNfQC7kmG_yJhR76l7jtMvkca_KrZyLv0dwR4Jzv2EDS92oAnLVqQLEAnottTGPjJZ4ADfGkIY" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                  <p className="text-lg font-bold text-white">Cardio Zone</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                <img alt="Weight racks" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG_D2wB3kQoS5Cwp_by24ak8a92Ik8lzqgSxNwoQ2VZk8-S-B7dk8h3GHFSVaQhSDAL06RmyeYcu0oeEffnK9zv_j1Fnm1eTTwRl_r5gtojlM9xbREmwPmEXbfpLE0EzRajUToU2nnT4kpTdi9awizhMYRGg_7BEfFlqeqM6NCLXiIkXKt_mcdjfsBtEF3d6GRk--sZFNI01lUh7aGhFXgkMLvb5ScnMyK-j4a-UWkgYd15rXDG0i3miJ_JVixEF6Bd6uimmbavYc" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                  <p className="text-lg font-bold text-white">Free Weight Zone</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl aspect-[4/3] sm:col-span-2 md:col-span-1">
                <img alt="Group class studio" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBngZfXreVyOwSw6gJYJvsUV1PP1Uv66GTjNGv935jwi6cx_H4F-W7ftokLGw0p9H401Zipinw436R5POFVSM3x1U9sGC9i_RuSQlYSaCSy0ByfMqVAZxxk9ebDq8TmoFwkGrRItQkUKlcQJi-v1bNux5rKNIBjGVTctYSp9QKupqHD0uqN1gLj2-0NxDNxS3GIRfWSR1y4QUjae_jRBKzbZEQ7PSWrVvnEHeV6p6HJFyKNiLB3oiTAgruU8ERjSJJ2ug5h2toKEVs" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                  <p className="text-lg font-bold text-white">Group Studio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Packages Section */}
        <section id="packages" className="py-20 relative overflow-hidden bg-background-dark">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-12 text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Special Packages</h2>
              <h3 className="text-3xl font-bold text-white sm:text-4xl">Choose Your Plan</h3>
              <p className="mt-4 text-slate-400">Invest in your health with flexible and economical training packages.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border-dark bg-surface-dark p-8 transition-transform hover:-translate-y-2">
                <h4 className="text-lg font-bold text-slate-200">Basic Plan</h4>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">$20</span>
                  <span className="ml-2 text-sm text-slate-400">/ month</span>
                </div>
                <p className="mt-4 text-sm text-slate-400">For beginners who want to experience the gym.</p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Access to 01 branch
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Unlimited training time
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Free locker &amp; shower
                  </li>
                  <li className="flex items-center text-sm text-slate-500 line-through">
                    <span className="material-symbols-outlined mr-3 text-slate-600 text-base">close</span>
                    Access to Group X classes
                  </li>
                </ul>
                <button className="mt-8 w-full rounded-lg border border-border-dark bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-white/5">
                  Select Plan
                </button>
              </div>
              <div className="relative rounded-2xl border border-primary bg-surface-dark p-8 shadow-2xl shadow-primary/10 transition-transform hover:-translate-y-2 lg:-mt-4 lg:mb-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </div>
                <h4 className="text-lg font-bold text-primary">Gold Membership</h4>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">$40</span>
                  <span className="ml-2 text-sm text-slate-400">/ month</span>
                </div>
                <p className="mt-4 text-sm text-slate-400">Unlimited experience of premium services.</p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Access to all branches
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Access to Yoga, Group X classes
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    01 free PT orientation session
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Free towel &amp; drinks
                  </li>
                </ul>
                <button className="mt-8 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90">
                  Register Now
                </button>
              </div>
              <div className="rounded-2xl border border-border-dark bg-surface-dark p-8 transition-transform hover:-translate-y-2">
                <h4 className="text-lg font-bold text-slate-200">Diamond Plan</h4>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">$85</span>
                  <span className="ml-2 text-sm text-slate-400">/ month</span>
                </div>
                <p className="mt-4 text-sm text-slate-400">VIP class and special care service.</p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    All Gold Plan benefits
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Private VIP area
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    4 PT sessions / month
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <span className="material-symbols-outlined mr-3 text-primary text-base">check</span>
                    Fixed personal locker
                  </li>
                </ul>
                <button className="mt-8 w-full rounded-lg border border-border-dark bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-white/5">
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Blog & News Section */}
        <section id="blog" className="py-20 bg-[#120c0d]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Blog &amp; News</h2>
                <h3 className="text-3xl font-bold text-white sm:text-4xl">Fitness Knowledge</h3>
                <p className="mt-4 text-slate-400">Latest articles on training, nutrition and healthy lifestyle to help you reach your goals faster.</p>
              </div>
              <button className="group flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-light">
                Read more articles
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <article className="flex flex-col overflow-hidden rounded-2xl bg-surface-dark border border-border-dark hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Workout tips" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkiz03fJeBnh_rwfCspdsNP0vZd6sJB6fUu8eXQxE1EtultwLoiIxdy6KZ7_vIi27j5XxF04k5AF1oxo6I87x9qkvLSo6mqqRQmOuk2GL7XS46KOMgHhouMAFzLjz-bXtaCN5hYnFNoMOIVxdN_KXunVzEHobgbq9JchZQxOLDkPWOu-OMtHeTndZz4v5_vZ5YVwQMqYl8GUG35otCqg7olhMzCyFKKx5xzGkkXA1r8NzQfU-zLVZhrSybTOd-v0T_vIoV3Q-fnQA" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white shadow-sm">Training</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-xs text-slate-400">Oct 24, 2023 • 5 min read</div>
                  <h4 className="mb-3 text-xl font-bold text-white group-hover:text-primary transition-colors">5 Essential Compound Exercises for Mass</h4>
                  <p className="mb-4 flex-1 text-sm text-slate-400 line-clamp-3">Discover the key movements that build the most muscle and strength in the shortest amount of time.</p>
                  <a className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-light" href="#">
                    Read Article <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl bg-surface-dark border border-border-dark hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Healthy food" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-KtnbDK1GHrVCgjm7MuDP2WUXBonVH1LgzUd6y_1kvf47yanFJQItfQ5UNRd7vZ6ey5wsfyGRREaRKR5MAsMuDXVAXGQ9Fg44q_y34XazQQv5hqOKJGgUrGL5eeb1waozv1kLvVCeKF02AjQeQ8miVGbsLFp3B0-QIw5CrkeChFZTRS9FJjq67hiWm5dUIqu4TbkCUgMI1YpB2vQopuUuF3TkJbFzkLdX7f6cnYfJt4C66PJJV9eNC8d9aL-3Za0fYPRznMKnStY" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-green-600/90 px-3 py-1 text-xs font-medium text-white shadow-sm">Nutrition</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-xs text-slate-400">Oct 20, 2023 • 4 min read</div>
                  <h4 className="mb-3 text-xl font-bold text-white group-hover:text-primary transition-colors">The Truth About Pre-Workout Nutrition</h4>
                  <p className="mb-4 flex-1 text-sm text-slate-400 line-clamp-3">What you should actually eat before hitting the gym to maximize performance and energy levels.</p>
                  <a className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-light" href="#">
                    Read Article <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>
              <article className="flex flex-col overflow-hidden rounded-2xl bg-surface-dark border border-border-dark hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <img alt="Meditation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG_7wu9QNwUmDiNbnIrm--aG9uZC-a2qAMU1R6dhSgSbS5tEr3iNAExAbh94qEOfBHbSv-Ypl88IFe2jG4PNaJ9-aQX0EFH_QJVzV8hnAOZocH6zttgBpQqtbxhiPVTsnCp8Qm2e3vtIbIfNQ7w1EJ1uH5GOCWm5rLzSSLAY6mzwTX3-Vqy9k9awVCwtCjMdu5SMiFgebp1MQ858tBAlfLLTGq67AzzmvEVU9g0RzNcgizxP4Q0UIDKguURxrmtH5VqLoS7pgsHX8" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-blue-500/90 px-3 py-1 text-xs font-medium text-white shadow-sm">Lifestyle</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-xs text-slate-400">Oct 15, 2023 • 6 min read</div>
                  <h4 className="mb-3 text-xl font-bold text-white group-hover:text-primary transition-colors">Recovery: The Missing Piece of the Puzzle</h4>
                  <p className="mb-4 flex-1 text-sm text-slate-400 line-clamp-3">Why rest days and sleep are just as important as your training sessions for muscle growth.</p>
                  <a className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-light" href="#">
                    Read Article <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 px-4">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-primary to-rose-600 px-6 py-12 text-center shadow-2xl shadow-primary/20 sm:px-12">
            <h2 className="text-3xl font-black text-white sm:text-4xl">READY TO TRANSFORM YOURSELF?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">Register today to get a 30% discount for the first month and 01 free trial session with a personal trainer.</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <input className="h-12 w-full rounded-lg border-none bg-white/20 px-4 text-white placeholder-white/70 backdrop-blur-sm outline-none sm:w-80" placeholder="Enter your email" type="email" />
              <button className="h-12 w-full rounded-lg bg-white px-8 font-bold text-primary transition-colors hover:bg-slate-100 sm:w-auto">
                Get Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-dark bg-[#120c0d] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white">
                <div className="flex items-center justify-center rounded-lg bg-primary/20 p-1">
                  <span className="material-symbols-outlined text-primary text-xl">fitness_center</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight">GymPro</h2>
              </div>
              <p className="text-sm text-slate-400">A 5-star gym system delivering the ultimate fitness experience.</p>
              <div className="flex gap-4 mt-2">
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase text-white">About Us</h3>
              <ul className="flex flex-col gap-2 text-sm text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Brand Story</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Training Team</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase text-white">Customer Support</h3>
              <ul className="flex flex-col gap-2 text-sm text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Terms of Use</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase text-white">Contact</h3>
              <ul className="flex flex-col gap-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                  <span>123 Nguyen Van Linh, HCMC</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">call</span>
                  <span>1900 123 456</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                  <span>06:00 - 22:00 (Daily)</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} GymPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
