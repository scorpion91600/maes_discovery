document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")
        .then(function (res) {
            if (!res.ok) throw new Error("Impossible de charger data.json");
            return res.json();
        })
        .then(function (data) {
            const nav = data.navbar;
            const a   = data.artiste;

            // ════════════════════════════════════════
            //  NAVBAR (toutes les pages)
            // ════════════════════════════════════════
            const navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                const liensHTML = nav.liens.map(function (lien) {
                    const ctaClass = lien.cta
                        ? 'class="navbar__item navbar__item--cta"'
                        : 'class="navbar__item"';
                    const linkClass = lien.cta
                        ? 'class="navbar__link navbar__link--cta"'
                        : 'class="navbar__link"';
                    return `
                        <li ${ctaClass}>
                            <a href="${lien.href}" ${linkClass}>${lien.texte}</a>
                        </li>
                    `;
                }).join("");

                navbarContainer.innerHTML = `
                    <a href="index.html" class="navbar__brand">
                        <img src="${nav.logo}" alt="${nav.logoAlt}">
                    </a>
                    <button class="navbar__toggle" id="navbarToggle"
                        aria-label="Ouvrir le menu" aria-controls="navbarMenu" aria-expanded="false">
                        &#x2630;
                    </button>
                    <h2 class="navbar__title">${nav.titre}</h2>
                    <nav class="navbar__menu" id="navbarMenu">
                        <ul class="navbar__list">
                            ${liensHTML}
                        </ul>
                    </nav>
                `;

                // Toggle mobile
                const toggle = document.getElementById("navbarToggle");
                const menu   = document.getElementById("navbarMenu");
                if (toggle && menu) {
                    toggle.addEventListener("click", function () {
                        const open = menu.classList.toggle("is-active");
                        toggle.setAttribute("aria-expanded", open);
                    });
                }
            }

            // ════════════════════════════════════════
            //  PAGE INDEX.HTML
            // ════════════════════════════════════════

            // HERO
            const heroSection = document.getElementById("hero-section");
            if (heroSection) {
                heroSection.innerHTML = `
                    <span class="hero__tag">${a.tags.join(" · ")}</span>
                    <h1 class="hero__name">${a.nom}</h1>
                    <p class="hero__real-name">De son vrai nom <strong>${a.nomComplet}</strong></p>
                    <p class="hero__born">Né le <strong>${a.dateNaissance}</strong> à ${a.lieuNaissance}</p>
                `;
            }

            // STATS index
            const statsContainer = document.getElementById("stats-container");
            if (statsContainer) {
                a.stats.forEach(function (stat) {
                    statsContainer.insertAdjacentHTML("beforeend", `
                        <div class="stat-card" role="listitem">
                            <div class="stat-card__number">${stat.nombre}</div>
                            <div class="stat-card__label">${stat.label}</div>
                        </div>
                    `);
                });
            }

            // ORIGINES
            const originesTexte = document.getElementById("origines-texte");
            if (originesTexte) originesTexte.textContent = a.origines;

            // MAP
            const mapCard = document.getElementById("map-card");
            if (mapCard) {
                mapCard.innerHTML = `
                    <div class="map-card__header">
                        <div class="map-card__dot"></div>
                        ${a.map.label}
                    </div>
                    <iframe
                        src="${a.map.url}"
                        title="${a.map.titre}"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                `;
            }

            // CARRIÈRE
            const carriereBody = document.getElementById("carriere-body");
            if (carriereBody) {
                a.carriere.forEach(function (paragraphe) {
                    let texteHTML = paragraphe.texte;
                    paragraphe.liens.forEach(function (lien) {
                        texteHTML = texteHTML.replace(
                            lien.mot,
                            `<a href="${lien.url}" target="_blank" rel="noopener"><strong>${lien.mot}</strong></a>`
                        );
                    });
                    const p = document.createElement("p");
                    p.innerHTML = texteHTML;
                    p.style.marginTop = "1rem";
                    carriereBody.appendChild(p);
                });
            }

            // DISCOGRAPHIE timeline
            const timelineList = document.getElementById("timeline-list");
            if (timelineList) {
                a.discographie.forEach(function (album) {
                    const badgeHTML = album.certification
                        ? `<span class="timeline__badge badge--${album.badge}">${album.certification}</span>`
                        : "";
                    timelineList.insertAdjacentHTML("beforeend", `
                        <li class="timeline__item">
                            <span class="timeline__year">${album.annee}</span>
                            <span class="timeline__album">${album.titre}</span>
                            ${badgeHTML}
                        </li>
                    `);
                });
            }

            // AFFAIRES JUDICIAIRES
            const legalBody = document.getElementById("legal-body");
            if (legalBody) {
                a.affairesJudiciaires.forEach(function (phrase) {
                    const p = document.createElement("p");
                    p.textContent = phrase;
                    legalBody.appendChild(p);
                });
            }

            // ════════════════════════════════════════
            //  PAGE ALBUM.HTML
            // ════════════════════════════════════════
            const pa = a.pageAlbums;

            const albumsHeader = document.getElementById("albums-header");
            if (albumsHeader) {
                albumsHeader.innerHTML = `
                    <span class="page-header__eyebrow">${pa.eyebrow}</span>
                    <h1 class="page-header__title">${pa.titre}</h1>
                    <p class="page-header__subtitle">${pa.sousTitre}</p>
                `;
            }

            const albumsStats = document.getElementById("albums-stats");
            if (albumsStats) {
                pa.stats.forEach(function (stat) {
                    albumsStats.insertAdjacentHTML("beforeend", `
                        <div class="stat-card">
                            <div class="stat-card__number">${stat.nombre}</div>
                            <div class="stat-card__label">${stat.label}</div>
                        </div>
                    `);
                });
            }

            const albumsGrid = document.getElementById("albums-grid");
            if (albumsGrid) {
                const spotifySVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                </svg>`;

                pa.albums.forEach(function (album) {
                    albumsGrid.insertAdjacentHTML("beforeend", `
                        <div class="album-card album-card--${album.slug}">
                            <div class="album-card__cover-wrapper">
                                <img class="album-card__cover" src="${album.image}" alt="Pochette de ${album.titre}">
                                <div class="album-card__cover-overlay"></div>
                                <span class="album-card__badge album-card__badge--${album.badge.classe}">${album.badge.texte}</span>
                            </div>
                            <div class="album-card__body">
                                <p class="album-card__year">${album.annee}</p>
                                <h2 class="album-card__title">${album.titre}</h2>
                                <p class="album-card__tracks">${album.nbTitres} titres • ${album.rang}</p>
                                <div class="album-card__popularity">
                                    <div class="album-card__pop-label">
                                        <span>Popularité</span>
                                        <span>${album.popularite}%</span>
                                    </div>
                                    <div class="album-card__pop-track">
                                        <div class="album-card__pop-fill" style="width:${album.popularite}%"></div>
                                    </div>
                                </div>
                            </div>
                            <a href="${album.spotify}" class="album-card__spotify" target="_blank" rel="noopener">
                                ${spotifySVG} Écouter sur Spotify
                            </a>
                        </div>
                    `);
                });
            }

            // ════════════════════════════════════════
            //  PAGE TRACKLIST.HTML
            // ════════════════════════════════════════
            const pt = a.pageTracklist;

            // EN-TÊTE
            const tracklistHeader = document.getElementById("tracklist-header");
            if (tracklistHeader) {
                tracklistHeader.innerHTML = `
                    <span class="page-header__eyebrow">${pt.eyebrow}</span>
                    <h1 class="page-header__title">${pt.titre}</h1>
                    <p class="page-header__subtitle">${pt.sousTitre}</p>
                `;
            }

            // TABS + PANNEAUX
            const tracklistTabs   = document.getElementById("tracklist-tabs");
            const tracklistPanels = document.getElementById("tracklist-panels");

            if (tracklistTabs && tracklistPanels) {

                const spotifySVGTl = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                </svg>`;

                pt.albums.forEach(function (album, index) {
                    const isFirst = index === 0;

                    // TAB
                    tracklistTabs.insertAdjacentHTML("beforeend", `
                        <button
                            class="album-tab${isFirst ? " is-active" : ""}"
                            data-album="${album.slug}"
                            role="tab"
                            aria-selected="${isFirst}"
                            aria-controls="panel-${album.slug}">
                            ${album.tabTitre}
                        </button>
                    `);

                    // PANNEAU
                    tracklistPanels.insertAdjacentHTML("beforeend", `
                        <div class="album-panel${isFirst ? " is-active" : ""}"
                            id="panel-${album.slug}" role="tabpanel">

                            <div class="album-header">
                                <img class="album-header__cover" src="${album.image}" alt="Pochette ${album.titre}">
                                <div class="album-header__info">
                                    <p class="album-header__eyebrow">${album.eyebrow}</p>
                                    <h2 class="album-header__title">${album.titre}</h2>
                                    <div class="album-header__meta">
                                        <span class="album-header__tag">📅 ${album.annee}</span>
                                        <span class="album-header__tag">${album.certification}</span>
                                        <span class="album-header__tag">${album.nbTitres} titres</span>
                                    </div>
                                </div>
                            </div>

                            <div class="deezer-wrapper">
                                <div class="deezer-wrapper__header">
                                    <div class="deezer-wrapper__dot"></div>
                                    <div class="deezer-wrapper__dot"></div>
                                    <div class="deezer-wrapper__dot"></div>
                                    <span class="deezer-wrapper__label">Deezer · ${album.titre}</span>
                                </div>
                                <iframe
                                    title="${album.titre} — Deezer"
                                    src="${album.deezerUrl}"
                                    height="380"
                                    frameborder="0"
                                    allowtransparency="true"
                                    allow="encrypted-media; clipboard-write">
                                </iframe>
                            </div>

                            <a href="${album.spotify}" target="_blank" rel="noopener" class="spotify-link">
                                ${spotifySVGTl}
                                Écouter sur Spotify
                            </a>
                        </div>
                    `);
                });

                // TABS LOGIC
                tracklistTabs.addEventListener("click", function (e) {
                    const tab = e.target.closest(".album-tab");
                    if (!tab) return;

                    tracklistTabs.querySelectorAll(".album-tab").forEach(function (t) {
                        t.classList.remove("is-active");
                        t.setAttribute("aria-selected", "false");
                    });
                    tracklistPanels.querySelectorAll(".album-panel").forEach(function (p) {
                        p.classList.remove("is-active");
                    });

                    tab.classList.add("is-active");
                    tab.setAttribute("aria-selected", "true");
                    const panel = document.getElementById("panel-" + tab.dataset.album);
                    if (panel) panel.classList.add("is-active");
                });
            }

        })

        
        .catch(function (err) {
            console.error("Erreur chargement data.json :", err);
        });
});


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".safari-tabs-carousel__container");
    const indicatorsContainer = document.getElementById("carousel-indicators");
    const tabs = document.querySelectorAll(".safari-tab");
    
    let currentIndex = 0;
    const totalTabs = tabs.length;

    // Créer les indicateurs
    tabs.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = `carousel-dot ${index === 0 ? "is-active" : ""}`;
        dot.addEventListener("click", () => goToTab(index));
        indicatorsContainer.appendChild(dot);
    });

    // Fonction pour aller à un onglet
    function goToTab(index) {
        if (index < 0 || index >= totalTabs) return;

        // Retirer les classes
        tabs.forEach(tab => {
            tab.classList.remove("is-active", "is-prev");
        });

        // Marquer les onglets (avant, actif, après)
        tabs.forEach((tab, i) => {
            if (i < index) {
                tab.classList.add("is-prev");
            } else if (i === index) {
                tab.classList.add("is-active");
            }
        });

        // Mettre à jour les indicateurs
        document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
            dot.classList.toggle("is-active", i === index);
        });

        currentIndex = index;
    }

    // Boutons de fermeture
    document.querySelectorAll(".safari-tab__close").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const tab = tabs[index];
            tab.style.animation = "none";
            tab.style.opacity = "0";
            tab.style.transform = "translateX(100%) rotateY(45deg) scale(0.9)";
            
            setTimeout(() => {
                tab.remove();
                const remainingTabs = document.querySelectorAll(".safari-tab");
                if (remainingTabs.length === 0) return;
                
                if (index >= remainingTabs.length) {
                    goToTab(remainingTabs.length - 1);
                } else {
                    goToTab(index);
                }
            }, 300);
        });
    });

    // Navigation au clavier (flèches)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") goToTab(currentIndex + 1);
        if (e.key === "ArrowLeft") goToTab(currentIndex - 1);
    });

    // Swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
    });

    container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            goToTab(currentIndex + 1);
        } else if (touchEndX > touchStartX + 50) {
            goToTab(currentIndex - 1);
        }
    }

    // Initialiser le premier onglet
    goToTab(0);
});
