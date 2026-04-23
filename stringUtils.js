/**
 * Transforme un texte en slug URL
 */
export function slugify(text) {
    return text
        .toLowerCase()
        .normalize("NFD") // enlève accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");
}

/**
 * Tronque un texte sans couper un mot
 */
export function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
}

/**
 * Compte le nombre de mots
*/
export function countWords(text) {
    return text.trim().split(/\s+/).length;
}

/**
 * Sécurise le HTML
 */
export function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}