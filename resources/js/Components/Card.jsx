export default function Card({ isLink, children, className, color }) {
    return (
        <div
            className={
                `rounded-lg shadow-md px-2 py-2 ${color? color : 'bg-white'} ${(isLink ? " hover:bg-blue-100" : "")}`
            }
        >
            {children}
        </div>
    );
}
