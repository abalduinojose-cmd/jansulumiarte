import { faq, faqCompleto } from "@/content/faq";
import { SITE_URL, site } from "@/content/site";
import { semMarcador } from "@/lib/marcador";

/**
 * JSON-LD LocalBusiness. SEM aggregateRating de propósito: avaliação do
 * próprio negócio marcada no próprio site é "self-serving" para
 * LocalBusiness, não gera rich result e pode render ação manual. A nota
 * aparece só na tela, sempre com o volume, e com link para o perfil.
 */
export function schemaNegocio() {
  const { endereco, geo } = site;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#jansu-lumiarte`,
    name: site.nome,
    alternateName: site.nomeCurto,
    slogan: site.slogan,
    description: site.descricao,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/marca/logo-marrom.webp`,
    telephone: site.whatsapp,
    address: {
      "@type": "PostalAddress",
      streetAddress: endereco.rua,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    ],
    areaServed: [
      { "@type": "City", name: "Teresópolis" },
      { "@type": "City", name: "Petrópolis" },
      { "@type": "City", name: "Nova Friburgo" },
      { "@type": "AdministrativeArea", name: "Região Serrana do Rio de Janeiro" },
    ],
    sameAs: [site.instagram, site.google],
  };
}

/** Só existe depois que as respostas reais chegarem (§7). */
export function schemaFaq() {
  if (!faqCompleto) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: semMarcador(f.resposta) },
    })),
  };
}
