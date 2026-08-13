import LinkIcon from "./LinkIcon";

export default function SliderPrevIcon({className}) {
    return (
        <button
            className={
                "bg-white border cursor-pointer rounded-full w-[30px] h-[30px] flex items-center justify-center " +
                className
            }
        >
            <LinkIcon width="4" height="4" className="rotate-180" />
        </button>
    );
}
