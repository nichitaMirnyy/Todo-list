const URL = 'http://localhost:3001/tasks'

const headers = {
    'Content-Type': 'application/json',
}

// Verificăm și erorile HTTP: fetch nu respinge automat răspunsurile 404/500.
const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }
    return response
}

const serverAPI = {
    getAll: () => fetch(URL)
        .then(checkResponse)
        .then((response) => response.json()),

    getById: (id) => fetch(`${URL}/${id}`)
        .then(checkResponse)
        .then((response) => response.json()),

    add: (task) => fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(task),
    })
        .then(checkResponse)
        .then((response) => response.json()),

    delete: (id) => fetch(`${URL}/${id}`, { method: 'DELETE' })
        .then(checkResponse),

    deleteAll: (tasks) => Promise.all(tasks.map(({ id }) => serverAPI.delete(id))),

    toggleComplete: (id, isDone) => fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ isDone }),
    }).then(checkResponse),
}

export default serverAPI
