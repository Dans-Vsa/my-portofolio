// Web3Forms access key (https://web3forms.com). It is meant to be public, so it can live in client code.
// While it is empty, the Contact form falls back to opening the visitor's email app (mailto).
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
