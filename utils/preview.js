import { environment } from '../config/environment';

export function buildPreviewLink(storyId) {
  const hostString = environment?.host;

  if (hostString && storyId) {
    const uri = new URL(hostString);

    let { host } = uri;
    const { protocol } = uri;

    // TODO fix 01.03.2022
    // Temporary workarround

    if (host === 'beta.zazuapp.co') {
      host = 'zazuapp.co';
    }

    return `${protocol}//preview.${host}/${storyId}`;
  }

  return '';
}
