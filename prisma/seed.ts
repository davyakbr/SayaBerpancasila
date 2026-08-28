import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Restoring user exact 12 activities, weekly scores, and reflection...');

  await prisma.activity.deleteMany({});
  await prisma.weeklyScore.deleteMany({});
  await prisma.weeklyReflection.deleteMany({});

  const activities = [
    {
      title: 'Melaksanakan upacara bendera dalam rangka memperingati Hari Kemerdekaan Indonesia yang ke-81',
      date: new Date(1786924800000),
      sila: 3,
      weekNumber: 1,
      imageUrl: '/uploads/doc_1787899164292_2o4fjr.jpeg',
    },
    {
      title: 'Membantu orang tua mencuci piring dan merapikan dapur setelah makan',
      date: new Date(1787011200000),
      sila: 2,
      weekNumber: 1,
      imageUrl: null,
    },
    {
      title: 'Melaksanakan pembiasaan keagamaan dengan membaca al-Quran pada pagi hari',
      date: new Date(1787097600000),
      sila: 1,
      weekNumber: 1,
      imageUrl: null,
    },
    {
      title: 'Kerja kelompok dengan teman teman dan berdiskusi tugas saat Pelajaran Bahasa Indonesi',
      date: new Date(1787184000000),
      sila: 4,
      weekNumber: 1,
      imageUrl: null,
    },
    {
      title: 'Piket mengambil MBG dan membagikannya dengan adil',
      date: new Date(1787270400000),
      sila: 5,
      weekNumber: 1,
      imageUrl: null,
    },
    {
      title: 'Pergi berkumpul dengan teman teman luar sekolah untuk bermain bersama',
      date: new Date(1787356800000),
      sila: 3,
      weekNumber: 1,
      imageUrl: null,
    },
    {
      title: 'Memberikan kursi saat di TransJakarta kepada lansia',
      date: new Date(1787443200000),
      sila: 2,
      weekNumber: 1,
      imageUrl: null,
    },
    {
      title: 'Berpamitan kepada orang tua saat ingin berangkat sekolah',
      date: new Date(1787529600000),
      sila: 2,
      weekNumber: 2,
      imageUrl: null,
    },
    {
      title: 'berkumpul dan makan bersama sama dengan teman selepas pulang dari kerja kelompok',
      date: new Date(1787616000000),
      sila: 2,
      weekNumber: 2,
      imageUrl: null,
    },
    {
      title: 'Kerja kelompok bahasa Indonesia mendiskusikan iklan produk bersama dengan teman teman',
      date: new Date(1787702400000),
      sila: 4,
      weekNumber: 2,
      imageUrl: null,
    },
    {
      title: 'sholat zuhur berjamaah di sekolah dan mendengarkan pembacaan kultum',
      date: new Date(1787788800000),
      sila: 1,
      weekNumber: 2,
      imageUrl: null,
    },
    {
      title: 'Melaksanakan kewajiban sholat jumat di sekolah secara berjamaah',
      date: new Date(1787875200000),
      sila: 1,
      weekNumber: 2,
      imageUrl: null,
    },
  ];

  for (const act of activities) {
    await prisma.activity.create({ data: act });
  }

  // Weekly Scores (Penilaian Diri Mingguan)
  await prisma.weeklyScore.create({
    data: { weekNumber: 1, month: 'Agustus', year: 2026, score: 8.0 },
  });
  await prisma.weeklyScore.create({
    data: { weekNumber: 2, month: 'Agustus', year: 2026, score: 7.0 },
  });

  // Monthly Reflection
  await prisma.weeklyReflection.create({
    data: {
      month: 'Agustus',
      year: 2026,
      averageScore: 8.3,
      reason: 'Saya telah berusaha menerapkan nilai-nilai Pancasila dalam kegiatan harian selama bulan Agustus 2026.',
    },
  });

  console.log('Successfully restored user 12 activities, weekly scores, and monthly reflection!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
