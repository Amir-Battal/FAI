export default function ContactSection() {
  return (
    <section className="w-full relative min-h-screen bg-black text-white overflow-hidden font-[Dahlia]">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full border border-white/20" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-24 min-h-screen flex flex-col justify-center">

          <h2 className="mt-6 text-3xl md:text-8xl font-light leading-none">
            Let’s Create
            <br />
            Something Beautiful
          </h2>

          <p className="lg:mt-10 md:mt-10 sm:mt-5 mt-4 max-w-2xl text-lg text-white/70 leading-relaxed tracking-wide">
            Whether you have a question about our products, collaborations,
            wholesale opportunities, or simply want to say hello, we would love
            to hear from you.
          </p>

        <div className="lg:mt-16 md:mt-16 sm:mt-10 mt-8 grid md:grid-cols-2 lg:gap-16 md:gap-16">
          {/* Left */}
          <div className="lg:space-y-2 md:space-y-2 sm:space-y-6 space-y-8 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 grid-cols-2">
            <div>
              <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
                Email
              </p>

              <a
                href="mailto:contact@amirbattal.com"
                className="text-xl md:text-3xl hover:opacity-70 transition"
              >
                info@fai.com
              </a>
            </div>

            <div>
              <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
                Phone
              </p>

              <a
                href="tel:+963938973948"
                className="text-xl md:text-3xl hover:opacity-70 transition"
              >
                +965 9888 3777
              </a>
            </div>

            <div>
              <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
                Instagram
              </p>

              <a
                href="#"
                className="text-xl md:text-3xl hover:opacity-70 transition"
              >
                @FAI_COSMETICS
              </a>
            </div>

            <div>
              <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
                Address
              </p>

              <a
                href="#"
                className="text-xl md:text-3xl hover:opacity-70 transition"
              >
                Kuwait
              </a>
            </div>
          </div>

          {/* Right */}
          <form className="lg:space-y-6 md:space-y-6 sm:space-y-3 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none placeholder:text-white/30"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none placeholder:text-white/30"
            />

            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full lg:h-auto md:h-auto sm:h-[20%] h-[20%] bg-transparent border-b border-white/20 lg:py-4 md:py-4 outline-none resize-none placeholder:text-white/30"
            />

            <button
              type="submit"
              className="lg:mt-6 md:mt-6 mt-3 border border-white lg:px-8 md:px-8 px-4 lg:py-4 md:py-4 py-2 uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all" >
              Send Message
            </button>
          </form>
        </div>

        <div className="lg:mt-4 md:mt-4 pt-8  border-t border-white/10 flex flex-col flex-row justify-between gap-4 text-white/40 text-sm">
          <span><a href="https://amirbattal.com" target="_bank">© 2026 Amir Battal</a></span>
          <span>Creative Coder</span>
        </div>
      </div>
    </section>
  );
}