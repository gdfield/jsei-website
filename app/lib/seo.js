// Page metadata helper. Gives every page a canonical URL (so search engines
// treat https://julessteinlabs.org/<path> as the one true address) and full
// link-preview tags for social media, Slack, and email. Child metadata replaces
// the layout's openGraph block wholesale, so this always fills in siteName etc.
export const SITE_URL = 'https://julessteinlabs.org';
export const SITE_NAME = 'Jules Stein Eye Institute, UCLA';
export const DEFAULT_IMAGE = '/images/laboratory-banners/field.jpg';

export function pageMeta({ path, title, description, image = DEFAULT_IMAGE, imageAlt, absoluteTitle = false, noindex = false }) {
  const shareTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [{ url: image, alt: imageAlt || title }],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
