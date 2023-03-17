import { useState, useEffect } from 'react';
import { fetchGithubAPI } from '../utils/fetchGQL';


export default function GithubRepo() {
    const [name, setName] = useState(null);

    const query = `
        query RepositoryNameQuery {
            repository(owner: "facebook" name: "relay") {
                name
            }
        }`;

    useEffect(() => {
        let isMounted = true;
        fetchGithubAPI(query).then(response => {
            // Avoid updating state if the component unmounted before the fetch completes
            if (!isMounted) {
                return;
            }
            const data = response.data;
            setName(data.repository.name);
        }).catch(error => {
            console.error(error);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {name != null ? `Repository: ${name}` : "Loading"}
                </p>
            </header>
        </div>
    );
}
