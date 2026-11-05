// Aceleași metode ca API-ul HTTP, dar datele rămân în browser.
const read = () => JSON.parse(localStorage.getItem('tasks') ?? '[]')
const write = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks))
const delay = () => new Promise((resolve) => setTimeout(resolve, 200))

const localAPI = {
    getAll: async () => {
        await delay()
        return read()
    },

    getById: async (id) => {
        await delay()
        const task = read().find((task) => String(task.id) === String(id))

        // Pagina tratează sarcina absentă prin .catch, nu prin task.title pe null.
        if (!task) {
            throw new Error('Task not found')
        }

        return task
    },

    add: async (task) => {
        await delay()
        const newTask = {
            ...task,
            id: crypto.randomUUID?.() ?? Date.now().toString(),
        }
        write([...read(), newTask])
        return newTask
    },

    delete: async (id) => {
        await delay()
        write(read().filter((task) => String(task.id) !== String(id)))
    },

    deleteAll: async () => {
        await delay()
        write([])
    },

    toggleComplete: async (id, isDone) => {
        await delay()
        const tasks = read().map((task) => {
            return String(task.id) === String(id) ? { ...task, isDone } : task
        })
        write(tasks)
    },
}

export default localAPI
