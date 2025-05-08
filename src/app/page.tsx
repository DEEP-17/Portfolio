"use client";


import { TypewriterEffect } from "@/components/effects/typewritter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { SOCIAL_LINKS } from "@/data/social-links";
import { motion } from "motion/react";
import { Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { GravityBox } from "@/components/effects/gravity-box";
import { SparklesCore } from "@/components/effects/sparkles";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';


export default function Home() {
  const [isGravityActive, setIsGravityActive] = useState(false);

  return (
    <div className="relative w-full">
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div
                className="w-[90vw] md:w-[40rem] h-[14rem] md:h-[12rem] relative cursor-pointer"
                onClick={() => setIsGravityActive(true)}
              >
                {/* <GravityBox isActive={isGravityActive}> */}
                <SparklesCore
                  background="transparent"
                  minSize={0.8}
                  maxSize={1.5}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#4A90E2"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="mb-4 text-xl text-center">
                    Hey there, I&apos;m
                  </p>
                  <h1 className="flex max-sm:flex-col gap-3 text-6xl lg:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-text">
                    <span>Deep</span>
                    <span>Patel</span>
                  </h1>
                </div>
                {/* </GravityBox> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 px-4 md:px-0"
            >
              <TypewriterEffect
                words={[
                  {
                    text: "Passionate about efficiency, ",
                  },
                  { text: "tech, and open source." },
                ]}
                className="font-bold text-base md:text-xl"
              />
            </motion.div>

            <motion.div
              className="mt-8"
            >
              <div className="flex gap-6 justify-center items-center">
                {SOCIAL_LINKS.map((social) => (
                  social.name === "Email" ? (
                    <EmailContactButton key={social.name} />
                  ) : (
                  <Link
                    key={social.name}
                    href={
                       { pathname: social.url }
                    }
                    target="_blank"
                    className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 expand-cursor hover:scale-110 hover:-translate-y-1"
                  >

                    {social.icon === "Github" && <SiGithub size={24} />}
                    {social.icon === "Linkedin" && <SiLinkedin size={24} />}
                    {social.icon === "Twitter" && <Twitter size={24} />}
                  </Link>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

function EmailContactButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 expand-cursor hover:scale-110 hover:-translate-y-1"
      >
        <Mail size={24} />
      </button>
      <EmailContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Pass props here */}
    </>
  );
}

function EmailContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'pateldeep17042004@gmail.com' // Replace with your recipient email
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
        onClose();
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FaTimes className="text-xl" />
                </button>

                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 mb-6"
                >
                  Contact Me
                </Dialog.Title>

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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
