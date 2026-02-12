import Link from "next/link";
import { MdOutlineCloudUpload } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { FaShieldAlt, FaUser, FaUsers } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import Image from "next/image";
import demo from "../assets/img/demo.png";
import { Jost, Geist_Mono } from "next/font/google";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function HomePage() {
  return (
    <div className={`${jost.className} antialiased min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 bg-red-200`}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-28 pb-16 text-center max-w-5xl h-[80vh] relative">
        {/* <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          See Exactly What Changed
          <br />
          <span className="text-blue-600">in Any Document</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Compare privacy policies, contracts, and legal documents instantly. 
          Spot every change with side-by-side highlighting.
        </p> */}

        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 serif">
          Identify Every{" "}
          <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">
            Risk
          </span>
          .
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
          JuxtaDocs bridges the gap between massive legal updates and
          actionable insights with professional-grade redline comparisons.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Link
            href="/compare"
            className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg
                     hover:bg-primary/80 transition-colors shadow-lg hover:shadow-xl"
          >
            Compare Documents Now →
          </Link>
        </div>

        <p className="text-sm text-slate-500">
          Free · No signup · 100% private
        </p>

        {/* Screenshot/Demo placeholder */}
        <div className="mt-16 bg-white rounded-xl shadow-2xl p-6 border border-slate-200 absolute left-1/2 transform -translate-x-1/2 h-auto w-[90%] max-w-5xl">
          <div className="aspect-video bg-linear-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center overflow-hidden relative">
            <Image
              src={demo}
              alt="demo"
              fill
              className="absolute h-full w-full"
            />
          </div>
        </div>
      </section>

      

      {/* Problem Section */}
      <section className="bg-white pt-96 py-16">


      <section id="about-section" className="bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Deep Insights</h2>
            <p className="text-5xl md:text-6xl font-black text-slate-900 serif">Engineered for the <br/>highest stakes.</p>
          </div>
          <p className="text-lg text-slate-500 max-w-sm mb-2">
            Standard text diffs are for code. JuxtaDocs is built for language, nuances, and legal consequences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-50 rounded-[2rem] -rotate-2 -z-10"></div>
            <img 
              src="/doc_image.png" 
              alt="Legal Review" 
              className="rounded-[1.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 serif">The Cost of &quot;Missed Changes&quot;</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                In a recent study, manual document review missed 15% of semantic changes that didn&apos;t use obvious keywords. JuxtaDocs uses a transformer-based model to understand the meaning of clauses, not just the words.
              </p>
            </div>
            
            <div className="grid gap-6">
              {[
                { title: "Risk Mitigation", desc: "Instantly flags changes to indemnity and liability clauses.", icon: <FaShieldAlt size={20} /> },
                { title: "Team Collaboration", desc: "Share redlines with stakeholders in a clean, human-readable format.", icon: <FaUsers size={20} /> }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 text-xl border border-slate-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Built for every legal stakeholder</h3>
          <p className="text-slate-500">From the dorm room to the boardroom.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "General Counsel",
              benefit: "Efficiency",
              desc: "Speed up the 'pre-read' of incoming contracts from vendors by 80%.",
              color: "indigo"
            },
            {
              title: "Entrepreneurs",
              benefit: "Protection",
              desc: "Ensure that VC 'Standard' terms haven't been subtly altered between drafts.",
              color: "slate"
            },
            {
              title: "Law Students",
              benefit: "Learning",
              desc: "Compare how public privacy policies change after major regulations like GDPR.",
              color: "indigo"
            }
          ].map((card, idx) => (
            <div key={idx} className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
              <span className={`inline-block px-3 py-1 rounded-full bg-${card.color}-100 text-${card.color}-700 text-[10px] font-bold uppercase tracking-widest mb-6`}>
                {card.benefit}
              </span>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 serif group-hover:text-indigo-600 transition-colors">{card.title}</h4>
              <p className="text-slate-500 leading-relaxed">{card.desc}</p>
              <div className="mt-8 pt-8 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href="#" className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                  Learn more <i className="fas fa-chevron-right text-xs"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



        {/* <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            The Problem
          </h2>
          <p className="text-lg text-slate-600 mb-4 text-center max-w-2xl mx-auto">
            Companies update their terms of service and privacy policies
            constantly. But spotting what actually changed? Nearly impossible.
          </p>
          <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
            Manually comparing documents wastes hours—and you still miss
            critical changes.
          </p>
        </div> */}
      </section>


      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <span className="text-2xl font-bold text-blue-600">1</span> */}
                <MdOutlineCloudUpload size={30} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Upload or Paste
              </h3>
              <p className="text-slate-600">
                Upload documents (PDF, DOCX, TXT) or paste text directly into
                the tool.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <span className="text-2xl font-bold text-blue-600">2</span> */}
                <GiClick size={30} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Hit Compare
              </h3>
              <p className="text-slate-600">
                Our tool instantly analyzes both documents and highlights every
                change.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <span className="text-2xl font-bold text-blue-600">3</span> */}
                <HiOutlineDocumentDuplicate
                  size={30}
                  className="text-indigo-600"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Review Changes
              </h3>
              <p className="text-slate-600">
                Get a summary of the differences and a redline of the document.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Multi-Format Support
                </h3>
                <p className="text-slate-600">
                  Works with PDF, DOCX, and plain text files up to 5MB.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  100% Private
                </h3>
                <p className="text-slate-600">
                  All processing happens in your browser. Documents never leave
                  your device.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Flexible Views
                </h3>
                <p className="text-slate-600">
                  Toggle between side-by-side and unified diff views.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Instant Results
                </h3>
                <p className="text-slate-600">
                  No waiting, no processing delays. See changes immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Use Cases */}
      {/* <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Perfect For
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                📋 Legal Teams
              </h3>
              <p className="text-slate-600">
                Track vendor agreement updates and policy changes efficiently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                🔒 Privacy Advocates
              </h3>
              <p className="text-slate-600">
                Monitor how companies change their data collection practices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                ✅ Compliance Officers
              </h3>
              <p className="text-slate-600">
                Review policy updates for regulatory compliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                📝 Anyone Comparing Docs
              </h3>
              <p className="text-slate-600">
                From contracts to essays, compare any document versions.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-br rounded-t-4xl from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Compare?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start comparing documents in seconds. No signup, no credit card, no
            catch.
          </p>
          <Link
            href="/compare"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg
                     hover:bg-blue-50 transition-colors shadow-lg"
          >
            Try It Free →
          </Link>
          <p className="text-sm text-blue-200 mt-4">
            Your documents never leave your browser
          </p>
        </div>
      </section>
    </div>
  );
}





