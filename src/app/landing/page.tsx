"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Shirt, MapPin, Stars, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const features = [
  {
    icon: Shirt,
    title: "Borrow the look",
    desc: "Access statement outfits for parties, formals, dates, shoots, and last-minute plans without buying another fit.",
  },
  {
    icon: MapPin,
    title: "Hyperlocal circles",
    desc: "Swap within verified campuses, hostels, apartments, or trusted communities so every exchange feels faster and safer.",
  },
  {
    icon: ShieldCheck,
    title: "Trust-first system",
    desc: "Profiles, ratings, community verification, and cleaner returns make fashion sharing feel premium instead of risky.",
  },
];

const stats = [
  { value: "24/7", label: "drip discovery" },
  { value: "0", label: "dead outfits" },
  { value: "∞", label: "main character moments" },
];

const steps = [
  {
    no: "01",
    title: "List your pieces",
    desc: "Upload your best wardrobe pieces, set availability, and let your closet start earning attention instead of collecting dust.",
  },
  {
    no: "02",
    title: "Discover nearby heat",
    desc: "Browse pieces around you by aesthetic, event, size, or mood and find looks that actually match the moment.",
  },
  {
    no: "03",
    title: "Swap. Return. Repeat.",
    desc: "Borrow for the occasion, return it cleaned, and keep the fashion loop alive without overspending or overbuying.",
  },
];

export default function DripSwapLandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(129,140,248,0.18),transparent_26%),radial-gradient(circle_at_15%_55%,rgba(96,165,250,0.14),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(59,130,246,0.12),transparent_22%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-10 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-white/15 bg-white/5 shadow-[0_0_30px_rgba(96,165,250,0.18)]" />
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-white/75">DRIPSWAP</p>
              <p className="text-xs text-white/35">fashion, but shared</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#why" className="transition hover:text-white">Why it hits</a>
            <a href="#how" className="transition hover:text-white">How it works</a>
            <a href="#waitlist" className="transition hover:text-white">Waitlist</a>
          </nav>

          <div className="flex items-center gap-3">
  <a
    href="/login"
    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
  >
    Log in
  </a>

  <a
    href="/signup"
    className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-[1.03]"
  >
    Sign up
  </a>
</div>
        </motion.header>

        <section className="relative grid items-center gap-12 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <motion.div {...fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              shared closets for the next-gen style economy
            </div>

            <img
              src="/logo.png"
              alt="DripSwap logo"
              className="mb-8 w-[720px] max-w-full drop-shadow-[0_0_35px_rgba(129,140,248,0.55)]"
            />

            <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
              The platform where
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-300 bg-clip-text text-transparent"> wardrobes become networks.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
              DripSwap lets people borrow, lend, and discover fits inside verified local circles. Pull up in a new look for every occasion without buying more, wasting more, or letting good outfits die in the dark.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/signup" className="group inline-flex ...">
  Get early access
</a>
              <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                See the vision
              </button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
                  <p className="text-2xl font-black md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="relative">
            <div className="absolute -left-4 top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -right-2 bottom-6 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              <div className="rounded-[1.6rem] border border-white/10 bg-neutral-950/90 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/35">Tonight's heat</p>
                    <h3 className="mt-1 text-2xl font-black">Nearby fits live now</h3>
                  </div>
                  <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                    verified circle
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-white/18 via-indigo-500/25 to-sky-400/20 p-[1px]">
                    <div className="rounded-[1.45rem] bg-neutral-950 p-4">
                      <div className="flex h-72 items-end rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(17,24,39,0.08)),radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_38%)] p-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/45">borrow for sat night</p>
                          <h4 className="mt-2 text-2xl font-black">Chrome Street Set</h4>
                          <p className="mt-2 max-w-xs text-sm leading-6 text-white/55">
                            A high-energy local look built for parties, shoots, dinners, and dramatic entrances.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                        <span>1.8 km away</span>
                        <span className="font-semibold text-indigo-200">28 swap credits</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/35">AI mood match</p>
                          <h5 className="mt-2 text-lg font-bold">Going out tonight?</h5>
                        </div>
                        <Stars className="h-5 w-5 text-indigo-300" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        Get outfit discovery by vibe, occasion, aesthetic, and what your circle is wearing right now.
                      </p>
                    </div>

                    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/35">Circular flex</p>
                          <h5 className="mt-2 text-lg font-bold">Waste less, wear harder</h5>
                        </div>
                        <Zap className="h-5 w-5 text-sky-300" />
                      </div>
                      <div className="mt-4 h-2.5 rounded-full bg-white/10">
                        <div className="h-2.5 w-[78%] rounded-full bg-gradient-to-r from-indigo-400 to-sky-400" />
                      </div>
                      <p className="mt-3 text-sm text-white/55">18 avoided impulse purchases this month.</p>
                    </div>

                    <div className="rounded-[1.4rem] border border-dashed border-white/15 bg-black/20 p-4 text-sm leading-6 text-white/55">
                      Exclusive energy. Community trust. Fashion access without owning every single look.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="why" className="py-10 md:py-16">
          <motion.div {...fadeUp} className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/38">Why it hits</p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">Built for style, speed, and social trust.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/52 md:text-right">
              DripSwap is not just a rental tool. It is a fashion layer for communities that already share culture, spaces, and moments.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-sky-400/15 shadow-[0_0_25px_rgba(96,165,250,0.12)]">
                    <Icon className="h-6 w-6 text-indigo-200" />
                  </div>
                  <h3 className="text-xl font-black">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="how" className="py-10 md:py-16">
          <motion.div {...fadeUp} className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-white/38">How it works</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Three steps to unlimited looks.</h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.no}
                {...fadeUp}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-neutral-950/75 p-6"
              >
                <p className="text-sm font-bold tracking-[0.2em] text-indigo-300">{step.no}</p>
                <h3 className="mt-3 text-2xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="waitlist" className="py-10 md:py-16">
          <motion.div
            {...fadeUp}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-8 md:p-10"
          >
            <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/38">Early access</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-black md:text-5xl">
                  Join the first wave of people turning closets into culture.
                </h2>
                <p className="mt-4 max-w-2xl text-white/58 leading-8">
                  Be first in line when DripSwap opens private circles for campuses and communities. Get access to the drops, the discovery, and the future of shared fashion.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white/65">Reserve your spot</p>
                <div className="mt-4 space-y-3">
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                    placeholder="Enter your email"
                  />
                  <button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-black transition hover:scale-[1.02]">
                    Join the waitlist
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/35">No spam. Just immaculate updates.</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
