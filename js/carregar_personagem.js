// js/carregar_personagem.js

document.addEventListener('DOMContentLoaded', async () => {
    const characterContent = document.getElementById('characterContent');
    const characterPageTitle = document.getElementById('characterPageTitle');

    // Função para obter o ID do personagem da URL
    function getCharacterIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id'); 
    }

    // Função para carregar os dados do JSON
    async function loadAllCharactersData() {
        try {
            // Usa 'fetch' para fazer uma requisição ao nosso arquivo JSON que contém todos os personagens.
            const response = await fetch('/json/dados_personagens.json'); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Converte a resposta da rede para um objeto JavaScript
            const allCharacters = await response.json();
            return allCharacters;
        } catch (error) {
            console.error("Erro ao carregar os dados dos personagens:", error);
            characterContent.innerHTML = "<p>Erro ao carregar os dados do personagem. Por favor, tente novamente mais tarde.</p>";
            characterPageTitle.textContent = "Erro - Genshin Impact";
            return null;
        }
    }

    // --- Função para exibir o Personagem Específico ---
    async function displayCharacter() {
        const characterId = getCharacterIdFromUrl();
        const allCharacters = await loadAllCharactersData();

         // Verifica se não há ID na URL ou se os dados completos não puderam ser carregados.
        if (!characterId || !allCharacters) {
            if (!characterId) {
                characterContent.innerHTML = "<p>Nenhum personagem especificado na URL.</p>";
                characterPageTitle.textContent = "Selecione um Personagem - Genshin Impact";
            }
            return;
        }

         // Encontra o personagem específico na lista completa, usando o ID obtido da URL.
        // O método 'find' percorre o array e retorna o primeiro elemento que satisfaz a condição.
        const character = allCharacters.find(char => char.id === characterId);

        // Se o personagem com o ID encontrado na URL não existir no JSON, mostra um erro.
        if (!character) {
            characterContent.innerHTML = `<p>Personagem com ID "${characterId}" não encontrado em nossa base de dados.</p>`;
            characterPageTitle.textContent = "Personagem Não Encontrado - Genshin Impact";
            return;
        }

        // Atualiza o título da página
        characterPageTitle.textContent = `${character.nome} - Genshin Impact`;

        // Preenche o HTML do 'characterContent' com os dados do personagem usando template literals.
        characterContent.innerHTML = `
            <div class="character-header">
                <img src="${character.imagem}" alt="${character.nome}">
                <div class="character-info">
                    <div class="character-title">
                        <h1>${character.nome}</h1>
                        <span class="stars" style="color: #f5c034;">${character.estrelas} ★</span>
                    </div>
                    <p class="subtitle">${character.titulo}</p>
                    <div class="badges">
                        <span class="badge">${character.armaTipo}</span>
                        <span class="badge ${character.elemento.toLowerCase()}">${character.elemento}</span>
                    </div>

                    <section class="character-stats">
                        <h2 class="stats-title">ESTATÍSTICAS BÁSICAS <span class="level">Nv. ${character.estatisticasBasicas.nivel}</span></h2>
                        <div class="progress-bar"></div>
                        <div class="stats-grid">
                            <div class="stat-box">
                                <span class="stat-label">Vida Básica</span>
                                <span class="stat-value">${character.estatisticasBasicas.vida}</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-label">Ataque Básico</span>
                                <span class="stat-value">${character.estatisticasBasicas.ataque}</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-label">Defesa Básica</span>
                                <span class="stat-value">${character.estatisticasBasicas.defesa}</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-label">Bônus ${character.elemento}</span>
                                <span class="stat-value">${character.estatisticasBasicas.bonusElemento}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div class="character-section">
                <h2 class="stats-title">Melhor Arma</h2>
                <div class="progress-bar"></div>
                <div class="weapon-box">
                    <img src="${character.melhorArma.imagem}" alt="${character.melhorArma.nome}" class="weapon-img" />
                    <div class="weapon-info">
                        <h3 class="weapon-name">${character.melhorArma.nome} <span style="color: #f5c034;">${character.melhorArma.estrelas}★</span></h3>
                        <p class="weapon-stats"><strong>Nível:</strong> ${character.melhorArma.nivel} &nbsp;&nbsp; <strong>ATQ:</strong> ${character.melhorArma.ataque} &nbsp;&nbsp; <strong>SUB:</strong> ${character.melhorArma.substatus}</p>
                        <p class="weapon-passive">${character.melhorArma.passiva}</p>
                    </div>
                </div>
            </div>

            <div class="character-section">
                <h2 class="stats-title">Melhor Conjunto de Artefatos</h2>
                <div class="progress-bar"></div>
                <div class="artifact-box">
                    <img src="${character.melhorArtefato.imagem}" alt="${character.melhorArtefato.nome}" class="artifact-img" />
                    <div class="artifact-info">
                        <h3 class="artifact-name">${character.melhorArtefato.nome}</h3>
                        <p class="artifact-bonus"><strong>2 Peças:</strong> ${character.melhorArtefato.bonus2Pecas}</p>
                        <p class="artifact-description">${character.melhorArtefato.descricaoCompleta}</p>
                    </div>
                </div>

                <div class="artifact-details">
                    <div class="main-stats">
                        <h4>Status Principais</h4>
                        <ul>
                            <li><strong>Ampulheta:</strong> ${character.melhorArtefato.statusPrincipais.ampulheta}</li>
                            <li><strong>Cálice:</strong> ${character.melhorArtefato.statusPrincipais.calice}</li>
                            <li><strong>Tiara:</strong> ${character.melhorArtefato.statusPrincipais.tiara}</li>
                        </ul>
                    </div>
                    <div class="sub-stats">
                        <h4>Sub-status Recomendados</h4>
                        <div class="substat-tags">
                            ${character.melhorArtefato.substatusRecomendados.map(substat => `<span>${substat}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Adiciona uma classe ao corpo ou ao wrapper para que o CSS possa estilizar com base no elemento do personagem
        document.body.classList.add(`element-${character.elemento.toLowerCase()}`);
        document.body.classList.add(`weapon-${character.armaTipo.toLowerCase()}`);
    }

    // Carrega e exibe o personagem quando a página carregar
    displayCharacter();
});