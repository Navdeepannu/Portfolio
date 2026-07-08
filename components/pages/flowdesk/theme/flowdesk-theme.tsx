import type { ReactNode } from 'react'

import styles from './flowdesk-theme.module.css'

type FlowDeskThemeProps = {
  children: ReactNode
}

export function FlowDeskTheme({ children }: FlowDeskThemeProps) {
  return <div className={`${styles.theme} ${styles.frame}`}>{children}</div>
}
