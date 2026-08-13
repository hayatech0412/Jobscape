import { useState } from "react";
import ToggleIcon from "../Icons/ToggleIcon";

export default function Faqitem({title, description, className}) {
    const [active, setActive] = useState(false);
    return (
        <dl className={`${className} rounded-lg border overflow-hidden p-0 ${active ? 'border-blue-500' : 'border-gray-200'}`}>
            <dt className={`px-8 py-3 flex items-center justify-between border ${active ? 'text-white bg-blue-500 border-none' : 'border-gray-200'}`} onClick={() => setActive(!active)}>
                <span className="block flex-1">{title}</span>
                <ToggleIcon active={active} className=""/>
            </dt>
            <dd className={`px-8 py-3 ${active ? 'block' : 'hidden'}`}>
                {description}
            </dd>
        </dl>
    )
}