// js/lista_personagens.js

document.addEventListener('DOMContentLoaded', async () => {
    const characterGrid = document.getElementById('characterGrid');
    const searchInput = document.getElementById('searchInput');
    const elementFilter = document.getElementById('elementFilter');
    const rarityFilter = document.getElementById('rarityFilter');
    const weaponFilter = document.getElementById('weaponFilter');
    const filterForm = document.getElementById('filterForm');

    let allCharacters = []; // Variável para armazenar todos os personagens carregados do JSON

    // Função para carregar os dados dos personagens do JSON
    async function fetchCharacters() {
        try {
            const response = await fetch('/json/dados_personagens.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allCharacters = await response.json(); // Armazena os dados
            displayCharacters(allCharacters); // Exibe todos os personagens inicialmente
        } catch (error) {
            console.error("Erro ao carregar os dados dos personagens:", error);
            if (characterGrid) {
                characterGrid.innerHTML = "<p>Não foi possível carregar os personagens. Por favor, verifique o console para mais detalhes.</p>";
            }
        }
    }

    // Função para criar e exibir os cards de personagem
    function displayCharacters(charactersToDisplay) {
        if (!characterGrid) return; // Garante que o elemento existe

        characterGrid.innerHTML = ''; // Limpa o grid antes de adicionar novos personagens

        if (charactersToDisplay.length === 0) {
            characterGrid.innerHTML = "<p>Nenhum personagem encontrado com os filtros aplicados.</p>";
            return;
        }

        charactersToDisplay.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');

            const link = document.createElement('a');
            // O link agora aponta para a única página de detalhes, passando o ID do personagem
            link.href = `/personagensEspecificos/personagensEspecificos.html?id=${character.id}`;

            const img = document.createElement('img');
            img.src = character.imagem;
            img.alt = character.nome;

            const divider = document.createElement('div');
            divider.classList.add('character-divider');

            const nameLink = document.createElement('a');
            nameLink.href = `/personagensEspecificos/personagensEspecificos.html?id=${character.id}`;
            nameLink.classList.add('character-name');
            nameLink.textContent = character.nome;

            link.appendChild(img);
            characterCard.appendChild(link);
            characterCard.appendChild(divider);
            characterCard.appendChild(nameLink);

            characterGrid.appendChild(characterCard);
        });
    }

    // Função para filtrar os personagens
    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedElement = elementFilter.value;
        const selectedRarity = rarityFilter.value;
        const selectedWeapon = weaponFilter.value;

        const filtered = allCharacters.filter(character => {
            const matchesSearch = character.nome.toLowerCase().includes(searchTerm);
            const matchesElement = selectedElement === 'todos' || character.elemento.toLowerCase() === selectedElement;
            const matchesRarity = selectedRarity === 'todas' || character.estrelas === selectedRarity;
            const matchesWeapon = selectedWeapon === 'todas' || character.armaTipo.toLowerCase() === selectedWeapon;

            return matchesSearch && matchesElement && matchesRarity && matchesWeapon;
        });

        displayCharacters(filtered);
    }

    // Adiciona event listeners para os filtros
    if (searchInput) {
        searchInput.addEventListener('input', filterCharacters);
    }
    if (elementFilter) {
        elementFilter.addEventListener('change', filterCharacters);
    }
    if (rarityFilter) {
        rarityFilter.addEventListener('change', filterCharacters);
    }
    if (weaponFilter) {
        weaponFilter.addEventListener('change', filterCharacters);
    }
    if (filterForm) {
        filterForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio do formulário
            filterCharacters();
        });
    }


    // Carrega os personagens quando a página é carregada
    fetchCharacters();
});