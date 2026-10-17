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

// Code partenaire : awoulohdesign.com/?ref=CODE
// Le code est mémorisé 30 jours dans le navigateur du visiteur et ajouté à
// chacun de ses messages WhatsApp, pour savoir quel partenaire a apporté le client.
// Si le visiteur arrive plus tard avec un autre code, c'est le dernier qui compte.
AWOULOH.codePartenaire = (() => {
    const CLE = 'awouloh-ref', DUREE = 30 * 24 * 3600 * 1000;
    const nettoyer = c => (c || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20);
    const nouveau = nettoyer(new URLSearchParams(location.search).get('ref'));
    try {
        if (nouveau) {
            localStorage.setItem(CLE, JSON.stringify({ code: nouveau, date: Date.now() }));
            return nouveau;
        }
        const memo = JSON.parse(localStorage.getItem(CLE) || 'null');
        if (memo && Date.now() - memo.date < DUREE) return nettoyer(memo.code);
    } catch (e) { /* navigation privée : on garde au moins le code de l'adresse */ }
    return nouveau;
})();

AWOULOH.lienWhatsapp = message => {
    if (AWOULOH.codePartenaire) message += `\n\n(Réf : ${AWOULOH.codePartenaire})`;
    return `https://wa.me/${AWOULOH.whatsapp}?text=${encodeURIComponent(message)}`;
};

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
