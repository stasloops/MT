import { createEvent, createStore, sample } from "effector";
import { ITerm, Mode } from "../types";

// $ TERMS

const $terms = createStore<ITerm[]>([{ id: 1, isDone: false, caption: 'Реализовать terms блок' }])

const addTerm = createEvent()

const deleteTerm = createEvent()

const updateTerm = createEvent<{ data: Partial<ITerm>, id: number }>()

sample({
    clock: updateTerm,
    source: $terms,
    fn: (terms, { id, data }) => {
        return terms.map((term) => {
            if (term.id === id) {
                return { ...term, ...data }
            }
            return term
        })

    },
    target: $terms
})

// $ MODE

const $mode = createStore<Mode>('usual')

const changeMode = createEvent<Mode>()

sample({
    clock: changeMode,
    target: $mode
})

// MODEL

export const terms_model = {
    $terms,
    addTerm,
    deleteTerm,
    updateTerm,
    $mode,
    changeMode
}