LUUP — luupnow.ca FULL SITE upload package
Generated: 2026-09-13 (rev 7 — complete package)

==========================================================
1. WHAT TO UPLOAD
==========================================================
Upload the CONTENTS of this folder into public_html/, keeping the
folder structure exactly as-is. Overwrite when prompted.

  index.html                 -> public_html/index.html            (home / hub)
  renters/index.html         -> public_html/renters/
  autoshop/index.html        -> public_html/autoshop/
  connect/index.html         -> public_html/connect/
  technology/index.html      -> public_html/technology/
  influencer/index.html      -> public_html/influencer/           (UPDATED)
  thank-you/index.html       -> public_html/thank-you/
  support.js                 -> public_html/support.js            (required)
  analytics.js               -> public_html/analytics.js          (required)
  styles.css                 -> public_html/styles.css
  assets/                    -> public_html/assets/               (all images)
  .htaccess                  -> public_html/.htaccess
  9fet6vb4tbm9g9sc4lm9bou29tb133.html -> public_html/  (Meta domain verification)

IMPORTANT: support.js and analytics.js must sit at the ROOT of
public_html/. Every page in a subfolder loads ../support.js and
../analytics.js. If support.js is missing, pages render their raw
template (for example, the "About Luup" panel appears already open).

==========================================================
2. WHAT CHANGED IN THIS BUILD (rev 7 — 2026-09-13)
==========================================================
  INFLUENCER  "Questions" FAQ rewritten and condensed to 7 questions:
                1. What is the LUUP Influencer Program, and how do I get started?
                2. How can I earn $25 + 1% from renter referrals?   (asterisk)
                3. How do I earn $15 per car?
                4. How can I earn $500-$2,000 through a building partnership?
                5. How are my referrals tracked, and when will I get paid?
                6. Which referrals do not qualify?
                7. What other program rules should I know?
  INFLUENCER  Contact line: Questions? Contact hey@luupnow.com.
  INFLUENCER  "Questions" link in the desktop nav and the mobile menu;
              "I'm Interested" button sits at the bottom of the FAQ.
  INFLUENCER  Orange asterisk on "Earn 1% From Your Referrals" and on the
              matching $25 + 1% FAQ question.
  INFLUENCER  Mobile hero only: eyebrow moved onto the hero image (two
              lines, black), tighter gap above the headline, "Become a
              Luup Influencer" on one line, two equal-width buttons.
  TRACKING    On form success the influencer page now also calls
              window.luupIdentify(email, {...}).

  All other pages are unchanged from the previous build.

==========================================================
3. TRACKING — CHECKED PAGE BY PAGE IN THIS BUILD
==========================================================
  page              analytics.js  UTM capture  Meta Pixel  form endpoint
  ----------------------------------------------------------------------
  index.html            yes         yes (*)       yes         -
  renters/              yes         yes           yes        Formspree
  autoshop/             yes         yes           yes        Formspree
  connect/              yes         yes           yes        Formspree
  technology/           yes         yes           yes        Formspree
  influencer/           yes         yes           yes        Formspree
  thank-you/            yes         yes (*)       yes         -

  (*) These two pages have no form of their own; UTM and click IDs are
      still captured for them by analytics.js and carried in the session.

  IDs (all in the LUUP_IDS block at the top of analytics.js):
    GA4               G-5RV23C0JFY          active
    Meta Pixel        3079517958908951      active (PageView + Lead)
    Meta domain verif 9fet6vb4tbm9g9sc4lm9bou29tb133  — meta tag on every
                      page + the verification .html file at the root
    Google Ads        blank  — paste 'AW-...' and the conversion label
    Mixpanel          blank  — paste the project token
    LinkedIn          blank
    TikTok            blank
  Nothing fires off luupnow.ca, so previews and staging stay clean.

  UTM / click IDs captured on load and kept for the whole session
  (sessionStorage key "luup_utm"), attached to every event and posted
  with every form:
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    gclid, gbraid, wbraid, fbclid, msclkid, ttclid, li_fat_id

  Form submissions POST JSON to https://formspree.io/f/xdenypay with:
    name, email, phone, campaign, page_name, city, landing_page,
    first_referrer + every UTM and click-ID field above.

  Events: landing_page_view, invite_form_submit, invite_form_success
  (counted as a LEAD — Meta "Lead" + Google Ads conversion once a
  conversion label is set), invite_form_error, faq_open,
  about_luup_click, app store / google play clicks.

==========================================================
4. AFTER UPLOAD — QUICK TEST
==========================================================
  1. Open https://luupnow.ca/influencer/?utm_source=test&utm_campaign=qa
  2. GA4 Realtime: confirm landing_page_view.
  3. Submit the form with a real email; the Formspree entry should list
     utm_source=test and utm_campaign=qa.
  4. GA4 Realtime: confirm invite_form_success.
  5. Meta Events Manager: confirm PageView and Lead.
  6. Repeat step 1 for renters/, autoshop/, connect/ and technology/.

==========================================================
5. NOTE
==========================================================
  The home page (index.html) does not link to /influencer/ — that page
  is a campaign landing page and is set to noindex. Tell me if you want
  it added to the home navigation.
