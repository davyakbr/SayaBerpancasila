import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial Pancasila activities data...');

  await prisma.activity.deleteMany({});
  await prisma.weeklyScore.deleteMany({});
  await prisma.weeklyReflection.deleteMany({});

  // Week 1 Activities (17 - 23 Agustus 2026)
  const week1Activities = [
    {
      title: 'Melaksanakan upacara bendera dalam rangka memperingati Hari Kemerdekaan Indonesia yang ke-81',
      date: new Date('2026-08-17T07:00:00.000Z'),
      sila: 3,
      weekNumber: 1,
      imageUrl: '/images/seed/act_upacara.jpg',
    },
    {
      title: 'Membantu orang tua mencuci piring dan merapikan dapur setelah makan',
      date: new Date('2026-08-18T18:30:00.000Z'),
      sila: 2,
      weekNumber: 1,
      imageUrl: '/images/seed/act_cuci_piring.jpg',
    },
    {
      title: 'Membaca Al-Qur\'an pagi hari dan berdoa sebelum memulai pelajaran',
      date: new Date('2026-08-19T06:15:00.000Z'),
      sila: 1,
      weekNumber: 1,
      imageUrl: '/images/seed/act_ngaji.jpg',
    },
    {
      title: 'Bermusyawarah dengan kelompok belajar mengenai penyelesaian tugas proyek',
      date: new Date('2026-08-20T13:30:00.000Z'),
      sila: 4,
      weekNumber: 1,
      imageUrl: '/images/seed/act_diskusi.jpg',
    },
    {
      title: 'Membagikan makanan MBG dengan teman sekelas secara adil tanpa membeda-bedakan',
      date: new Date('2026-08-21T12:00:00.000Z'),
      sila: 5,
      weekNumber: 1,
      imageUrl: '/images/seed/act_mbg.jpg',
    },
    {
      title: 'Berkumpul dan bermain bersama teman-teman sekolah dengan rukun',
      date: new Date('2026-08-22T16:00:00.000Z'),
      sila: 3,
      weekNumber: 1,
      imageUrl: '/images/seed/act_bermain.jpg',
    },
    {
      title: 'Memberikan kursi kepada lansia di bus TransJakarta',
      date: new Date('2026-08-23T15:20:00.000Z'),
      sila: 2,
      weekNumber: 1,
      imageUrl: '/images/seed/act_transjakarta.jpg',
    },
  ];

  // Week 2 Activities (24 - 30 Agustus 2026)
  const week2Activities = [
    {
      title: 'Mengikuti sholat berjamaah di musholla sekolah dengan khusyuk',
      date: new Date('2026-08-24T12:15:00.000Z'),
      sila: 1,
      weekNumber: 2,
      imageUrl: '/images/seed/act_ngaji.jpg',
    },
    {
      title: 'Membantu menyeberangkan jalan seorang anak sekolah di depan gerbang',
      date: new Date('2026-08-25T06:45:00.000Z'),
      sila: 2,
      weekNumber: 2,
      imageUrl: '/images/seed/act_cuci_piring.jpg',
    },
    {
      title: 'Piket kebersihan bersama merapikan dan menyapu ruang kelas XII PPLG',
      date: new Date('2026-08-26T15:00:00.000Z'),
      sila: 3,
      weekNumber: 2,
      imageUrl: '/images/seed/act_upacara.jpg',
    },
  ];

  for (const act of [...week1Activities, ...week2Activities]) {
    await prisma.activity.create({ data: act });
  }

  // Weekly Scores (Penilaian Diri Mingguan 1-10)
  await prisma.weeklyScore.create({
    data: { weekNumber: 1, month: 'Agustus', year: 2026, score: 8.0 },
  });
  await prisma.weeklyScore.create({
    data: { weekNumber: 2, month: 'Agustus', year: 2026, score: 8.5 },
  });

  // Monthly Reflection Text (Refleksi Bulanan)
  await prisma.weeklyReflection.create({
    data: {
      month: 'Agustus',
      year: 2026,
      averageScore: 8.3,
      reason: 'Saya telah berusaha menjalankan kegiatan positif seperti mengerjakan PR tepat waktu, beribadah, dan menjaga kebersihan kelas, tapi di pertengahan minggu sempat malas dan belum maksimal dalam membantu pekerjaan di rumah.',
    },
  });

  console.log('Successfully seeded activities, weekly scores, and monthly reflection!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
