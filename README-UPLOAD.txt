LUUP — luupnow.ca upload package
Generated: 2026-09-11 (rev 4)


==========================================================
1. WHAT TO UPLOAD
==========================================================
Upload the CONTENTS of this folder into your GoDaddy web root
(public_html / httpdocs). Keep the folder structure exactly as-is.

  index.html                  luupnow.ca homepage (Create Profile + Sign In)
  styles.css                  homepage styles (incl. mobile hero layout)
  analytics.js                *** ALL TRACKING IDs LIVE HERE *** (see section 3)
  support.js                  shared runtime — required by all landing pages
  .htaccess                   directory index + 301s:
                              /auto-shop -> /autoshop, /fintech -> /connect
  9fet6...html                Facebook domain verification file (backup method)
  assets/                     shared logos, hero photos, QR, ICBC mark, flag

  renters/index.html          luupnow.ca/renters
  autoshop/index.html         luupnow.ca/autoshop
  connect/index.html          luupnow.ca/connect        (LUUP Connect)
  technology/index.html       luupnow.ca/technology     (Dual-Use Technology)
  influencer/index.html       luupnow.ca/influencer     (Influencer Program)
  thank-you/index.html        luupnow.ca/thank-you
  <page>/images/              that page's hero + OG share image


==========================================================
2. WHAT CHANGED IN THIS BUILD (rev 4 — 2026-09-11)
==========================================================
  SOCIAL      Footer social links updated on every page:
              instagram.com/luup.now  ·  facebook.com/LuupNow
              x.com/LuupNow  ·  linkedin.com/company/luuptechnologies
              youtube.com/@luupnowtech  ·  tiktok.com/@luup.now

  FORMS       Email and mobile/phone now sit side by side in one row
              on every page — both the in-page form and the popup form.

  CONNECT     Every primary "Sign up for LUUP" CTA (header, hero,
              how-it-works, model section, final CTA) now opens a popup
              with luupnow.com/authentication loaded inside it, with an
              "Open in new tab" link in the popup header. The invite
              form itself is unchanged. The "Sign up for more
              information" button in the financial-model section still
              opens the original invite form modal, tagged with the
              Connect campaign.

  TECHNOLOGY  "Book a Call" and "Platform Capabilities" buttons removed
              from the hero only. The same CTAs elsewhere on the page
              (header, model section, capabilities, final CTA) stay.

  INFLUENCER  "Why Become a LUUP Influencer?" section rewritten:
              Earn 1% From Your Referrals / We Do the Heavy Lifting /
              Meet a Real Neighbourhood Need.
              "About Luup" in the hero now opens a popup with
              luupnow.com/page/about-us instead of leaving the page.
              One "I'm Interested" CTA added inside the mobile hamburger
              menu (mobile only — desktop nav unchanged).


==========================================================
2b. EARLIER BUILD (rev 2)
==========================================================
  HOMEPAGE    Hero headline is now "Life Moves Better / with LUUP".
              New subhead: "LUUP is a neighbourhood car-sharing club
              connecting you with trusted people and vehicles nearby,
              so you can access a car whenever life calls for one."
              ("neighbourhood car-sharing club" bold, rest regular.)
              Requires the updated styles.css — upload both together.

  NEW PAGE    /influencer/ — Influencer Program landing page.
              Hero: "Earn $25 For Every Referral", "I'm Interested"
              primary CTA and an "About Luup" secondary link to
              luupnow.com/page/about-us. Name / email / phone form on a
              black card; on success an orange confirmation appears
              in place of the form (no redirect to /thank-you/).
              iOS + Android app links added to the footer.
              Uses the shared ../assets/ images — no images/ folder.

  TECHNOLOGY  "Who It Serves" copy updated: Cities & Municipalities,
              Large Private Fleets, Transit Agencies.

  NEW PAGE    /technology/ — Dual-Use Technology landing page.
              Hero shows a laptop on an office desk with the animated
              mobility platform running inside the screen. "Submit a
              Request" form replaces the book-a-call CTA and tags every
              submission with campaign "Technology".
              OG/Twitter share card at technology/images/og-share.png (600x600).

  CTAs        Every "Book a call" button on /technology/ now opens the
              Submit a Request modal instead of Calendly, so the hero and
              header CTAs feed the same tracked conversion as the form.

  NAVIGATION  Two new top-level items across all pages: "LUUP Connect"
              (financial model) and "Dual-Use Technology" (platform).
              Offers keeps Renters + Auto Shop as sub-items. The mobile
              hamburger menu mirrors the same structure and labels.

  TRACKING    All inline GA4 / Meta snippets were removed from the six
              pages and consolidated into one shared analytics.js.
              Adds Google Ads conversions, Mixpanel, first-touch UTM +
              click-ID capture, and auto-identify on lead events.
              Facebook domain-verification meta now on every page.


==========================================================
3. TRACKING — edit ONE file: analytics.js
==========================================================
Open analytics.js. The top of the file is the only thing you ever edit:

  window.LUUP_IDS = {
    ga4:           'G-5RV23C0JFY',      <- LIVE
    googleAds:     '',                  <- e.g. AW-123456789        (empty = off)
    googleAdsLead: '',                  <- e.g. AW-123456789/AbC-D_e (empty = off)
    metaPixel:     '3079517958908951',  <- LIVE
    mixpanel:      '',                  <- Mixpanel project token   (empty = off)
    linkedIn:      '',                  <- LinkedIn partner ID      (empty = off)
    tiktok:        '',                  <- TikTok pixel ID          (empty = off)
    clarity:       ''                   <- MS Clarity project ID    (empty = off)
  };

Any field left empty simply does not load. Nothing breaks, nothing to
comment out. Fill one in and it goes live on the next page load.

WHAT IS WIRED RIGHT NOW
  GA4              G-5RV23C0JFY        page_view + all custom events
  Meta Pixel       3079517958908951    init + PageView + <noscript> fallback,
                                       Lead on form success, Schedule on
                                       book-a-call
  Google Ads       waiting on IDs      conversion fires automatically on
                                       lead events once googleAdsLead is set
  Mixpanel         waiting on token    every event, plus people.set on lead
  LinkedIn /       waiting on IDs      insight tag / pixel + SubmitForm
  TikTok / Clarity

DOMAIN GUARD
  Everything is wrapped in a luupnow.ca hostname check. Previews, staging
  and local files fire nothing (they log to the console instead), so test
  traffic never pollutes reporting.

ATTRIBUTION (automatic, all pages)
  Captured from the landing URL on first touch and kept in sessionStorage:
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    gclid, gbraid, wbraid, fbclid, msclkid, ttclid, li_fat_id,
    landing_page, first_referrer, first_seen_at
  These are attached to EVERY GA4 event (gtag set), registered as Mixpanel
  super-properties, and included in every Formspree submission — so a lead
  that lands on /technology/ from a Meta ad and converts three pages later
  still reports the original campaign.

EVENTS FIRED
  landing_page_view, navigation_click, cta_click, explore_page_click,
  how_it_works_click, book_call_click, app_download_click, video_play,
  video_25/50/75_percent, video_complete, faq_open, area_selected,
  form_scroll_click, submit_request_click, invite_form_start,
  invite_form_submit, invite_form_success (= conversion), invite_form_error

VERIFICATION
  Meta: <meta name="facebook-domain-verification"
        content="9fet6vb4tbm9g9sc4lm9bou29tb133"> on all seven pages,
        plus the 9fet6...html file at the web root as a backup method.
        Do not remove either.
  Google Search Console / Bing: no verification token supplied yet — add a
  <meta> to index.html or upload the HTML file they give you.

HOW TO CONFIRM IT WORKS AFTER UPLOAD
  1. GA4 > Admin > DebugView, or Realtime — load luupnow.ca/technology/
     with ?utm_source=test&utm_campaign=smoke and submit the form.
     You should see landing_page_view then invite_form_success carrying
     utm_source=test.
  2. Meta Events Manager > Test Events — same flow, expect PageView + Lead.
  3. Mixpanel > Events (Live View) once the token is filled in.
  4. Google Ads > Tools > Conversions — status flips from "No recent
     conversions" after the first real submit.


==========================================================
4. FORMS
==========================================================
All five landing pages (renters, autoshop, connect, technology, influencer) POST to Formspree endpoint xdenypay and send:
  submitted_at, first/last name, email, mobile, area (where asked),
  campaign, source_page, form_name, page, page_url, referrer,
  device_type, landing_page, first_referrer, first_seen_at, and the
  full UTM + click-ID set listed above.
Campaign / source_page values:
  Renters -> "Renters"      form_name "Renters invite request"
                            (also sends wave "Wave 1")
  Auto Shop -> "Auto Shop"  form_name "Auto Shop application"
  Connect -> "Connect"      form_name "Connect invite request"
  Technology -> "Technology" form_name "Submit a Request"
  Influencer -> "Influencer" form_name "Influencer sign-up"
                            (also sends wave "Wave 1",
                             subject "New LUUP lead — Influencer")
On success the visitor is redirected to /thank-you/?from=<page>, and the
Thank You page shows the matching return button:
  ?from=renters -> "Back to Renters"      -> /renters/
  ?from=autoshop -> "Back to Auto Shop"   -> /autoshop/
  ?from=connect -> "Back to Connect"      -> /connect/
  ?from=technology -> "Back to Technology" -> /technology/
An unknown or missing ?from falls back to the Renters copy.
EXCEPTION: /influencer/ does NOT redirect. It shows the confirmation
inline ("Thank you! Your information has been submitted successfully.
We'll reach out to you shortly.") and still fires invite_form_success,
so the Meta Lead and Google Ads conversion are unaffected.

CONVERSION DE-DUPLICATION
  The Meta "Lead" event and the Google Ads conversion fire exactly ONCE per
  submission, from analytics.js on the invite_form_success event. The pages
  no longer fire their own Lead, and the Thank You page no longer fires one
  on view — so Meta and Google Ads counts match Formspree submissions 1:1.
  The Thank You page still sends thank_you_view for funnel reporting.

NOTE
  The Renters and Connect modals do not ask for an area, so the "area" field
  arrives empty on those two. Auto Shop and Technology do collect it.

Submissions land at whatever email address is configured on that
Formspree form.


==========================================================
5. SEO NOTES
==========================================================
  Each landing page has canonical + OG + Twitter tags on its live URL.
  The five landing pages are set to robots "noindex, nofollow" because
  they are paid-traffic destinations. Remove that meta tag on any page
  you want indexed.


==========================================================
6. STILL TO CONFIRM
==========================================================
  Mixpanel project token (analytics.js -> mixpanel)
  Google Ads conversion ID + label (analytics.js -> googleAds, googleAdsLead)
  connect + technology footer "Offer Terms:" currently read TBD
  appDownloadUrl on the landing pages points at https://luupnow.ca/app
  connect video section has no MP4 source yet
