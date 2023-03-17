export async function fetchGithubAPI(text, variables) {
    const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;
    console.log(`TOKEN: ${REACT_APP_GITHUB_AUTH_TOKEN}`)
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, variables }),
    });

    return await response.json();
}
