export function layout(title, content) {
return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        *{
                list-style: none;
                text-decoration: none;
        }
        
        body {
                font-family: 'Segoe UI', sans-serif;
                line-height: 1.6;
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
                background: #d9e4e0;
        }

        nav {
                background: #2c3e50;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 30px;
                display: flex;
                gap: 20px;
                justify-content: center;
        }

        nav a {
                color: white;
                text-decoration: none;
                font-weight: bold;
        }

        .card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                margin-bottom: 20px;
                transition: 0.5s;
        }

         .card:hover{
              box-shadow: 0px 5px 10px rgb(22, 22, 22);
        }

        .stats-box {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
        }

        .stat-item {
                background: #e8f4fd;
                padding: 64px;
                border-radius: 8px;
                text-align: center;
                font-size: 1.2em;
                transition: 0.5s;
        }
        .stat-item:hover{
              box-shadow: 0px 5px 10px rgb(22, 22, 22);
        }

        footer {
                text-align: center;
                margin-top: 50px;
                color: #7f8c8d;
                font-size: 0.9em;
        }
        main ul li{
                background-color: #acbed0;
                margin-top: 10px;
                padding: 20px;
                border-radius: 10px;
                transition: 0.5s;
        }

        main ul li:hover{
              box-shadow: 0px 5px 10px rgb(22, 22, 22);
        }

        li a{
                color: #3f3f3f;
        }
    </style>
</head>
<body>
    <nav>
        <a href="index.html">Accueil</a>
        <a href="archives.html">Archives</a>
        <a href="stats.html">Stats</a>
        <a href="a-propos.html">À Propos</a>
    </nav>

    <main>${content}</main>

    <footer>
        Propulsé par Node.js - Examen final PROG1 avril 2026
    </footer>
</body>
</html>
`;
}