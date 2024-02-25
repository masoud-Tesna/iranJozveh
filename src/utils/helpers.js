import {useEffect, useState} from 'react';
import {DateObject} from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import messages from './inputRulesMessage';

/*export const formatNumber = number => {
 return number.toLocaleString(undefined, {maximumFractionDigits: 0});
 };*/

export const formatCadNumber = cardNumber => cardNumber?.replace(/\d{4}(?=.)/g, '$& - ');

export const formatPhoneNumber = phoneNumber => {
    //Filter only numbers from the input
    let cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned?.length < 11) {
        cleaned = cleaned?.replace(/^/, '0');
    } else if (cleaned?.length > 11) {
        if (cleaned?.startsWith('98')) {
            cleaned = cleaned?.replace('98', '0');
        }
    }

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return null;
};

export const fn_deadline = min => Date.now() + min * 60000;

/*
 Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
 Remove the Unicode base(2) range that not match
 */
export const toEnDigit = n => n?.toString()?.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, a => a?.charCodeAt(0) & 0xf);

// scroll to top window
export const scrollTop = () => window.scroll({
    top: 0,
    behavior: 'smooth'
});

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

// TODO: unComment before using function
// export const isValidIp = value => /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value);

export const isValidEmail = (value) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
};

export const convertDatePicker = (date, format = 'YYYY/MM/DD', local = 'fa') => {
    let object = {
        date,
        format,
        calendar: local === 'fa' ? persian : gregorian
    };

    const dateConvert = new DateObject(object).format();

    return (toEnDigit(dateConvert));
};

export const convertStringDateToTime = date => date.toISOString().split('T')[1].substring(0, 5);

export const setInputRule = (key, vars) => {
    const argsKeys = vars ? Object.keys(vars) : [];

    let messageText = messages[key].message;

    if (messageText && argsKeys.length > 0) {
        for (const [key, val] of Object.entries(vars)) {
            const pattern = new RegExp(`{{${key}}}`, 'g');
            messageText = messageText.replace(pattern, val?.toString() || '');
        }
    }

    return messageText || key;
};

export const convertColor = (color, percent) => {
    const hexToDecimal = (hex) => Number(`0x${hex}`);
    const decimalToHex = (dec) => dec?.toString(16)?.padStart(2, '0');

    const R = hexToDecimal(color[1] + color[2]);
    const G = hexToDecimal(color[3] + color[4]);
    const B = hexToDecimal(color[5] + color[6]);

    const updatedR = Math.min(Math.round(R * (100 + percent) / 100), 255);
    const updatedG = Math.min(Math.round(G * (100 + percent) / 100), 255);
    const updatedB = Math.min(Math.round(B * (100 + percent) / 100), 255);

    const RR = decimalToHex(updatedR);
    const GG = decimalToHex(updatedG);
    const BB = decimalToHex(updatedB);

    return `#${RR}${GG}${BB}`;
};

export const isValidNationalCode = (value) => {
    const input = toEnDigit(value?.toString());

    if (input.length !== 10) return false;

    const check = +input[9];

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += +input[i] * (10 - i);
    }

    sum %= 11;

    return sum < 2 ? check === sum : check + sum === 11;
};

export const addSpaceAroundNumber = (num) => num.replace(/(\d*\.?\d+)+?/g, ' $1 ');

export const handleDate = (date) => {

    let year, month, day;

    if (date?.length === 8) {
        year = date?.substring(0, 4);
        month = date?.substring(4, 6);
        day = date?.substring(6, 8);
    } else {
        year = date?.substring(0, 2);
        month = date?.substring(2, 4);
        day = date?.substring(4, 6);
    }

    return `${year}/${month}/${day}`;
};

export const toCapitalize = (str) => str[0]?.toUpperCase() + str?.slice(1);

const checkBanksCard = (cardNumber) => {
    const bankCards = {
        '603799': 'meli',
        '589210': 'sepah',
        '627961': 'sanatmadan',
        '603770': 'keshavarsi',
        '628023': 'maskan',
        '627760': 'postbank',
        '502908': 'tosehe',
        '627412': 'eghtesad',
        '622106': 'parsian',
        '502229': 'pasargad',
        '627488': 'karafarin',
        '621986': 'saman',
        '639346': 'sina',
        '639607': 'sarmaye',
        '502806': 'shahr',
        '502938': 'day',
        '603769': 'saderat',
        '610433': 'mellat',
        '627353': 'tejarat',
        '589463': 'refah',
        '627381': 'sepah',
        '639370': 'mehreqtesad',
        '639599': 'sepah',
        '504172': 'resalat'
    };

    let number = cardNumber?.toString().substring(0, 6);

    return bankCards[number] || false;
};

export const getChunksFromString = (str, chunkSize) => {
    let regexChunk = new RegExp(`.{1,${ chunkSize }}`, 'g');   // '.' represents any character
    return str.match(regexChunk);
};

export const handleCreateAntdZodValidator = (schema) => {
    return {
        validator: async ({field}, value) => {
            const fieldValue = typeof value === 'boolean' ? value : value?.toString()?.length ? value : undefined;

            const result = await schema.safeParseAsync({[field]: fieldValue});

            if (result.success) return Promise.resolve();

            const error = result.error.issues.filter(issue => issue.path.includes(field))[0]?.message;

            return error ? Promise.reject(error) : Promise.resolve();
        }
    };
};

export const setTimeoutPromise = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};
