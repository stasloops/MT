import React, { FC } from 'react'
import styles from './navigation.module.scss'
import clsx from 'clsx'
import { PrevIcon } from '@/shared/ui/icons'

interface Props {
    prev: () => void;
    home: () => void
}

export const Navigation: FC<Props> = ({ prev, home }) => {
    return (
        <div className={styles.navigation}>
            <div onClick={prev} className={styles.button_left_wrapper}>
                <div className={clsx(styles.button, styles.button_left)}>
                    <PrevIcon className={styles.icon_prev} />
                </div>
            </div>
            <div onClick={home} className={styles.button_right_wrapper}>
                <div className={clsx(styles.button, styles.button_right)}> </div>
            </div>
        </div>
    )
}
