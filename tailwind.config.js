import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
    ],

    theme: {
        extend: {
            boxShadow: {
                right: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            },
            aspectRatio: {
                "3/2": "3 / 2",
            },
            colors: {
                primary: "#3370ff",
                checkout: "#03b608",
                pink: "#fdf1f4",
                "pink-dark": "#fc3061",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            lineBreak: {
                anywhere: "anywhere",
            },
        },
    },

    plugins: [
        forms,
        require('@tailwindcss/line-clamp'),
        function ({ addUtilities, addComponents }) {
            addUtilities(
                {
                    ".line-break-anywhere": {
                        "line-break": "anywhere",
                    },
                },
                ["responsive", "hover"] // You can make this responsive or enable other variants
            );
            addComponents({
                '.webkit-box': {
                    display: '-webkit-box',
                },
                '.webkit-box-orient-vertical': {
                    '-webkit-box-orient': 'vertical',
                },
                '.webkit-line-clamp': (value) => ({
                    '-webkit-line-clamp': value,
                }),
            });
        },
        require('@tailwindcss/line-clamp'),
    ],
};
