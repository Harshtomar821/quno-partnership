
"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import {
  UserRound,
  Mail,
  Eye,
  EyeOff,
  LockKeyhole,
  ArrowRight,
  LoaderCircle,
} from "lucide-react"
import { Toaster, toast } from "react-hot-toast"

import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BorderBeam } from "@/components/ui/border-beam"
import { Particles } from "@/components/ui/particles"

const floatingLogos = [
  { left: "7%", top: "12%", delay: 0, duration: 9 },
  { left: "82%", top: "13%", delay: 1.5, duration: 11 },
  { left: "3%", top: "43%", delay: 2, duration: 10 },
  { left: "89%", top: "45%", delay: 0.8, duration: 12 },
  { left: "14%", top: "78%", delay: 2.5, duration: 11 },
  { left: "78%", top: "82%", delay: 1, duration: 9 },
  { left: "48%", top: "7%", delay: 3, duration: 13 },
  { left: "55%", top: "91%", delay: 1.8, duration: 10 },
]

export default function SignupForm() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Auto-fit: shrink the whole content block just enough to fit the screen height
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const fit = () => {
      const available = window.innerHeight - 56
      const needed = el.offsetHeight

      if (!needed) return

      setScale(Math.max(0.45, Math.min(1, available / needed)))
    }

    fit()

    const ro = new ResizeObserver(fit)
    ro.observe(el)

    window.addEventListener("resize", fit)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", fit)
    }
  }, [])

  const passwordOk = password.length >= 8

  // Signup API Integration
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        toast.error(
          data.message || "Unable to create your account. Please try again."
        )
        return
      }

      toast.success("Account created successfully! Redirecting...", {
        duration: 2000,
      })

      // Signup API sets the HttpOnly authentication cookie.
      // Redirect after successful account creation.
      window.setTimeout(() => {
        router.replace("/school-onboarding")
      }, 700)
    } catch (error) {
      console.error("Signup Error:", error)

      toast.error("Unable to connect to the server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="signup-page relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-4 text-white">

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

      {/* Background */}
      <div className="signup-background" />
      <div className="signup-overlay" />

      {/* Ambient lights */}
      <div className="signup-glow signup-glow-one" />
      <div className="signup-glow signup-glow-two" />

      {/* Background particles */}
      <Particles
        className="pointer-events-none absolute inset-0 z-[1] opacity-50"
        quantity={45}
        color="#C5FF91"
        size={0.8}
        staticity={65}
        ease={50}
      />

      {/* Floating Quno logos in background */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden="true"
      >
        {floatingLogos.map((item, index) => (
          <motion.div
            key={index}
            className="signup-floating-logo"
            style={{
              left: item.left,
              top: item.top,
            }}
            animate={{
              y: [0, -18, 0, 14, 0],
              x: [0, 10, -8, 0],
              rotate: [0, 12, -8, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/quno-logo-v2.png"
              alt=""
              width={80}
              height={40}
              className="h-auto w-[48px] object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex w-full shrink-0 flex-col items-center"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >

        {/* Main Quno Orb */}
        <div className="relative mb-2 h-[140px] w-full">
          <div
            className="absolute left-1/2 top-0"
            style={{
              transform: "translateX(-50%) scale(0.75)",
              transformOrigin: "top center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.65, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="signup-orbit relative mb-2"
            >
              <div className="signup-orb-halo" />

              <div className="signup-orb">
                <div className="signup-orb-core" />

                <Image
                  src="/quno-logo-v2.png"
                  alt="Quno"
                  width={150}
                  height={75}
                  priority
                  className="signup-center-logo"
                />

                <div className="signup-orb-highlight" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Welcome heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-3 text-center"
        >
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Create Your Account
          </h1>

          <p className="mx-auto mt-2 max-w-[330px] text-[13px] leading-relaxed text-white/60 sm:max-w-none sm:whitespace-nowrap">
            Parents&apos; first choice for a simpler school shopping experience.
          </p>
        </motion.div>

        {/* Signup form */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="relative w-full max-w-[540px]"
        >
          <div className="signup-card relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)] sm:p-8">

            <BorderBeam
              size={150}
              duration={9}
              colorFrom="#B7FF66"
              colorTo="#00D9A6"
              borderWidth={1}
            />

            <form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-4 [&_.signup-input-wrap]:min-h-[54px] [&_input]:text-[16px]"
            >

              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-white/85"
                >
                  Full Name*
                </label>

                <div className="signup-input-wrap">
                  <UserRound size={17} />

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="signupEmail"
                  className="text-sm font-medium text-white/85"
                >
                  Email address*
                </label>

                <div className="signup-input-wrap">
                  <Mail size={17} />

                  <input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your valid email address"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="signupPassword"
                  className="text-sm font-medium text-white/85"
                >
                  Password*
                </label>

                <div className="signup-input-wrap">
                  <LockKeyhole size={17} />

                  <input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={72}
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
                    className="signup-eye"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                <p
                  className={`text-[11px] transition-colors ${
                    passwordOk ? "text-[#B7FF66]" : "text-white/40"
                  }`}
                >
                  {passwordOk
                    ? "Password strong enough"
                    : "Use at least 8 characters."}
                </p>
              </div>

              {/* Signup button */}
              <ShimmerButton
                type="submit"
                disabled={loading}
                shimmerColor="#D9FF9A"
                shimmerDuration="2.5s"
                background="linear-gradient(110deg, #174C2C, #218B4A, #174C2C)"
                className="mt-2 h-[56px] w-full border border-lime-200/30 text-base font-semibold shadow-[0_0_25px_rgba(120,255,85,0.15)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight
                      size={17}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </ShimmerButton>
            </form>

            {/* Sign in */}
            <div className="relative z-10 mt-4 border-t border-white/10 pt-3 text-center">
              <p className="text-xs text-white/50">
                Already have an account?
              </p>

              <Link
                href="/"
                className="mt-1.5 inline-block text-sm font-semibold text-[#B7FF66] transition-colors hover:text-white hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.section>

        <p className="mt-2 text-[10px] tracking-wider text-white/35">
          © 2026 Netlarx Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </main>
  )
}
