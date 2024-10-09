import { skill_page_model } from '@/entities/skill'
import { configuration_model } from '@/shared/model/configuration'
import { Header, Navigation } from '@/shared/ui/design_system'
import { useUnit } from 'effector-react'
import React from 'react'
import styles from './top_bar.module.scss'

export const TopBar = () => {
    const [activeTool] = useUnit([configuration_model.$activeTool])
    const [skillPage, routeSkillPage] = useUnit([skill_page_model.$page, skill_page_model.routePage])

    return (
        <div className={styles.wrapper}>
            {skillPage === 'skill_list' || activeTool !== 'skills' ? <Header /> : null}
            {skillPage === 'skill' && activeTool === 'skills' && <Navigation prev={() => routeSkillPage({ path: 'skill_list' })} home={() => routeSkillPage({ path: 'skill_list' })} />}

        </div>
    )
}
