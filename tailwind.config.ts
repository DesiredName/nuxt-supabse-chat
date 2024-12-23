import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                azure: {
                    '50': '#edfaff',
                    '100': '#d6f2ff',
                    '200': '#b5eaff',
                    '300': '#83dfff',
                    '400': '#48cbff',
                    '500': '#1eadff',
                    '600': '#068fff',
                    '700': '#007bff',
                    '800': '#085ec5',
                    '900': '#0d519b',
                    '950': '#0e315d',
                },
                regent: {
                    '50': '#f4f8f9',
                    '100': '#ebf2f4',
                    '200': '#dbe6ea',
                    '300': '#c5d5dc',
                    '400': '#adc0cc',
                    '500': '#98abbc',
                    '600': '#8598ad',
                    '700': '#6e7f94',
                    '800': '#5b6978',
                    '900': '#4d5862',
                    '950': '#2d3239',
                },
            },
        },
    },
};
