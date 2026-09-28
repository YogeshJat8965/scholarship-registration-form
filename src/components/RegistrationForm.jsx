import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  User,
  Users,
  Phone,
  Mail,
  GraduationCap,
  Building2,
  BookOpen,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import Input from './ui/Input'
import CustomSelect from './ui/CustomSelect'
import RadioCards from './ui/RadioCards'
import SegmentedControl from './ui/SegmentedControl'
import Checkbox from './ui/Checkbox'
import Stepper from './ui/Stepper'
import SuccessModal from './SuccessModal'
import { classOptions, mediumOptions, programmeGroups, locationOptions } from '../data/formOptions'

const steps = [
  { label: 'Personal', icon: User },
  { label: 'Academic', icon: GraduationCap },
  { label: 'Programme', icon: BookOpen },
  { label: 'Location', icon: MapPin },
  { label: 'Consent', icon: ShieldCheck },
]

const initialData = {
  fullName: '',
  guardianName: '',
  mobile: '',
  email: '',
  currentClass: '',
  institution: '',
  programme: '',
  medium: '',
  location: '',
  locationOther: '',
  consentInfo: false,
  consentContact: false,
}

export default function RegistrationForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  function update(field, value) {
    setData((d) => ({ ...d, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validateStep(current) {
    const next = {}
    if (current === 0) {
      if (!data.fullName.trim()) next.fullName = "Student's full name is required"
      if (!data.guardianName.trim()) next.guardianName = "Parent / guardian's name is required"
      if (!/^[6-9]\d{9}$/.test(data.mobile.trim()))
        next.mobile = 'Enter a valid 10-digit mobile number'
      if (data.email.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim()))
        next.email = 'Enter a valid email address'
    }
    if (current === 1) {
      if (!data.currentClass) next.currentClass = 'Select your current class / qualification'
      if (!data.institution.trim()) next.institution = 'Institution name is required'
    }
    if (current === 2) {
      if (!data.programme) next.programme = 'Select what you are preparing for'
      if (!data.medium) next.medium = 'Select your preferred medium'
    }
    if (current === 3) {
      if (!data.location) next.location = 'Select your location'
      if (data.location === 'Other' && !data.locationOther.trim())
        next.locationOther = 'Please type your location'
    }
    if (current === 4) {
      if (!data.consentInfo) next.consentInfo = 'Please confirm the information is correct'
      if (!data.consentContact) next.consentContact = 'Please provide consent to be contacted'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleNext() {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  function handleBack() {
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleSubmit() {
    if (!validateStep(4)) return
    setSubmitting(true)
    // Frontend-only for now — will be wired to EmailJS to deliver submissions.
    setTimeout(() => {
      setSubmitting(false)
      setShowSuccess(true)
    }, 1100)
  }

  function handleCloseSuccess() {
    setShowSuccess(false)
    setData(initialData)
    setErrors({})
    setStep(0)
  }

  return (
    <section id="apply" className="relative overflow-hidden bg-cream-100 py-24 lg:py-32">
      {/* decorative background */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-navy-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-balance mx-auto max-w-3xl text-center font-display text-4xl font-bold text-navy-950 sm:text-[2.6rem]"
        >
          Apply for Scholarship & Career Programme 2026
        </motion.h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="relative h-[480px] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/20 sm:h-[560px] lg:h-[720px]">
              <img
                src="/girllibraryimg.png"
                alt="Student in a library, taking the first step towards her goals"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_38%,rgba(4,6,13,0.55)_58%,rgba(4,6,13,0.94)_100%)]" />

              <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9">
                <h2 className="text-balance font-display text-3xl font-bold text-cream-50 sm:text-[2.4rem]">
                  Take the first step towards your academic and career goals.
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream-100/75">
                  Fill in your details below — it takes less than two minutes. Our team will
                  verify your eligibility and reach out on WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-6 shadow-2xl shadow-amber-900/10 sm:p-9"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-amber-400 via-amber-500 to-navy-700" />

            <Stepper steps={steps} current={step} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {step === 0 && (
                  <div className="flex flex-col gap-5">
                    <h3 className="font-display text-xl font-bold text-navy-950">
                      Personal Details
                    </h3>
                    <Input
                      icon={User}
                      label="Student's full name"
                      required
                      placeholder="Enter full name"
                      value={data.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      error={errors.fullName}
                    />
                    <Input
                      icon={Users}
                      label="Parent / guardian's name"
                      required
                      placeholder="Enter parent / guardian name"
                      value={data.guardianName}
                      onChange={(e) => update('guardianName', e.target.value)}
                      error={errors.guardianName}
                    />
                    <Input
                      icon={Phone}
                      label="Mobile number (WhatsApp preferred)"
                      required
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={data.mobile}
                      onChange={(e) => update('mobile', e.target.value.replace(/\D/g, ''))}
                      error={errors.mobile}
                    />
                    <Input
                      icon={Mail}
                      label="Email address"
                      type="email"
                      placeholder="Enter email address"
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                      error={errors.email}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="flex flex-col gap-5">
                    <h3 className="font-display text-xl font-bold text-navy-950">
                      Academic Details
                    </h3>
                    <RadioCards
                      label="Current class / qualification"
                      required
                      options={classOptions}
                      value={data.currentClass}
                      onChange={(v) => update('currentClass', v)}
                      error={errors.currentClass}
                    />
                    <Input
                      icon={Building2}
                      label="School / junior college / institution name"
                      required
                      placeholder="Enter institution name"
                      value={data.institution}
                      onChange={(e) => update('institution', e.target.value)}
                      error={errors.institution}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <h3 className="font-display text-xl font-bold text-navy-950">
                      Choose Your Programme
                    </h3>
                    <CustomSelect
                      label="What are you preparing for?"
                      required
                      searchable
                      placeholder="Choose your programme"
                      options={programmeGroups}
                      value={data.programme}
                      onChange={(v) => update('programme', v)}
                      error={errors.programme}
                    />
                    <SegmentedControl
                      label="Preferred medium"
                      required
                      options={mediumOptions}
                      value={data.medium}
                      onChange={(v) => update('medium', v)}
                    />
                    {errors.medium && <p className="text-sm text-red-500">{errors.medium}</p>}
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-5">
                    <h3 className="font-display text-xl font-bold text-navy-950">
                      Location Details
                    </h3>
                    <CustomSelect
                      label="Your location"
                      required
                      searchable
                      placeholder="Select location"
                      options={locationOptions}
                      value={data.location}
                      onChange={(v) => update('location', v)}
                      error={errors.location}
                    />
                    <AnimatePresence>
                      {data.location === 'Other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <Input
                            icon={MapPin}
                            label="Type your location"
                            required
                            placeholder="Enter your city / town, state"
                            value={data.locationOther}
                            onChange={(e) => update('locationOther', e.target.value)}
                            error={errors.locationOther}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col gap-5">
                    <h3 className="font-display text-xl font-bold text-navy-950">
                      Consent & Declaration
                    </h3>
                    <div className="rounded-2xl border border-navy-100 bg-cream-50 p-5">
                      <div className="flex flex-col gap-4">
                        <Checkbox
                          checked={data.consentInfo}
                          onChange={(v) => update('consentInfo', v)}
                          error={errors.consentInfo}
                        >
                          I confirm that the information provided above is correct and complete.
                        </Checkbox>
                        <Checkbox
                          checked={data.consentContact}
                          onChange={(v) => update('consentContact', v)}
                          error={errors.consentContact}
                        >
                          I agree that Skillzza and Earth Care Foundation may contact me by call,
                          SMS or WhatsApp regarding this scholarship, programme eligibility and
                          related opportunities.
                        </Checkbox>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <p className="text-[13px] leading-relaxed text-navy-600">
                        <span className="font-bold text-amber-700">Please review: </span>
                        {data.fullName || '—'} · {data.currentClass || '—'} ·{' '}
                        {data.programme || '—'} ·{' '}
                        {(data.location === 'Other' ? data.locationOther : data.location) || '—'}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-navy-100 pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 transition-colors hover:text-navy-900 disabled:pointer-events-none disabled:opacity-0"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {step < steps.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-7 py-3.5 text-[15px] font-semibold text-cream-50 shadow-lg shadow-navy-900/15 transition-colors duration-300 hover:bg-navy-800"
                >
                  Continue
                  <ArrowRight size={16} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-[15px] font-bold text-navy-950 shadow-lg shadow-amber-500/25 transition-colors duration-300 hover:bg-amber-400 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'SUBMIT REGISTRATION'
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <SuccessModal open={showSuccess} name={data.fullName} onClose={handleCloseSuccess} />
    </section>
  )
}
