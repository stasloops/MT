import React, { useEffect, useState } from 'react'
import styles from './skill.module.scss'
import { Navigation } from '@/shared/ui/design_system'
import { bottom_menu_model } from '@/shared/ui/design_system/bottom_menu'
import { useUnit } from 'effector-react'

export const Skill = () => {
    const [animationActiveTab, changeTransition] = useUnit([bottom_menu_model.$animationActiveTab, bottom_menu_model.changeTransition])
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        if (animationActiveTab === 1) {
            changeTransition(300)
            setTimeout(() => {
                setIsActive(true)
            }, 400)
        } else {
            changeTransition(0)
            setIsActive(false)
        }

    }, [animationActiveTab])

    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation} style={{ transform: isActive ? '' : 'translateY(-20vh)', transition: isActive ? '0.3s' : '0.2s' }}>
                <Navigation prev={() => { }} home={() => { }} />
            </div>
        </div>
    )
}
