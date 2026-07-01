/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           WEDDING DATA — SINGLE SOURCE OF TRUTH              ║
 * ║                                                              ║
 * ║  Edit ONLY this file to customize the entire invitation.     ║
 * ║  Never touch index.html or script.js for content changes.    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const weddingData = {

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⓪  SECTION VISIBILITY
     ─────────────────────────────────────────────────────────────
     Set any section to false to hide it completely.
     The layout reflows automatically — no empty gaps remain.
     You never need to touch index.html just to hide a section.

     Sections:
       hero       → couple photo + names
       quran      → Quran verse
       countdown  → live countdown timer
       details    → venue / date / time / address cards
       location   → map + directions button
       calendar   → add-to-calendar buttons
       rsvp       → RSVP WhatsApp buttons
       blessings  → dua / blessing section
       gallery    → swipe photo carousel
       final      → closing message + WhatsApp share
       footer     → Zawaj brand footer
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  sections: {
    hero:       true,
    quran:      true,
    countdown:  true,
    details:    true,
    location:   true,
    calendar:   true,
    rsvp:       true,
    blessings:  true,
    gallery:    true,
    final:      true,
    footer:     true,
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ①  COUPLE INFORMATION
     Edit bride & groom names and invitation texts here.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  couple: {
    bride: {
      nameAr: 'نور',    // ★ Bride name in Arabic
      nameEn: 'Nour',     // ★ Bride name in English
    },
    groom: {
      nameAr: 'عمر',   // ★ Groom name in Arabic
      nameEn: 'Omar',    // ★ Groom name in English
    },
    bismillah: 'بسم الله الرحمن الرحيم',
    inviteAr:  'يسعدنا دعوتكم لحضور حفل زفافنا',
    inviteEn:  'Together with their families, joyfully invite you to celebrate their wedding',
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ②  EVENT DETAILS
     ★ Change the wedding date in ONE place below.
       All countdown timers, calendar exports, and date displays
       update automatically from event.date.

     Date format:  'Month DD, YYYY HH:MM:SS'
     Example:      'June 20, 2025 20:00:00'
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  event: {
    date:          'July 15, 2026 22:00:00', // ★ THE WEDDING DATE
    durationHours: 4,                          // Event duration for calendar export

    // Display labels — update these to match your date above
    dateDisplayAr:  'السبت، ١٥ يوليو ٢٠٢٦',
    dateDisplayEn:  'Saturday, July 15, 2026',
    dateShort:      ['15', 'July', '2026'],   // Shown as: 15 · July · 2026
    timeAr:         '٨:٠٠ مساءً',
    timeEn:         '8:00 PM',

    // RSVP deadline
    rsvpDeadlineAr: 'العاشر من يوليو ٢٠٢٦',
    rsvpDeadlineEn: 'July 10th',

    // Venue details
    venue: {
      nameAr:      'جراند نايل تاور',                               // ★ Hall name in Arabic
      nameEn:      'Hilton Cairo Grand Nile',                        // ★ Hall name in English
      addressAr:   'كورنيش النيل، جاردن سيتي، جزيرة الروضة ',                        // ★ Address in Arabic
      addressEn:   'King Fahd Road, Riyadh, KSA',                    // ★ Address in English
      mapsLink:    'https://maps.google.com/?q=King+Fahd+Road+Riyadh', // ★ Google Maps URL
      fullLabelAr: 'السبت، ١٥ يوليو ٢٠٢٦ · ٨:٠٠ مساءً · جراند نايل تاور',
    },

    // WhatsApp number for RSVP (international format, no + or spaces)
    rsvpWhatsapp: '+201064623142', // ★ Your WhatsApp number
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ③  QURAN VERSE
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  quran: {
    verseAr:  'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    sourceAr: '— سورة الروم، الآية ٢١ —',
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ④  MEDIA — Opening screen background + couple photo

     ★ OPENING BACKGROUND IMAGE:
         Set openingImage to your filename or a full URL.
         Example:  'cover.jpg'  or  'https://example.com/bg.jpg'

     ★ OPENING BACKGROUND VIDEO:
         Set openingVideo to your filename or URL.
         Example:  'cover.mp4'
         Note: video overrides the image when both are set.

     ★ COUPLE PHOTO (hero section):
         Set couplePhoto to your filename or a full URL.
         Example:  'couple.jpg'  or  'https://example.com/couple.jpg'
         Supported formats: .jpg  .jpeg  .png  .webp

     Leave any field as '' (empty string) to use the default.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  media: {
    openingImage:   '',          // ★ Opening background image
    openingVideo:   'images/opvid.mp4',          // ★ Opening background video (overrides image)
    couplePhoto:    'images/1.jpg',     // ★ Hero section couple photo
    couplePhotoAlt: 'Nour and Omar',
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑤  GALLERY
     ★ Add your photos here. Each entry needs src + alt.
     ★ Works with local files AND full image URLs.
     ★ Leave as empty array [] to show placeholder cards.

     How to add a photo:
       { src: 'images/photo1.jpg',             alt: 'Caption' }
       { src: 'https://example.com/photo.jpg', alt: 'Caption' }

     The carousel grows automatically with every photo you add.
     At least 6 cards are always shown (placeholders fill empty slots).
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  gallery: [
    // Uncomment and fill in your own photos:
     { src: 'images/en1.jpg', alt: 'Nour & Omar — Photo 1' },
     { src: 'images/en2.jpg', alt: 'Nour & Omar — Photo 2' },
     { src: 'images/en3.jpg', alt: 'Nour & Omar — Photo 3' },
     { src: 'images/en4.jpg', alt: 'Nour & Omar — Photo 4' },
     { src: 'images/en5.jpg', alt: 'Nour & Omar — Photo 5' },
     { src: 'images/en6.jpg', alt: 'Nour & Omar — Photo 6' },
  ],

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑥  MUSIC
     ★ Set src to your audio file.
       Supported formats: .mp3  .mp4  .ogg  .wav
       The file must be in the same folder as index.html.

     volume   → 0.0 (silent) to 1.0 (full). Default: 0.75
     fadeInMs → how long the fade-in takes in milliseconds
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  music: {
    src:      'images/Amr Diab - Mayal Mix _ عمرو دياب - ميال ميكس(M4A_128K).m4a', // ★ Your music file
    volume:   0.75,        // Target volume
    fadeInMs: 2200,        // Fade-in duration (ms)
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑦  WHATSAPP SHARING
     Message sent when a guest taps "Share on WhatsApp".
     Leave customMessage empty to use the auto-generated message.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  sharing: {
    customMessage: '', // Leave empty for auto-generated, or write your own
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑧  TEXTS — editable labels and messages
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  texts: {
    // Blessing / dua section
    blessingTitleEn: 'A Blessing For You',
    blessingAr:      'بارك الله لكما وبارك عليكما\nوجمع بينكما في خير',
    blessingEn:      'May Allah bless you both, bless upon you,\nand unite you in all that is good',

    // Final message section
    finalTitleAr:    'يسعدنا حضوركم',
    finalSubtitleEn: 'Your presence is our greatest joy',
    finalMsgAr:      'نتطلع إلى مشاركتكم هذه اللحظة الجميلة\nومعايشتها معكم بكل فرح وسعادة',
    finalMsgEn:      'We look forward to sharing this beautiful moment\nwith you, filled with joy and happiness',
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑨  BRANDING — Zawaj footer
     ★ name      → brand name shown in the footer
     ★ tagline   → subtitle under the brand name
     ★ logo      → logo filename (leave empty to show text only)
     ★ year      → copyright year
     ★ social    → your social media links
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  branding: {
    name:    'Zawaj',                              // ★ Brand name
    tagline: 'Digital Wedding Invitations',        // ★ Tagline
    logo:    '',                                   // ★ Logo file e.g. 'zawaj-logo.svg'
    year:    '2025',
    social: {
      whatsapp:  'https://wa.me/966500000000',     // ★ WhatsApp link
      instagram: 'https://instagram.com/zawaj.sa', // ★ Instagram link
      facebook:  'https://facebook.com/zawaj.sa',  // ★ Facebook link
    },
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑩  SEO & META
     ★ siteUrl → your live website URL
     ★ ogImage → image shown when the link is shared on WhatsApp
                 (recommended size: 1200 × 630 px)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  seo: {
    siteUrl: 'https://yourdomain.com/',             // ★ Live site URL
    ogImage: 'https://yourdomain.com/og-image.jpg', // ★ Sharing preview image
    locale:  'ar_SA',
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⑪  FUTURE SECTIONS (ready to activate when needed)
     Uncomment any block below and add your data.
     script.js will render it automatically.
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  // timeline: [
  //   { date: '2022', titleAr: 'أول لقاء', titleEn: 'First Meeting', descEn: '' },
  //   { date: '2024', titleAr: 'الخطوبة',  titleEn: 'Engagement',    descEn: '' },
  //   { date: '2025', titleAr: 'الزفاف',   titleEn: 'Wedding',       descEn: '' },
  // ],

  // videoGallery: [
  //   { src: 'videos/1.mp4', thumbnail: 'thumbnails/1.jpg', label: 'Engagement Reel' },
  // ],

  // guestMessages: [
  //   { name: 'Guest Name', message: 'Congratulations!' },
  // ],

  // story: {
  //   chapters: [
  //     { titleAr: '', titleEn: '', textAr: '', textEn: '', image: '' },
  //   ],
  // },

  // rsvpForm: {
  //   enabled:  false,
  //   endpoint: '',
  // },

};
