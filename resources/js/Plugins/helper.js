import dayjs from 'dayjs';

export const getTextFromOptions = (value, options) => {
    return options.find((option) => option.value === value)?.label || "";
};

export const showError = (toast, message) => {
    if (toast.current) {
        toast.current.show({
            severity: "error",
            summary: "エラー",
            detail: message,
            life: 3000,
        });
    }
};

export const showSuccess = (toast, message) => {
    if (toast.current) {
        toast.current.show({
            severity: "success",
            summary: "成功",
            detail: message,
            life: 3000,
        });
    }
};

export const showFlash = (toast, flash) => {
    if (flash?.success) {
        showSuccess(toast, flash.success);
    }
    if (flash?.error) {
        showError(toast, flash.error);
    }
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
}

export const formatDate = (dateString) => {
    if (dateString) {
        return dayjs(dateString).format("YYYY/MM/DD HH:mm");
    } else {
        return '';
    }
}