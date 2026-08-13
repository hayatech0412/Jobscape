import { useMemo, useRef, useState } from "react";
import CompanyDeployItem from "@/Components/Companies/CompanyDeployItem";
import CompanyTitle from "@/Components/Companies/CompanyTitle";
import DateSimplePicker from "@/Components/DateSimplePicker";
import FaqItem from "@/Components/Companies/FaqItem";
import FaqItemInput from "@/Components/Companies/FaqItemInput";
import ImageIcon from "@/Components/Icons/ImageIcon";
import PlusIcon from "@/Components/Icons/PlusIcon";
import QuestionIcon from "@/Components/Icons/QuestionIcon";
import TrashCanIcon from "@/Components/Icons/TrashCanIcon";
import ProductSchedule from "@/Components/Companies/ProductSchedule";
import CompanyAuthLayout from "@/Layouts/Company/CompanyAuthLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import AdminAuthLayout from "@/Layouts/Admin/AdminAuthLayout";

export default function Edit() {
    const { originProduct, categories, area_categories, period_units } =
        usePage().props;
    console.log(originProduct);
    const { data, setData, post, errors } = useForm({});

    const [product, setProduct] = useState({
        id: originProduct.id ?? 0,
        name: originProduct.name ?? "",
        categories:
            originProduct.categories.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                };
            }) ?? [],
        custom_category: originProduct.custom_category ?? "",
        is_custom_category: false,
        image: originProduct.image ?? "",
        image_path: originProduct.image_path
            ? originProduct.image_path
            : originProduct.thumb_path,
        image_file: undefined,
        images: originProduct.attachments ?? [],
        overview: originProduct.overview ?? "",
        introduction1: originProduct.introduction1 ?? {
            image: "",
            image_file: undefined,
            detail_overview: "",
        },
        introduction2: originProduct.introduction2 ?? {
            image: "",
            image_file: undefined,
            detail_overview: "",
        },
        introduction1: originProduct.introduction1 ?? {
            image: "",
            image_file: undefined,
            detail_overview: "",
        },
        introduction2: originProduct.introduction2 ?? {
            image: "",
            image_file: undefined,
            detail_overview: "",
        },
        youtube_url: originProduct.youtube_url ?? "",
        response_prefs: originProduct.response_prefs ?? [],
        overseas:
            originProduct.overseas !== null
                ? originProduct.overseas.join(",")
                : "",
        target_type: originProduct.target_type
            ? `${originProduct.target_type}`
            : "0",
        condition: originProduct.condition ?? "",
        approach: originProduct.approach ?? "メール",
        benefits: originProduct.benefits ?? "",
        capacity_license: originProduct.capacity_license ?? "",
        capacity_code: originProduct.capacity_code ?? "",
        product_code: originProduct.product_code ?? "",
        publish_at: originProduct.publish_at_label ?? "",
        deploies: originProduct.deploies.length
            ? originProduct.deploies.map((item) => {
                  return item.deploy_name;
              })
            : [""],
        is_recurit_period: originProduct.is_recurit_period
            ? `${originProduct.is_recurit_period}`
            : "0",
        recurit_start: originProduct.recurit_start ?? "",
        recurit_end: originProduct.recurit_end ?? "",
        apply_count: originProduct.apply_count
            ? `${originProduct.apply_count}`
            : "0",
        introduction_type: originProduct.introduction_type
            ? `${originProduct.introduction_type}`
            : "0",
        reward_type: originProduct.reward_type
            ? `${originProduct.reward_type}`
            : "1",
        reward_amount_money:
            originProduct.reward_type === 1 ? originProduct.reward_amount : "",
        reward_amount_percent:
            originProduct.reward_type === 2 ? originProduct.reward_amount : "",
        introduction_condition: originProduct.introduction_condition ?? "",
        introduction_memo: originProduct.introduction_memo ?? "",
        transaction_period: originProduct.transaction_period ?? "",
        transaction_period_unit: originProduct.transaction_period_unit
            ? `${originProduct.transaction_period_unit}`
            : "0",
        schedules: originProduct.schedules.length
            ? originProduct.schedules.map((item) => {
                  return {
                      title: item.title,
                      start_amount: item.start_amount,
                      start_unit: item.start_unit,
                      end_amount: item.end_amount,
                      end_unit: item.end_unit,
                  };
              })
            : [],
        faqs: originProduct.faqs.length
            ? originProduct.faqs.map((item) => {
                  return {
                      question: item.question,
                      answer: item.answer,
                  };
              })
            : [],
    });

    const [existCustomCategory, setExistCustomCategory] = useState(
        originProduct &&
            originProduct.custom_category &&
            originProduct.custom_category !== ""
    );
    const [nameLength, setNameLength] = useState(25);
    const [isImagesFull, setIsImagesFull] = useState(
        originProduct && originProduct.attachments.length === 15
    );
    const [overviewLength, setOverviewLength] = useState(200);
    const [detailOverview1Length, setDetailOverview1Length] = useState(1000);
    const [detailOverview2Length, setDetailOverview2Length] = useState(1000);
    const [isOverseas, setIsOverseas] = useState(
        originProduct.overseas ? originProduct.overseas.length : 0
    );
    const [conditionLength, setConditionLength] = useState(300);
    const [isDefaultApproach, setIsDefaultApproach] = useState(
        originProduct.approach === "メール"
    );
    const [benefitsLength, setBenefitsLength] = useState(300);
    const [isDeployFull, setISDeployFull] = useState(
        originProduct && originProduct.deploies.length === 16
    );
    const [isRecuritPeriod, setIsRecuritPeriod] = useState(
        originProduct && originProduct.is_recurit_period
    );
    const [isLimited, setIsLimited] = useState(
        originProduct && originProduct.is_limited
    );
    const [introductionContLength, setIntroductionCondLength] = useState(300);
    const [introductionMemoLength, setIntroductionMemoLength] = useState(300);
    const [newFaq, setNewFaq] = useState({
        question: "",
        answer: "",
    });

    // states for front validation
    const [isEmptyCustomCategory, setIsEmptyCustomCategory] = useState(false);
    const [isEmptyOverseas, setIsEmptyOverseas] = useState(false);
    const [isEmptyDeploy, setIsEmptyDeploy] = useState(false);
    const [isEmptyApplyCount, setIsEmptyApplyCount] = useState(false);
    const [isEmptySchedule, setIsEmptySchedule] = useState(false);
    const [isEmptyFaq, setIsEmptyFaq] = useState(false);

    const mainImageRef = useRef();
    const subImageRef = useRef();
    const detailImage1Ref = useRef();
    const detailImage2Ref = useRef();

    const dataWatcher = useMemo(() => {
        setData({ ...data, ...product });
    }, [product]);

    const handleInputChange = (e) => {
        const { name, id, value } = e.target;
        const inputted =
            name === "limit_count" ||
            name.includes("start_amount") ||
            name.includes("end_amount") ||
            name === "apply_count" ||
            name === "transaction_period" ||
            name.includes("reward_amount_")
                ? value.replace(/\D/g, "")
                : value;

        if (name === "detail_overview") {
            if (parseInt(id) === 1) {
                setProduct({
                    ...product,
                    introduction1: {
                        ...product.introduction1,
                        [name]: inputted,
                    },
                });
                setDetailOverview1Length(1000 - inputted.length);
            } else {
                setProduct({
                    ...product,
                    introduction2: {
                        ...product.introduction1,
                        [name]: inputted,
                    },
                });
                setDetailOverview2Length(1000 - inputted.length);
            }
        } else if (name.includes("schedule_")) {
            const newName = name.replace("schedule_", "");
            const index = parseInt(id.replace(`${name}_`, ""));
            const newSchedule = {
                ...product.schedules[index],
                [newName]: inputted,
            };
            const newSchedules = product.schedules.map((schedule, i) => {
                return i === index ? newSchedule : schedule;
            });
            setProduct({ ...product, schedules: newSchedules });
        } else if (name === "question") {
            setNewFaq({ ...newFaq, question: inputted });
        } else if (name === "answer") {
            setNewFaq({ ...newFaq, answer: inputted });
        } else {
            setProduct({ ...product, [name]: inputted });
        }

        if (name === "name") {
            setNameLength(25 - inputted.length);
        } else if (name === "overview") {
            setOverviewLength(200 - inputted.length);
        } else if (name === "condition") {
            setConditionLength(300 - inputted.length);
        } else if (name === "benefits") {
            setBenefitsLength(300 - inputted.length);
        } else if (name === "introduction_condition") {
            setIntroductionCondLength(300 - inputted.length);
        } else if (name === "introduction_memo") {
            setIntroductionMemoLength(300 - inputted.length);
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, id, checked } = e.target;
        if (name === "category") {
            if (
                checked &&
                (product.categories.length === 3 ||
                    (product.categories.length === 2 && existCustomCategory))
            ) {
                confirm("カテゴリは３つまでだけ選択できないです。");
            } else {
                const checkedCategories = checked
                    ? [
                          ...product.categories,
                          ...categories.filter(
                              (item) => item.id === parseInt(id)
                          ),
                      ]
                    : product.categories.filter(
                          (category) => category.id !== parseInt(id)
                      );
                setProduct({ ...product, categories: checkedCategories });
                const selected = categories.filter(
                    (category) => category.id === parseInt(id)
                );
                if (selected.length > 0 && selected[0].name === "その他") {
                    setExistCustomCategory(checked);
                }
            }
        } else if (name === "is_limited") {
            setProduct({ ...product, is_limited: checked });
        } else if (name === "exist_custom_category") {
        } else if (name === "response_prefs") {
            if (checked) {
                if (id === "全国") {
                    setProduct({
                        ...product,
                        response_prefs: ["全国", ...area_categories],
                    });
                } else if (id === "海外") {
                    setIsOverseas(checked);
                } else {
                    var prefs = [];
                    const old_prefs = product.response_prefs;
                    if (old_prefs.length === 46) {
                        prefs = [...product.response_prefs, `${id}`, "全国"];
                    } else {
                        prefs = [...product.response_prefs, `${id}`];
                    }
                    setProduct({ ...product, response_prefs: prefs });
                }
            } else {
                if (id === "全国") {
                    setProduct({ ...product, response_prefs: [] });
                } else if (id === "海外") {
                    setIsOverseas(checked);
                } else {
                    var prefs = [];
                    if (product.response_prefs.length === 48) {
                        prefs = product.response_prefs.filter((pref) => {
                            return pref !== id && pref !== "全国";
                        });
                    } else {
                        prefs = product.response_prefs.filter(
                            (pref) => pref !== id
                        );
                    }
                    setProduct({ ...product, response_prefs: prefs });
                }
            }
        }
    };

    const handleCheckCustomCategory = (e) => {
        const { checked } = e.target;

        if (
            checked &&
            (product.categories.length === 3 ||
                (product.categories.length === 2 && existCustomCategory))
        ) {
            confirm("カテゴリは３つまでだけ選択できないです。");
        } else {
            setExistCustomCategory(checked);
            setProduct({ ...product, is_custom_category: checked });
        }
    };

    const handleChangeRadio = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        if (name === "approach") {
            setIsDefaultApproach(value === "メール" || value === "電話");
        } else if (name === "is_recurit_period") {
            setIsRecuritPeriod(value !== "0");
        } else if (name === "apply_count") {
            setIsLimited(value !== "0");
        }
    };

    const handleClickImage = (e) => {
        const { name } = e.target;
        if (name === "image") {
            mainImageRef.current.click();
        } else if (name === "sub_image") {
            subImageRef.current.click();
        } else if (name === "detail_image_1") {
            detailImage1Ref.current.click();
        } else if (name === "detail_image_2") {
            detailImage2Ref.current.click();
        }
    };

    const handleSelectedImage = (e) => {
        const { name, files } = e.target;
        if (name === "image") {
            setProduct({
                ...product,
                image: files[0].name,
                image_file: files[0],
            });
        } else if (name === "sub_image") {
            console.log("sub_image: ", files[0].name, files[0]);
            const subImageCount = product.images.length;
            const images = [
                ...product.images,
                {
                    index: subImageCount,
                    image: files[0].name,
                    image_file: files[0],
                },
            ];
            setProduct({ ...product, images: images });
            setIsImagesFull(product.images.length === 15);
        } else if (name === "detail_image_1") {
            setProduct({
                ...product,
                introduction1: {
                    ...product.introduction1,
                    image: files[0].name,
                    image_file: files[0],
                },
            });
        } else if (name === "detail_image_2") {
            setProduct({
                ...product,
                introduction2: {
                    ...product.introduction2,
                    image: files[0].name,
                    image_file: files[0],
                },
            });
        }
    };

    const handleClickDelete = (name, id) => {
        if (name === "image") {
            setProduct({
                ...product,
                image: "",
                image_file: undefined,
                image_path: "",
            });
        } else if (name === "sub_image") {
            const images = product.images;
            images.splice(id, 1);
            setProduct({ ...product, images: images });
        } else if (name === "intro_image_1") {
            setProduct({
                ...product,
                introduction1: {
                    ...product.introduction1,
                    image: "",
                    image_file: undefined,
                    image_path: "",
                },
            });
        } else if (name === "intro_image_2") {
            setProduct({
                ...product,
                introduction2: {
                    ...product.introduction2,
                    image: "",
                    image_file: undefined,
                    image_path: "",
                },
            });
        }
    };

    const handleDeployChange = (e) => {
        const { value } = e.target;

        const index = parseInt(e.target.getAttribute("index"));

        const newDeploies = product.deploies.map((deploy, i) => {
            return i === index ? value : deploy;
        });

        setProduct({ ...product, deploies: newDeploies });
    };

    const handleDeployAdd = () => {
        const emptyDeploies = product.deploies.filter(
            (deploy) => deploy === ""
        );
        if (emptyDeploies.length === 0) {
            const newDeploies = [...product.deploies, ""];
            setProduct({ ...product, deploies: newDeploies });
            setISDeployFull(newDeploies.length === 16);
            setIsEmptyDeploy(false);
        } else {
            setIsEmptyDeploy(true);
        }
    };

    const handleDeployDelete = (e) => {
        const index = parseInt(e.target.getAttribute("index"));
        const newDeploies = product.deploies.filter((_, i) => i !== index);
        setProduct({ ...product, deploies: newDeploies });
        setISDeployFull(false);
    };

    const handleSelectedDate = (name, date) => {
        setProduct({ ...product, [name]: date });
    };

    const handleScheduleAdd = (e) => {
        const emptySchedules = product.schedules.filter((schedule) => {
            return (
                schedule.title === "" ||
                schedule.start_amount === "" ||
                schedule.start_unit === "" ||
                schedule.end_amount === "" ||
                schedule.end_unit === ""
            );
        });

        if (emptySchedules.length > 0) {
            setIsEmptySchedule(true);
        } else {
            setIsEmptySchedule(false);
            const newSchedules = [
                ...product.schedules,
                {
                    title: "",
                    start_amount: "0",
                    start_unit: "日",
                    end_amount: "0",
                    end_unit: "日",
                },
            ];
            setProduct({ ...product, schedules: newSchedules });
        }
    };

    const handleScheduleDelete = (e) => {
        const { id } = e.target;
        const newSchedules = product.schedules.filter(
            (_, index) => index !== parseInt(id)
        );
        setProduct({ ...product, schedules: newSchedules });
    };

    const handleFaqAdd = () => {
        const newFaqs = [...product.faqs, newFaq];
        if (newFaq.question === "" || newFaq.answer === "") {
            setIsEmptyFaq(true);
        } else {
            setIsEmptyFaq(false);
            setProduct({ ...product, faqs: newFaqs });
            setNewFaq({
                question: "",
                answer: "",
            });
        }
    };

    const handleFaqDelete = (e) => {
        const { id } = e.target;
        const newFaqs = product.faqs.filter(
            (_, index) => index !== parseInt(id)
        );
        setProduct({ ...product, faqs: newFaqs });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (existCustomCategory && product.custom_category === "") {
            setIsEmptyCustomCategory(true);
            return;
        }
        if (isOverseas && product.overseas === "") {
            setIsEmptyOverseas(true);
            return;
        }
        if (isLimited && product.apply_count === "") {
            setIsEmptyApplyCount(true);
            return;
        }

        setIsEmptyCustomCategory(false);
        setIsEmptyOverseas(false);
        setIsEmptyDeploy(false);
        setIsEmptyApplyCount(false);
        setIsEmptySchedule(false);
        setIsEmptyFaq(false);

        console.log('submited');
        post(route("admin.products.update", { product: product.id }));
    };

    return (
        <AdminAuthLayout>
            <div className="w-[92%] mx-auto mt-8 border rounded-lg shadow-lg bg-white pb-16">
                {product && (
                    <form onSubmit={handleSubmit} className="w-[92%] mx-auto block">
                        <div className="">
                            <div className="my-6">
                                <CompanyTitle>商材編集</CompanyTitle>
                            </div>

                            <div className="flex flex-wrap md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">カテゴリ</p>
                                    <p className="mt-2 text-[12px] text-gray-500">
                                        ※3つまで選択可能
                                    </p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-start gap-x-8 gap-y-2">
                                        {categories.map((category, index) => {
                                            return (
                                                <label
                                                    key={index}
                                                    htmlFor={category.id}
                                                    className="flex items-center justify-start gap-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="category"
                                                        id={category.id}
                                                        className="border border-gray-300 rounded"
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                        checked={
                                                            product.categories.filter(
                                                                (item) =>
                                                                    item.id ===
                                                                    category.id
                                                            ).length > 0
                                                        }
                                                    />
                                                    {category.name}
                                                </label>
                                            );
                                        })}
                                        <label
                                            htmlFor="custom_category"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="checkbox"
                                                name="category"
                                                id="custom_category"
                                                className="border border-gray-300 rounded"
                                                checked={existCustomCategory}
                                                onChange={handleCheckCustomCategory}
                                            />
                                            その他
                                            <input
                                                type="text"
                                                name="custom_category"
                                                className={`w-[100px] px-2 py-0 border rounded text-[14px] ${
                                                    existCustomCategory
                                                        ? "border-gray-300"
                                                        : "disabled:border-gray-100 disabled:cursor-not-allowed"
                                                }`}
                                                disabled={!existCustomCategory}
                                                value={
                                                    product.custom_category ?? ""
                                                }
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                    </div>

                                    {errors.categories && (
                                        <InputError
                                            message={errors.categories}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {isEmptyCustomCategory && (
                                        <InputError
                                            message="その他の項目を選択したら入力欄い必ず入力してください。"
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">商材名</p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full relative">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        maxLength={25}
                                        value={product.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded"
                                    />
                                    <span className="absolute top-3 right-3 text-gray-500">
                                        /{nameLength}
                                    </span>
                                    {errors.name && (
                                        <InputError
                                            message={errors.name}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">メイン画像</p>
                                    <p className="mt-2 text-[12px]">
                                        ※サムネイルに表示
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※A4(横) 比率が最適
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[600px] w-full">
                                    <button
                                        type="button"
                                        className="border border-primary flex items-center justify-center px-8 py-2 rounded-md gap-6 text-primary hover:text-gray-900 hover:text-blue-800 hover:border-blue-800"
                                        name="image"
                                        onClick={handleClickImage}
                                    >
                                        <div className="relative">
                                            <ImageIcon className="w-[24px] h-[24px] fill-[#a0a0a0] absolute -top-[13px] -right-[18px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                            <div className="flex items-center justify-center absolute -bottom-[14px] -left-[12px] w-[14px] h-[14px] border-primary border rounded-full bg-white hover:border-blue-800">
                                                <PlusIcon className="w-[10px] h-[10px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                            </div>
                                        </div>
                                        画像を追加
                                    </button>
                                    {errors.image && (
                                        <InputError
                                            message={errors.image}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {errors.image_file && (
                                        <InputError
                                            message={errors.image_file}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}

                                    <div className="mt-4 grid md:grid-cols-5 grid-cols-1 md:gap-4 gap-2 w-full">
                                        <div className="border rounded-sm aspect-3/2 object-fill relative">
                                            <>
                                                {product.image_file !==
                                                undefined ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            product.image_file
                                                        )}
                                                        alt="メイン画像"
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    product.image_path !== "" && (
                                                        <img
                                                            src={product.image_path}
                                                            alt="メイン画像"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    )
                                                )}
                                                {(product.image_file !==
                                                    undefined ||
                                                    product.image_path !== "") && (
                                                    <button
                                                        type="button"
                                                        name="image"
                                                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[14px]"
                                                        onClick={(e) =>
                                                            handleClickDelete(
                                                                "image",
                                                                0
                                                            )
                                                        }
                                                    >
                                                        <TrashCanIcon className="w-full hover:fill-[#333333]" />
                                                    </button>
                                                )}
                                            </>
                                        </div>
                                    </div>

                                    <input
                                        type="file"
                                        className="hidden"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        ref={mainImageRef}
                                        onChange={handleSelectedImage}
                                    />
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="flex items-center justify-start gap-x-1 font-semibold">
                                        <span>商材資料</span>
                                        <QuestionIcon />
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※15枚まで追加できます。
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[600px] w-full">
                                    <button
                                        type="button"
                                        name="sub_image"
                                        className={`border border-primary flex items-center justify-center px-8 py-2 rounded-md gap-6 text-primary ${
                                            isImagesFull
                                                ? "disabled:cursor-not-allowed disabled:text-gray-300"
                                                : "hover:text-gray-900 hover:text-blue-800 hover:border-blue-800"
                                        }`}
                                        disabled={isImagesFull}
                                        onClick={handleClickImage}
                                    >
                                        <div className="relative">
                                            <ImageIcon className="w-[24px] h-[24px] fill-[#a0a0a0] absolute -top-[13px] -right-[18px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                            <div className="flex items-center justify-center absolute -bottom-[14px] -left-[12px] w-[14px] h-[14px] border-primary border rounded-full bg-white hover:border-blue-800">
                                                <PlusIcon className="w-[10px] h-[10px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                            </div>
                                        </div>
                                        画像を追加
                                    </button>
                                    {errors.images && (
                                        <InputError
                                            message={errors.images}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {errors.images && errors.images.image && (
                                        <InputError
                                            message={errors.images.image}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {errors.images && errors.images.image_file && (
                                        <InputError
                                            message={errors.images.image_file}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}

                                    <input
                                        type="file"
                                        className="hidden"
                                        name="sub_image"
                                        id="sub_image"
                                        accept="image/*"
                                        ref={subImageRef}
                                        onChange={handleSelectedImage}
                                    />

                                    <div className="mt-4 grid md:grid-cols-5 grid-cols-2 gap-3 w-full">
                                        {Array(15)
                                            .fill(0)
                                            .map((__, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border rounded-sm aspect-3/2 object-fill relative"
                                                    >
                                                        {index <
                                                            product.images
                                                                .length && (
                                                            <>
                                                                {product.images[
                                                                    index
                                                                ].image_file ? (
                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            product
                                                                                .images[
                                                                                index
                                                                            ]
                                                                                .image_file
                                                                        )}
                                                                        alt="商材資料"
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={
                                                                            product
                                                                                .images[
                                                                                index
                                                                            ].url
                                                                        }
                                                                        alt="商材資料"
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    id={
                                                                        product
                                                                            .images[
                                                                            index
                                                                        ].index
                                                                    }
                                                                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[14px]"
                                                                    onClick={(e) =>
                                                                        handleClickDelete(
                                                                            "sub_image",
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashCanIcon className="w-full hover:fill-[#333333]" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">概要文</p>
                                    <p className="mt-2 text-[12px]">
                                        商材・サービス概要
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※最上部概要欄に表示
                                    </p>
                                    <p className="mt-2 text-[12px]">※200文字以内</p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="relative">
                                        <textarea
                                            name="overview"
                                            maxLength={200}
                                            rows="6"
                                            placeholder="サービスの特長、紹介会員がこの商材を紹介するメリットなどを書いて見ましょう。

    例：当サービスは、高品質なお水の提供やサーバー費用の実質無料特典など、多くの特長があります。業界最高水準のインセンティブ制度を導入しており、同商品を扱う他店より高い紹介手数料をお約束。収入アップを実現しやすい環境を整えています。"
                                            className="appearance-none w-full resize-none p-2 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                            value={product.overview}
                                            onChange={handleInputChange}
                                        >
                                            {product.overview}
                                        </textarea>

                                        <span className="absolute bottom-2 right-4 text-gray-500">
                                            /{overviewLength}
                                        </span>
                                    </div>

                                    {errors.overview && (
                                        <InputError
                                            message={errors.overview}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">商材紹介詳細１</p>
                                    <p className="mt-2 text-[12px]">
                                        ※中部商材紹介に表示
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※1000文字以内
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="md:max-w-[600px] w-full">
                                        <button
                                            type="button"
                                            className="border border-primary flex items-center justify-center px-8 py-2 rounded-md gap-6 text-primary hover:text-gray-900 hover:text-blue-800 hover:border-blue-800"
                                            name="detail_image_1"
                                            onClick={handleClickImage}
                                        >
                                            <div className="relative">
                                                <ImageIcon className="w-[24px] h-[24px] fill-[#a0a0a0] absolute -top-[13px] -right-[18px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                                <div className="flex items-center justify-center absolute -bottom-[14px] -left-[12px] w-[14px] h-[14px] border-primary border rounded-full bg-white hover:border-blue-800">
                                                    <PlusIcon className="w-[10px] h-[10px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                                </div>
                                            </div>
                                            画像を追加
                                        </button>

                                        {errors.introduction1 && (
                                            <InputError
                                                message={errors.introduction1}
                                                className="mt-1 text-[12px]"
                                            />
                                        )}
                                        {errors.introduction1 &&
                                            errors.introduction1.image && (
                                                <InputError
                                                    message={
                                                        errors.introduction1.image
                                                    }
                                                    className="mt-1 text-[12px]"
                                                />
                                            )}
                                        {errors.introduction1 &&
                                            errors.introduction1.image_file && (
                                                <InputError
                                                    message={
                                                        errors.introduction1
                                                            .image_file
                                                    }
                                                    className="mt-1 text-[12px]"
                                                />
                                            )}

                                        <input
                                            type="file"
                                            className="hidden"
                                            name="detail_image_1"
                                            id="detail_image_1"
                                            accept="image/*"
                                            ref={detailImage1Ref}
                                            onChange={handleSelectedImage}
                                        />
                                        {product.introduction1.image_file && (
                                            <div className="mt-4 grid md:grid-cols-5 grid-cols-1 md:gap-4 gap-2 w-full">
                                                <div className="border rounded-sm aspect-3/2 object-fill relative">
                                                    {(product.introduction1
                                                        .image_file !== undefined ||
                                                        product.introduction1
                                                            .image_path !== "") && (
                                                        <>
                                                            <img
                                                                src={
                                                                    product
                                                                        .introduction1
                                                                        .image_file !==
                                                                    undefined
                                                                        ? URL.createObjectURL(
                                                                            product
                                                                                .introduction1
                                                                                .image_file
                                                                        )
                                                                        : product
                                                                            .introduction1
                                                                            .image_path
                                                                }
                                                                alt="商材紹介詳細１画像"
                                                                className="w-full h-full object-contain"
                                                            />
                                                            <button
                                                                type="button"
                                                                name="detail_image_1"
                                                                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[14px]"
                                                                onClick={(e) =>
                                                                    handleClickDelete(
                                                                        "intro_image_1",
                                                                        0
                                                                    )
                                                                }
                                                            >
                                                                <TrashCanIcon className="w-full hover:fill-[#333333]" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 relative">
                                        <div className="relative">
                                            <textarea
                                                name="detail_overview"
                                                id="1"
                                                maxLength={1000}
                                                rows={16}
                                                className="appearance-none w-full resize-none p-2 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                                value={
                                                    product.introduction1
                                                        .detail_overview
                                                }
                                                onChange={handleInputChange}
                                            />
                                            <span className="absolute bottom-2 right-4 text-gray-500">
                                                /{detailOverview1Length}
                                            </span>
                                        </div>
                                        {errors.introduction1 &&
                                            errors.introduction1
                                                .detail_overview && (
                                                <InputError
                                                    message={
                                                        errors.introduction1
                                                            .detail_overview ?? ""
                                                    }
                                                    className="mt-1 text-[12px]"
                                                />
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">商材紹介詳細２</p>
                                    <p className="mt-2 text-[12px]">
                                        ※中部商材紹介に表示
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※1000文字以内
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="md:max-w-[600px] w-full">
                                        <button
                                            type="button"
                                            className="border border-primary flex items-center justify-center px-8 py-2 rounded-md gap-6 text-primary hover:text-gray-900 hover:text-blue-800 hover:border-blue-800"
                                            name="detail_image_2"
                                            onClick={handleClickImage}
                                        >
                                            <div className="relative">
                                                <ImageIcon className="w-[24px] h-[24px] fill-[#a0a0a0] absolute -top-[13px] -right-[18px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                                <div className="flex items-center justify-center absolute -bottom-[14px] -left-[12px] w-[14px] h-[14px] border-primary border rounded-full bg-white hover:border-blue-800">
                                                    <PlusIcon className="w-[10px] h-[10px] fill-[#3370ff] hover:fill-[#1e40af]" />
                                                </div>
                                            </div>
                                            画像を追加
                                        </button>

                                        {errors.introduction2 && (
                                            <InputError
                                                message={errors.introduction2}
                                                className="mt-1 text-[12px]"
                                            />
                                        )}
                                        {errors.introduction2 &&
                                            errors.introduction2.image && (
                                                <InputError
                                                    message={
                                                        errors.introduction2.image
                                                    }
                                                    className="mt-1 text-[12px]"
                                                />
                                            )}
                                        {errors.introduction2 &&
                                            errors.introduction2.image_file && (
                                                <InputError
                                                    message={
                                                        errors.introduction2
                                                            .image_file
                                                    }
                                                    className="mt-1 text-[12px]"
                                                />
                                            )}

                                        <input
                                            type="file"
                                            className="hidden"
                                            name="detail_image_2"
                                            id="detail_image_2"
                                            accept="image/*"
                                            ref={detailImage2Ref}
                                            onChange={handleSelectedImage}
                                        />
                                        {product.introduction2.image_file && (
                                            <div className="mt-4 grid md:grid-cols-5 grid-cols-1 md:gap-4 gap-2 w-full">
                                                <div className="border rounded-sm aspect-3/2 object-fill relative">
                                                    {(product.introduction2
                                                        .image_file !== undefined ||
                                                        product.introduction2
                                                            .image_path !== "") && (
                                                        <>
                                                            <img
                                                                src={
                                                                    product
                                                                        .introduction2
                                                                        .image_file !==
                                                                    undefined
                                                                        ? URL.createObjectURL(
                                                                            product
                                                                                .introduction2
                                                                                .image_file
                                                                        )
                                                                        : product
                                                                            .introduction2
                                                                            .image_path
                                                                }
                                                                alt="商材紹介詳細２画像"
                                                                className="w-full h-full object-contain"
                                                            />
                                                            {/* <button
                                                                type="button"
                                                                name="detail_image_2"
                                                                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[14px]"
                                                                onClick={handleClickDelete(
                                                                    "intro_image_2",
                                                                    0
                                                                )}
                                                            >
                                                                <TrashCanIcon className="w-full hover:fill-[#333333]" />
                                                            </button> */}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 relative">
                                        <div className="relative">
                                            <textarea
                                                name="detail_overview"
                                                id="2"
                                                maxLength={1000}
                                                rows={16}
                                                className="appearance-none w-full resize-none p-2 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                                value={
                                                    product.introduction2
                                                        .detail_overview ?? ""
                                                }
                                                onChange={handleInputChange}
                                            />
                                            <span className="absolute bottom-2 right-4 text-gray-500">
                                                /{detailOverview2Length}
                                            </span>
                                        </div>
                                        {errors.introduction2 &&
                                            errors.introduction2
                                                .detail_overview && (
                                                <InputError
                                                    message={
                                                        errors.introduction2
                                                            .detail_overview
                                                    }
                                                    className="mt-1 text-[12px]"
                                                />
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-16">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">Youtube（任意）</p>
                                    <p className="mt-2 text-[12px]">※共有リンク</p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <input
                                        name="youtube_url"
                                        className="appearance-none w-full resize-none p-2 pl-4 border border-gray-300 rounded"
                                        value={product.youtube_url}
                                        onChange={handleInputChange}
                                    />
                                    {errors.youtube_url && (
                                        <InputError
                                            message={errors.youtube_url}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-16">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">対応地域</p>
                                    <p className="mt-2 text-[12px]">
                                        ※商材・サービス提供地域
                                    </p>
                                    <p className="mt-2 text-[12px]">※複数選択可</p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-start gap-x-8 gap-y-4">
                                        <div className="w-full">
                                            <label
                                                htmlFor="全国"
                                                className="flex items-center justify-start gap-1 w-fit"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="response_prefs"
                                                    id="全国"
                                                    className="border border-gray-300 rounded"
                                                    checked={product.response_prefs.includes(
                                                        "全国"
                                                    )}
                                                    onChange={handleCheckboxChange}
                                                />
                                                全国
                                            </label>
                                        </div>
                                        {area_categories.map((area, index) => (
                                            <label
                                                htmlFor={area}
                                                key={index}
                                                className="flex items-center justify-start gap-1"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="response_prefs"
                                                    id={area}
                                                    className="border border-gray-300 rounded"
                                                    checked={product.response_prefs.includes(
                                                        area
                                                    )}
                                                    onChange={handleCheckboxChange}
                                                />
                                                {area}
                                            </label>
                                        ))}
                                        <div className="md:w-[580px] w-full mt-1 flex items-start justify-start gap-4">
                                            <div className="py-3">
                                                <label
                                                    htmlFor="海外"
                                                    className="flex items-center justify-start gap-1 w-fit"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="response_prefs"
                                                        id="海外"
                                                        className="border border-gray-300 rounded"
                                                        checked={isOverseas}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    海外
                                                </label>
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    name="overseas"
                                                    className={`appearance-none w-full p-2 pl-4 border rounded text-[14px] ${
                                                        isOverseas
                                                            ? "border-gray-300"
                                                            : "disabled:border-gray-100 disabled:cursor-not-allowed placeholder:text-gray-300"
                                                    }`}
                                                    placeholder="国名"
                                                    disabled={!isOverseas}
                                                    value={product.overseas}
                                                    onChange={handleInputChange}
                                                />
                                                <p className="text-[12px] mt-2">
                                                    ※国名が複数の場合はカンマ「，」で区切ってご入力ください
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        {isEmptyOverseas && (
                                            <InputError
                                                message="海外の項目を選択したら必ず入力してください。"
                                                className="w-full mt-1 text-[12px]"
                                            />
                                        )}
                                        {errors.response_prefs && (
                                            <InputError
                                                message={errors.response_prefs}
                                                className="w-full mt-1 text-[12px]"
                                            />
                                        )}
                                        {errors.overseas && (
                                            <InputError
                                                message={errors.overseas}
                                                className="w-full mt-1 text-[12px]"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">サービス対象者</p>
                                    <p className="mt-2 text-[12px]">
                                        ※商材の希望紹介先
                                    </p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-start w-full gap-x-8 gap-y-2 py-2">
                                        <label
                                            htmlFor="all"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="radio"
                                                name="target_type"
                                                id="all"
                                                className="border border-gray-300 rounded-full"
                                                value="0"
                                                checked={
                                                    product.target_type === "0"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            全対応
                                        </label>
                                        <label
                                            htmlFor="coporator"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="radio"
                                                name="target_type"
                                                id="coporator"
                                                className="border border-gray-300 rounded-full"
                                                value="1"
                                                checked={
                                                    product.target_type === "1"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            法人
                                        </label>
                                        <label
                                            htmlFor="individual"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="radio"
                                                name="target_type"
                                                id="individual"
                                                className="border border-gray-300 rounded-full"
                                                value="2"
                                                checked={
                                                    product.target_type === "2"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            個人
                                        </label>
                                    </div>
                                    {errors.target_type && (
                                        <InputError
                                            message={errors.target_type}
                                            className="w-full mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">条件（任意）</p>
                                    <p className="mt-2 text-[12px]">
                                        ※紹介先へ求める条件
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※サービスの提供条件
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="relative">
                                        <textarea
                                            type="text"
                                            name="condition"
                                            className="appearance-none w-full resize-none p-2 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                            rows="6"
                                            id="condition"
                                            value={product.condition}
                                            onChange={handleInputChange}
                                            placeholder="対象人数・限定・先着・個数などのフリースペース"
                                        />
                                        <span className="absolute bottom-2 right-4 text-gray-500">
                                            /{conditionLength}
                                        </span>
                                    </div>
                                    {errors.condition && (
                                        <InputError
                                            message={errors.condition}
                                            className="w-full mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">営業アプローチ</p>
                                    <p className="mt-2 text-[12px]">
                                        ※紹介先への営業手段
                                    </p>
                                    <p className="mt-2 text-[12px]">※複数選択可</p>
                                </div>

                                <div className="fle">
                                    <div className="flex items-center justify-start md:max-w-[600px] gap-4 w-full">
                                        <label
                                            htmlFor="email"
                                            className="flex items-center justify-start gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="approach"
                                                id="email"
                                                className="border border-gray-300 rounded-full"
                                                value="メール"
                                                checked={
                                                    product.approach === "メール"
                                                }
                                                onChange={handleInputChange}
                                            />
                                            メール
                                        </label>
                                        <label
                                            htmlFor="phone"
                                            className="flex items-center justify-start gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="approach"
                                                id="phone"
                                                className="border border-gray-300 rounded-full"
                                                value="電話"
                                                checked={
                                                    product.approach === "電話"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            電話
                                        </label>
                                        <label
                                            htmlFor="other"
                                            className="flex-1 flex items-center justify-start gap-2 whitespace-nowrap"
                                        >
                                            <input
                                                type="radio"
                                                name="approach"
                                                id="other"
                                                className="border border-gray-300 rounded-full"
                                                value=""
                                                checked={
                                                    product.approach !== "メール" &&
                                                    product.approach !== "電話"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            その他
                                            <input
                                                type="text"
                                                name="approach"
                                                className={`appearance-none w-full p-2 pl-4 border border-gray-300 rounded text-[14px] ${
                                                    isDefaultApproach
                                                        ? "disabled:border-gray-100 disabled:cursor-not-allowed"
                                                        : "border-gray-300"
                                                }`}
                                                disabled={isDefaultApproach}
                                                value={
                                                    product.approach !== "メール" &&
                                                    product.approach !== "電話"
                                                        ? product.approach
                                                        : ""
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                        </label>
                                    </div>

                                    {errors.approach && (
                                        <InputError
                                            message={errors.approach}
                                            className="w-full mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">
                                        サービス特典（任意）
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※限定特典設定があれば
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="relative">
                                        <textarea
                                            name="benefits"
                                            maxLength={300}
                                            rows="6"
                                            placeholder="例・サービス提供時にギフトプレゼント
    例・サービス利用料1ヶ月分無料"
                                            className="appearance-none w-full resize-none py-4 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                            value={product.benefits}
                                            onChange={handleInputChange}
                                        />

                                        <span className="absolute bottom-2 right-4 text-gray-500">
                                            /{benefitsLength}
                                        </span>
                                    </div>
                                    {errors.benefits && (
                                        <InputError
                                            message={errors.benefits}
                                            className="w-full mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">
                                        取り扱い資格（任意）
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※貴社保有の各種免許番号
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[900px] w-full">
                                    <div className="md:w-[500px] w-full">
                                        <div className="flex items-center justify-start gap-2 py-2 whitespace-nowrap">
                                            <label
                                                htmlFor="test_code_1"
                                                className="block w-[100px]"
                                            >
                                                免許・資格
                                            </label>
                                            <div>
                                                <input
                                                    type="text"
                                                    id="test_code_1"
                                                    name="test_code_1"
                                                    className="appearance-none w-full p-2 pl-4 border border-gray-300 rounded"
                                                    placeholder="例：一般酒類小売業免許"
                                                    value={product.test_code_1}
                                                    onChange={handleInputChange}
                                                />

                                                {errors.test_code_1 && (
                                                    <InputError
                                                        message={errors.test_code_1}
                                                        className="w-full mt-1 text-[12px]"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-start gap-2 py-2 mt-2 whitespace-nowrap">
                                            <label
                                                htmlFor="test_code_2"
                                                className="block w-[100px]"
                                            >
                                                番号
                                            </label>
                                            <div>
                                                <input
                                                    type="text"
                                                    id="test_code_2"
                                                    name="test_code_2"
                                                    className="appearance-none w-full p-2 pl-4 border border-gray-300 rounded"
                                                    placeholder="例：東-1234号"
                                                    value={product.test_code_2}
                                                    onChange={handleInputChange}
                                                />

                                                {errors.test_code_2 && (
                                                    <InputError
                                                        message={errors.test_code_2}
                                                        className="w-full mt-1 text-[12px]"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full px-12 py-8 bg-pink mt-4">
                                        <p>
                                            ※取り扱われている商材に免許や資格が必要な場合は、
                                            <span className="text-pink-dark">
                                                貴社保有の番号
                                            </span>
                                            をご入力ください。
                                        </p>
                                        <p className="my-2">
                                            ※紹介を受けるにあたり、特定商取引法や業界の規制に抵触しないよう法令守を徹底してください。
                                        </p>
                                        <p>
                                            ※商材審査において免許保有の有無をお問い合わせさせていただく場合がございます。
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-center justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="flex items-center justify-start gap-x-1 font-semibold">
                                        出品ID
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[300px] w-full relative">
                                    <input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        value={product.product_code}
                                        readOnly
                                        disabled
                                        className="appearance-none w-full p-2 pl-4 border border-gray-300 rounded disabled:bg-gray-100 disabled:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-center justify-start gap-2 mt-4">
                                <div className="md:w-[200px] w-full">
                                    <p className="flex items-center justify-start gap-x-1 font-semibold">
                                        掲載日・更新日時
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[300px] w-full relative">
                                    <input
                                        type="text"
                                        id="publish_at"
                                        name="publish_at"
                                        value={product.publish_at}
                                        readOnly
                                        disabled
                                        className="appearance-none w-full p-2 pl-4 border border-gray-300 rounded disabled:bg-gray-100 disabled:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <CompanyTitle>導入実績</CompanyTitle>
                        </div>

                        <div className="border rounded-lg shadow-lg md:p-12 p-4 bg-white">
                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 md:p-2 pr-6 relative">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">導入実績</p>
                                    <p className="mt-2 text-[12px]">
                                        ※最大16件まで
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[600px] w-full relative">
                                    {product.deploies.map((deploy, index) => {
                                        return (
                                            <div className="mb-4" key={index}>
                                                <CompanyDeployItem
                                                    index={index}
                                                    value={deploy ?? ""}
                                                    onChange={handleDeployChange}
                                                    onDestroy={handleDeployDelete}
                                                />
                                            </div>
                                        );
                                    })}
                                    {isEmptyDeploy && (
                                        <InputError
                                            message="導入実績を入力してください"
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {errors.deploies && (
                                        <InputError
                                            message={errors.deploies}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className={`mx-auto border rounded-full bg-white flex items-center justify-center w-[50px] h-[50px] ${
                                    isDeployFull
                                        ? "disabled:cursor-not-allowed border-blue-200"
                                        : "border-primary hover:opacity-50"
                                }`}
                                disabled={isDeployFull}
                                onClick={handleDeployAdd}
                            >
                                <PlusIcon
                                    className={`w-8 h-8 ${
                                        isDeployFull
                                            ? "fill-[#8e8e8e]"
                                            : "fill-[#3370ff]"
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="border border-primary rounded-md bg-white p-2 md:py-8 md:max-w-[1000px] w-full mx-auto mt-16">
                            <h3 className="text-2xl text-center text-primary font-semibold">
                                ここからは紹介者の方への条件登録です
                            </h3>
                            <p className="text-center text-primary text-sm font-medium mt-4">
                                上で登録した商材を紹介いただくための条件・募集要項をご設定ください
                            </p>
                        </div>

                        <div className="mt-8">
                            <CompanyTitle>紹介会員募集要項</CompanyTitle>
                        </div>

                        <div className="border rounded-lg shadow-lg md:p-12 p-4 bg-white">
                            <div className="flex md:flex-row flex-col items-center justify-start gap-2">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">募集期間</p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-start gap-2 md:max-w-[600px] w-full">
                                        <div className="w-[90px]">
                                            <label
                                                htmlFor="is_recurit_peroid_0"
                                                className="flex items-center justify-start whitespace-nowrap"
                                            >
                                                <input
                                                    type="radio"
                                                    name="is_recurit_period"
                                                    id="is_recurit_peroid_0"
                                                    value="0"
                                                    checked={
                                                        product.is_recurit_period ===
                                                        "0"
                                                    }
                                                    onChange={handleChangeRadio}
                                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                                />
                                                <span>常時</span>
                                            </label>
                                        </div>
                                        <div className="flex-1 flex items-center justify-start gap-2">
                                            <label
                                                htmlFor="is_recurit_peroid_1"
                                                className="flex items-center justify-start whitespace-nowrap"
                                            >
                                                <input
                                                    type="radio"
                                                    name="is_recurit_period"
                                                    id="is_recurit_peroid_1"
                                                    value="1"
                                                    checked={
                                                        product.is_recurit_period ===
                                                        "1"
                                                    }
                                                    onChange={handleChangeRadio}
                                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                                />
                                                <span>期間設定</span>
                                            </label>
                                            <div className="flex items-center justify-between gap-1">
                                                <DateSimplePicker
                                                    name="recurit_start"
                                                    label="募集期間"
                                                    isDisabled={!isRecuritPeriod}
                                                    value={product.recurit_start}
                                                    onSelectedDate={
                                                        handleSelectedDate
                                                    }
                                                />
                                                〜
                                                <DateSimplePicker
                                                    name="recurit_end"
                                                    label="募集期間"
                                                    isDisabled={!isRecuritPeriod}
                                                    value={product.recurit_end}
                                                    onSelectedDate={
                                                        handleSelectedDate
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {errors.recurit_start && (
                                        <InputError
                                            message={errors.recurit_start}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {errors.recurit_end && (
                                        <InputError
                                            message={errors.recurit_end}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-center justify-start gap-2 mt-4">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">募集件数</p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex-1 flex items-center justify-start gap-2 md:max-w-[600px] w-full">
                                        <div className="w-[90px]">
                                            <label
                                                htmlFor="is_apply_count_0"
                                                className="flex items-center justify-start whitespace-nowrap"
                                            >
                                                <input
                                                    type="radio"
                                                    name="apply_count"
                                                    id="is_apply_count_0"
                                                    value="0"
                                                    checked={
                                                        product.apply_count === "0"
                                                    }
                                                    onChange={handleChangeRadio}
                                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                                />
                                                <span>制限なし</span>
                                            </label>
                                        </div>
                                        <div className="flex-1 flex items-center justify-start gap-2">
                                            <label
                                                htmlFor="is_apply_count_1"
                                                className="flex items-center justify-start whitespace-nowrap"
                                            >
                                                <input
                                                    type="radio"
                                                    name="apply_count"
                                                    id="is_apply_count_1"
                                                    value="1"
                                                    checked={
                                                        product.apply_count !== "0"
                                                    }
                                                    onChange={handleChangeRadio}
                                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                                />
                                                <span>件数設定</span>
                                            </label>

                                            <input
                                                type="text"
                                                name="apply_count"
                                                className={`md:w-[100px] w-full p-2 pl-4 border rounded ${
                                                    !isLimited
                                                        ? "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500"
                                                        : "border-gray-300"
                                                }`}
                                                min={1}
                                                disabled={!isLimited}
                                                value={product.apply_count}
                                                onChange={handleInputChange}
                                            />
                                            <span>件</span>
                                        </div>
                                    </div>
                                    {errors.apply_count && (
                                        <InputError
                                            message={errors.apply_count}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {isEmptyApplyCount && (
                                        <InputError
                                            message="募集件数を入力してください"
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-center justify-start gap-2 mt-4">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">対象紹介会員</p>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-start w-full gap-x-8 gap-y-2 py-2">
                                        <label
                                            htmlFor="introduction_all"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="radio"
                                                name="introduction_type"
                                                id="introduction_all"
                                                className="border border-gray-300 rounded-full"
                                                value="0"
                                                checked={
                                                    product.introduction_type ===
                                                    "0"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            全対応
                                        </label>
                                        <label
                                            htmlFor="introduction_coporator"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="radio"
                                                name="introduction_type"
                                                id="introduction_coporator"
                                                className="border border-gray-300 rounded-full"
                                                value="1"
                                                checked={
                                                    product.introduction_type ===
                                                    "1"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            法人
                                        </label>
                                        <label
                                            htmlFor="introduction_individual"
                                            className="flex items-center justify-start gap-1"
                                        >
                                            <input
                                                type="radio"
                                                name="introduction_type"
                                                id="introduction_individual"
                                                className="border border-gray-300 rounded-full"
                                                value="2"
                                                checked={
                                                    product.introduction_type ===
                                                    "2"
                                                }
                                                onChange={handleChangeRadio}
                                            />
                                            個人
                                        </label>
                                    </div>
                                    {errors.introduction_type && (
                                        <InputError
                                            message={errors.introduction_type}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 py-2 mt-4">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">
                                        紹介手数料タイプ
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※いずれか1つ設定可
                                    </p>
                                </div>
                                <div className="flex-1 md:max-w-[900px] w-full">
                                    <div className="md:max-w-[600px] w-full">
                                        <div className="flex items-center justify-start gap-4">
                                            <label
                                                htmlFor="is_money"
                                                className="flex items-center justify-start"
                                            >
                                                <input
                                                    type="radio"
                                                    name="reward_type"
                                                    id="is_money"
                                                    value="1"
                                                    checked={
                                                        product.reward_type &&
                                                        product.reward_type === "1"
                                                    }
                                                    onChange={handleChangeRadio}
                                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                                />
                                                <span>固定金額型（¥）</span>
                                            </label>
                                            <label
                                                htmlFor="is_percent"
                                                className="flex items-center justify-start"
                                            >
                                                <input
                                                    type="radio"
                                                    name="reward_type"
                                                    id="is_percent"
                                                    value="2"
                                                    checked={
                                                        product.reward_type &&
                                                        product.reward_type === "2"
                                                    }
                                                    onChange={handleChangeRadio}
                                                    className="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:ring-3 focus:ring-blue-300 mr-2"
                                                />
                                                <span>成功報酬型（%）</span>
                                            </label>
                                        </div>
                                        {errors.reward_type && (
                                            <InputError
                                                message={errors.reward_type}
                                                className="mt-1 text-[12px]"
                                            />
                                        )}

                                        <div className="flex items-center justify-between gap-2 mt-4">
                                            <div className="flex-1 flex items-center justify-between gap-2">
                                                <span
                                                    className={`${
                                                        product.reward_type !== "1"
                                                            ? "text-gray-500"
                                                            : ""
                                                    }`}
                                                >
                                                    ￥
                                                </span>
                                                <input
                                                    type="text"
                                                    name="reward_amount_money"
                                                    id="reward_amount_money"
                                                    placeholder="0"
                                                    min={0}
                                                    disabled={
                                                        product.reward_type !== "1"
                                                    }
                                                    value={
                                                        product.reward_amount_money
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`appearance-none w-full p-2 pl-4 border rounded ${
                                                        product.reward_type !== "1"
                                                            ? "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                            </div>
                                            <div className="flex-1 flex items-center justify-between gap-2">
                                                <input
                                                    type="text"
                                                    name="reward_amount_percent"
                                                    id="reward_amount_percent"
                                                    placeholder="0"
                                                    min={0}
                                                    max={100}
                                                    disabled={
                                                        product.reward_type !== "2"
                                                    }
                                                    value={
                                                        product.reward_amount_percent
                                                    }
                                                    onChange={handleInputChange}
                                                    className={`appearance-none w-full p-2 pl-4 border rounded text-right ${
                                                        product.reward_type !== "2"
                                                            ? "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500"
                                                            : "border-gray-300"
                                                    }`}
                                                />
                                                <span
                                                    className={`${
                                                        product.reward_type !== "2"
                                                            ? "text-gray-500"
                                                            : ""
                                                    }`}
                                                >
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        {errors.reward_amount_money && (
                                            <InputError
                                                message={errors.reward_amount_money}
                                                className="mt-1 text-[12px]"
                                            />
                                        )}
                                        {errors.reward_amount_percent && (
                                            <InputError
                                                message={
                                                    errors.reward_amount_percent
                                                }
                                                className="mt-1 text-[12px]"
                                            />
                                        )}
                                    </div>

                                    {errors.introduction_type && (
                                        <InputError
                                            message={errors.introduction_type}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}

                                    <div className="px-12 py-8 w-full bg-pink mt-4">
                                        ※成功報酬型では、
                                        <span className="text-gray-950">
                                            サービス提供先と締結した契約金額や請求額
                                        </span>
                                        を申告していただき、その金額に基づいて上記の割合（%）を紹介手数料としてJOBSCAPEへお支払いいただきます。
                                        ※紹介会員はそれぞれのランクに応じて受け取る報酬が異なります。商材紹介ページでは、上記の金額を100%として、紹介会員が受け取れる割合が4段階で表示されます。
                                    </div>
                                </div>
                            </div>

                            <div className="md:my-12 my-2 border border-t-0"></div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">条件（任意）</p>
                                    <p className="mt-2 text-[12px]">
                                        ※紹介者へ求める条件
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※限定条件など
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="relative">
                                        <textarea
                                            name="introduction_condition"
                                            className="appearance-none w-full resize-none p-2 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                            rows="6"
                                            id="introduction_condition"
                                            value={product.introduction_condition}
                                            onChange={handleInputChange}
                                            placeholder="例・先着10名様まで例・学生不可
    例・ 社商材の紹介が初めての方
    例・当社と面識のある方に限る"
                                        />
                                        <span className="absolute bottom-2 right-4 text-gray-500">
                                            /{introductionContLength}
                                        </span>
                                    </div>
                                    {errors.introduction_condition && (
                                        <InputError
                                            message={errors.introduction_condition}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">
                                        紹介者へお願い（任意）
                                    </p>
                                    <p className="mt-2 text-[12px]">
                                        ※注意点・要望など
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full relative">
                                    <div className="relative">
                                        <textarea
                                            name="introduction_memo"
                                            className="appearance-none w-full resize-none p-2 pl-4 pr-20 border border-gray-300 rounded placeholder:text-[13px]"
                                            rows="6"
                                            id="introduction_memo"
                                            value={product.introduction_memo}
                                            onChange={handleInputChange}
                                            placeholder="例・未成年者へご紹介できない商材ですので、ご紹介先の年齢を予めご確認ください。
    例・ご紹介先が当社サービスに興味を示さない場合は無理な勧誘は行わないようお願いします。"
                                        />
                                        <span className="absolute bottom-2 right-4 text-gray-500">
                                            /{introductionMemoLength}
                                        </span>
                                    </div>
                                    {errors.introduction_memo && (
                                        <InputError
                                            message={errors.introduction_memo}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <CompanyTitle>紹介スケジュール</CompanyTitle>
                        </div>

                        <div className="border rounded-lg shadow-lg md:p-12 p-4 bg-white">
                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">平均取引期間</p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <div className="flex items-center justify-start gap-2">
                                        <span>約</span>
                                        <input
                                            type="text"
                                            name="transaction_period"
                                            id="transaction_period"
                                            placeholder="0"
                                            min={0}
                                            value={product.transaction_period}
                                            onChange={handleInputChange}
                                            className="appearance-none w-[50px] p-2 pl-4 border border-gray-300 rounded text-right"
                                        />
                                        <select
                                            type="text"
                                            name="transaction_period_unit"
                                            id="transaction_period_unit"
                                            className="w-[80px] p-2 pl-4 border border-gray-300 rounded"
                                            placeholder="対象人数・限定・先着・個数などのフリースペース"
                                            value={product.transaction_period_unit}
                                            onChange={handleInputChange}
                                        >
                                            {period_units &&
                                                period_units.map((unit, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={unit}
                                                        >
                                                            {unit}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    {errors.transaction_period && (
                                        <InputError
                                            message={errors.transaction_period}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                    {errors.transaction_period_unit && (
                                        <InputError
                                            message={errors.transaction_period_unit}
                                            className="mt-1 text-[12px]"
                                        />
                                    )}

                                    <div className="px-12 py-8 w-full bg-pink mt-4">
                                        ※
                                        <span className="text-pink-dark">
                                            紹介を受けてから、サービスを提供し、JOBSCAPEへ紹介料を収めるまでの予定期間
                                        </span>
                                        をお知らせください。
                                        ※出品が公開されると、こちらで設定した期間から「取引完了予定日」が算出、表示されます。
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">スケジュール</p>
                                    <p className="mt-2 px-2 text-[12px]">
                                        ※最大5つまで可
                                    </p>
                                </div>

                                <div className="flex-1">
                                    <div className="md:max-w-[850px] w-full">
                                        {product.schedules.map(
                                            (schedule, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="mb-4"
                                                    >
                                                        <ProductSchedule
                                                            index={index}
                                                            schedule={schedule}
                                                            periodUnits={
                                                                period_units
                                                            }
                                                            onChangeInput={
                                                                handleInputChange
                                                            }
                                                            onClickBtn={
                                                                handleScheduleDelete
                                                            }
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                    {isEmptySchedule && (
                                        <InputError
                                            message="入力してください"
                                            className="mt-1 text-[12px]"
                                        />
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className={`mt-2 mx-auto border rounded-full bg-white flex items-center justify-center w-[50px] h-[50px] ${
                                    product.schedules.length === 5
                                        ? "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500"
                                        : "border-primary hover:opacity-50"
                                }`}
                                disabled={product.schedules.length === 5}
                                onClick={handleScheduleAdd}
                            >
                                <PlusIcon
                                    className={`w-8 h-8 ${
                                        product.schedules.length === 5
                                            ? "fill-[#8e8e8e]"
                                            : "fill-[#3370ff]"
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="mt-8">
                            <CompanyTitle>よくある質問</CompanyTitle>
                        </div>

                        <div className="border rounded-lg shadow-lg md:p-12 p-4 bg-white">
                            <div className="flex md:flex-row flex-col items-start justify-start gap-2 mt-8">
                                <div className="md:w-[200px] w-full">
                                    <p className="font-semibold">よくある質問</p>
                                    <p className="mt-2 px-2 text-[12px]">
                                        ※最大5つまで可
                                    </p>
                                </div>

                                <div className="flex-1 md:max-w-[850px] w-full">
                                    <FaqItemInput
                                        question={newFaq.question}
                                        answer={newFaq.answer}
                                        onChange={handleInputChange}
                                        onClickBtn={handleFaqDelete}
                                    />
                                    {isEmptyFaq && (
                                        <InputError
                                            message="入力してください"
                                            className="mt-2 text-[12px]"
                                        />
                                    )}
                                    <div className="md:my-8 my-2 border border-t-0"></div>
                                    {product.faqs.map((faq, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="mb-4">
                                                    <FaqItem
                                                        index={index}
                                                        question={
                                                            faq.question ?? ""
                                                        }
                                                        answer={faq.answer ?? ""}
                                                        onChangeInput={
                                                            handleInputChange
                                                        }
                                                        onClickBtn={handleFaqDelete}
                                                    />
                                                </div>

                                                {index <
                                                    product.faqs.length - 1 && (
                                                    <div className="md:my-8 my-2 border border-t-0"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                type="button"
                                className={`mt-2 mx-auto border rounded-full bg-white flex items-center justify-center w-[50px] h-[50px] ${
                                    product.faqs.length === 5
                                        ? "disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500"
                                        : "border-primary hover:opacity-50"
                                }`}
                                disabled={product.faqs.length === 5}
                                onClick={handleFaqAdd}
                            >
                                <PlusIcon
                                    className={`w-8 h-8 ${
                                        product.faqs.length === 5
                                            ? "fill-[#8e8e8e]"
                                            : "fill-[#3370ff]"
                                    }`}
                                />
                            </button>
                        </div>
                    </form>
                )}                
            </div>

            <div className="mt-16 flex items-center justify-center gap-4 mb-[300px]">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-[240px] border border-primary bg-primary text-white px-8 py-4 rounded-full hover:bg-blue-700"
                >
                    保存する
                </button>
                <Link
                    href={route('admin.products.show', [product.id])}
                    className="w-[240px] border bg-red-500 text-center text-white px-8 py-4 rounded-full hover:bg-red-700"
                >
                    キャンセル
                </Link>
            </div>
        </AdminAuthLayout>
    );
}
