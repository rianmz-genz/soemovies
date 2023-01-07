import React, { ChangeEventHandler } from 'react'
import { KeyboardEventHandler } from 'react'
import { FC } from 'react'
import { FiSearch } from 'react-icons/fi'
interface HeaderSearchInputProps {
    onChange: ChangeEventHandler<HTMLInputElement>
    onKeyUp?: KeyboardEventHandler<HTMLInputElement>
    value: string
}
const HeaderSearchInput: FC<HeaderSearchInputProps> = ({
    onChange,
    onKeyUp,
    value,
}) => {
    return (
        <label className="px-4 py-3 bg-slate-700 hover:bg-slate-800 flex-grow rounded flex gap-4 items-center cursor-text">
            <FiSearch className="text-lg text-white" />
            <input
                defaultValue={value}
                type="search"
                className="flex-grow text-sm text-white placeholder:text-white/[10] bg-transparent w-12"
                placeholder="Search Image"
                onChange={onChange}
                onKeyUp={onKeyUp}
                value={value}
            />
        </label>
    )
}

export default HeaderSearchInput
