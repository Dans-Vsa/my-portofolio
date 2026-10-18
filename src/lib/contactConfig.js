// Web3Forms access key (https://web3forms.com). It is meant to be public, so it can live in client code.
// If it is ever emptied, the Contact form falls back to opening the visitor's email app (mailto).
// Submissions go to danishbintang80@gmail.com. VITE_WEB3FORMS_KEY can override it locally.
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? 'cca23115-553c-4dc2-96e8-9f58cea67b0e';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
