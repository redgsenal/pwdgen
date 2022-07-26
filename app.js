'use strict';

// defaults
// number of characters: 8;
// number of samples : 10;
// allow special characters: true; (8)
// allow numbers: true; (10)
// allow upper case: true; (26)
// allow lower case: true; (26)
// allow duplicates: false
const defargs = { length: 16, samples: 10, special_chars: false, allow_nums: true, upp_case: true, low_case: true, allow_duplicates: true };
const special_chars = [33, 35, 36, 37, 38, 64, 42, 94];
const appargs = defargs;
const pickRange = { min: 33, max: 122 };

const chooseFlipCoin = () => {
    let cc = chooseCoin();
    let pc = flipCoin();
    return cc === pc;
}

const pickSpecialChar = () => {
    if (!appargs.special_chars) {
        return "";
    }
    let v = pickRnd(33, 94);
    if (special_chars.includes(v)) {
        return String.fromCharCode(v);
    }
    return pickSpecialChar();
}

const pickChar = () => {
    let c = (chooseFlipCoin()) ? pickLetter() : pickNumber();
    c = (chooseFlipCoin()) ? c : pickSpecialChar();
    return (!c) ? pickChar() : c;
}

// ascii 48 - 57 = 0 - 9 (10)
const pickNumber = () => {
    if (!appargs.allow_nums) {
        return "";
    }
    let v = pickRnd(48, 57);
    return (v >= 48 && v <= 57) ? String.fromCharCode(v) : pickNumber();
}

// ascii 65 - 90 = A - Z
// ascii 97 - 122 = a - z
const pickLetter = () => {
    let p = "";
    if (chooseFlipCoin()) {
        if (appargs.upp_case) {
            let v = pickRnd(65, 90);
            p = upperCase(v);
        }
    } else {
        if (appargs.low_case) {
            let v = pickRnd(97, 122);
            p = lowerCase(v);
        }
    }
    return (!p) ? pickLetter() : p;
}

const upperCase = (v) => {
    if (v >= 65 && v <= 90) {
        return String.fromCharCode(v);
    }
    return "";
}

const lowerCase = (v) => {
    if (v >= 97 && v <= 122) {
        return String.fromCharCode(v);
    }
    return "";
}

const boolValue = (v, def) => {
    let sv = v.toLowerCase();
    if (sv !== 'true' && sv !== 'false') {
        return def;
    }
    return sv === 'true';
}

const chooseCoin = () => {
    return randCoin();
}

const flipCoin = () => {
    return randCoin();
}

const randCoin = () => {
    let r = pickRnd(1, 2);
    return (r == 2) ? 'h' : 't';
}

const pickRnd = (min = pickRange.min, max = pickRange.max) => {
    if (min >= max) {
        throw Error("Invalid args min and max");
    }
    if (min < 1) {
        throw Error("Invalid args min value");
    }
    return Math.floor(
        Math.random() * ((max + 1) - min) + min
    );
}

const validateArgs = (args) => {
    appargs.length = args[0] ? args[0] : defargs.length;
    appargs.samples = args[1] ? args[1] : defargs.samples;
    appargs.special_chars = args[2] ? boolValue(args[2], defargs.special_chars) : defargs.special_chars;
    appargs.allow_nums = args[3] ? boolValue(args[3], defargs.allow_nums) : defargs.allow_nums;
    appargs.upp_case = args[4] ? boolValue(args[4], defargs.upp_case) : defargs.upp_case;
    appargs.low_case = args[5] ? boolValue(args[5], defargs.low_case) : defargs.low_case;
    appargs.allow_duplicates = args[6] ? boolValue(args[6], defargs.allow_duplicates) : defargs.allow_duplicates;
}

const main = (args = []) => {
    validateArgs(args);
    let samples = [];
    let pwd = [];
    console.log(appargs);
    while (samples.length < appargs.samples) {
        while (pwd.length < appargs.length) {
            let pc = pickChar();
            if (!appargs.allow_duplicates) {
                if (!pwd.includes(pc)) {
                    pwd[pwd.length] = pc;
                }
            } else {
                pwd[pwd.length] = pc;
            }
        }
        samples[samples.length] = pwd.join("");
        pwd = [];
    }
    console.log(samples);
}

const args = process.argv.slice(2);
main(args);