export default function Pagination({ meta = {}, links = {} }) {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const currentPage = meta.current_page || 1;
        const lastPage = meta.last_page || 1;

        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, "...", lastPage);
            } else if (currentPage > lastPage - 3) {
                pageNumbers.push(
                    1,
                    "...",
                    lastPage - 3,
                    lastPage - 2,
                    lastPage - 1,
                    lastPage
                );
            } else {
                pageNumbers.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    lastPage
                );
            }
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center mt-12">
            <a
                href={links.prev || '#'}
                className={`mx-1 flex justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded-full mr-12 ${
                    !links.prev ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={(e) => !links.prev && e.preventDefault()}
            >
                &lt;
            </a>
            {renderPageNumbers().map((pageNumber, index) => (
                <a
                    key={index}
                    href={typeof pageNumber === 'number' ? `?page=${pageNumber}` : '#'}
                    className={`mx-1 px-1 py-1 ${
                        meta.current_page === pageNumber ? "text-primary" : "text-black"
                    }`}
                    onClick={(e) => typeof pageNumber !== 'number' && e.preventDefault()}
                >
                    {pageNumber}
                </a>
            ))}
            <a
                href={links.next || '#'}
                className={`mx-1 flex justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded-full ml-12 ${
                    !links.next ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={(e) => !links.next && e.preventDefault()}
            >
                &gt;
            </a>
        </div>
    );
}
