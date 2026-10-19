// CV PDFs are rendered from cv/cv.html by cv/build-cv.cjs; the download follows the site language.
export const getCvUrl = (lang) => `/cv/Danish-Vesa-CV-${lang === 'id' ? 'ID' : 'EN'}.pdf`;
