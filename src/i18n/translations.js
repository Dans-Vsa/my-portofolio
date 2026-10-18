// UI copy for both languages. Keep keys identical between `en` and `id`.
// Names, schools and tech names stay untranslated.

export const translations = {
  en: {
    languageToggle: 'Language',
    backToHome: 'Back to Homepage',

    home: {
      roles: ['Creative Designer', 'Frontend Developer', 'UI/UX Designer'],
      aboutMe: 'About me',
      contactMe: 'Contact me',
      goTo: 'Go to',
    },

    cards: {
      about: { label: 'About', subtitle: 'Frontend Developer & UI/UX Designer' },
      projects: { label: 'Projects', subtitle: (n) => `${n} featured builds` },
      techStack: { label: 'Tech Stack', subtitle: (n) => `${n} tools & languages` },
      certificates: { label: 'Certificates', subtitle: (n) => `${n} certifications earned` },
      contact: { label: 'Contact', subtitle: "Let's build something together" },
    },

    projects: {
      eyebrow: 'Selected Works',
      title: 'Projects',
      builds: (n) => `${n} builds`,
      viewProject: 'View Project',
      hintDesktop: 'Use arrows or click a card to explore',
      hintMobile: 'Swipe or tap cards to navigate',
      hintEsc: 'Press ESC to go back',
    },

    about: {
      eyebrow: 'About me',
      role: 'Frontend Developer & UI/UX Designer',
      scrollHint: 'Scroll',
      facts: {
        based: 'Based in',
        basedValue: 'Indonesia',
        focus: 'Focus',
        focusValue: 'Frontend & UI/UX',
        status: 'Status',
        statusValue: 'Open to work',
      },
      statementLead: 'Frontend Developer & UI/UX Designer',
      statementRest:
        ', turning creative concepts and user needs into modern, accessible web interfaces that feel obvious.',
      bio: [
        "I'm {fullName} (call me {nickname}). A Frontend Developer and UI/UX Designer with over 2 years of experience creating modern, responsive, user-centered web applications.",
        'My journey started with a fascination for how a good interface can change the way people feel about a product. Today I turn design mockups into pixel-perfect, interactive websites with React, Tailwind CSS and modern frontend tooling.',
        'For me, great design is more than looks. It is smooth functionality, accessibility, and digital journeys that real people can rely on every day.',
      ],
      stats: [
        { value: '30+', label: 'Projects completed' },
        { value: '2+', label: 'Years of experience' },
        { value: '15+', label: 'Happy clients' },
      ],
      servicesTitle: 'What I do',
      services: [
        {
          title: 'Frontend Development',
          desc: 'Responsive, fast interfaces in React and Tailwind CSS, from landing pages to full web apps.',
        },
        {
          title: 'UI/UX Design',
          desc: 'Wireframes, prototypes and design systems in Figma, shaped around how people actually use a product.',
        },
        {
          title: 'Creative Design',
          desc: 'Visual identity, motion and small details that give a product its own character.',
        },
      ],
      toolkitTitle: 'Toolkit',
      categories: {
        Frontend: 'Frontend',
        Language: 'Language',
        Backend: 'Backend',
        Database: 'Database',
        Design: 'Design',
        Tools: 'Tools',
      },
      educationTitle: 'Education',
      education: [
        { title: 'Digital Technology University of Indonesia', desc: 'University' },
      ],
      outroTitle: "Let's build something together.",
      outroBody:
        "When I'm not coding or designing, I'm exploring web trends, experimenting with design systems, or tinkering with open-source ideas.",
      availability: 'Available for freelance projects and full-time roles. Based in Indonesia, working worldwide.',
      downloadCv: 'Download CV (PDF)',
      sayHello: 'Say hello',
    },
  },

  id: {
    languageToggle: 'Bahasa',
    backToHome: 'Kembali ke Beranda',

    home: {
      roles: ['Creative Designer', 'Frontend Developer', 'UI/UX Designer'],
      aboutMe: 'Tentang saya',
      contactMe: 'Hubungi saya',
      goTo: 'Buka',
    },

    cards: {
      about: { label: 'Tentang', subtitle: 'Frontend Developer & UI/UX Designer' },
      projects: { label: 'Proyek', subtitle: (n) => `${n} proyek pilihan` },
      techStack: { label: 'Tech Stack', subtitle: (n) => `${n} tools & bahasa` },
      certificates: { label: 'Sertifikat', subtitle: (n) => `${n} sertifikat diraih` },
      contact: { label: 'Kontak', subtitle: 'Yuk, bangun sesuatu bersama' },
    },

    projects: {
      eyebrow: 'Karya Pilihan',
      title: 'Proyek',
      builds: (n) => `${n} proyek`,
      viewProject: 'Lihat Proyek',
      hintDesktop: 'Gunakan panah atau klik kartu untuk menjelajah',
      hintMobile: 'Geser atau ketuk kartu untuk berpindah',
      hintEsc: 'Tekan ESC untuk kembali',
    },

    about: {
      eyebrow: 'Tentang saya',
      role: 'Frontend Developer & UI/UX Designer',
      scrollHint: 'Gulir',
      facts: {
        based: 'Domisili',
        basedValue: 'Indonesia',
        focus: 'Fokus',
        focusValue: 'Frontend & UI/UX',
        status: 'Status',
        statusValue: 'Terbuka untuk kerja',
      },
      statementLead: 'Frontend Developer & UI/UX Designer',
      statementRest:
        ' yang mengubah ide kreatif dan kebutuhan pengguna menjadi antarmuka web modern, mudah diakses, dan terasa natural.',
      bio: [
        'Saya {fullName} (panggil saja {nickname}). Frontend Developer dan UI/UX Designer dengan pengalaman lebih dari 2 tahun membangun aplikasi web yang modern, responsif, dan berpusat pada pengguna.',
        'Perjalanan saya berawal dari rasa penasaran tentang bagaimana antarmuka yang baik bisa mengubah cara orang merasakan sebuah produk. Sekarang saya mengubah desain mockup menjadi website interaktif yang presisi dengan React, Tailwind CSS, dan tooling frontend modern.',
        'Bagi saya, desain yang hebat bukan sekadar tampilan. Desain yang hebat berarti fungsi yang mulus, aksesibel, dan pengalaman digital yang bisa diandalkan setiap hari.',
      ],
      stats: [
        { value: '30+', label: 'Proyek selesai' },
        { value: '2+', label: 'Tahun pengalaman' },
        { value: '15+', label: 'Klien puas' },
      ],
      servicesTitle: 'Yang saya kerjakan',
      services: [
        {
          title: 'Frontend Development',
          desc: 'Antarmuka yang responsif dan cepat dengan React dan Tailwind CSS, dari landing page sampai aplikasi web utuh.',
        },
        {
          title: 'UI/UX Design',
          desc: 'Wireframe, prototipe, dan design system di Figma yang dirancang sesuai cara orang benar-benar memakai produk.',
        },
        {
          title: 'Creative Design',
          desc: 'Identitas visual, animasi, dan detail kecil yang memberi produk karakternya sendiri.',
        },
      ],
      toolkitTitle: 'Toolkit',
      categories: {
        Frontend: 'Frontend',
        Language: 'Bahasa',
        Backend: 'Backend',
        Database: 'Database',
        Design: 'Desain',
        Tools: 'Tools',
      },
      educationTitle: 'Pendidikan',
      education: [
        { title: 'Universitas Teknologi Digital Indonesia', desc: 'Universitas' },
      ],
      outroTitle: 'Yuk, bangun sesuatu bersama.',
      outroBody:
        'Di luar ngoding dan mendesain, saya suka mengikuti tren web, bereksperimen dengan design system, atau mengulik ide-ide open source.',
      availability: 'Terbuka untuk proyek freelance dan posisi full-time. Berdomisili di Indonesia, siap bekerja dari mana saja.',
      downloadCv: 'Unduh CV (PDF)',
      sayHello: 'Sapa saya',
    },
  },
};
