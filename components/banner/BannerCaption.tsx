import React from 'react'
import { FC } from 'react'
interface BannerCaptionProps {
    title: string
    description: string
}
const BannerCaption: FC<BannerCaptionProps> = ({description,title}) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-white text-5xl font-semibold text-center">{title}</h1>
            <p className="text-white text-lg text-center md:text-xl font-normal max-w-[400px] mx-auto">
                {description}
            </p>
        </div>
    )
}

export default BannerCaption