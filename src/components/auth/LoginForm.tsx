
"use client"

import { useEffect, useState, type FormEvent } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react"
import { Toaster, toast } from "react-hot-toast"

import { MagicCard } from "@/components/ui/magic-card"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BorderBeam } from "@/components/ui/border-beam"

const orbitLabels = Array.from({ length: 8 }, (_, i) => i)

// Orbit ka total size
const ORBIT_SIZE = 620

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orbitScale, setOrbitScale] = useState(1)

  useEffect(() => {
    const update = () =>
      setOrbitScale(Math.min(1, (window.innerHeight - 24) / ORBIT_SIZE))

    update()

    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        toast.error(
          data.message || "Invalid email or password. Please try again."
        )
        return
      }

      toast.success("Login successful! Redirecting...", {
        duration: 2000,
      })

      window.setTimeout(() => {
        router.replace("/school-onboarding")
      }, 700)
    } catch (error) {
      console.error("Login Error:", error)

      toast.error("Unable to connect to the server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="forest-login relative isolate flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden px-4 py-6 text-white">

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "13px",
            fontWeight: 500,
            boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
          },
          success: {
            style: {
              background: "#052E16",
              color: "#DCFCE7",
              border: "1px solid #166534",
            },
            iconTheme: {
              primary: "#22C55E",
              secondary: "#052E16",
            },
          },
          error: {
            style: {
              background: "#450A0A",
              color: "#FEE2E2",
              border: "1px solid #991B1B",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#450A0A",
            },
          },
        }}
      />

      {/* Forest background */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/quno-forest.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="forest-overlay absolute inset-0 -z-20" />

      {/* Ambient forest lighting */}
      <div className="forest-light forest-light-one" />
      <div className="forest-light forest-light-two" />

      {/* Fireflies */}
      <div className="fireflies" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="firefly"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 9) % 100}%`,
              animationDelay: `${(i % 7) * -1.3}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col items-center">

        {/* QUNO logo */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="electric-logo relative mb-6 flex items-center justify-center [@media(max-height:820px)]:mb-3"
        >
          <div className="electric-aura" />
          <div className="electric-ring electric-ring-one" />
          <div className="electric-ring electric-ring-two" />

          <Image
            src="/quno-logo-v2.png"
            alt="Quno"
            width={230}
            height={105}
            priority
            className="relative z-10 h-auto w-[175px] object-contain drop-shadow-[0_0_22px_rgba(153,255,93,0.55)] sm:w-[210px] [@media(max-height:820px)]:w-[130px] sm:[@media(max-height:820px)]:w-[140px]"
          />
        </motion.div>

        {/* Login area with orbiting QUNO rings */}
        <div className="relative flex w-full max-w-[680px] items-center justify-center">

          {/* Orbiting text */}
          <div
            aria-hidden="true"
            className="orbit-stage pointer-events-none absolute left-1/2 top-1/2 hidden md:block"
            style={{
              width: ORBIT_SIZE,
              height: ORBIT_SIZE,
              transform: `translate(-50%, -50%) scale(${orbitScale})`,
            }}
          >
            <OrbitingCircles radius={270} duration={42} iconSize={62} path>
              {orbitLabels.map((item) => (
                <span key={`outer-${item}`} className="orbit-label">
                  QUNO
                </span>
              ))}
            </OrbitingCircles>

            <OrbitingCircles
              radius={215}
              duration={32}
              reverse
              iconSize={56}
              path
            >
              {orbitLabels.slice(0, 6).map((item) => (
                <span
                  key={`inner-${item}`}
                  className="orbit-label orbit-label-inner"
                >
                  QUNO
                </span>
              ))}
            </OrbitingCircles>
          </div>

          {/* Login card */}
          <motion.section
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="relative z-20 w-full max-w-[430px]"
          >
            <MagicCard
              mode="gradient"
              gradientSize={240}
              gradientFrom="#B6FF70"
              gradientTo="#00D9A6"
              gradientColor="rgba(85,255,145,0.10)"
              gradientOpacity={0.8}
              className="rounded-[28px] border border-emerald-200/20 shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
            >
              <div className="relative overflow-hidden rounded-[27px] bg-[#061a13]/90 p-6 backdrop-blur-2xl sm:p-8 [@media(max-height:820px)]:p-5 sm:[@media(max-height:820px)]:p-6">

                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-400/10 blur-[80px]" />

                <BorderBeam
                  size={180}
                  duration={8}
                  colorFrom="#B5FF70"
                  colorTo="#00E5B0"
                  borderWidth={1.5}
                />

                <div className="relative z-10">

                  {/* Heading */}
                  <div className="mb-7 text-center [@media(max-height:820px)]:mb-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200 [@media(max-height:820px)]:hidden"
                    >
                      <Sparkles size={13} />
                      Welcome back
                    </motion.div>

                    <h1 className="text-3xl font-semibold tracking-tight [@media(max-height:820px)]:text-2xl">
                      Sign in to <span className="text-[#B7FF66]">Quno</span>
                    </h1>

                    <p className="mt-2 text-sm text-emerald-50/55">
                      Your world of possibilities awaits.
                    </p>
                  </div>

                  {/* Login Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 [@media(max-height:820px)]:space-y-3.5"
                  >

                    {/* Email */}
                    <div className="space-y-2 [@media(max-height:820px)]:space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-emerald-50/85"
                      >
                        Email address
                      </label>

                      <div className="forest-input-wrap">
                        <Mail size={18} />

                        <input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2 [@media(max-height:820px)]:space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium text-emerald-50/85"
                        >
                          Password
                        </label>

                        <button
                          type="button"
                          onClick={() =>
                            toast(
                              "Password reset is not available yet. Please contact your admin.",
                              {
                                icon: "ℹ️",
                                duration: 4000,
                              }
                            )
                          }
                          className="text-xs text-[#B7FF66] transition-colors hover:text-white"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <div className="forest-input-wrap">
                        <LockKeyhole size={18} />

                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((s) => !s)}
                          className="password-toggle"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <ShimmerButton
                      type="submit"
                      disabled={loading}
                      shimmerColor="#D9FF9A"
                      shimmerDuration="2.5s"
                      background="linear-gradient(110deg, #174C2C, #218B4A, #174C2C)"
                      className="h-[54px] w-full border border-lime-200/40 text-sm font-semibold shadow-[0_0_28px_rgba(120,255,85,0.18)] hover:shadow-[0_0_38px_rgba(120,255,85,0.35)] disabled:cursor-not-allowed disabled:opacity-70 [@media(max-height:820px)]:h-12"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle
                            size={17}
                            className="mr-2 animate-spin"
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight
                            size={17}
                            className="ml-2 transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </ShimmerButton>
                  </form>

                  {/* Signup */}
                  <div className="mt-6 border-t border-white/10 pt-5 text-center [@media(max-height:820px)]:mt-4 [@media(max-height:820px)]:pt-3">
                    <p className="text-xs text-emerald-50/55">
                      Don't have an account?
                    </p>

                    <button
                      type="button"
                      onClick={() => router.push("/signup")}
                      className="mt-1.5 text-sm font-semibold text-[#B7FF66] transition-colors hover:text-white hover:underline"
                    >
                      Create an account
                    </button>
                  </div>

                </div>
              </div>
            </MagicCard>
          </motion.section>
        </div>

        <p className="relative z-10 mt-6 text-[11px] tracking-wider text-emerald-50/40 [@media(max-height:820px)]:mt-3">
          © 2026 Netlarx Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </main>
  )
}
