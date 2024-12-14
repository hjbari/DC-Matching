document.getElementById('dcForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const jobTitle = document.getElementById('jobTitle').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const dcContent = document.getElementById('dcContent').value;

    const prompt = `
        Comparez le dossier de compétences suivant avec l'offre d'emploi ci-dessous :
        Titre de l'offre : ${jobTitle}
        Description de l'offre : ${jobDescription}
        Dossier de compétences : ${dcContent}

        Donnez un score sur 100 et expliquez pourquoi.
    `;

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_KEY', // Remplace par ta clé OpenAI
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 300,
        }),
    });

    const result = await response.json();
    document.getElementById('results').innerHTML = `
        <h2>Résultats :</h2>
        <p>${result.choices[0].text}</p>
    `;
});
