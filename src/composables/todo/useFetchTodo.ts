import type { Todo } from '@/components/todo-list/Todo'
import { useFetch } from '@vueuse/core'

const url: string = import.meta.env.VITE_API_URL + '/todos'

export const useFetchTodo = () => {
  const useFetchAll = async (): Promise<Todo[]> => {
    const { data } = await useFetch(url).get().json<Todo[]>()
    return data.value ?? []
  }

  return {
    useFetchAll
  }
}
