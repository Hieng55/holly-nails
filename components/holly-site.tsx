"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MorphIcon } from "morphicons/react";
import { Menu, X } from "lucide";
import { CalendarDays, Clock3, Gem, MapPin, Phone, Quote, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About Us", "/about"],
  ["Gallery", "/gallery"],
  ["Contact Us", "/contact"],
] as const;

const serviceGroups = [
  {
    id: "pedicures", label: "Pedicures", eyebrow: "Foot care rituals",
    items: [
      { name: "Classic Pedicure", price: "$35", time: "25 min", description: "Foot soak, nail shaping, cuticle care and a relaxing lotion massage.", note: "Gel +$20 · Callus removal +$7" },
      { name: "Deluxe Pedicure", price: "$46", description: "Classic care elevated with sugar scrub, lemon grass cooling gel therapy, hot towel wrap and lotion massage.", note: "Gel +$20" },
      { name: "Luxury Pedicure", price: "$61", time: "35 min", description: "Choose a soothing scent—jasmine, lavender, orange or green tea—with paraffin wax and hot stone massage.", note: "Gel +$15" },
      { name: "Collagen Pedicure", price: "$71", time: "45 min", description: "A luxurious collagen treatment designed to nourish, soften and restore tired skin, finished with a 10-minute massage.", note: "Gel +$15" },
      { name: "Volcano Pedicure", price: "$86", time: "55 min", description: "A warming Volcano spa treatment to ease tension, refresh and revitalize tired feet, with a 15-minute massage.", note: "Gel +$15" },
    ],
  },
  {
    id: "manicures", label: "Manicures", eyebrow: "Beautiful hands",
    items: [
      { name: "Manicure Without Polish", price: "$25", description: "Essential shaping and cuticle care for naturally polished hands." },
      { name: "Manicure With Regular Polish", price: "Ask us", description: "Classic manicure completed with your choice of regular color." },
      { name: "Manicure With Gel / Shellac", price: "$40", description: "Long-wearing gel color with a smooth, glossy finish." },
      { name: "Gel / Shellac French Tip", price: "$50", description: "A crisp, timeless French finish in gel or shellac." },
      { name: "Deluxe Manicure — Regular Color", price: "$40", description: "Cuticle cleaning, lotion massage, paraffin wax and hot towel." },
      { name: "Deluxe Manicure — Gel Color", price: "$50", description: "Our complete deluxe ritual finished with gel color." },
    ],
  },
  {
    id: "enhancements", label: "Acrylic & Dip", eyebrow: "Nail enhancements",
    items: [
      { name: "Acrylic Overlay — New Set", price: "$55" },
      { name: "Acrylic With Gel Color", price: "$60+" },
      { name: "Acrylic Ombré", price: "$70+" },
      { name: "Pink & White Powder", price: "$70+" },
      { name: "Acrylic Fill / Rebase", price: "$50+" },
      { name: "Dip Powder — New Set", price: "$55" },
      { name: "Dip With Take Off", price: "$60+" },
      { name: "Dip With Tips", price: "$65+" },
    ],
  },
  {
    id: "gel", label: "Gel Nails", eyebrow: "Modern structure",
    items: [
      { name: "Gel-X — New Set", price: "$65+" },
      { name: "Builder Gel — New Set", price: "$65+" },
      { name: "T.A.P. Gel — New Set", price: "$65+" },
      { name: "Gel-X Refill", price: "$55+" },
      { name: "Builder Gel Refill", price: "$55" },
      { name: "T.A.P. Gel Refill", price: "$55" },
    ],
  },
  {
    id: "kids", label: "Kids", eyebrow: "Little luxuries",
    items: [
      { name: "Kids Regular Pedicure", price: "$30" },
      { name: "Kids Regular Manicure", price: "$20" },
      { name: "Kids Gel Manicure", price: "$35" },
      { name: "Kids Regular Polish Change", price: "$12" },
      { name: "Kids Gel Polish Change", price: "$20" },
    ],
  },
  {
    id: "extras", label: "Add-ons & Waxing", eyebrow: "Finishing touches",
    items: [
      { name: "Repair Under Warranty", price: "Free" },
      { name: "Nail Fix Without Warranty", price: "$7+" },
      { name: "French / Deep French", price: "$10 / $15+" },
      { name: "Special Shape / Reshape", price: "$5+" },
      { name: "Design / Chrome", price: "$10+", note: "Please ask your nail technician for design pricing." },
      { name: "Take Off Acrylic / Dip", price: "$15" },
      { name: "Regular / Gel Polish Change", price: "$15 / $25" },
      { name: "Gel Polish Change With Take Off", price: "$30" },
      { name: "Regular Polish Change With Gel Take Off", price: "$20" },
      { name: "Gel Take Off", price: "$10+" },
      { name: "Paraffin / Paraffin With Hot Towel", price: "$12 / $15" },
      { name: "Extra Massage — 10 Minutes", price: "$15" },
      { name: "Eyebrow / Lip / Chin Wax", price: "$15 / $10 / $10" },
    ],
  },
] as const;

const reviews = [
  { initials: "JP", name: "J. P.", text: "My first visit was wonderful. I came on a family recommendation and left so glad that I did." },
  { initials: "PS", name: "Paschion Sullivan", text: "Lisa takes her time and always makes sure I feel cared for. Mimi nails are a win every time." },
  { initials: "AC", name: "Alicia C", text: "Quick, cute and beautifully done—the pedicure was lovely and my full set came out perfect." },
  { initials: "JT", name: "Judy Troxel", text: "Tracy always does beautiful work on my nails, and Sophie gives a wonderful pedicure." },
] as const;

const galleryImages = [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14].map((id) => ({
  id,
  src: `https://hollynailsandspacheyenne.com/wp-content/uploads/2026/10/holly-${id}.jpg`,
  alt: `Nail design by Holly Nails & Spa — gallery image ${id}`,
}));

export type SitePage = "home" | "services" | "about" | "gallery" | "contact";

export default function HollySite({ page = "home" }: { page?: SitePage }) {
  const [open, setOpen] = useState(false);
  const [activeService, setActiveService] = useState("pedicures");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(0);
  const [galleryApi, setGalleryApi] = useState<CarouselApi>();
  const currentServices = serviceGroups.find((group) => group.id === activeService) ?? serviceGroups[0];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (galleryOpen && galleryApi) galleryApi.scrollTo(selectedGallery, true);
  }, [galleryOpen, galleryApi, selectedGallery]);

  useEffect(() => {
    if (!galleryApi) return;
    const updateSlide = () => setSelectedGallery(galleryApi.selectedScrollSnap());
    galleryApi.on("select", updateSlide);
    return () => { galleryApi.off("select", updateSlide); };
  }, [galleryApi]);

  return (
    <main id="home" className="min-h-screen bg-[#090908] text-[#f8f2e6]">
      <header className="site-header">
        <div className="utility-bar">
          <div className="header-shell utility-inner">
            <a href="tel:+13073423689"><Phone size={13} /> (307) 342-3689</a>
            <p><MapPin size={13} /> 2316 Dell Range Blvd, Ste B1, Cheyenne, WY 82009</p>
            <p className="hours"><Clock3 size={13} /> Mon–Sat 9:30 AM–6:30 PM · Sun 10:30 AM–4:30 PM</p>
          </div>
        </div>

        <div className="header-shell nav-row">
          <a className="brand" href="/" aria-label="Holly Nails and Spa home">
            <Image src="/logo-holly.png" alt="Holly Nails & Spa" width={196} height={61} priority />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href], index) => (
              <a className={page === ["home", "services", "about", "gallery", "contact"][index] ? "active" : ""} href={href} key={label}>{label}</a>
            ))}
          </nav>

          <a className="book-button desktop-book" href="https://www.lldtek.org/salon/appt/VjFsZk1URTROVGM9" target="_blank" rel="noreferrer">
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
          <a className="book-button mobile-book" href="https://www.lldtek.org/salon/appt/VjFsZk1URTROVGM9" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <CalendarDays size={17} /> Book Appointment
          </a>
          <p>Timeless beauty, tailored to you.</p>
        </div>
      </header>

      <div className={page === "home" ? "page-content" : "page-content inner-page"}>
      {page === "home" && <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="https://assets.mixkit.co/videos/13084/13084-720.mp4" type="video/mp4" />
        </video>
        <div className="video-shade" aria-hidden="true" />
        <div className="header-shell hero-content">
          <p className="eyebrow"><span /> Holly Nails &amp; Spa <span /></p>
          <h1 id="hero-title">The art of <em>beautiful details.</em></h1>
          <p className="hero-intro">Elevated nail care in a serene setting—where refined artistry, impeccable service and your personal style come together.</p>
          <div className="hero-actions">
            <a className="book-button hero-book" href="https://www.lldtek.org/salon/appt/VjFsZk1URTROVGM9" target="_blank" rel="noreferrer"><CalendarDays size={17} /> Reserve your visit</a>
            <a className="text-link" href="/services">Explore our services <span aria-hidden="true">↗</span></a>
          </div>
          <div className="social-links" aria-label="Holly Nails & Spa social links">
            <span className="social-label">Follow &amp; find us</span>
            <a href="https://www.facebook.com/profile.php?id=61585411765707" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/facebook/default.svg" alt="" />
            </a>
            <a href="https://www.instagram.com/hollynailsspawy82009" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/instagram/default.svg" alt="" />
            </a>
            <a href="https://maps.google.com/?cid=9821125947220775333" target="_blank" rel="noreferrer" aria-label="Google Maps">
              <img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/google-maps/default.svg" alt="" />
            </a>
          </div>
        </div>
        <div className="hero-foot header-shell">
          <p><span>01</span> Luxury Manicures</p>
          <p><span>02</span> Spa Pedicures</p>
          <p><span>03</span> Signature Nail Art</p>
        </div>
      </section>}

      {(page === "home" || page === "about") && <section id="about" className="placeholder-section">
        <div className="about-shell">
          <div className="about-visual">
            <div className="about-image-main">
              <img src="https://hollynailsandspacheyenne.com/wp-content/uploads/2026/10/purple-neat-manicure-female-hands-background-flowers-nail-design-scaled.jpg" alt="Purple manicure with flowers" />
            </div>
            <div className="about-image-detail">
              <img src="https://hollynailsandspacheyenne.com/wp-content/uploads/2026/10/beautiful-female-hand-with-orange-black-nail-art-scaled.jpg" alt="Orange and black nail art" />
            </div>
            <div className="about-seal" aria-label="Located in Cheyenne, Wyoming"><strong>WY</strong><span>Cheyenne</span></div>
          </div>

          <div className="about-copy">
            <p className="section-kicker">About Holly Nails &amp; Spa</p>
            <h2>Beauty begins with<br /><em>care in every detail.</em></h2>
            <p className="about-lead">Holly Nails &amp; Spa is a refined neighborhood retreat in Cheyenne, created for those who value beautiful results and time well spent.</p>
            <p className="about-body">From timeless manicures and restorative pedicures to expressive nail art, every service is delivered with thoughtful attention, professional technique and a genuine desire to make you feel at ease.</p>
            <div className="about-values">
              <div><span><ShieldCheck size={19} /></span><p><strong>Clean &amp; considered</strong>Careful sanitation and a polished, comfortable setting.</p></div>
              <div><span><Sparkles size={19} /></span><p><strong>Tailored artistry</strong>Shape, color and detail selected for your personal style.</p></div>
              <div><span><Gem size={19} /></span><p><strong>Elevated experience</strong>Unhurried service with a consistently refined finish.</p></div>
            </div>
            <div className="about-actions">
              <a className="about-primary" href="https://www.lldtek.org/salon/appt/VjFsZk1URTROVGM9" target="_blank" rel="noreferrer"><CalendarDays size={17} /> Book an appointment</a>
              <a className="about-location" href="https://maps.google.com/?cid=9821125947220775333" target="_blank" rel="noreferrer"><MapPin size={17} /> Get directions</a>
            </div>
          </div>
        </div>
      </section>}
      {(page === "home" || page === "services") && <section id="services" className="services-section" aria-labelledby="services-title">
        <div className="services-shell">
          <div className="services-heading">
            <div><p>Our menu</p><h2 id="services-title">Services <em>&amp; pricing</em></h2></div>
            <p>Thoughtful care, beautiful finishes and a little time set aside just for you.</p>
          </div>
          <div className="service-tabs" role="tablist" aria-label="Service categories">
            {serviceGroups.map((group, index) => (
              <button key={group.id} type="button" role="tab" aria-selected={activeService === group.id} onClick={() => setActiveService(group.id)}>
                <span>0{index + 1}</span>{group.label}
              </button>
            ))}
          </div>
          <div className="service-menu" role="tabpanel">
            <div className="service-menu-title"><span>{currentServices.eyebrow}</span><h3>{currentServices.label}</h3></div>
            <div className="service-list">
              {currentServices.items.map((item) => (
                <article className="service-item" key={item.name}>
                  <div className="service-line"><h4>{item.name}</h4><i /><strong>{item.price}</strong></div>
                  {"time" in item && item.time ? <span className="service-time">{item.time}</span> : null}
                  {"description" in item && item.description ? <p>{item.description}</p> : null}
                  {"note" in item && item.note ? <small>{item.note}</small> : null}
                </article>
              ))}
            </div>
          </div>
          <p className="service-disclaimer">Prices marked “+” may vary by length, shape or design. Please consult your nail technician for final pricing.</p>
        </div>
      </section>}
      {page === "home" && <section className="reviews-section" aria-labelledby="reviews-title">
        <div className="reviews-shell">
          <div className="reviews-intro">
            <p>Kind words</p>
            <h2 id="reviews-title">Loved by<br /><em>Cheyenne.</em></h2>
            <div className="reviews-rating">
              <strong>4.8</strong>
              <div><span aria-label="5 out of 5 stars">★★★★★</span><p>558 Google reviews</p></div>
            </div>
            <a href="https://www.google.com/search?q=2316+Dell+Range+Blvd%2C+Ste+B1%2C+Cheyenne%2C+WY+82009+HOLLY+NAILS+%26+SPA" target="_blank" rel="noreferrer">Read 558 Google reviews <span aria-hidden="true">↗</span></a>
          </div>
          <Carousel className="reviews-carousel" opts={{ align: "start", loop: true }} aria-label="Customer reviews">
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.name} className="review-slide">
                  <article className="review-card">
                    <Quote className="review-quote" size={30} strokeWidth={1.15} />
                    <div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} fill="currentColor" />)}</div>
                    <blockquote>{review.text}</blockquote>
                    <footer><span>{review.initials}</span><div><strong>{review.name}</strong><small>Google review</small></div></footer>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="review-controls"><CarouselPrevious /><CarouselNext /></div>
          </Carousel>
        </div>
      </section>}
      {(page === "home" || page === "gallery") && <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div><p>Nail art gallery</p><h2 id="gallery-title">Beautiful <em>details.</em></h2></div>
          <div className="gallery-heading-copy"><p>Color, shape and detail—created for your mood, your moment and your style.</p><a href="https://www.instagram.com/hollynailsspawy82009" target="_blank" rel="noreferrer">Follow our latest sets <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <button className="gallery-item" type="button" key={image.id} aria-label={`Open gallery image ${index + 1}`} onClick={() => { setSelectedGallery(index); setGalleryOpen(true); }}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span><small>{String(index + 1).padStart(2, "0")}</small>View detail</span>
            </button>
          ))}
        </div>
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="gallery-lightbox" showCloseButton>
            <DialogTitle className="sr-only">Holly Nails &amp; Spa gallery</DialogTitle>
            <DialogDescription className="sr-only">Browse nail art images with previous and next controls.</DialogDescription>
            <Carousel className="lightbox-carousel" opts={{ startIndex: selectedGallery, loop: true }} setApi={setGalleryApi}>
              <CarouselContent>
                {galleryImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="lightbox-image"><img src={image.src} alt={image.alt} /></div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="lightbox-controls"><CarouselPrevious /><span>{String(selectedGallery + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span><CarouselNext /></div>
            </Carousel>
          </DialogContent>
        </Dialog>
      </section>}
      {(page === "home" || page === "contact") && <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-shell">
          <div className="contact-copy">
            <p>Visit Holly Nails &amp; Spa</p>
            <h2 id="contact-title">Your time to<br /><em>feel beautiful.</em></h2>
            <p className="contact-intro">Stop by our Cheyenne salon or call to reserve your next manicure, pedicure or nail enhancement.</p>
            <div className="contact-actions">
              <a className="contact-call" href="tel:+13073423689"><Phone size={17} /> Call (307) 342-3689</a>
              <a className="contact-directions" href="https://maps.google.com/?cid=9821125947220775333" target="_blank" rel="noreferrer"><MapPin size={17} /> Get directions</a>
            </div>
            <div className="contact-socials" aria-label="Social media">
              <span>Connect with us</span>
              <a href="https://www.facebook.com/profile.php?id=61585411765707" target="_blank" rel="noreferrer" aria-label="Facebook"><img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/facebook/default.svg" alt="" /></a>
              <a href="https://www.instagram.com/hollynailsspawy82009" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/instagram/default.svg" alt="" /></a>
              <a href="https://maps.google.com/?cid=9821125947220775333" target="_blank" rel="noreferrer" aria-label="Google Maps"><img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/google-maps/default.svg" alt="" /></a>
            </div>
          </div>

          <div className="contact-details">
            <div className="contact-address"><MapPin size={19} /><div><span>Our location</span><address>2316 Dell Range Blvd<br />Ste B1, Cheyenne, WY 82009</address></div></div>
            <div className="contact-hours">
              <div className="contact-hours-title"><Clock3 size={19} /><span>Business hours</span></div>
              <dl>
                <div><dt>Monday–Saturday</dt><dd>9:30 AM–6:30 PM</dd></div>
                <div><dt>Sunday</dt><dd>10:30 AM–4:30 PM</dd></div>
              </dl>
            </div>
          </div>

          <div className="contact-map">
            <iframe title="Holly Nails & Spa location map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.806419276886!2d-104.7869027234655!3d41.16057521003247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876f3b3e4bd28cc1%3A0x884ba603b27751a5!2sHolly%20Nails%20%26%20Spa!5e0!3m2!1sen!2s!4v1791234469477!5m2!1sen!2s" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
            <div className="map-label"><span>H</span><p><strong>Holly Nails &amp; Spa</strong>Cheyenne, Wyoming</p></div>
          </div>
        </div>
      </section>}
      </div>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Holly Nails & Spa home"><Image src="/logo-holly.png" alt="Holly Nails & Spa" width={210} height={66} /></a>
            <p>Refined nail care, thoughtful artistry and a little time reserved just for you.</p>
            <div className="footer-socials" aria-label="Social media">
              <a href="https://www.facebook.com/profile.php?id=61585411765707" target="_blank" rel="noreferrer" aria-label="Facebook"><img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/facebook/default.svg" alt="" /></a>
              <a href="https://www.instagram.com/hollynailsspawy82009" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/instagram/default.svg" alt="" /></a>
              <a href="https://maps.google.com/?cid=9821125947220775333" target="_blank" rel="noreferrer" aria-label="Google Maps"><img src="https://raw.githubusercontent.com/glincker/thesvg/main/public/icons/google-maps/default.svg" alt="" /></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <nav aria-label="Footer navigation">
              {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
            </nav>
          </div>
          <div className="footer-column footer-visit">
            <h3>Visit us</h3>
            <address>2316 Dell Range Blvd, Ste B1<br />Cheyenne, WY 82009</address>
            <a href="tel:+13073423689">(307) 342-3689</a>
            <p>Mon–Sat: 9:30 AM–6:30 PM<br />Sun: 10:30 AM–4:30 PM</p>
          </div>
          <div className="footer-booking">
            <p>Your next beautiful set starts here.</p>
            <a href="https://www.lldtek.org/salon/appt/VjFsZk1URTROVGM9" target="_blank" rel="noreferrer"><CalendarDays size={17} /> Book Appointment</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Holly Nails &amp; Spa. All rights reserved.</p>
          <p>Cheyenne, Wyoming</p>
        </div>
      </footer>
    </main>
  );
}
