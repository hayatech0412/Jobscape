import CheckCircleIcon from "@/Components/Icons/CheckCircleIcon";

export default function CustomTable({ headers, values }) {
    const getWidth = (header) => {
        switch (header) {
            case 'name':
                return 'flex-1';
            case 'note':
                return 'flex-1';
            default:
                return 'w-[80px] md:w-[120px]';
        }
    }

    const getValue = (value, header) => {
        switch (header) {
            case 'referrer':
                return <span>
                    <span className="text-xs">{value['referrer_kana']}</span><br />
                    <span >{value['referrer']}</span>
                </span>
            case 'status':
                switch (value[header]) {
                    case 6:
                        return <span className="flex items-center justify-center text-checkout"><CheckCircleIcon width="6" height="6" color={'#03b608'} />{value['status_text']}</span>
                    case 0:
                        return <span className="text-red-600">▲未対応</span>
                    default :
                        return value['status_text']
                }
            case 'note':
                return <span className="text-left max-h-[3rem] overflow-hidden text-ellipsis line-clamp-2 webkit-box text-xs" dangerouslySetInnerHTML={{__html:value[header]}}></span>
            
            default:
                return value[header];
        }
    }

    const goToDetail = (id) => () => {
        window.location.href = `/company/orders/${id}`;
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <div className="min-w-[800px]">
                <div className="flex justify-between items-center bg-white rounded-lg py-3 px-4">
                    {headers.map((header, index) => (
                        <div className={`${getWidth(header.value)} text-center text-xs`} key={index}>{header.text}</div>
                    ))}
                </div>
                <div className=" border-gray-200">
                    {values.map((value, index) => (
                        <div onClick={goToDetail(value['id'])} className="mt-4 flex justify-between items-center bg-white rounded-lg py-4 px-4 hover:text-white hover:bg-primary hover:shadow-md hover:shadow-blue-600/50" key={index}>
                            {
                                headers.map((header, index) => (
                                    <div className={`px-2 ${getWidth(header.value)} text-center`} key={index}>
                                        {getValue(value, header.value)}
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
