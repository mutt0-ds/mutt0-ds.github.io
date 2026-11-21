export const SITE_NAME = 'mutto.fyi';
export const SITE_URL = 'https://mutto.fyi/';

export const author = {
  '@type': 'Person',
  '@id': `${SITE_URL}#person`,
  name: 'Davide Muttoni',
  url: SITE_URL,
  sameAs: ['https://github.com/mutt0-ds', 'https://www.linkedin.com/in/davide-muttoni-77b134194/'],
};

export const authorRef = { '@id': author['@id'] };

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
