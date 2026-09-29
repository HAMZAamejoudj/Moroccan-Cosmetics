# Guide de Déploiement sur cPanel (Next.js Static Export)

Félicitations ! Votre site est maintenant configuré pour un export statique complet. Cela signifie qu'il peut être hébergé sur n'importe quel serveur standard (comme le dossier `public_html` de cPanel) sans avoir besoin d'un serveur Node.js actif.

## Étapes pour le déploiement

### 1. Générer les fichiers (Déjà fait)
Le dossier `out/` a été généré avec succès à la racine de votre projet. Ce dossier contient tous les fichiers HTML, CSS, JS et images nécessaires.

### 2. Préparer l'archive
1. Ouvrez le dossier `moroccan-cosmetics/assets/out`.
2. Sélectionnez **tous** les fichiers et dossiers à l'intérieur.
3. Faites un clic droit et choisissez "Envoyer vers > Dossier compressé" (ou créez une archive `.zip`). Nommez-la `site.zip`.

### 3. Télécharger sur cPanel
1. Connectez-vous à votre interface **cPanel**.
2. Allez dans le **Gestionnaire de fichiers** (File Manager).
3. Accédez au dossier **`public_html`**.
4. Cliquez sur **Charger** (Upload) et sélectionnez votre fichier `site.zip`.
5. Une fois le chargement terminé, revenez dans `public_html`, faites un clic droit sur `site.zip` et choisissez **Extraire** (Extract).

### 4. Gérer les redirections (.htaccess)
Comme le site utilise des dossiers localisés (`/en`, `/fr`, `/ar`), vous devez rediriger les visiteurs arrivant sur la racine (`/`) vers la langue par défaut.

1. Dans le dossier `public_html`, vérifiez si un fichier nommé **`.htaccess`** existe. S'il n'existe pas, créez-le.
2. Ajoutez le code suivant au début du fichier :

Le fichier **`public/.htaccess`** est copié dans `out/` à chaque build (`patch-export-seo.mjs`). Il gère :

- HTTP → HTTPS (301)
- `www.moroccan-cosmetics.com` → `moroccan-cosmetics.com` (301, chemin conservé)
- `/` → `/en/` (301)
- URLs localisées (`/en/contact/` → `en/contact/index.html`)

**Important :** le sous-domaine `www` doit pointer vers le **même** `public_html` que le domaine apex. Sinon configure une redirection www dans cPanel (Domains → Redirects).

## Vérifications Finales
- Accédez à votre domaine (ex: `https://votre-site.com`). Vous devriez être redirigé vers `/en/`.
- Testez le changement de langue dans la barre de navigation.
- Vérifiez que les images s'affichent correctement.

---
**Note technique :**
Nous avons désactivé le `middleware.ts` car Next.js ne le supporte pas en mode `output: export`. La redirection est maintenant gérée par le serveur Apache via le fichier `.htaccess`.
