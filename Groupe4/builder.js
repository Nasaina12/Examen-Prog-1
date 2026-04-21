import fs from 'fs';
import { articles } from './data.js';
import { layout } from './layout.js';
import { slugify, truncate, countWords, escapeHTML } from './stringUtils.js';

/* Création du dossier dist */
const dist = './dist';
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

/* PAGE STATISTIQUES */
function generateStatsPage(data) {

    //Nombre total de mots
    const totalWords = data.reduce((total, article) => {
        return total + countWords(article.content);
    }, 0);

    //Nombre d’articles
    const nbrArticles = data.length;

    //Moyenne de mots par article
    const avgWords = Math.round(totalWords / nbrArticles);

    //Auteur le plus actif
    const authors = {};

    data.forEach(article => {
        if (authors[article.author]) {
            authors[article.author]++;
        } else {
            authors[article.author] = 1;
        }
    });

    let topAuthor = '';
    let max = 0;

    for (let author in authors) {
        if (authors[author] > max) {
            max = authors[author];
            topAuthor = author;
        }
    }

    const body = `
        <h1>Analyse du Blog</h1>
        <div class="stats-box">
            <div class="stat-item"><strong>${nbrArticles}</strong><br>Articles</div>
            <div class="stat-item"><strong>${totalWords}</strong><br>Mots au total</div>
            <div class="stat-item"><strong>${avgWords}</strong><br>Mots / article</div>
            <div class="stat-item"><strong>${topAuthor}</strong><br>Auteur principal</div>
        </div>
    `;

    return layout("Statistiques", body);
}

/* PAGE ARCHIVES */
function generateArchivesPage(data) {

    const list = data.map(article => `
        <li>
            <strong>${article.date}</strong> :
            <a href="${slugify(article.title)}.html">
                ${escapeHTML(article.title)}
            </a>
            (${countWords(article.content)} mots)
        </li>
    `).join('');

    return layout("Archives", `
        <h1>Tous les articles</h1>
        <ul>${list}</ul>
    `);
}

/* BUILD DU SITE */
export const build = () => {

    //Page d'accueil
    const indexBody = `<h1>Dernières publications</h1>` + articles.map(a => `
        <div class="card">
           <h2>${escapeHTML(a.title)}</h2>
            <p>${truncate(a.content, 100)}</p>
            <a href="${slugify(a.title)}.html">Lire l'article</a>
        </div>
    `).join('');

    fs.writeFileSync(`${dist}/index.html`, layout("Accueil", indexBody));

    //Archives
    fs.writeFileSync(`${dist}/archives.html`, generateArchivesPage(articles));

    //Stats
    fs.writeFileSync(`${dist}/stats.html`, generateStatsPage(articles));

    //À propos
    fs.writeFileSync(`${dist}/a-propos.html`, layout("À Propos", `
        <h1>À propos</h1>
        <p>
        Ce projet démontre un des potentiels utilisation de Node.js.
        Penser, Travailler et Impacter !
        </p>
    `));

    //Pages individuelles
    articles.forEach(art => {
        const content = `
            <img src="data:image/png;base64,${art.image}" style="width:100%; border-radius:8px;">
            <h1>${escapeHTML(art.title)}</h1>
            <p><em>Par ${art.author} le ${art.date}</em></p>
            <div class="card">${art.content}</div>
        `;

        fs.writeFileSync(
            `${dist}/${slugify(art.title)}.html`,
            layout(art.title, content)
        );
    });

    console.log("✨ Site généré avec succès dans /dist !");
};
