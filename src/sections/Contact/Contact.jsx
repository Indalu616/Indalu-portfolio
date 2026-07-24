import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import contact from "../../data/contact.json";
import social from "../../data/social.json";
import SectionWrapper from "../../components/common/SectionWrapper";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/buttons/Button";
import SocialButton from "../../components/buttons/SocialButton";
import { submitContactForm } from "../../services/contactService";
import { slideInLeft, slideInRight } from "../../lib/motionVariants";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name";
  if (!form.email.trim()) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.message.trim()) errors.message = "Please enter a message";
  else if (form.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setStatus("submitting");
    try {
      await submitContactForm(form);
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" ariaLabel="Contact" className="bg-surface/30">
      <SectionTitle
        eyebrow="Contact"
        title="Let's build something great"
        description={contact.availability.message}
      />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          <div className="space-y-4">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted">Email</p>
                <p className="font-medium text-fg">{contact.email}</p>
              </div>
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted">Phone</p>
                <p className="font-medium text-fg">{contact.phone}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="font-medium text-fg">
                  {contact.location} &middot; {contact.timezone}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {social.map((s) => (
              <SocialButton key={s.name} {...s} />
            ))}
          </div>

          <div className="relative mt-6 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface/40">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-2 text-muted">
              <MapPin className="h-6 w-6 text-accent" />
              <p className="text-sm font-medium">{contact.map.label}</p>
              <p className="text-xs">Abu Dhabi University</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInRight}
        >
          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={onChange}
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                error={errors.email}
              />
            </div>
            <Field
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={onChange}
              optional
            />
            <Field
              label="Message"
              name="message"
              as="textarea"
              rows={5}
              value={form.message}
              onChange={onChange}
              error={errors.message}
            />

            <Button
              type="submit"
              magnetic
              icon={Send}
              className="w-full sm:w-auto"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </Button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-500">
                <CheckCircle2 className="h-4 w-4" /> Message sent — I'll get
                back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" /> Something went wrong. Please
                try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  rows,
  value,
  onChange,
  error,
  optional,
}) {
  const Tag = as;
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-fg">
        {label} {!optional && <span className="text-accent">*</span>}
      </span>
      <Tag
        name={name}
        type={as === "input" ? type : undefined}
        rows={rows}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-xl border border-border bg-bg/50 px-4 py-2.5 text-sm text-fg placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      {error && (
        <span
          id={`${name}-error`}
          className="mt-1.5 block text-xs text-red-500"
        >
          {error}
        </span>
      )}
    </label>
  );
}
