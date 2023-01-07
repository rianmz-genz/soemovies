import React, { FC, ReactNode } from 'react'
interface BannerProps {
    children: ReactNode
}
const Banner: FC<BannerProps> = ({ children }) => {
    return (
        <div
            className={`w-screen h-[600px] bg-[url('/images/background.jpg')] bg-cover bg-center bg-no-repeat`}
        >
            <div className="w-full h-full bg-gradient-to-bl from-black to-black/[.5] flex justify-center items-center px-7 relative">
                <div className="flex flex-col gap-6 w-full max-w-[600px]">{children}</div>
            </div>
        </div>
    )
}

export default Banner