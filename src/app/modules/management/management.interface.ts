export type TManagement = {
  aboutPage?: {
    title: string;
    description: string;
    video: string;
    signatureImage: string;
    btnLink: string;
  };
  faqPage?: {
    faq: {
      question: string;
      answer: string;
    }[];
  };
  contactUsPage?: {
    title: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    time: string;
  };
};
