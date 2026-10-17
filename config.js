// ============================================================
//  RÉGLAGES DU SITE AWOULOH DESIGN : à modifier ici uniquement
// ============================================================
const AWOULOH = {
    // Numéro WhatsApp au format international, sans + ni espaces.
    // Exemple pour la Côte d'Ivoire : 2250701020304
    whatsapp: '2250747851878',

    // Liens des réseaux sociaux (laisser '' pour masquer)
    instagram: 'https://www.instagram.com/awoulohdesign/',
    facebook: '',
    tiktok: '',
};

AWOULOH.lienWhatsapp = message =>
    `https://wa.me/${AWOULOH.whatsapp}?text=${encodeURIComponent(message)}`;

// "2250701020304" -> "+225 07 01 02 03 04"
AWOULOH.numeroAffiche = () => {
    const n = AWOULOH.whatsapp;
    const local = n.startsWith('225') ? n.slice(3) : n;
    return (n.startsWith('225') ? '+225 ' : '+') + local.replace(/(\d{2})(?=\d)/g, '$1 ');
};

// Transforme chaque élément data-wa="message" en lien WhatsApp
AWOULOH.activerLiens = (racine = document) => {
    racine.querySelectorAll('[data-wa]').forEach(el => {
        el.href = AWOULOH.lienWhatsapp(el.dataset.wa);
        el.target = '_blank';
        el.rel = 'noopener';
    });
};
