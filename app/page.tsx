import { Nav } from "@/components/sections/Nav";
import { ClientEffects } from "@/components/ClientEffects";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const ACCENT = "#7A5AE0";

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <ClientEffects accent={ACCENT} />

      <main id="main" tabIndex={-1}>
        <Hero accent={ACCENT} />

        <div className="reveal">
          <Services accent={ACCENT} />
        </div>
        <div className="reveal">
          <Products accent={ACCENT} />
        </div>
        <div className="reveal">
          <Process accent={ACCENT} />
        </div>
        <div className="reveal">
          <Stack />
        </div>
        <div className="reveal">
          <FAQ />
        </div>
        {/* Founder section hidden for now — preserve component for later */}
        <div className="reveal">
          <Contact accent={ACCENT} />
        </div>
      </main>

      <Footer />
    </>
  );
}
