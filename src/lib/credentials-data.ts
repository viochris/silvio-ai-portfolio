export interface Credential {
  id: number;
  title: string;
  issuer: string;
  verifyLink?: string;
}

export interface IntellectualPropertyRecord {
  title: string;
  shortTitle: string;
  regNumber: string;
  publishedDate: string;
  issuer: string;
  role: string;
  fieldValidation: string;
  summary: string;
  certificateUrl: string;
  githubUrl: string;
  flaskRepoUrl: string;
  apiUrl: string;
  tech: string[];
}

export const registeredCopyright: IntellectualPropertyRecord = {
  title: "StuntiFy — Toddler Stunting Detection Application",
  shortTitle: "StuntiFy (Registered Copyright)",
  regNumber: "001072491",
  publishedDate: "December 2025",
  issuer: "Registered Intellectual Property · Copyright",
  role: "Co-Creator & ML API Engineer",
  fieldValidation: "Community Health Post Field Trial",
  summary:
    "Co-creator of StuntiFy, a toddler stunting detection application officially registered under copyright No. 001072491 (first published December 2025). Volunteered at a local community health post and validated the system using real child anthropometric data collected on-site.",
  certificateUrl:
    "https://drive.google.com/file/d/1Zsa2xKClU8iNys6snr1Kuuk8nJT2i_wn/view?usp=sharing",
  githubUrl: "https://github.com/viochris/Stuntify-API",
  flaskRepoUrl: "https://github.com/viochris/API-Stuntify",
  apiUrl: "https://silvio0-stunting-api.hf.space/docs",
  tech: ["FastAPI", "Scikit-Learn", "Docker", "Flask", "Community Health Field Data"],
};

export const professionalCertifications: Credential[] = [
  {
    id: 1,
    title: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle",
    verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4813172AB028B1405B6E5A45DB8E4BE52AD4CE92F78A90BAE7FDFD4F43D6C909",
  },
  {
    id: 2,
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=40E9CE3B4043AABCE1D5A50A49B186938C1CA875CE938837F73EAA2D40B3FE4F",
  },
  {
    id: 3,
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    verifyLink: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2B33EA8062DFC9C8C1FE58518F6E32D13E126A9A8F2482ADFACAA2B47FB491AA",
  },
  {
    id: 4,
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle",
    verifyLink: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=50CEB7D6BF8197A8FA3F0E350EAC9B23927763A843112293AE7418E973E631F1",
  },
  {
    id: 5,
    title: "IBM AI Engineering Specialization",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/specialization/0D8CAA60XAH3",
  },
  {
    id: 6,
    title: "AI Capstone Project with Deep Learning",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/7D4ET6R0Z4J7",
  },
  {
    id: 7,
    title: "Introduction to Neural Networks and PyTorch",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/3ENNP9FZK54R",
  },
  {
    id: 8,
    title: "Deep Learning with PyTorch",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/37MT4Q559CL3",
  },
  {
    id: 9,
    title: "Deep Learning with Keras and Tensorflow",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/TPMZLDDCTVYD",
  },
  {
    id: 10,
    title: "Introduction to Deep Learning & Neural Networks with Keras",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/LQLHL5E5R5FL",
  },
  {
    id: 11,
    title: "Machine Learning with Python",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/ZG6E97ZSNS7L",
  },
  {
    id: 12,
    title: "IBM Machine Learning Specialization",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/specialization/DK8C6XS82OR3",
  },
  {
    id: 13,
    title: "Machine Learning Capstone",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/QXFB3JTIUYLH",
  },
  {
    id: 14,
    title: "Deep Learning and Reinforcement Learning",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/YDIXU72KJL9H",
  },
  {
    id: 15,
    title: "Statistics for Data Science with Python",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/WQD6NXX2GWIX",
  },
  {
    id: 16,
    title: "Unsupervised Machine Learning",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/36LJDSZ80XV8",
  },
  {
    id: 17,
    title: "Supervised Machine Learning: Classification",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/FGHZW5XFQYYJ",
  },
  {
    id: 18,
    title: "Supervised Machine Learning: Regression",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/SG67ZVWKQVFE",
  },
  {
    id: 19,
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/CHXNLBSONSQX",
  },
  {
    id: 20,
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/records/X35FDFRT69A9",
  },
  {
    id: 21,
    title: "Generative AI: Prompt Engineering Basics",
    issuer: "IBM",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/KK8QSSBWX0BO",
  },
  {
    id: 22,
    title: "Data Analysis with Python",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/MRZME711KPYQ",
  },
  {
    id: 23,
    title: "Financial Literacy 101",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/4EXG3VD1QZRL",
  },
  {
    id: 24,
    title: "Practical AI for Productivity",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/4EXGVW86DXRL",
  },
  {
    id: 25,
    title: "Generative AI Usage Fundamentals",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/07Z632M52ZQR",
  },
  {
    id: 26,
    title: "Data Visualization Fundamentals",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/NVP77328RPR0",
  },
  {
    id: 27,
    title: "Structured Query Language (SQL) Fundamentals",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/2VX35VJQJPYQ",
  },
  {
    id: 28,
    title: "Data Science Fundamentals",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/N9ZO206KRPG5",
  },
  {
    id: 29,
    title: "Artificial Intelligence Fundamentals",
    issuer: "Dicoding",
    verifyLink: "https://www.dicoding.com/certificates/4EXG3JN2QZRL",
  },
];

export const courseBadges: Credential[] = [
  {
    id: 1,
    title: "IBM AI Engineering Professional Certificate (V3)",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/e578830b-fa26-41a9-af5a-8e51fcec2601/linked_in_profile",
  },
  {
    id: 2,
    title: "Generative AI Applications Specialist",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/85383515-e277-4d58-8538-18ae762318d1/linked_in_profile",
  },
  {
    id: 3,
    title: "AI Capstone Project with Deep Learning",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/31ef5702-0fb8-4964-ad92-56712d3b2911/linked_in_profile",
  },
  {
    id: 4,
    title: "Deep Learning with PyTorch",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/444f8a5f-d64a-4fd4-a71d-9e57fd05fac5/linked_in_profile",
  },
  {
    id: 5,
    title: "Advanced Deep Learning Specialist",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/65aaaf22-51cf-4fd8-9940-ec0d1497e532/linked_in_profile",
  },
  {
    id: 6,
    title: "Generative AI Advanced Fine-Tuning for LLMs",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/c8d2893d-efdc-485b-8e90-4d03ac67ca7/linked_in_profile",
  },
  {
    id: 7,
    title: "AI Agents Using RAG and LangChain",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/ff8d9261-c7cf-47d1-b6ea-c9db319968f2/linked_in_profile",
  },
  {
    id: 8,
    title: "Generative AI Engineering with Transformers & LLMs",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/2b657ae2-0240-49ee-a8df-c65c020c85a2/linked_in_profile",
  },
  {
    id: 9,
    title: "Generative AI Language Modeling with Transformers",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/92639cea-cbab-45f8-a6ae-a2838fa1abe9/linked_in_profile",
  },
  {
    id: 10,
    title: "Generative AI Foundational Models for NLP & Language Understanding",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/2cfb271a-429d-4afe-8064-3da03cfcb6cd/linked_in_profile",
  },
  {
    id: 11,
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/ccc55811-c4f9-4cae-98b1-239ef782eb3b/linked_in_profile",
  },
  {
    id: 12,
    title: "Introduction to Neural Networks with PyTorch",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/514aeaeb-6309-4064-a59b-95c4335a8c43/linked_in_profile",
  },
  {
    id: 13,
    title: "Machine Learning with Python (V2)",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/520fe5ca-2de9-485c-a6d8-c44eafe70c36/linked_in_profile",
  },
  {
    id: 14,
    title: "Deep Learning Essentials with Keras",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/794d807d-6f58-42ec-8825-7a86dcd7b096/linked_in_profile",
  },
  {
    id: 15,
    title: "Machine Learning Capstone",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/eb3d66ba-09ef-4ba9-901e-f6f874e220e2/linked_in_profile",
  },
  {
    id: 16,
    title: "Deep Learning and Reinforcement Learning",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/1f7ef48f-ff97-49d4-94ef-8b842f799e03/linked_in_profile",
  },
  {
    id: 17,
    title: "Statistics for Data Science with Python",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/e0c61198-b1a6-4c96-a11e-6f74200cf8a9/linked_in_profile",
  },
  {
    id: 18,
    title: "Statistics For Data Science",
    issuer: "Coursera",
    verifyLink: "https://www.coursera.org/account/accomplishments/verify/8TEGU9ITGUC8",
  },
  {
    id: 19,
    title: "Unsupervised Machine Learning",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/f1549127-1061-446e-a8ea-1b743cc979c4/linked_in_profile",
  },
  {
    id: 20,
    title: "Supervised Machine Learning: Classification",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/343d6609-0801-4ef8-84dd-e09c025d2e1b/linked_in_profile",
  },
  {
    id: 21,
    title: "Supervised Machine Learning: Regression",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/81c7e2e0-b3a9-4dc9-80c7-635174da5796/linked_in_profile",
  },
  {
    id: 22,
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/ffb7570b-bb3c-4b25-ac7f-306dba54de69/linked_in_profile",
  },
  {
    id: 23,
    title: "Artificial Intelligence Essentials V2",
    issuer: "Coursera",
    verifyLink: "https://www.credly.com/badges/efc55311-86a6-415a-afb6-e00a8a051aa0/linked_in_profile",
  },
  {
    id: 24,
    title: "Data Classification and Summarization Using IBM Granite",
    issuer: "IBM",
    verifyLink: "https://www.credly.com/badges/1cbf6431-f4e9-4ab6-8af5-fb42dcbcd43f/linked_in_profile",
  },
  {
    id: 25,
    title: "Code Generation and Optimization Using IBM Granite",
    issuer: "IBM",
    verifyLink: "https://www.credly.com/badges/85551651-e483-41e7-8395-f0b63f41f5c4/linked_in_profile",
  },
];
