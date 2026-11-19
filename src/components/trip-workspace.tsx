"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, ChevronRight, Coffee, Compass, ExternalLink, Heart, Leaf, Link as LinkIcon, Map, MapPin, Menu, Plus, Route, Sparkles, TrainFront, Trash2, Undo2, Users, Wallet, X } from "lucide-react";
import { cities, demoBudget, demoStops } from "@/lib/demo-data";
import type { BudgetMode, City, Stop } from "@/lib/types";

type Panel = "invite" | "account" | "preferences" | "inspiration" | "map" | "generate" | null;
type Inspiration = { id: string; url: string; label: string };
const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

export function TripWorkspace() {
  const [city, setCity] = useState<City>("New York");
  const [day, setDay] = useState(1);
  const [stops, setStops] = useState<Stop[]>(demoStops);
  const [previous, setPrevious] = useState<Stop[] | null>(null);
  const [budgetMode, setBudgetMode] = useState<BudgetMode>("person");
  const [travelers, setTravelers] = useState(1);
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [links, setLinks] = useState<Inspiration[]>([]);
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [pace, setPace] = useState("A little of everything");
  const [interests, setInterests] = useState(["Local gems", "Food & coffee", "Art & culture"]);
  const [activeTab, setActiveTab] = useState("Itinerary");
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!panel) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [panel]);

  const today = stops.filter((stop) => stop.day === day);
  const multiplier = budgetMode === "group" ? travelers : 1;
  const total = demoBudget.reduce((sum, category) => sum + category.amount, 0) * multiplier;
  const isDemoCity = city === "New York";

  function editStops(next: Stop[], message: string) {
    setPrevious(stops);
    setStops(next);
    setNotice(message);
  }

  function moveStop(stop: Stop) {
    const nextDay = stop.day === 3 ? 1 : stop.day + 1;
    editStops(stops.map((item) => item.id === stop.id ? { ...item, day: nextDay } : item), `Moved to Day ${nextDay}. Times are sample values; scheduling and routes need recalculation.`);
  }

  function saveLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const url = new URL(link);
      const host = url.hostname.toLowerCase();
      const allowed = ["instagram.com", "tiktok.com"].some((domain) => host === domain || host.endsWith(`.${domain}`));
      if (url.protocol !== "https:" || !allowed) throw new Error("Unsupported link");
      setLinks((items) => [...items, { id: crypto.randomUUID(), url: url.href, label: host.includes("tiktok") ? "TikTok inspiration" : "Instagram inspiration" }]);
      setLink("");
      setLinkError("");
      setNotice("Inspiration saved for this session. Post content has not been retrieved.");
    } catch {
      setLinkError("Please enter an HTTPS link from TikTok or Instagram.");
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "is-open" : ""}`}>
        <NextLink className="brand" href="/" aria-label="Singularity home"><span className="brand-symbol"><Sparkles size={23} /></span>singularity<span className="brand-dot">.</span></NextLink>
        <div className="workspace-label">YOUR LITTLE WORLD</div>
        <nav aria-label="Main navigation">
          <button className="nav-item active" onClick={() => { setActiveTab("Itinerary"); setMobileNav(false); }}><Compass size={19} /> My trips <span className="nav-count">1</span></button>
          <button className="nav-item" onClick={() => { setActiveTab("Inspiration"); setMobileNav(false); }}><Bookmark size={19} /> Inspiration <span className="tiny-dot" /></button>
        </nav>
        <div className="sidebar-trip-label">CURRENT ADVENTURE</div>
        <button className="sidebar-trip" onClick={() => { setActiveTab("Itinerary"); setMobileNav(false); }}><span className="city-emoji">🗽</span><span><strong>{city}</strong><small>3 days of possibilities</small></span><ChevronRight size={15} /></button>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><span className="little-sparkle">✳</span><h3>Better with a little<br />spontaneity.</h3><p>Make a plan. Leave room<br />for the unexpected.</p><span className="note-line" /></div>
          <button className="profile" onClick={() => setPanel("account")}><span className="avatar">Y</span><span><strong>Your next chapter</strong><small>Preview workspace</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumbs"><button className="mobile-menu icon-button" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation"><Menu size={20} /></button><span>My trips</span><ChevronRight size={14} /><strong>{city}</strong></div>
          <div className="topbar-actions"><span className="preview-label"><span /> UI preview</span><button className="text-button account-button" onClick={() => setPanel("account")}>Sign in <ArrowUpRight size={15} /></button><span className="avatar small">Y</span></div>
        </header>

        <main>
          <section className="hero">
            <div className="hero-content"><div className="eyebrow"><span /> A NEW ADVENTURE IS CALLING</div><h1>A little more <span>{city === "New York" ? "New York" : city}.</span><br />A little more you.</h1><p>Big-city energy. Little discoveries. A trip that feels like yours.</p><div className="hero-tags"><span><MapPin size={14} /> {city}, USA</span><span>3 days</span><span>Dates? Still dreaming.</span></div></div>
            <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><span className="art-sparkle">✦</span><div className="postcard"><div className="postcard-photo" /><div className="postcard-caption">meet me in the city ♡</div></div><div className="floating-sticker"><Compass size={23} /><span>take the<br /><strong>scenic route</strong></span></div><span className="hero-flower">✳</span></div>
          </section>

          <div className="trip-toolbar"><div className="trip-facts"><label className="city-select"><MapPin size={16} /><select aria-label="Destination city" value={city} onChange={(event) => { setCity(event.target.value as City); setNotice(""); }}>{cities.map((name) => <option key={name}>{name}</option>)}</select></label><span className="toolbar-divider" /><button onClick={() => setPanel("preferences")}><Users size={16} /> {travelers} {travelers === 1 ? "traveler" : "travelers"}<ChevronDown size={13} /></button><span className="toolbar-divider" /><span className="flexible-label">Flexible dates</span></div><button className="button invite-button" onClick={() => setPanel("invite")}><Plus size={16} /> Invite your people</button></div>

          <div className="workspace-tabs"><div className="tab-list" role="tablist" aria-label="Trip sections">{["Itinerary", "Inspiration", "Budget"].map((tab) => <button key={tab} id={`tab-${tab}`} aria-controls="workspace-content" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "selected" : ""} onClick={() => setActiveTab(tab)}>{tab === "Itinerary" ? <Route size={16} /> : tab === "Inspiration" ? <Heart size={16} /> : <Wallet size={16} />}{tab}{tab === "Inspiration" && <span className="tab-badge">{links.length}</span>}</button>)}</div><button className="text-button preferences-button" onClick={() => setPanel("preferences")}><Sparkles size={15} /> Trip preferences</button></div>

          <div className="workspace-grid" id="workspace-content" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
            <div className="itinerary-column">
              {activeTab === "Itinerary" && <>
                <div className="section-heading"><div><div className="section-kicker">YOUR TRIP, YOUR WAY</div><h2>Good days ahead<span>✦</span></h2><p>A little structure. Plenty of room to make it yours.</p></div><button className="button soft-button" onClick={() => setPanel("generate")}><Sparkles size={15} /> Reimagine trip</button></div>
                <div className="day-picker">{[1, 2, 3].map((value) => <button className={day === value ? "selected" : ""} onClick={() => setDay(value)} key={value}><span>DAY 0{value}</span><strong>{["A classic kind of day", "Find your local side", "Across the river"][value - 1]}</strong></button>)}</div>
                <div className="day-intro"><div><h3>{["The icons, at your own pace.", "Small streets. Big discoveries.", "A fresh perspective."][day - 1]}</h3><p><span className="green-dot" /> {isDemoCity ? `${today.length} stops` : "No stops yet"}<span>·</span>Relaxed pace<span>·</span>Sample itinerary</p></div><button className="map-button" onClick={() => setPanel("map")}><Map size={16} /> Map view</button></div>
                {!isDemoCity ? <div className="empty-state"><MapPin size={30} /><h3>{city} is on the list.</h3><p>Live planning isn’t connected yet. Explore the New York sample to try the itinerary editor.</p><button className="button primary-button" onClick={() => setCity("New York")}>Explore New York <ArrowRight size={16} /></button></div> : today.length === 0 ? <div className="empty-state"><Leaf size={30} /><h3>A little room to wander.</h3><p>Move a stop here from another day, or undo your last change.</p></div> : <div className="stop-list">{today.map((stop, index) => <div className="stop-block" key={stop.id}>
                  <div className="timeline"><span>{stop.time}</span><div className="timeline-dot">{index + 1}</div></div>
                  <article className="stop-card"><div className="stop-image" style={{ backgroundImage: `url(https://images.unsplash.com/${stop.image}?auto=format&fit=crop&w=600&q=80)` }}><span className={`category-badge ${stop.category === "Outdoors" ? "green" : stop.category === "Food & drink" ? "peach" : "lavender"}`}>{stop.category === "Outdoors" ? <Leaf size={12} /> : stop.category === "Food & drink" ? <Coffee size={12} /> : <Compass size={12} />}{stop.category}</span></div><div className="stop-content"><div className="stop-meta"><span><MapPin size={12} />{stop.neighborhood}</span><span>{stop.duration}</span></div><h4>{stop.title}</h4><p>{stop.description}</p><div className="stop-footer"><span className="stop-price">{stop.estimate === 0 ? "Free entry*" : `~${money(stop.estimate)} / person`}</span><div><button title={`Move ${stop.title} to Day ${stop.day === 3 ? 1 : stop.day + 1}`} aria-label={`Move ${stop.title} to Day ${stop.day === 3 ? 1 : stop.day + 1}`} onClick={() => moveStop(stop)}><ArrowDown size={14} /> Day {stop.day === 3 ? 1 : stop.day + 1}</button><button className="remove-stop" aria-label={`Remove ${stop.title}`} onClick={() => editStops(stops.filter((item) => item.id !== stop.id), "Stop removed from the sample itinerary.")}><Trash2 size={14} /></button></div></div></div></article>
                  {index < today.length - 1 && <div className="route-between"><span className="route-dash" /><TrainFront size={13} /><span>Transport & travel time pending</span><span className="route-dash" /></div>}
                </div>)}</div>}
                <button className="add-stop-button" onClick={() => setPanel("inspiration")}><Plus size={17} /> Found something you love? Save an idea</button>
                <p className="sample-note">*Illustrative sample only. Prices, hours, availability, and routes are not verified. Edits reset on refresh.</p>
              </>}

              {activeTab === "Inspiration" && <><div className="section-heading"><div><div className="section-kicker">THE START OF SOMETHING GOOD</div><h2>Follow your curiosity<span>✦</span></h2><p>Bring the places you’ve been saving into the same little world.</p></div></div><div className="inspiration-empty"><span className="inspiration-symbol"><Heart size={29} /></span><h3>From your feed to your next adventure.</h3><p>Save TikTok and Instagram links here. We keep the source—not invented reviews or unverified recommendations.</p><button className="button primary-button" onClick={() => setPanel("inspiration")}><Plus size={16} /> Save inspiration</button></div>{links.map((item) => <div className="saved-link" key={item.id}><span className="saved-link-icon"><LinkIcon size={18} /></span><div><strong>{item.label}</strong><a href={item.url} target="_blank" rel="noopener noreferrer">Open original post <ExternalLink size={12} /></a></div><button className="icon-button" aria-label={`Remove ${item.label}`} onClick={() => setLinks(links.filter((entry) => entry.id !== item.id))}><X size={16} /></button></div>)}<p className="sample-note">Links are saved for this session only. Post content and comments are not retrieved.</p></>}

              {activeTab === "Budget" && <><div className="section-heading"><div><div className="section-kicker">MORE MEMORIES, FEWER SURPRISES</div><h2>A little money clarity<span>✦</span></h2><p>Illustrative estimates, not live prices or booking quotes.</p></div></div><div className="budget-detail"><div className="budget-mode"><button className={budgetMode === "person" ? "selected" : ""} onClick={() => setBudgetMode("person")}>Per person</button><button className={budgetMode === "group" ? "selected" : ""} onClick={() => setBudgetMode("group")}>Whole group</button></div><label className="traveler-input">Travelers<input type="number" min="1" max="20" value={travelers} onChange={(event) => setTravelers(Math.max(1, Math.min(20, Number(event.target.value) || 1)))} /></label>{demoBudget.map((category) => <div className="budget-detail-row" key={category.label}><span className="budget-dot" style={{ background: category.color }} /><div><strong>{category.label}</strong><small>{category.note}</small></div><strong>{money(category.amount * multiplier)}</strong></div>)}<div className="budget-detail-row"><span className="budget-dot unknown-dot" /><div><strong>Flights</strong><small>Add dates and departure airport later</small></div><span>Not estimated</span></div><div className="budget-detail-total"><span>Sample subtotal · {budgetMode === "person" ? "per person" : `${travelers} travelers`}</span><strong>{money(total)}</strong></div><p className="sample-note">Flight costs, taxes, fees, and other unlisted expenses are not included. Group values are a simple multiplication, not room-sharing calculations. These sample numbers do not recalculate with itinerary edits.</p></div></>}
            </div>

            <aside className="details-column" aria-label="Trip details">
              <section className="assistant-card"><span className="assistant-icon"><Sparkles size={20} /></span><span className="mini-label">A LITTLE HELP, A LOT OF POSSIBILITY</span><h3>Your kind of trip.<br />Not everyone else’s.</h3><p>More local gems? Less rushing?<br />Make space for what you love.</p><button onClick={() => setPanel("preferences")}>Make it more me <ArrowUpRight size={16} /></button><span className="assistant-flower" aria-hidden="true">✳</span></section>
              <section className="budget-card"><div className="card-title"><h3>The money part</h3><Wallet size={17} /></div><p className="card-subtitle">Sample budget · 3 days</p><div className="budget-headline"><strong>{money(total)}</strong><button onClick={() => setBudgetMode(budgetMode === "person" ? "group" : "person")}>{budgetMode === "person" ? "/ person" : `/ ${travelers} travelers`}<ChevronDown size={12} /></button></div><div className="budget-bar">{demoBudget.map((category) => <span key={category.label} style={{ background: category.color, flex: category.amount }} />)}</div><div className="budget-items">{demoBudget.map((category) => <div key={category.label}><span><i style={{ background: category.color }} />{category.label}</span><strong>{money(category.amount * multiplier)}</strong></div>)}</div><div className="budget-caveat">Flights not estimated · not live pricing</div><button className="budget-link" onClick={() => setActiveTab("Budget")}>See the breakdown <ArrowRight size={14} /></button></section>
              <section className="inspiration-card"><div className="card-title"><h3>Saved it? Let’s go.</h3><Heart size={17} /></div><p>That café from your feed deserves<br />a spot in your real-life plans.</p><div className="social-pills"><span>♪ TikTok</span><span>◎ Instagram</span></div><button onClick={() => setPanel("inspiration")}><Plus size={15} /> Add a link</button></section>
              <div className="private-note"><Check size={13} /><span>Just yours, until you invite someone.</span></div>
            </aside>
          </div>
          <footer className="page-footer"><span>Less planning. More being there.</span><span>Made for your next “let’s go.” <Sparkles size={13} /></span></footer>
        </main>
      </div>

      {notice && <div className="toast" role="status"><Check size={17} /><span>{notice}</span>{previous && <button onClick={() => { setStops(previous); setPrevious(null); setNotice("Last itinerary edit undone."); }}><Undo2 size={14} />Undo</button>}<button className="icon-button" aria-label="Dismiss notification" onClick={() => setNotice("")}><X size={15} /></button></div>}

      {panel && <div className="modal-backdrop" onClick={() => setPanel(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title" ref={dialogRef} tabIndex={-1} onKeyDown={(event) => { if (event.key === "Escape") setPanel(null); if (event.key === "Tab") { const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button, input, select, a[href]'); const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === event.currentTarget)) { event.preventDefault(); first?.focus(); } } }} onClick={(event) => event.stopPropagation()}><button className="modal-close icon-button" aria-label="Close dialog" onClick={() => setPanel(null)}><X size={20} /></button><span className="modal-symbol"><Sparkles size={24} /></span>
        {panel === "preferences" ? <><h2 id="dialog-title">A little more you.</h2><p>Try adjusting your sample trip preferences. AI planning isn’t connected yet.</p><label className="field-label">How many travelers?<input type="number" min="1" max="20" value={travelers} onChange={(event) => setTravelers(Math.max(1, Math.min(20, Number(event.target.value) || 1)))} /></label><label className="field-label">Your pace<select value={pace} onChange={(event) => setPace(event.target.value)}>{["Slow & spontaneous", "A little of everything", "See as much as possible"].map((item) => <option key={item}>{item}</option>)}</select></label><div className="field-label">What’s your kind of good day?</div><div className="interest-chips">{["Local gems", "Food & coffee", "Art & culture", "Nature", "Shopping", "Nightlife"].map((interest) => <button aria-pressed={interests.includes(interest)} className={interests.includes(interest) ? "selected" : ""} key={interest} onClick={() => setInterests(interests.includes(interest) ? interests.filter((item) => item !== interest) : [...interests, interest])}>{interests.includes(interest) && <Check size={12} />}{interest}</button>)}</div><button className="button primary-button full-width" onClick={() => { setPanel(null); setNotice("Preferences updated for this session. The sample itinerary has not been regenerated."); }}>Keep these preferences <Check size={15} /></button></> : panel === "inspiration" ? <><h2 id="dialog-title">Your feed, meet your trip.</h2><p>Paste a TikTok or Instagram link. We’ll save the source for you—no content or comments are fetched in this prototype.</p><form onSubmit={saveLink}><label className="field-label">Post link<input type="url" required placeholder="https://www.instagram.com/p/…" value={link} onChange={(event) => setLink(event.target.value)} aria-describedby={linkError ? "link-error" : undefined} /></label>{linkError && <p id="link-error" className="error-text" role="alert">{linkError}</p>}<button className="button primary-button full-width" type="submit"><Plus size={16} /> Save to inspiration</button></form><button className="text-button modal-secondary" onClick={() => { setPanel(null); setActiveTab("Inspiration"); }}>View saved inspiration ({links.length}) <ArrowRight size={15} /></button></> : <><h2 id="dialog-title">{panel === "invite" ? "Good trips are worth sharing." : panel === "account" ? "Your next chapter starts here." : panel === "map" ? "A new perspective is coming." : "Same city. Fresh possibilities."}</h2><p>{panel === "invite" ? "Shared editing is planned, but not connected yet. Once accounts are enabled, you’ll create a revocable link so your people can sign in, join, and edit this same trip." : panel === "account" ? "Clerk sign-in with Google and email verification is the next milestone. This preview doesn’t create accounts or save your trip to a database." : panel === "map" ? "A real map and verified travel times will arrive with the places and routing integrations. We won’t show made-up routes in the meantime." : "AI planning isn’t connected yet. Everyone on a shared trip will be able to generate a new draft, review the changes, and confirm before replacing the plan."}</p><div className="coming-soon"><span /> Not connected in this UI preview</div><button className="button primary-button full-width" onClick={() => setPanel(null)}>Back to exploring <ArrowRight size={16} /></button></>}
      </section></div>}
    </div>
  );
}
