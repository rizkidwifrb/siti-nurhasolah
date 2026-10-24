import portrait from '../assets/images/siti-nurhasolah-portrait.webp'
import seatedPortrait from '../assets/images/activities/hasolah-portrait-seated.webp'
import reportingPhoto from '../assets/images/activities/hasolah-reporting.webp'
import speakingPhoto from '../assets/images/activities/hasolah-speaking-to-audience.webp'
import bestThesisWriterCertificate from '../assets/images/certificates/best-thesis-writer.webp'
import himaKpiMemberCertificate from '../assets/images/certificates/hima-kpi-member.webp'
import talaqqiBersanadCertificate from '../assets/images/certificates/talaqqi-bersanad.webp'
import upgradingCertificate from '../assets/images/certificates/upgrading-2023.webp'
import taarufWawasanCertificate from '../assets/images/certificates/taaruf-wawasan-kebangsaan.webp'
import kelasJurnalistikCertificate from '../assets/images/certificates/kelas-jurnalistik.webp'
import mprFourPillarsCertificate from '../assets/images/certificates/sosialisasi-empat-pilar-mpr-ri.webp'
import eptCertificate from '../assets/images/certificates/english-proficiency-test-ept.webp'
import leadInternshipCertificate from '../assets/images/certificates/lead-field-reporter-internship.webp'
import kpidInternshipCertificate from '../assets/images/certificates/kpid-dki-jakarta-internship.webp'

export const siteProfile = {
  name: 'Siti Nurhasolah',
  title: 'Copywriter, Scriptwriter, and Creative Storyteller',
  alternativeTitle: 'Creative Media Specialist',
  location: 'Bogor, Indonesia',
  email: 'sitinurhasholah@gmail.com',
  instagram: 'nrhashol',
  whatsapp: '+6283896470943',
  whatsappHref: 'https://wa.me/6283896470943',
  instagramHref: 'https://www.instagram.com/nrhashol/',
  portrait: seatedPortrait,
  secondaryPortrait: portrait,
  introduction: 'I shape ideas into clear, thoughtful stories through copy, scripts, and creative media.',
  longIntroduction: 'A Communication and Islamic Broadcasting graduate with interests in copywriting, scriptwriting, journalism, video editing, content development, and media analysis.',
  education: {
    degree: 'Bachelor’s Degree in Communication and Islamic Broadcasting',
    institution: 'Universitas Ibn Khaldun Bogor',
    period: '2022–2026',
  },
}

export const expertise = [
  { title: 'Copywriting', description: 'Writing clear, audience-aware copy for creative communication.' },
  { title: 'Scriptwriting', description: 'Developing stories and structured narratives for moving images.' },
  { title: 'Journalism', description: 'Exploring issues through concise, factual storytelling.' },
  { title: 'Video Editing', description: 'Supporting visual stories with a sense of pace and structure.' },
  { title: 'Content Development', description: 'Turning an idea into content that feels useful and coherent.' },
  { title: 'Media Analysis', description: 'Reading media messages and contexts with care.' },
]

export const activityPhotos = [
  {
    id: 'portrait',
    title: 'Portrait',
    description: 'A personal portrait from Hasolah’s activity documentation.',
    image: seatedPortrait,
    alt: 'Siti Nurhasolah seated in front of a whiteboard.',
  },
  {
    id: 'speaking',
    title: 'Speaking to an audience',
    description: 'Activity documentation featuring Hasolah speaking with a microphone.',
    image: speakingPhoto,
    alt: 'Siti Nurhasolah speaking with a microphone in front of an audience.',
  },
  {
    id: 'reporting',
    title: 'Reporting frame',
    description: 'A reporting frame featuring Siti Nurhasolah outdoors.',
    image: reportingPhoto,
    alt: 'Siti Nurhasolah in an outdoor reporting frame.',
  },
]

export const experiences = [
  {
    id: 1,
    organization: 'KPID DKI Jakarta',
    position: 'Work / internship experience',
    period: '',
    description: 'Listed in Siti’s portfolio materials as a work or internship experience.',
    responsibilities: [],
  },
  {
    id: 2,
    organization: 'Editorial Lead Co.Id',
    position: 'Work / internship experience',
    period: '',
    description: 'Listed in Siti’s portfolio materials as a work or internship experience.',
    responsibilities: [],
  },
]

export const certificateMedia = {
  'Best Thesis Writer': {
    image: bestThesisWriterCertificate,
    alt: 'Certificate recognizing Siti Nurhasolah as the best thesis writer in the Communication and Islamic Broadcasting program.',
  },
  'UPGRADING 2023 Participant': {
    image: upgradingCertificate,
    alt: 'UPGRADING 2023 participant certificate for Siti Nurhasolah.',
  },
  'HIMA KPI Member, 2024–2025': {
    image: himaKpiMemberCertificate,
    alt: 'Certificate recognizing Siti Nurhasolah as a HIMA KPI member for the 2024–2025 term.',
  },
  'Daura Makhariijul Huruf & Talaqqi Bersanad': {
    image: talaqqiBersanadCertificate,
    alt: 'Certificate for Siti Nurhasolah’s participation in Daura Makhariijul Huruf and Talaqqi Bersanad.',
  },
  'Ta’aruf & Wawasan Kebangsaan': {
    image: taarufWawasanCertificate,
    alt: 'Universitas Ibn Khaldun Bogor certificate for Ta’aruf and Wawasan Kebangsaan in the 2022/2023 academic year.',
  },
  'Journalism Class Participant': {
    image: kelasJurnalistikCertificate,
    alt: 'Certificate for Siti Nurhasolah’s participation in the Journalism Class organized by HIMA KPI at Universitas Ibn Khaldun Bogor.',
  },
  'Sosialisasi Empat Pilar MPR RI': {
    image: mprFourPillarsCertificate,
    alt: 'MPR RI certificate for participation in the Sosialisasi Empat Pilar event at Gedung DPR/MPR RI.',
  },
  'English Proficiency Test (EPT)': {
    image: eptCertificate,
    alt: 'Universitas Ibn Khaldun Bogor English Proficiency Test certificate with a total score of 450.',
  },
  'LEAD.co.id Field Reporter Internship': {
    image: leadInternshipCertificate,
    alt: 'LEAD.co.id certificate of thanks for Siti Nurhasolah’s field reporter student internship.',
  },
  'KPID DKI Jakarta Internship': {
    image: kpidInternshipCertificate,
    alt: 'Certificate confirming Siti Nurhasolah completed an internship at KPID DKI Jakarta with a good evaluation.',
  },
}

// Three supplied photos matched existing portfolio records and are intentionally not duplicated.
export const certificates = [
  { id: 9, title: 'English Proficiency Test (EPT)', issuer: 'Universitas Ibn Khaldun Bogor', issueDate: '2026-04-30', detail: 'Total score: 450', credentialUrl: '', ...certificateMedia['English Proficiency Test (EPT)'] },
  { id: 2, title: 'Best Thesis Writer', issuer: 'Faculty of Islamic Studies, Universitas Ibn Khaldun Bogor', issueDate: '2026-07-25', credentialUrl: '', ...certificateMedia['Best Thesis Writer'] },
  { id: 11, title: 'KPID DKI Jakarta Internship', issuer: 'Komisi Penyiaran Indonesia Daerah Provinsi DKI Jakarta', issueDate: '2025-12-18', detail: 'Internship period: October–December 2025. Evaluation: Baik.', credentialUrl: '', ...certificateMedia['KPID DKI Jakarta Internship'] },
  { id: 4, title: 'HIMA KPI Member, 2024–2025', issuer: 'HIMA KPI, Universitas Ibn Khaldun Bogor', issueDate: '2024–2025', credentialUrl: '', ...certificateMedia['HIMA KPI Member, 2024–2025'] },
  { id: 10, title: 'LEAD.co.id Field Reporter Internship', issuer: 'LEAD.co.id', issueDate: '14 Oct–17 Nov 2024', detail: 'Internship role: Field Reporter.', credentialUrl: '', ...certificateMedia['LEAD.co.id Field Reporter Internship'] },
  { id: 8, title: 'Sosialisasi Empat Pilar MPR RI', issuer: 'Majelis Permusyawaratan Rakyat Republik Indonesia', issueDate: '2023-11-19', detail: 'Held at Gedung DPR/MPR RI.', credentialUrl: '', ...certificateMedia['Sosialisasi Empat Pilar MPR RI'] },
  { id: 5, title: 'Daura Makhariijul Huruf & Talaqqi Bersanad', issuer: 'Rumah Qur’an Shofia by GIM', issueDate: '2023-10-28', credentialUrl: '', ...certificateMedia['Daura Makhariijul Huruf & Talaqqi Bersanad'] },
  { id: 3, title: 'UPGRADING 2023 Participant', issuer: 'HIMA Pro-KPI', issueDate: '2023-07-27', credentialUrl: '', ...certificateMedia['UPGRADING 2023 Participant'] },
  { id: 6, title: 'Ta’aruf & Wawasan Kebangsaan', issuer: 'Universitas Ibn Khaldun Bogor', issueDate: '2022-09-17', detail: 'Event held on 7–8 September 2022.', credentialUrl: '', ...certificateMedia['Ta’aruf & Wawasan Kebangsaan'] },
  { id: 7, title: 'Journalism Class Participant', issuer: 'HIMA KPI, Universitas Ibn Khaldun Bogor', issueDate: '', detail: 'Organized by the Department of Interest & Talent.', credentialUrl: '', ...certificateMedia['Journalism Class Participant'] },
]

export const projects = [
  {
    id: 1,
    title: 'Panggung Sekolah Bukan Tempat Luka',
    slug: 'panggung-sekolah-bukan-tempat-luka',
    category: 'Scriptwriting',
    categories: ['Scriptwriting', 'Creative Content'],
    year: '2025',
    shortDescription: 'A short-film project supporting an anti-bullying education program for students.',
    overview: '“Panggung Sekolah Bukan Tempat Luka” is a short film about bullying published by KKN “AfterOne” 2025. The film was shown as part of an anti-bullying education program at SMP Al Alawiyah in Bogor.',
    context: 'The project connected creative media with a school-focused anti-bullying education activity.',
    objective: 'Encourage audiences to reflect on the impact of bullying through a short narrative format.',
    targetAudience: 'Students and the wider school community.',
    role: '',
    duration: '',
    client: 'KKN “AfterOne” 2025',
    tools: [],
    processSteps: [],
    results: 'Local coverage reported that the screening supported the program’s anti-bullying message and prompted reflection among attendees.',
    reflection: '',
    coverImage: '',
    thumbnailPath: '',
    videoUrl: 'https://www.youtube-nocookie.com/embed/jqs2OhI4-ps',
    videoWatchUrl: 'https://youtu.be/jqs2OhI4-ps',
    sourceUrl: 'https://jurnalbogor.com/membuat-short-movie-anti-bullying-kkn-tematik-uika-pecahkan-tangis-haru-siswa-al-alawiyah/',
    documentUrl: '',
    isFeatured: true,
    isPublished: true,
    publishedAt: '2025-08-06',
  },
]

export const processSteps = [
  { number: '01', title: 'Discover', description: 'Start with the message, audience, and context.' },
  { number: '02', title: 'Research', description: 'Find the details that make a story feel grounded.' },
  { number: '03', title: 'Create', description: 'Shape the idea into a clear creative direction.' },
  { number: '04', title: 'Refine', description: 'Edit for focus, flow, and the intended impact.' },
]

export const coreValues = [
  { title: 'Creative', description: 'Approaching ideas with curiosity and a willingness to find an original angle.' },
  { title: 'Communicative', description: 'Keeping communication clear, respectful, and easy to follow.' },
  { title: 'Collaborative', description: 'Working with others to turn a shared brief into a thoughtful result.' },
]
