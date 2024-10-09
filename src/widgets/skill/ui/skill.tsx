import React, { useEffect, useState } from 'react'
import styles from './skill.module.scss'
import { Text } from '@/shared/ui/design_system'
import { Terms } from './terms/terms'
import { useUnit } from 'effector-react'
import { terms_model } from '../model'
import clsx from 'clsx'


export const Skill = () => {
    const [mode, changeMode] = useUnit([terms_model.$mode, terms_model.changeMode])
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        if (mode === 'delete') {
            setShowPopup(true)
        } else {
            setShowPopup(false)
        }
    }, [mode])

    return (
        <div className={styles.wrapper}>
            <div className={styles.section}>
                <div className={styles.info}>
                    <Text className={styles.title} variant="title_l">
                        Название
                    </Text>
                    <Text className={styles.info_description} variant="body">
                        Описание
                    </Text>
                </div>
            </div>

            <div className={styles.section}>
                <Terms />
            </div>

            <div className={styles.section}>
                <Text variant="title_m">Активация</Text>
            </div>

            <div className={styles.section}>
                <Text variant="title_m">Заметки</Text>
            </div>

            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.section}>
                        <Terms />
                    </div>
                </div>
            )}
        </div>
    )
}
