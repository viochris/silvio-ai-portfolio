
export interface Credential {
  id: number;
  title: string;
  issuer: string;
  verifyLink?: string;
}

export const professionalCertifications: Credential[] = [
  { id: 1, title: "Oracle AI Vector Search Certified Professional", issuer: "Oracle" },
  { id: 2, title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional", issuer: "Oracle" },
  { id: 3, title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle" },
  { id: 4, title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional", issuer: "Oracle" },
  { 
    id: 5, 
    title: "IBM Machine Learning Specialization", 
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/specialization/DK8C6XS82OR3"
  },
  { 
    id: 6, 
    title: "Machine Learning Capstone", 
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/QXFB3JTIUYLH"
  },
  { 
    id: 7, 
    title: "Deep Learning and Reinforcement Learning", 
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/YDIXU72KJL9H"
  },
  { 
    id: 8, 
    title: "Statistics for Data Science with Python", 
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/WQD6NXX2GWIX"
  },
  { id: 9, title: "Unsupervised Machine Learning", issuer: "IBM" },
  { id: 10, title: "Supervised Machine Learning: Classification", issuer: "IBM" },
  { id: 11, title: "Supervised Machine Learning: Regression", issuer: "IBM" },
  { id: 12, title: "Exploratory Data Analysis for Machine Learning", issuer: "IBM" },
  { id: 13, title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM" },
  { id: 14, title: "Generative AI: Prompt Engineering Basics", issuer: "IBM" },
  { id: 15, title: "Data Classification and Summarization Using IBM Granite", issuer: "IBM" },
  { id: 16, title: "Code Generation and Optimization Using IBM Granite", issuer: "IBM" },
  { id: 17, title: "Belajar Analisis Data dengan Python", issuer: "Dicoding Indonesia" },
  { id: 18, title: "Financial Literacy 101", issuer: "Dicoding Indonesia" },
  { id: 19, title: "AI Praktis untuk Produktivitas", issuer: "Dicoding Indonesia" },
  { id: 20, title: "Belajar Penggunaan Generative AI", issuer: "Dicoding Indonesia" },
  { id: 21, title: "Belajar Dasar Visualisasi Data", issuer: "Dicoding Indonesia" },
  { id: 22, title: "Belajar Dasar Structured Query Language (SQL)", issuer: "Dicoding Indonesia" },
  { id: 23, title: "Belajar Dasar Data Science", issuer: "Dicoding Indonesia" },
  { id: 24, title: "Belajar Dasar AI", issuer: "Dicoding Indonesia" }
];

export const courseBadges: Credential[] = [
  { 
    id: 1, 
    title: "Machine Learning Capstone", 
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/eb3d66ba-09ef-4ba9-901e-f6f874e220e2/linked_in_profile"
  },
  { 
    id: 2, 
    title: "Deep Learning and Reinforcement Learning", 
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/1f7ef48f-ff97-49d4-94ef-8b842f799e03/linked_in_profile"
  },
  { 
    id: 3, 
    title: "Statistics for Data Science with Python", 
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/e0c61198-b1a6-4c96-a11e-6f74200cf8a9/linked_in_profile"
  },
  { id: 4, title: "Statistics For Data Science", issuer: "Coursera" },
  { id: 5, title: "Unsupervised Machine Learning", issuer: "Coursera" },
  { id: 6, title: "Supervised Machine Learning: Classification", issuer: "Coursera" },
  { id: 7, title: "Supervised Machine Learning: Regression", issuer: "Coursera" },
  { id: 8, title: "Exploratory Data Analysis for Machine Learning", issuer: "Coursera" },
  { id: 9, title: "Artificial Intelligence Essentials V2", issuer: "Coursera" }
];
