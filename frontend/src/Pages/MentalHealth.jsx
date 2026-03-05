import React, { useState } from "react";
import {
  FaHeart,
  FaUserMd,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import heroimg from "../assets/images/hero.png";
import bswimg from "../assets/images/bsw_circle.svg";
import yourdostimg from "../assets/images/yourDost.svg";
import iitdlogo from "../assets/images/iitd_logo.png";
import useReveal from "../common/Reveal";
import { MdBrokenImage } from "react-icons/md";

/* ================= SIMPLE CAROUSEL ================= */

const SimpleCarousel = ({ images, height = "h-64" }) => {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  const prev = () =>
    setCurrent(current === 0 ? images.length - 1 : current - 1);

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-xl group`}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = MdBrokenImage)}
          />
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const MentalHealth = () => {
  const [headerRef, headerVisible] = useReveal();
  const [initiativesRef, initiativesVisible] = useReveal();
  const [eventsRef, eventsVisible] = useReveal();

  return (
    <div className="min-h-screen bg-[#e9fbf7] dark:bg-neutral-900 pt-20 pb-20 transition-colors">
      {/* ================= HEADER ================= */}
      <div
        ref={headerRef}
        className={`text-center py-16 px-4 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <FaHeart className="text-6xl text-[#E06F6F] mx-auto mb-4 opacity-80" />
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Mental Health & Counselling
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-700 dark:text-gray-300">
          “Feel better and work smarter”
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">
          <button
            className="bg-[#20AA9D] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-teal-700 transition-transform hover:scale-105"
            onClick={() =>
              alert("Redirecting to stress management tips...")
            }
          >
            Get Started with Stress Management
          </button>

          <img src={heroimg} alt="Mental Health" className="max-w-md w-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-20">
        {/* ================= INITIATIVES ================= */}
        <section
          ref={initiativesRef}
          className={`transition-all duration-700 ${
            initiativesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            Initiatives
          </h2>

          {/* YourDOST */}
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 md:p-12 shadow-xl mb-12 border-t-8 border-[#9FE5E3]">
            <div className="flex items-center justify-center gap-6 mb-6">
              <img src={bswimg} alt="BSW" className="h-14" />
              <img src={yourdostimg} alt="YourDOST" className="h-14" />
              <img src={iitdlogo} alt="IITD" className="h-14" />
            </div>

            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
              YourDOST
            </h3>

            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-4xl mx-auto mb-8">
              IIT Delhi has joined hands with YourDOST to provide anonymous,
              unbiased, 24×7 emotional wellness support. Sign up using your
              official IIT Delhi email ID.
            </p>

            <div className="grid md:grid-cols-5 gap-4 text-center text-sm">
              {[
                ["Visit", "yourdost.com"],
                ["Sign Up", "Use your IITD email"],
                ["Chat Now", "Start chatting instantly"],
                ["Connect", "Get professional guidance"],
                ["Book Appt", "Audio / Video sessions"],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-xl text-gray-700 dark:text-gray-300"
                >
                  <div className="font-bold mb-2">{title}</div>
                  {i === 0 ? (
                    <a
                      href="https://yourdost.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {desc}
                    </a>
                  ) : (
                    <p>{desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Student Counselling */}
          <div className="bg-[#EA9EC1]/20 dark:bg-[#EA9EC1]/10 rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-[#EA9EC1]">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-4 justify-center md:justify-start">
              <FaUserMd /> Student Counselling Service
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl">
              Located next to the UG Section, First Floor, Main Building. Open for
              anyone who feels the need.
            </p>
            <a
              href="mailto:Counselling@admin.iitd.ac.in"
              className="mt-4 inline-flex items-center text-blue-700 dark:text-blue-400 font-bold hover:underline"
            >
              <FaEnvelope className="mr-2" />
              Counselling@admin.iitd.ac.in
            </a>
          </div>
        </section>

        {/* ================= PAST EVENTS ================= */}
        <section
          ref={eventsRef}
          className={`space-y-16 transition-all duration-700 ${
            eventsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
            Past Events
          </h2>

          {/* Slow School */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SimpleCarousel
              images={[
                "https://instagram.fdel17-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/71289599_924376761267725_1874541534911444466_n.jpg",
                "/images/carousel1 .jpg",
              ]}
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                IT IS OKAY TO NOT BE OKAY
                <span className="block text-base font-normal text-gray-500">
                  Slow School, Dalberg
                </span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                A workshop on mental health and well-being focusing on emotions
                and self-awareness.
              </p>
            </div>
          </div>

          {/* We The Young */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Whats Up Zindagi?
                <span className="block text-base font-normal text-gray-500">
                  We The Young
                </span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Delhi’s biggest youth mental health event organized at IIT Delhi.
              </p>

              {/* DISABLED DOWNLOAD */}
              <button
                disabled
                aria-disabled
                className="mt-4 px-6 py-2 rounded-full bg-gray-300 dark:bg-neutral-700 text-gray-500 cursor-not-allowed"
              >
                Download Newsletter (Unavailable)
              </button>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/oQKh29_ENnw"
                  title="We The Young"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Dance Therapy */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SimpleCarousel images={["/images/dmt2.JPG", "/images/dmt1.JPG"]} />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Dance & Movement Therapy
                <span className="block text-base font-normal text-gray-500">
                  Eshna Kutty
                </span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                A session focused on de-stressing and releasing bodily tensions
                through movement.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MentalHealth;
