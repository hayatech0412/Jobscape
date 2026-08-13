export default function ToggleIcon({className, size, active}) {
    return (
        <button className="cursor-pointer relative w-4 h-4">
            <span className={`block absolute w-full h-[1px] top-1/2 bg-black transition-transform duration-300 ${active ? 'bg-white' : ''}`}></span>
            <span className={`block absolute w-full h-[1px] top-1/2 bg-black transition-transform duration-300 ${active ? 'rotate-0 bg-white' : 'rotate-90'}`}></span>
        </button>
    )
}