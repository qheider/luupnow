/* ==========================================================================
   LUUP — shared analytics loader   (luupnow.ca)
   --------------------------------------------------------------------------
   ONE file, loaded by every page. Edit the IDS block below and nothing else.
   Everything fires ONLY on luupnow.ca — preview/staging hosts stay clean.

   Loads:  GA4 (gtag.js) · Google Ads · Meta Pixel · Mixpanel
   Adds:   first-touch UTM + click-ID capture (sessionStorage), attached as
           super-properties / user properties to every event on every page
   Exposes: window.gtag, window.fbq, window.mixpanel, window.LUUP_ATTRIBUTION,
            window.luupTrack(name, props), window.luupIdentify(email)
   ========================================================================== */

window.LUUP_IDS = {
  ga4:            'G-5RV23C0JFY',        // Google Analytics 4 measurement ID
  googleAds:      '',                    // e.g. 'AW-123456789'  — leave '' to skip
  googleAdsLead:  '',                    // e.g. 'AW-123456789/AbC-D_efGh'  (conversion label)
  metaPixel:      '3079517958908951',    // Meta (Facebook) Pixel ID
  mixpanel:       '',                    // Mixpanel project token — leave '' to skip
  linkedIn:       '',                    // LinkedIn partner ID — leave '' to skip
  tiktok:         '',                    // TikTok pixel ID — leave '' to skip
  clarity:        ''                     // Microsoft Clarity project ID — leave '' to skip
};

(function () {
  var IDS = window.LUUP_IDS;
  var LIVE = /(^|\.)luupnow\.ca$/.test(location.hostname);
  window.__LUUP_LIVE_DOMAIN__ = LIVE;

  /* ---------- 1. attribution: first-touch UTM + click IDs ---------------- */
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
              'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id'];
  var STORE = 'luup_attribution';

  function readStored() {
    try { return JSON.parse(sessionStorage.getItem(STORE) || '{}'); } catch (e) { return {}; }
  }
  function buildAttribution() {
    var p = new URLSearchParams(location.search);
    var stored = readStored();
    var fresh = {};
    KEYS.forEach(function (k) { var v = p.get(k); if (v) fresh[k] = v; });
    // First touch wins; a new campaign click overwrites it.
    var attr = Object.keys(fresh).length ? fresh : stored;
    if (!attr.landing_page) attr.landing_page = stored.landing_page || location.pathname;
    if (!attr.first_referrer) attr.first_referrer = stored.first_referrer || document.referrer || 'direct';
    if (!attr.first_seen_at) attr.first_seen_at = stored.first_seen_at || new Date().toISOString();
    try { sessionStorage.setItem(STORE, JSON.stringify(attr)); } catch (e) {}
    return attr;
  }
  var ATTR = buildAttribution();
  window.LUUP_ATTRIBUTION = ATTR;

  /* ---------- 2. GA4 + Google Ads --------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (LIVE && IDS.ga4) {
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(IDS.ga4);
    document.head.appendChild(g);

    gtag('js', new Date());
    gtag('set', ATTR);                       // attribution on every GA4 hit
    gtag('config', IDS.ga4, { send_page_view: true });
    if (IDS.googleAds) gtag('config', IDS.googleAds);
  }

  /* ---------- 3. Meta Pixel --------------------------------------------- */
  if (LIVE && IDS.metaPixel) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', IDS.metaPixel);
    fbq('track', 'PageView');

    var ns = document.createElement('noscript');
    ns.innerHTML = '<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=' +
      encodeURIComponent(IDS.metaPixel) + '&ev=PageView&noscript=1" />';
    document.head.appendChild(ns);
  }

  /* ---------- 4. Mixpanel ----------------------------------------------- */
  if (LIVE && IDS.mixpanel) {
    (function (f, b) {
      if (!b.__SV) {
        var e, g, i, h; window.mixpanel = b; b._i = [];
        b.init = function (e, f, c) {
          function g(a, d) { var b = d.split('.'); 2 == b.length && (a = a[b[0]], d = b[1]);
            a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; }
          var a = b; 'undefined' !== typeof c ? a = b[c] = [] : c = 'mixpanel'; a.people = a.people || [];
          a.toString = function (a) { var d = 'mixpanel'; 'mixpanel' !== c && (d += '.' + c); a || (d += ' (stub)'); return d; };
          a.people.toString = function () { return a.toString(1) + '.people (stub)'; };
          i = 'disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(' ');
          for (h = 0; h < i.length; h++) g(a, i[h]);
          var j = 'set set_once union unset remove delete'.split(' ');
          a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments;
            call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; }
            for (var d = {}, e = ['get_group'].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]);
            return d; };
          b._i.push([e, f, c]);
        };
        b.__SV = 1.2;
        e = f.createElement('script'); e.type = 'text/javascript'; e.async = !0;
        e.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
        g = f.getElementsByTagName('script')[0]; g.parentNode.insertBefore(e, g);
      }
    })(document, window.mixpanel || []);
    mixpanel.init(IDS.mixpanel, { track_pageview: true, persistence: 'localStorage', ignore_dnt: false });
    try { mixpanel.register(ATTR); } catch (e) {}   // attribution on every Mixpanel event
  }

  /* ---------- 5. Optional extras (inert until an ID is filled in) ------- */
  if (LIVE && IDS.linkedIn) {
    window._linkedin_partner_id = IDS.linkedIn;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(IDS.linkedIn);
    var li = document.createElement('script'); li.async = true;
    li.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(li);
  }
  if (LIVE && IDS.tiktok) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = 'page track identify instances debug on off once ready alias group enableCookie disableCookie'.split(' ');
      ttq.setAndDefer = function (a, b) { a[b] = function () { a.push([b].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (a) { for (var b = ttq._i[a] || [], c = 0; c < ttq.methods.length; c++) ttq.setAndDefer(b, ttq.methods[c]); return b; };
      ttq.load = function (e, n) { var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r; ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        var o = d.createElement('script'); o.type = 'text/javascript'; o.async = !0; o.src = r + '?sdkid=' + e + '&lib=' + t;
        var a = d.getElementsByTagName('script')[0]; a.parentNode.insertBefore(o, a); };
      ttq.load(IDS.tiktok); ttq.page();
    }(window, document, 'ttq');
  }
  if (LIVE && IDS.clarity) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', IDS.clarity);
  }

  /* ---------- 6. Unified event fan-out ---------------------------------- */
  // Conversion events that should also fire a Google Ads conversion + Meta Lead.
  var LEAD_EVENTS = ['invite_form_success', 'form_submit_success', 'lead'];

  window.luupTrack = function (name, props) {
    var payload = Object.assign({}, ATTR, props || {}, { timestamp: new Date().toISOString() });
    try { if (typeof window.gtag === 'function') window.gtag('event', name, payload); } catch (e) {}
    try { if (typeof window.fbq === 'function') window.fbq('trackCustom', name, payload); } catch (e) {}
    try { if (window.mixpanel && window.mixpanel.track) window.mixpanel.track(name, payload); } catch (e) {}
    if (LEAD_EVENTS.indexOf(name) !== -1) {
      try { if (typeof window.fbq === 'function') window.fbq('track', 'Lead', payload); } catch (e) {}
      try { if (IDS.googleAdsLead && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: IDS.googleAdsLead });
      } } catch (e) {}
      try { if (window.ttq && window.ttq.track) window.ttq.track('SubmitForm', payload); } catch (e) {}
    }
    if (payload.email) { try { window.luupIdentify(payload.email); } catch (e) {} }
    if (!LIVE) { try { console.debug('[luup:track]', name, payload); } catch (e) {} }
  };

  window.luupIdentify = function (email, traits) {
    if (!email) return;
    try { if (window.mixpanel && window.mixpanel.identify) {
      window.mixpanel.identify(email);
      window.mixpanel.people.set(Object.assign({ $email: email }, ATTR, traits || {}));
    } } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('set', 'user_properties', Object.assign({}, ATTR, traits || {})); } catch (e) {}
  };
})();
