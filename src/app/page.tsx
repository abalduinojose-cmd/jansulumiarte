import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Contato } from "@/components/sections/Contato";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { Materiais } from "@/components/sections/Materiais";
import { Oferta } from "@/components/sections/Oferta";
import { Personalizacao } from "@/components/sections/Personalizacao";
import { Portfolio } from "@/components/sections/Portfolio";
import { Processo } from "@/components/sections/Processo";
import { Projetos } from "@/components/sections/Projetos";
import { Sobre } from "@/components/sections/Sobre";
import { TrustBar } from "@/components/sections/TrustBar";
import { Silhueta } from "@/components/ui/Silhueta";
import { WhatsappFloat } from "@/components/ui/WhatsappFloat";

/**
 * Ritmo da Celebrare / Cabana Afrodite com a marca da JanSu: noite e creme
 * se alternam, costurados pela silhueta da plaina; as faixas escuras do
 * meio são cartões arredondados dentro do creme. Ordem do briefing (§6) e
 * toda seção termina num caminho para o WhatsApp.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustBar />
        <Silhueta de="noite" para="creme" />
        <Oferta />
        <Projetos />

        <Silhueta de="creme" para="noite" espelhar />
        <Personalizacao />
        <Silhueta de="noite" para="creme" />

        <Materiais />
        <Processo />
        <Portfolio />
        <Instagram />
        <Sobre />
        <Depoimentos />
        <Faq />
        <Contato />
        <Silhueta de="creme" para="noite" espelhar />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
