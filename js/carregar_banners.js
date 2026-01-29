// js/carregar_banners.js

document.addEventListener('DOMContentLoaded', async () => {
    const bannersContainer = document.getElementById('bannersContainer');

    // Função para buscar os dados dos banners do JSON
    async function fetchBanners() {
        try {
            const response = await fetch('/json/banners.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const banners = await response.json();
            displayBanners(banners); // Exibe os banners carregados
        } catch (error) {
            console.error("Erro ao carregar os dados dos banners:", error);
            if (bannersContainer) {
                bannersContainer.innerHTML = "<p>Não foi possível carregar os banners. Por favor, tente novamente mais tarde.</p>";
            }
        }
    }

    // Função para exibir os cards de banner no HTML
    function displayBanners(bannersToDisplay) {
        if (!bannersContainer) return;

        bannersContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos cards

        if (bannersToDisplay.length === 0) {
            bannersContainer.innerHTML = "<p>Nenhum banner encontrado no momento.</p>";
            return;
        }

        // Itera sobre os banners para criar e anexar cada card
        bannersToDisplay.forEach(banner => {
            const bannerCard = document.createElement('div');
            bannerCard.classList.add('banner-card');

            const img = document.createElement('img');
            img.src = banner.imagem;
            img.alt = banner.titulo; 

            const bannerInfo = document.createElement('div');
            bannerInfo.classList.add('banner-info');

            const h3 = document.createElement('h3');
            h3.textContent = banner.titulo;

            const p = document.createElement('p');
            p.textContent = banner.data;

            // Monta a estrutura do card: anexa informações de texto e imagem ao card,
            // depois anexa o card completo ao contêiner principal na página
            bannerInfo.appendChild(h3);
            bannerInfo.appendChild(p);
            bannerCard.appendChild(img);
            bannerCard.appendChild(bannerInfo);

            bannersContainer.appendChild(bannerCard);
        });
    }

    // Carrega os banners quando a página é carregada
    fetchBanners();
});