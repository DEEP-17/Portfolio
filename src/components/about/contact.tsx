import { motion } from "motion/react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import emailjs from '@emailjs/browser';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub className="text-2xl" />,
    url: "https://github.com/DEEP-17",
    color: "#8a8a8a",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-2xl" />,
    url: "https://linkedin.com/in/pateldeep1704",
    color: "#63b3e5",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="text-2xl" />,
    url: "https://x.com/DEEPPATEL518022",
    color: "#4dc6ff",
  },
  {
    name: "Discord",
    icon: <FaDiscord className="text-2xl" />,
    url: "https://discord.com/users/1035138685689139311",
    color: "#9eb3ea",
  },
];

export function ContactUs({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace these with your EmailJS credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'pateldeep17042004@gmail.com'
      };

      await emailjs.send(
        'service_d7b9yh8', // Replace with your service ID
        'template_mzze8xr', // Replace with your template ID
        templateParams,
        'xNWMif4FLGRDC2poo' // Replace with your public key
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      {...fadeIn}
      initial="hidden"
      animate={activeSection === "contact" ? "visible" : "hidden"}
      className="max-w-7xl mx-auto py-16 relative"
    >
      <motion.div className="text-center mb-16 relative">
        <motion.h2
          {...fadeInUp}
          className="text-5xl font-bold mb-6 bg-clip-text"
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-lg text-gray-400/90 max-w-2xl mx-auto leading-relaxed"
        >
          I&apos;m always open to new opportunities, collaborations, and
          interesting conversations. Feel free to reach out!
        </motion.p>
      </motion.div>

      <div className="flex max-sm:flex-col justify-center gap-4 mx-auto">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="relative group flex justify-center cursor-pointer"
        >
          <div 
            onClick={() => setIsModalOpen(true)}
            className="block w-full cursor-pointer"
          >
            <div
              className={`
                p-8 max-sm:p-4 rounded-2xl h-full
                bg-gray-100 dark:bg-gray-600/20 backdrop-blur-lg
                border border-white/10
                transition-colors duraiton-200
                group-hover:border-white/20
                group-hover:shadow-lg group-hover:shadow-blue-500/10
                overflow-hidden
                relative
              `}
            >
              <div
                className={`
                  absolute inset-0 rounded-xl opacity-0
                  group-hover:opacity-20 transition-opacity
                  bg-gradient-to-r from-blue-400 to-sky-500
                  blur-xl
                `}
              />

              <div className="flex items-start gap-4">
                <div className="p-3 max-sm:p-2 rounded-xl bg-blue-500/10 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <FaEnvelope className="text-3xl text-blue-400" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Email Me</h3>
                  <div className="flex items-center gap-2 group/email">
                    <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400 transition-colors">
                      Click to send a message
                    </span>
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 text-blue-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Open contact form
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="relative group flex justify-center items-center max-sm:mt-4"
        >
          <div
            className={`
              flex justify-center items-center max-w-[300px]
              rounded-2xl h-full w-full max-sm:py-4
              bg-gray-100 dark:bg-gray-600/20 backdrop-blur-lg
              transition-colors duraiton-200
              border border-white/10
              hover:border-white/20
              hover:shadow-lg hover:shadow-purple-500/10
              overflow-hidden
            `}
          >
            <div
              className={`
              absolute inset-0 rounded-xl opacity-0
              group-hover:opacity-20
              bg-gradient-to-r from-purple-400 to-pink-500
              blur-xl
            `}
            />

            <div className="grid grid-cols-2 gap-4 px-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredCard(social.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group/social flex flex-col gap-2 p-3 rounded-xl hover:bg-white/[0.05]
                    relative overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="transition-transform group-hover/social:scale-110"
                      style={{
                        color:
                          hoveredCard === social.name
                            ? social.color
                            : "currentColor",
                      }}
                    >
                      {social.icon}
                    </div>
                    <div
                      className="text-sm sm:hidden font-medium transition-colors"
                      style={{
                        color:
                          hoveredCard === social.name
                            ? social.color
                            : "currentColor",
                      }}
                    >
                      {social.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FaTimes className="text-xl" />
            </button>

            <h3 className="text-2xl font-bold mb-6">Contact Me</h3>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <p className="text-green-500 font-medium">Message sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
