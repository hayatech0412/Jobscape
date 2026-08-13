import CompanyTitle from "@/Components/Companies/CompanyTitle";
import LinkIcon from "@/Components/Icons/LinkIcon";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import OfficeInfo from "../Register/OfficeInfo";
import InputError from "@/Components/InputError";
import CustomRadioButtons from "@/Components/CustomRadioButtons";

export default function Office({ 
    company, 
    managers,
    operator_types, 
}) {
    const { data, setData, post, errors } = useForm(null);

    const [office, setOffice] = useState(null);
    const [workers, setWorkers] = useState([]);
    const [isOfficeEdit, setIsOfficeEdit] = useState(false);
    const [isMasterEdit, setIsMasterEdit] = useState(false);
    const [isWorkerEdit, setIsWorkerEdit] = useState(false);

    const dataWatcher = useMemo(
        () => {
            setData(office);
        },
        [office],
        true
    );

    useEffect(() => {
        if (company) {
            setOffice(company);
        }

        if (managers) {
            setWorkers(managers);
        }
    }, [company, managers]);

    const handleClickEdit = (e) => {
        e.preventDefault();
        const { name, id } = e.target;

        toggleEidtUI(name, id);
    };

    const handleInputChange = (e) => {
        const { id, name, value } = e.target;
        const index = e.target.getAttribute("index");

        if (index === "main" || index === "master") {
            const newAddress = `${office.pref}${office.city}${office.area}${office.street}${office.building}`;
            setOffice({ ...office, [name]: value, full_address: newAddress });
        } else if (index === "worker") {
        }
    };

    const setOperatorType = (value) => {
        setOffice({ ...office, operator_type: value });
    }

    const handleSubmit = (e) => {
        const { id, name } = e.target;
        e.preventDefault();

        toggleEidtUI(name, id);

        post(route("company.settings.update.office"));
    };

    const toggleEidtUI = (name) => {
        if (name === "main") {
            const isEdit = !isOfficeEdit;
            setIsOfficeEdit(isEdit);
        } else if (name === "master") {
            setIsMasterEdit(!isMasterEdit);
        } else if (name === "worker") {
        }
    };

    return (
        <CompanyAuthLayout>
            <div className="px-16 py-4">
                {office && (
                    <form name="main" onSubmit={handleSubmit}>
                        <div className="mt-16 rounded-lg bg-white md:p-16 p-4 relative">
                            <CompanyTitle>事業者情報</CompanyTitle>

                            <div className="mt-4 mb-16">
                                <div className="flex items-center justify-between py-4">
                                    <h2 className="text-[20px] font-semibold">
                                        基本情報
                                    </h2>

                                    <div className="flex items-center justify-between gap-2">
                                        {isOfficeEdit && (
                                            <Link
                                                href={route(
                                                    "company.settings.office"
                                                )}
                                                className="text-[16px] text-white font-semibold bg-gray-400 rounded-full py-2 px-4 hover:bg-gray-600"
                                            >
                                                リセット
                                            </Link>
                                        )}
                                        <button
                                            type={
                                                isOfficeEdit
                                                    ? "submit"
                                                    : "button"
                                            }
                                            name="main"
                                            className={`text-[16px] font-semibold ${
                                                isOfficeEdit
                                                    ? "text-white bg-primary rounded-full py-2 px-6 hover:bg-blue-800"
                                                    : "text-primary hover:text-blue-400"
                                            }`}
                                            onClick={
                                                isOfficeEdit
                                                    ? handleSubmit
                                                    : handleClickEdit
                                            }
                                        >
                                            {isOfficeEdit ? "保存" : "編集"}
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-l-0 border-r-0 border-b-0">
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            会社名
                                        </p>
                                        {isOfficeEdit ? (
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    name="office_name"
                                                    index="main"
                                                    className="p-2 border border-gray-300 rounded-md w-full text-right"
                                                    onChange={handleInputChange}
                                                    value={
                                                        office.office_name ?? ""
                                                    }
                                                />
                                                {errors.office_name && (
                                                    <InputError
                                                        message={
                                                            errors.office_name
                                                        }
                                                        className="mt-1 text-[12px] text-right"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.office_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            会社名カナ
                                        </p>
                                        {isOfficeEdit ? (
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    name="office_name_kana"
                                                    index="main"
                                                    className="p-2 border border-gray-300 w-full rounded-md flex-1 text-right"
                                                    onChange={handleInputChange}
                                                    value={
                                                        office.office_name_kana ??
                                                        ""
                                                    }
                                                />
                                                {errors.office_name_kana && (
                                                    <InputError
                                                        message={
                                                            errors.office_name_kana
                                                        }
                                                        className="mt-1 text-[12px] text-right"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.office_name_kana}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            事業形態
                                        </p>
                                        {isOfficeEdit ? (
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    name="office_type_name"
                                                    index="main"
                                                    className="p-2 border border-gray-300 w-full rounded-md flex-1 text-right"
                                                    onChange={handleInputChange}
                                                    value={
                                                        office.office_type_name ?? ""
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.office_type_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            法人番号
                                        </p>
                                        {isOfficeEdit ? (
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    name="coporate_code"
                                                    index="main"
                                                    className="p-2 border border-gray-300 w-full rounded-md flex-1 text-right"
                                                    onChange={handleInputChange}
                                                    value={
                                                        office.coporate_code ??
                                                        ""
                                                    }
                                                />
                                                {errors.coporate_code && (
                                                    <InputError
                                                        message={
                                                            errors.coporate_code
                                                        }
                                                        className="mt-1 text-[12px] text-right"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.coporate_code}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            住所
                                        </p>
                                        {isOfficeEdit ? (
                                            <div className="flex-1 flex items-center justify-between gap-1">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="pref"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.pref ?? ""
                                                        }
                                                    />
                                                    {errors.pref && (
                                                        <InputError
                                                            message={
                                                                errors.pref
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.city ?? ""
                                                        }
                                                    />
                                                    {errors.city && (
                                                        <InputError
                                                            message={
                                                                errors.city
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="area"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.area ?? ""
                                                        }
                                                    />
                                                    {errors.area && (
                                                        <InputError
                                                            message={
                                                                errors.area
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="street"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.street ?? ""
                                                        }
                                                    />
                                                    {errors.street && (
                                                        <InputError
                                                            message={
                                                                errors.street
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>

                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="building"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.building ??
                                                            ""
                                                        }
                                                    />
                                                    {errors.building && (
                                                        <InputError
                                                            message={
                                                                errors.building
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.full_address}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            電話番号
                                        </p>
                                        {isOfficeEdit ? (
                                            <input
                                                type="text"
                                                name="phone_number"
                                                index="main"
                                                className="p-2 border border-gray-300 rounded-md flex-1 text-right"
                                                onChange={handleInputChange}
                                                value={
                                                    office.phone_number ?? ""
                                                }
                                            />
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.phone_number ?? ""}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            事業者形態
                                        </p>
                                        {isOfficeEdit ? (
                                            <CustomRadioButtons id="operator_type" currentOption={office.operator_type} options={operator_types} onChange={setOperatorType} className="flex-row"/>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.operator_type_label ?? ""}
                                            </p>
                                        )}
                                    </div>
                                    {   office.operator_type == 1 && <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                            <p className="md:w-[180px] w-full py-4">
                                                インボイス番号
                                            </p>
                                            {isOfficeEdit ? (
                                                <input
                                                    type="text"
                                                    name="invoice_number"
                                                    index="main"
                                                    className="p-2 border border-gray-300 rounded-md flex-1 text-right"
                                                    onChange={handleInputChange}
                                                    value={
                                                        office.operator_type == 1 ? office.invoice_number : ""
                                                    }
                                                />
                                            ) : (
                                                <p className="md:mt-0 mt-2 py-4">
                                                    {office.invoice_number ?? ""}
                                                </p>
                                            )}
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="mb-16">
                                <div className="flex items-center justify-between py-4">
                                    <h2 className="text-[20px] font-semibold">
                                        代表者情報
                                    </h2>
                                    <div className="flex items-center justify-between gap-2">
                                        {isMasterEdit && (
                                            <Link
                                                href={route(
                                                    "company.settings.office"
                                                )}
                                                className="text-[16px] text-white font-semibold bg-gray-400 rounded-full py-2 px-4 hover:bg-gray-600"
                                            >
                                                リセット
                                            </Link>
                                        )}
                                        <button
                                            type={
                                                isMasterEdit
                                                    ? "submit"
                                                    : "button"
                                            }
                                            name="master"
                                            className={`text-[16px] font-semibold ${
                                                isMasterEdit
                                                    ? "text-white bg-primary rounded-full py-2 px-6 hover:bg-blue-800"
                                                    : "text-primary hover:text-blue-400"
                                            }`}
                                            onClick={
                                                isMasterEdit
                                                    ? handleSubmit
                                                    : handleClickEdit
                                            }
                                        >
                                            {isMasterEdit ? "保存" : "編集"}
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-l-0 border-r-0 border-b-0">
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            代表者名
                                        </p>
                                        {isMasterEdit ? (
                                            <div className="flex-1 flex items-center justify-between gap-2">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="office_master_last_name"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full text-right"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.office_master_last_name ??
                                                            ""
                                                        }
                                                    />
                                                    {errors.office_name && (
                                                        <InputError
                                                            message={
                                                                errors.office_master_last_name
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="office_master_first_name"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full text-right"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.office_master_first_name ??
                                                            ""
                                                        }
                                                    />
                                                    {errors.office_name && (
                                                        <InputError
                                                            message={
                                                                errors.office_master_first_name
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.full_office_master_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                        <p className="md:w-[180px] w-full py-4">
                                            代表者名カナ
                                        </p>
                                        {isMasterEdit ? (
                                            <div className="flex-1 flex items-center justify-between gap-2">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="office_master_last_kana"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full text-right"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.office_master_last_kana ??
                                                            ""
                                                        }
                                                    />
                                                    {errors.office_master_last_kana && (
                                                        <InputError
                                                            message={
                                                                errors.office_master_last_kana
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        name="office_master_first_name"
                                                        index="main"
                                                        className="p-2 border border-gray-300 rounded-md w-full text-right"
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        value={
                                                            office.office_master_first_kana ??
                                                            ""
                                                        }
                                                    />
                                                    {errors.office_master_first_kana && (
                                                        <InputError
                                                            message={
                                                                errors.office_master_first_kana
                                                            }
                                                            className="mt-1 text-[12px] text-right"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="md:mt-0 mt-2 py-4">
                                                {office.full_office_master_kana_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center justify-between py-4 border border-l-0 border-r-0 border-t-0">
                                    <h2 className="text-[20px] font-semibold">
                                        担当者情報
                                    </h2>
                                </div>
                                {workers.map((worker, index) => (
                                    <div key={index} className="mt-4">
                                        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                            <p className="md:w-[180px] w-full py-4">
                                                担当者{index + 1}
                                            </p>
                                            <button
                                                type="button"
                                                name="worker"
                                                id={index}
                                                className="text-primary text-[16px] font-semibold hover:text-blue-400"
                                                onClick={handleClickEdit}
                                            >
                                                編集
                                            </button>
                                        </div>
                                        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                            <p className="md:w-[180px] w-full py-4">
                                                担当者名
                                            </p>
                                            <p className="md:mt-0 mt-2 py-4">
                                                {worker.full_name}
                                            </p>
                                        </div>
                                        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                            <p className="md:w-[180px] w-full py-4">
                                                担当者名カナ
                                            </p>
                                            <p className="md:mt-0 mt-2 py-4">
                                                {worker.full_name_kana}
                                            </p>
                                        </div>
                                        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                            <p className="md:w-[180px] w-full py-4">
                                                電話番号
                                            </p>
                                            <p className="md:mt-0 mt-2 py-4">
                                                {worker.phone_number}
                                            </p>
                                        </div>
                                        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border border-l-0 border-r-0 border-t-0">
                                            <p className="md:w-[180px] w-full py-4">
                                                メールアドレス
                                            </p>
                                            <p className="md:mt-0 mt-2 py-4">
                                                {worker.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {workers.length === 0 && (
                                    <div className="flex justify-center items-center h-[100px]">
                                        <p>担当者情報がありません</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                )}

                {/* <div className="mt-16 rounded-lg bg-white p-20 relative">
                    <h3 className="text-[20px] font-semibold">重要な操作</h3>
                    <div className="flex items-center justify-between mt-8 py-4 border-b-[1px] border-gray-300">
                        <div className="text-[14px]">
                            事業者情報の権限を担当者に付与する
                        </div>
                        <form onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                name="delete"
                                className="text-primary text-[14px] hover:opacity-50"
                            >
                                編集
                            </button>
                        </form>
                    </div>

                    <div className="flex items-center justify-between mt-8 py-4 border-b-[1px] border-gray-300">
                        <div className="text-[14px] flex items-center justify-start gap-1 relative">
                            <span>アカウントを削除する</span>

                            <div className="group relative flex justify-center">
                                <button
                                    type="button"
                                    className="border border-pink-dark w-[24px] h-[24px] flex items-center justify-center text-center text-pink-dark text-[16px] font-semibold rounded-full"
                                >
                                    !
                                </button>
                                <div className="absolute top-9 scale-0 transition-all rounded-sm bg-pink-dark p-2 text-xs text-white group-hover:scale-100 font-semibold w-fit whitespace-nowrap">
                                    <span className="w-[16px] h-[10px] border border-t-0 border-b-[10px] border-b-pink-dark border-r-[8px] border-r-transparent border-l-[8px] border-l-transparent absolute -top-[10px] left-1/2 -translate-x-1/2"></span>
                                    削除すると元に戻すことはできません。ご注意ください。
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                name="delete"
                                className="text-primary text-[14px] hover:opacity-50"
                            >
                                削除に進む
                            </button>
                        </form>
                    </div>

                    <div className="border-t-[1px] border-b-[1px] border-gray-300 mt-16">
                        <Link
                            href={route("company.settings.delete.account")}
                            className="flex items-center justify-between py-4 w-full hover:opacity-50"
                        >
                            <p className="text-[14px]">
                                アカウントを削除したい
                            </p>
                            <LinkIcon
                                width={6}
                                height={6}
                                className="text-primary"
                            />
                        </Link>
                    </div>
                </div> */}
            </div>
        </CompanyAuthLayout>
    );
}
