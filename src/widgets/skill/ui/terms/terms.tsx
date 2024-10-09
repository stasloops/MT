import { Text } from '@/shared/ui/design_system'
import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { CheckIcon } from '@/shared/ui/icons'
import styles from './terms.module.scss'
import { useUnit } from 'effector-react'
import { terms_model } from '../../model'
import { createPortal } from 'react-dom'

export const Terms = () => {
    const [terms, addTerm, deleteTerm, updateTerm] = useUnit([
        terms_model.$terms,
        terms_model.addTerm,
        terms_model.deleteTerm,
        terms_model.updateTerm,
    ]);
    const [mode, changeMode] = useUnit([terms_model.$mode, terms_model.changeMode]);

    return (
        <div>
            <div className={styles.head}>
                <Text variant="title_m">Условия</Text>
                <button onClick={() => changeMode('create')}>add</button>
                <button onClick={() => changeMode('delete')}>delete</button>
            </div>

            <div className={styles.list}>
                {terms?.map(({ isDone, caption, id }) => (
                    <Term
                        key={id}
                        isDone={isDone}
                        caption={caption}
                        onChange={(updatedIsDone) => updateTerm({ id, data: { isDone: updatedIsDone } })}
                    />
                ))}
            </div>
        </div>
    );
};



interface TermProps {
    isDone: boolean
    caption: string;
    onChange: (isDone: boolean) => void
}

const Term: FC<TermProps> = ({ isDone, caption, onChange }) => {
    const toggle = () => {
        onChange(!isDone)
    }
    return (
        <div className={styles.item}>
            <div onClick={toggle} className={clsx(styles.item_check, isDone && styles.item_check_active)}>
                {isDone && <CheckIcon className={styles.item_check_icon} />}
            </div>
            <Text className={styles.item_description} variant='body'>{caption}</Text>
        </div>
    )
}