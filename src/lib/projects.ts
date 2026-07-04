export type SelectedProject = {
  title: string;
  client: string;
  year: string;
  category: string;
  href?: string;
};

export const selectedProjects: SelectedProject[] = [
  {
    title: "Aplikasi AIDS Digital",
    client: "Kementerian Kesehatan RI",
    year: "2014",
    category: "Pemerintah — Kesehatan",
    href: "/work/kemenkes-aids-digital",
  },
  {
    title: "Voting Digital",
    client: "Jaringan GWL-INA",
    year: "2012",
    category: "NGO — Advokasi",
    href: "/work/gwl-ina-voting",
  },
  {
    title: "Website & Sistem Informasi Kesehatan",
    client: "Indonesian AIDS Coalition (IAC)",
    year: "[KONFIRMASI BANI]",
    category: "NGO — Kesehatan",
  },
  {
    title: "Website & Konten Kesehatan",
    client: "Baby Jim Aditya",
    year: "2012–Sekarang",
    category: "Individu — Kesehatan Reproduksi",
  },
  {
    title: "Digitalisasi Bisnis",
    client: "Teras Digital Tech",
    year: "[KONFIRMASI BANI]",
    category: "Agency — Transformasi Digital",
  },
  {
    title: "Media Campaign",
    client: "Homeless World Cup, Mexico",
    year: "[KONFIRMASI BANI]",
    category: "Internasional — Media Kampanye",
  },
];
