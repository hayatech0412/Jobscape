import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Inertia } from "@inertiajs/inertia";

export default function ProductsTable({ headers, values }) {
    const { data, setData, post, get } = useForm({ product: 0 });

    const [showModal, setShowModal] = useState(false);

    const handleClickDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const { id } = e.target;
        setData({ product: parseInt(id) });
        setShowModal(true);
    };

    const handleDeleteProduct = (e) => {
        e.preventDefault();
        setShowModal(false);
        post(route("company.products.delete", data.product));
    };

    const handleClickEdit = (e) => {
        setData({ product: e.target.id });
        get(route("company.products.edit", { id: e.target.id }));
        // window.location.href = route("company.products.edit", e.target.id);
    };

    const getWidth = (header) => {
        switch (header) {
            case "overview":
                return "flex-1";
            case "recurit_period":
                return "w-[120px] md:w-[135px]";
            case "rewards":
                return "w-[90px]";
            case "status_label":
                return "w-[80px]";
            case "actions":
                return "w-[80px]";
            default:
                return "w-[80px] md:w-[120px]";
        }
    };

    const getValue = (value, header) => {
        switch (header) {
            case "main_image":
                return (
                    <div className="object-contain">
                        <img
                            src={value.main_image}
                            alt={value.name}
                            className="w-inherit max-w-inherit"
                        />
                    </div>
                );

            case "overview":
                return (
                    <div className="line-clamp-4 h-[93px] py-2 text-left">
                        {value[header]}
                    </div>
                );
            case "status_label":
                return <div>{value[header]}</div>;
            case "actions":
                return (
                    <div className="flex flex-col items-center justify-center gap-1">
                        <Link
                            href={route("company.products.show", value.id)}
                            className="text-primary hover:text-blue-300"
                        >
                            詳細
                        </Link>
                        <Link
                            href={route("company.products.edit", value.id)}
                            className="text-teal-700 hover:text-teal-300"
                        >
                            編集
                        </Link>
                        <button
                            type="button"
                            id={value.id}
                            className="text-pink-dark hover:text-red-300"
                            onClick={handleClickDelete}
                        >
                            削除
                        </button>
                    </div>
                );
            default:
                return value[header];
        }
    };

    const goToDetail = (id) => () => {
        Inertia.visit(route("company.products.show", id));
    };

    return (
        <div className="mt-8 p-2 overflow-x-auto">
            <div className="min-w-[800px]">
                <div className="flex justify-between items-center bg-white rounded-lg py-3 px-4">
                    {headers.map((header, index) => (
                        <div
                            className={`${getWidth(
                                header.value
                            )} text-center text-xs`}
                            key={index}
                        >
                            {header.text}
                        </div>
                    ))}
                </div>
                <div className=" border-gray-200">
                    {values.map((value) => (
                        <div
                            className="mt-4 flex justify-between items-center bg-white rounded-lg py-4 px-4 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:shadow-gray-400/30"
                            key={value.id}
                        >
                            {headers.map((header, index) => (
                                <div
                                    className={`px-2 ${getWidth(
                                        header.value
                                    )} text-center break-all`}
                                    key={index}
                                >
                                    {getValue(value, header.value)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={showModal}>
                <form onSubmit={handleDeleteProduct} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        本当に削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        選択した商材を削除します。
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowModal(false)}>
                            キャンセル
                        </SecondaryButton>

                        <DangerButton className="ms-3">削除</DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
