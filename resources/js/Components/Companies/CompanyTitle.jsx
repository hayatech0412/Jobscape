export default function CompanyTitle({children}) {
    return (
        <div className="w-full py-[20px]">
            <h1 className="text-2xl font-bold flex items-center">{children}</h1>
        </div>
    );
}