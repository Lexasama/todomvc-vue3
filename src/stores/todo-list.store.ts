import type {Todo} from '@/components/todo-list/Todo'
import {useFetchTodo} from '@/composables/todo/useFetchTodo'
import {useFetch} from '@vueuse/core'
import {createPinia, defineStore} from 'pinia'

const NAME: string = 'todos'

const url: string = import.meta.env.VITE_API_URL + '/todos'

type TodoState = {
    todoList: Todo[],
    editStatus: {
        isEditing: boolean,
        id: number
    }
}

type TodoUpdate = {
    title: string
    completed: boolean
    order: number
}
let initialData: Todo[] = []
export const createStore = (todos: Todo[]) => {
    initialData = todos
    return createPinia()
}

const {useFetchAll} = useFetchTodo()

export function orderByOrder(list: Array<Todo>): Array<Todo> {
    return list.sort((a, b) => (a.order > b.order ? -1 : 1))
}

const TODO_FILTER = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
} as const
type ObjectValues<T> = T[keyof T]
type TodoListFilter = ObjectValues<typeof TODO_FILTER>

export function filterList(list: Array<Todo>, filter: TodoListFilter): Todo[] {
    return list.filter((todo) => {
        switch (filter) {
            case TODO_FILTER.ACTIVE:
                return !todo.completed
            case "COMPLETED":
                return todo.completed
            default:
                return todo
        }
    })
}


const defaultEditStatus = {isEditing: false, id: 11};
export const useTodoStore = defineStore(NAME, {
    state: (): TodoState => ({
        todoList: initialData,
        editStatus: defaultEditStatus
    }),

    getters: {
        todos: (state: TodoState) => state.todoList,
        completedTodos: (state: TodoState) => filterList(state.todoList, 'COMPLETED'),
        activeTodos: (state: TodoState): Todo[] => filterList(state.todoList, 'ACTIVE'),
        hasTodos: (state: TodoState): boolean => state.todoList.length !== 0,
        allTodoItems: (state: TodoState): number => state.todoList.length,
        completedItems: (state: TodoState): number => {
            return state.todoList.reduce((p: number, c: Todo) => {
                return c.completed ? p + 1 : p
            }, 0);
        },
        activeItems(state: TodoState): number {
            return state.todoList.length - this.completedItems
        },
        allDone(): boolean {
            return this.allTodoItems === this.completedItems
        },
        hasCompletedItems(): boolean {
            return this.completedItems > 0
        },
        editValue: (state: TodoState) => state.editStatus,
        isEditMode: (state: TodoState): boolean => state.editStatus.isEditing

    },

    actions: {
        async getAll() {
            this.todoList = [...await useFetchAll()];
        },
        async create(title: string) {

            await useFetch(url).post({title})
            await this.getAll()
        },
        async update(id: number, todo: TodoUpdate) {

            await useFetch(`${url}/${id}`).put(todo)
            await this.getAll()
        },

        async deleteOne(id: number) {
            await useFetch(`${url}/${id}`).delete()
            await this.getAll()
        },
        async deleteCompleted() {
            await useFetch(`${url}?completed=${true}`).delete()
            await this.getAll()
        },
        async completeAll(completed: boolean) {
            await useFetch(`${url}/complete-all?completed=${completed}`).put()
            await this.getAll()
        },
        enterEditMode(id: number) {
            this.editStatus = {isEditing: true, id}
        },
        exitEditMode() {
            this.editStatus = {...defaultEditStatus};
        }
    }
})
