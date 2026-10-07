import { site } from "@/config/site";

/**
 * Structured data for rich results.
 *
 * Three graphs are emitted:
 *  - Person       → powers the knowledge panel / "about the author" box
 *  - WebSite      → enables the sitelinks search box and site name in SERPs
 *  - ProfilePage  → tells Google this page is about a single individual
 *
 * Validate changes at https://search.google.com/test/rich-results
 */
export function JsonLd() {
  const personId = `${site.url}/#person`;
  const siteId = `${site.url}/#website`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    givenName: site.firstName,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    description: site.tagline,
    image: `${site.url}${site.heroPhoto}`,
    sameAs: site.socials
      .filter((s) => !s.url.startsWith("mailto:"))
      .map((s) => s.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
    knowsAbout: site.skills.flatMap((group) => [...group.items]),
    worksFor: site.experience[0]
      ? {
          "@type": "Organization",
          name: site.experience[0].company,
        }
      : undefined,
    alumniOf: site.experience.slice(1).map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": siteId,
    url: site.url,
    name: site.seo.title,
    description: site.seo.description,
    inLanguage: site.seo.lang,
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${site.url}/#profilepage`,
    url: site.url,
    name: site.seo.title,
    isPartOf: { "@id": siteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
    inLanguage: site.seo.lang,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is built from local config only — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
