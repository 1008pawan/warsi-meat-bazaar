import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === "phone" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const phoneNumber = "917905040626";

    const message = `*New Contact Inquiry - Warsi Meat Bazaar*

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}

💬 Message:
${formData.message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({});

    setLoading(false);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mt-4 text-lg text-red-100">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-2 text-3xl font-bold">Send Message</h2>
            <p className="mb-6 text-gray-600">
              Fill in your details and continue the conversation on WhatsApp.
            </p>
            {success && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-100 p-4 text-green-700">
                ✅ Message sent successfully. We will contact you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`w-full rounded-xl border p-4 outline-none ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-red-500"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`w-full rounded-xl border p-4 outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-red-500"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Phone Number"
                className={`w-full rounded-xl border p-4 outline-none ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 focus:border-red-500"
                }`}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={`w-full rounded-xl border p-4 outline-none ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-300 focus:border-red-500"
                }`}
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 cursor-pointer rounded-full bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <Phone className="text-red-600" />
                <div>
                  <h3 className="font-bold">Call Us</h3>
                  <a href="tel:+918400222227" className="text-gray-600">
                    +91 84002 22227
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <Mail className="text-red-600" />
                <div>
                  <h3 className="font-bold">Email Us</h3>
                  <a
                    href="mailto:info@warsimeatbazaar.com"
                    className="text-gray-600"
                  >
                    info@warsimeatbazaar.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div>
                  <MapPin className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="text-gray-600">
                    Warsi Road, Ujariyaon, Vijay Khand 2, Gomti Nagar, Lucknow,
                    Uttar Pradesh 226010
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <Clock className="text-red-600" />
                <div>
                  <h3 className="font-bold">Working Hours</h3>
                  <p className="text-gray-600">Mon - Sun: 8:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 overflow-hidden rounded-3xl shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7118.765005839446!2d80.9919474!3d26.8595859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2ca457d9683%3A0xe0aaa885e472118!2sWarsi%20Meat%20Bazaar!5e0!3m2!1sen!2sin!4v1782218437279!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
