import { createEvent, createStore, sample } from "effector"

type PageType = 'skill' | 'skill_list'

const $page = createStore<PageType>('skill')

const $skillId = createStore<null | number>(null)

const routePage = createEvent<{ path: PageType, skill_id?: number }>()

sample({
    clock: routePage, fn: ({ path }) => path, target: $page
})

sample({
    clock: routePage, fn: ({ skill_id }) => skill_id || null, target: $skillId
})

export const skill_page_model = {
    $page,
    $skillId,
    routePage,

}