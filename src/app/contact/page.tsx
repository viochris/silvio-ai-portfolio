"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Copy,
  Check,
  Send,
  Clock,
  HelpCircle,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Chatbot } from '@/components/Chatbot';
import { JakartaClock } from '@/components/JakartaClock';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { KaggleIcon } from '@/components/SocialIcons';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const faqs = [
  {
    question: "What is your primary tech stack?",
    answer:
      "My core stack centers on Python and SQL, paired with TypeScript for full-stack web delivery. For Data Science and Tabular ML, I work with Pandas, NumPy, Scikit-Learn, XGBoost, CatBoost, LightGBM, Optuna, and TensorFlow/Keras, along with LIME and SHAP for explainability and Tableau or Power BI for analytics dashboards. For Generative AI, NLP, and LLMOps, I build with LlamaIndex, LangGraph, CrewAI, LangChain, Google Gemini, Groq, and Hugging Face (SBERT and Cross-Encoder rerankers), backed by ChromaDB Cloud, Neo4j Property Graphs, FAISS, Pinecone, LiteLLM, and Arize Phoenix. On the deployment and persistence side, I use FastAPI, Flask, Express, PostgreSQL (AsyncPG), MySQL, Supabase, Prefect, Docker, Streamlit, Gradio, React, and Next.js.",
  },
  {
    question: "Are you open to freelance, internships, or full-time roles?",
    answer:
      "Yes. I am currently an Informatics Engineering undergraduate (7th Semester) at Universitas Dian Nuswantoro (UDINUS) with a 3.96/4.00 cumulative GPA (through my 6th semester), actively open to internships, freelance engineering contracts, and entry-level full-time roles in AI Engineering, Data Science, NLP/RAG, or Python Backend development. I am open to remote, hybrid, or on-site collaboration and experienced working asynchronously across timezones from Semarang, Indonesia (UTC+7). Across 65+ public GitHub repositories and industry certifications from Oracle (Generative AI, Data Science, and AI Vector Search Professional) and IBM (Machine Learning Specialization), I focus on writing maintainable prototypes and backend services rather than claiming senior enterprise scale I have not yet operated.",
  },
  {
    question: "Can you build custom AI agents for specific business workflows?",
    answer:
      "Yes. Rather than wrapping a single prompt around an API, I design stateful, tool-calling agent architectures suited to concrete workflows. Depending on the task, I build cyclic LangGraph state machines with schema inspection and error self-correction (such as InsightSQL for natural-language-to-SQL), ReAct Pandas analysis agents (InsightData), or multi-node CrewAI pipelines (Auto-README Generator). These workflows can integrate with relational databases (PostgreSQL, MySQL, SQLite), Gmail and Google Calendar APIs, or Telegram bots. Because autonomous tool-calling can still misinterpret edge cases or loop on ambiguous inputs, I always build bounded step limits, schema validation, and explicit execution traces into each agent.",
  },
  {
    question: "How do you mitigate AI hallucinations and protect data privacy?",
    answer:
      "To keep answers grounded, I pair Vector, Graph, and Hybrid RAG pipelines (LlamaIndex with ChromaDB Cloud and Neo4j) with Hugging Face Cross-Encoder reranking, strict source-citation prompts, and step-level observability in Arize Phoenix (OpenTelemetry). For security and data privacy in full-stack and API work (such as Botanica AI and LinkNest), API keys stay strictly on the server behind FastAPI or Express proxies alongside IP rate limiting, MIME/size/schema input validation, DOMPurify HTML sanitization for rendered AI Markdown, and PostgreSQL/Supabase Row-Level Security (RLS). Even with RAG and validation guardrails, LLM outputs are probabilistic and cannot be guaranteed 100% error-free, so I surface source nodes directly and recommend human review for critical decisions.",
  },
  {
    question: "How do you deploy and integrate your AI solutions?",
    answer:
      "I separate core ML/AI logic from user interfaces by exposing inference and agent orchestration through asynchronous FastAPI REST services or Express API proxies documented with OpenAPI/Swagger and containerized with Docker. Depending on end-user needs, those endpoints connect to live Streamlit or Gradio demos, React/Next.js frontends hosted on Vercel, Hugging Face Spaces APIs (such as Resume Scanner API and Maternal Health Risk API), PostgreSQL/Supabase storage, Telegram bots, or scheduled Prefect jobs. Because my portfolio apps run on lightweight cloud tiers, I also implement practical resilience patterns like cascaded Gemini model fallback and token-cost tracking while keeping codebases cleanly modular for production migration.",
  },
  {
    question: "What if a project requires custom data that is not readily available?",
    answer:
      "When ready-made datasets fall short, I build reproducible ingestion and ETL pipelines tailored to the source. Across my repositories, I have integrated REST APIs (NewsAPI, Gmail, Google Calendar), extracted live web content using Trafilatura, parsed YouTube caption streams, chunked long-form text with LlamaIndex SentenceSplitter, and scheduled automated Python and SQLAlchemy jobs using Prefect and PostgreSQL. Before modeling or indexing, I add Pandas and NumPy validation steps to handle missing values, duplicates, and encoding edge cases, while clearly documenting source constraints such as API rate limits or missing transcripts.",
  },
  {
    question: "Can you also handle frontend or prototype UI work?",
    answer:
      "Yes. Although my primary specialization is Data Science, NLP, and AI orchestration backends, I routinely build clean, responsive interfaces so non-technical users can test and adopt AI workflows without touching a terminal. For analytical and ML tools, I ship interactive Streamlit and Gradio dashboards (InsightSQL, SpendSense, InsightData, Maternal Health Risk). For consumer-facing web apps, I build with React 19, Next.js, TypeScript, Tailwind CSS, Recharts, Leaflet, and Express/Supabase (Botanica AI, LinkNest, Hanami, Skycast), combining an AI-assisted Vibe Coding workflow with strict TypeScript checks and browser verification.",
  },
  {
    question: "How do you ensure machine learning models are trustworthy?",
    answer:
      "Trustworthy tabular ML starts long before hyperparameter tuning: I enforce leak-free train/validation/test splits, address class imbalance thoughtfully using Stratified cross-validation and resampling (evaluating precision, recall, F1, and PR curves rather than raw accuracy alone), and benchmark baselines against XGBoost, CatBoost, and LightGBM tuned with Optuna. For production parity, I avoid stateless notebook shortcuts like raw pd.get_dummies() and instead serialize stateful Scikit-Learn pipelines (OneHotEncoder + joblib) so single-row API predictions match training behavior. Finally, I integrate LIME and SHAP explainability tools so stakeholders can inspect feature attributions, while transparently stating dataset boundaries and calibration limitations.",
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const FORMSPREE_ID = "mnjrggbv";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        window.setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        window.setTimeout(() => setCopiedPhone(false), 2000);
      }
      toast({
        title: "Copied to clipboard",
        description: `${text} is ready to paste.`,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setShowSuccessDialog(true);
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to Send Message",
        description: "Could not send your message. Please check your connection or reach out via LinkedIn.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-full overflow-x-clip pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen">
      <section id="contact" className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="space-y-4 text-center">
          <Badge variant="outline" className="text-primary tracking-[0.22em] uppercase px-3.5 border-primary/30 text-[11px]">
            Connect
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-white">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Interested in collaborating or have an AI project in mind? Reach out directly or chat with my portfolio assistant.
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Email</div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-semibold text-white break-all sm:break-normal">
                    viochristian12@gmail.com
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Copy email address"
                    className="h-9 w-9 rounded-lg hover:bg-primary/15 text-primary shrink-0"
                    onClick={() => copyToClipboard('viochristian12@gmail.com', 'email')}
                  >
                    {copiedEmail ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Phone / WhatsApp</div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">
                    +62 895-3426-37871
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Copy phone number"
                      className="h-9 w-9 rounded-lg hover:bg-primary/15 text-primary shrink-0"
                      onClick={() => copyToClipboard('+62895342637871', 'phone')}
                    >
                      {copiedPhone ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-primary/15 text-primary shrink-0"
                      asChild
                    >
                      <a
                        href="https://wa.me/62895342637871"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open WhatsApp chat"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/80 lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-0.5">Location</div>
                <div className="text-sm sm:text-base font-semibold text-white flex flex-wrap items-center gap-x-2">
                  <span>Semarang, Central Java, Indonesia</span>
                  <JakartaClock showSeconds className="text-primary font-mono text-xs sm:text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl px-4 h-10 border-border text-white hover:bg-primary/10" asChild>
              <a href="https://www.linkedin.com/in/silvio-christian-joe" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 w-4 h-4 text-primary" aria-hidden="true" /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl px-4 h-10 border-border text-white hover:bg-primary/10" asChild>
              <a href="https://github.com/viochris" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-4 h-4 text-primary" aria-hidden="true" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl px-4 h-10 border-border text-white hover:bg-primary/10" asChild>
              <a href="https://www.kaggle.com/viochristian" target="_blank" rel="noopener noreferrer">
                <KaggleIcon className="mr-2 w-4 h-4 text-primary" aria-hidden="true" /> Kaggle
              </a>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl px-4 h-10 border-border text-white hover:bg-primary/10" asChild>
              <a href="https://www.instagram.com/silvio.codes?igsh=eTgxcGMybjNiYTlj" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 w-4 h-4 text-primary" aria-hidden="true" /> Instagram
              </a>
            </Button>
          </div>
        </div>

        {/* Inquiry Form + Chatbot */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-card rounded-2xl border border-border/80 flex flex-col h-full overflow-hidden">
            <div className="p-6 sm:p-8 pb-5 sm:pb-6 border-b border-border bg-secondary/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="text-primary w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-headline font-bold text-white uppercase tracking-wider">
                    Send a Message
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    Send a message directly to my email inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1 flex flex-col">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-primary uppercase tracking-wider">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jane Doe"
                            {...field}
                            className="h-11 bg-background border-border rounded-xl focus-visible:ring-primary text-white placeholder:text-zinc-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-primary uppercase tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="jane@company.com"
                            {...field}
                            className="h-11 bg-background border-border rounded-xl focus-visible:ring-primary text-white placeholder:text-zinc-500"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-primary uppercase tracking-wider">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project Inquiry"
                          {...field}
                          className="h-11 bg-background border-border rounded-xl focus-visible:ring-primary text-white placeholder:text-zinc-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel className="text-xs font-bold text-primary uppercase tracking-wider">Message</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea
                          placeholder="Tell me about your project, timeline, or role..."
                          className="min-h-[160px] h-full bg-background border-border rounded-xl focus-visible:ring-primary text-white p-4 placeholder:text-zinc-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl font-headline font-bold uppercase tracking-wider mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <Chatbot />
          </div>
        </div>

        {/* Response Time & FAQ */}
        <div className="space-y-12">
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/25 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="text-primary w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-headline font-bold text-white uppercase tracking-wider">
                Quick Response
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                I typically reply to inquiries within 24 to 48 business hours. For time-sensitive technical consultations, include [URGENT] in your subject line.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2.5">
                <HelpCircle className="text-primary w-6 h-6" aria-hidden="true" />
                <h2 className="text-2xl sm:text-3xl font-headline font-black text-white uppercase tracking-wider">
                  Technical FAQ
                </h2>
              </div>
              <p className="text-zinc-400 text-sm sm:text-base">
                Common questions about my engineering workflow, stack, and availability.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="flex p-5 rounded-xl bg-card border border-border/80 hover:border-primary/40 transition-colors text-left font-bold text-white hover:no-underline [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-primary/40">
                    <span className="text-sm sm:text-base pr-4 font-headline tracking-wide">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="p-5 text-zinc-300 text-sm leading-relaxed bg-card/60 rounded-b-xl border-x border-b border-border/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-border rounded-2xl sm:max-w-md p-8 text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <DialogTitle className="text-2xl font-headline font-black uppercase tracking-tight text-white mb-1">
              Message Sent
            </DialogTitle>
            <DialogDescription className="text-zinc-300 text-sm sm:text-base">
              Your inquiry has been delivered to Silvio&apos;s inbox. Expect a reply within 24 to 48 business hours.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              type="button"
              onClick={() => setShowSuccessDialog(false)}
              className="w-full h-12 rounded-xl font-headline font-bold uppercase tracking-wider"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
