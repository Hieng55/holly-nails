"use client";

import { useEffect, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { Menu, X } from "lucide";
import { CalendarDays, Clock3, MapPin, Phone } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["About Us", "#about"],
  ["Gallery", "#gallery"],
  ["Contact Us", "#contact"],
] as const;

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <main id="home" className="min-h-screen bg-[#090908] text-[#f8f2e6]">
      <header className="site-header">
        <div className="utility-bar">
          <div className="header-shell utility-inner">
            <a href="tel:+13076387338"><Phone size={13} /> (307) 638-7338</a>
            <p><MapPin size={13} /> 3425 Dell Range Blvd, Cheyenne, WY</p>
            <p className="hours"><Clock3 size={13} /> Mon–Sat 9:30 AM–7:00 PM</p>
          </div>
        </div>

        <div className="header-shell nav-row">
          <a className="brand" href="#home" aria-label="Holly Nails and Spa home">
            <span className="brand-mark" aria-hidden="true"><i>H</i></span>
            <span className="brand-copy">
              <strong>HOLLY</strong>
              <span>NAILS &amp; SPA</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href], index) => (
              <a className={index === 0 ? "active" : ""} href={href} key={label}>{label}</a>
            ))}
          </nav>

          <a className="book-button desktop-book" href="#contact">
            <CalendarDays size={16} /> Book Appointment
          </a>

          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <MorphIcon icon={open ? X : Menu} size={25} strokeWidth={1.5} spring="snappy" reducedMotion="user" />
          </button>
        </div>

        <div className={`mobile-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href], index) => (
              <a href={href} key={label} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{label}
              </a>
            ))}
          </nav>
          <a className="book-button mobile-book" href="#contact" onClick={() => setOpen(false)}>
            <CalendarDays size={17} /> Book Appointment
          </a>
          <p>Timeless beauty, tailored to you.</p>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="header-shell hero-content">
          <p className="eyebrow"><span /> Cheyenne’s premier nail destination <span /></p>
          <h1 id="hero-title">The art of<br /><em>beautiful details.</em></h1>
          <p className="hero-intro">Elevated nail care in a serene setting—where refined artistry, impeccable service and your personal style come together.</p>
          <div className="hero-actions">
            <a className="book-button hero-book" href="#contact"><CalendarDays size={17} /> Reserve your visit</a>
            <a className="text-link" href="#services">Explore our services <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-foot header-shell">
          <p><span>01</span> Luxury Manicures</p>
          <p><span>02</span> Spa Pedicures</p>
          <p><span>03</span> Signature Nail Art</p>
        </div>
      </section>

      <section id="services" className="placeholder-section"><p>Signature care</p><h2>Rituals designed for<br />beautiful hands &amp; feet.</h2></section>
      <section id="about" className="anchor-section" aria-label="About Us" />
      <section id="gallery" className="anchor-section" aria-label="Gallery" />
      <section id="contact" className="anchor-section" aria-label="Contact Us" />
    </main>
  );
}
