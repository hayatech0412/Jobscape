export default function ProductItem(props) {
    return (
        <div className={"w-full"}>
            <div className="avatar-part w-full relative">
                <img
                    className="w-full"
                    src="/storage/products/product_250107_1.png"
                    alt="商材サンムーネール"
                />
                <div className="absolute w-full h-full bg-black bg-opacity-40 top-0 right-0 flex items-center justify-center">
                    <span className="text-white font-semibold">調査中</span>
                </div>
            </div>

            <div className="category-part overflow-x-auto overscroll-x-none whitespace-pre mt-2 items-center justify-start text-[11px]">
                <span className="inline-block mb-2 mr-2 border px-4 py-1 rounded-full text-gray-600">
                    不動産
                </span>
            </div>

            <div className="name-part mt-1">
                <h2 className="font-semibold text-[14px] line-clamp-2">
                    「楽々でんきライトシンプルプラン」販売代理店の販売代理店て...
                </h2>
            </div>

            <div className="company-part mt-2 text-gray-500 text-[12px]">株式会社テキストが入る</div>

            <div className="price-part mt-1 font-semibold text-[16px]">￥1,980</div>
        </div>
    );
}
