// js/carregar_times.js

document.addEventListener('DOMContentLoaded', async () => {
    const teamGridContainer = document.getElementById('teamGridContainer');
    const teamSearchInput = document.getElementById('teamSearchInput');
    const teamSearchForm = document.getElementById('teamSearchForm');

    let allTeams = []; // Armazena todos os dados de times do JSON

    // Função para buscar os dados de times do JSON
    async function fetchTeams() {
        try {
            const response = await fetch('/json/times.json'); // Caminho para seu JSON de times
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allTeams = await response.json(); // Armazena os dados
            displayTeams(allTeams); // Exibe todos os times inicialmente
        } catch (error) {
            console.error("Erro ao carregar os dados dos times:", error);
            if (teamGridContainer) {
                teamGridContainer.innerHTML = "<p>Não foi possível carregar os times. Por favor, tente novamente mais tarde.</p>";
            }
        }
    }

    // Função para exibir os cards de time no HTML
    function displayTeams(teamsToDisplay) {
        if (!teamGridContainer) return;

        teamGridContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos cards

        if (teamsToDisplay.length === 0) {
            teamGridContainer.innerHTML = "<p>Nenhum time encontrado com o nome pesquisado.</p>";
            return;
        }

        teamsToDisplay.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');

            const teamName = document.createElement('h3');
            teamName.classList.add('team-name');
            teamName.textContent = team.nomeTime;

            const teamIcons = document.createElement('div');
            teamIcons.classList.add('team-icons');

            team.personagens.forEach(character => {
                const img = document.createElement('img');
                img.src = character.icone;
                img.alt = `Icon ${character.nome}`;
                teamIcons.appendChild(img);
            });

            teamCard.appendChild(teamName);
            teamCard.appendChild(teamIcons);
            teamGridContainer.appendChild(teamCard);
        });
    }

    // Função para filtrar os times com base na pesquisa
    function filterTeams() {
        const searchTerm = teamSearchInput.value.toLowerCase();

        const filteredTeams = allTeams.filter(team => {
            // Verifica se o nome do time ou qualquer nome de personagem no time inclui o termo de busca
            const teamNameMatches = team.nomeTime.toLowerCase().includes(searchTerm);
            const characterMatches = team.personagens.some(char =>
                char.nome.toLowerCase().includes(searchTerm)
            );
            return teamNameMatches || characterMatches;
        });

        displayTeams(filteredTeams);
    }

    // Adiciona event listener para o input de busca (digitação)
    if (teamSearchInput) {
        teamSearchInput.addEventListener('input', filterTeams);
    }

    // Adiciona event listener para o formulário de busca (submit)
    if (teamSearchForm) {
        teamSearchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
            filterTeams();
        });
    }

    // Carrega os times quando a página é carregada
    fetchTeams();
});