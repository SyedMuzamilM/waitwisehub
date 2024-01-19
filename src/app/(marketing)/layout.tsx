import { Header } from '@/components/header'
import React from 'react'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
        <body>
            <Header />
            {children}
        </body>
    </React.Fragment>
  )
}

export default MarketingLayout