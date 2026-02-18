import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="/"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-lg transform group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-slate-900 font-bold text-lg">
                  J
                </div>
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight serif">
                Juxta<span className="text-indigo-600">Docs</span>
              </span>
            </Link>
            {/* <p className="text-sm">Built by [Your Name] - Frontend Engineer + Law Graduate</p> */}
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
          <p>
            All processing happens in your browser. Your documents are never
            uploaded to any server.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
