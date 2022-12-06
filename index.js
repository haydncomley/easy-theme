const hexToRGB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHSL(H) {
    let r = 0,
        g = 0,
        b = 0;
    if (H.length === 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [Math.round(h), Math.round(s), Math.round(l)];
}

function changeBrightness(hex, delta) {
    const [hue, saturation, lightness] = hexToHSL(hex);


    const newLightness = Math.max(
        0,
        Math.min(100, lightness + parseFloat(delta))
    );

    return hslToHex(hue, saturation, newLightness);
}

const themeColor = (selector, primary, contrast, extras = false, steps = []) => {
    const primaryRGB = hexToRGB(primary);
    const contrastRGB = hexToRGB(contrast);
    if (!steps || steps.length === 0) {
        steps = {
            'lighter': 25,
            'light': 15,
            'dark': -15,
            'darker': -25,
        };
    }

    const rules = [
        [`--theme-${selector}`, primary],
        [`--theme-${selector}-contrast`, contrast],
        [`--theme-${selector}-rgb`, `${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}`],
        [`--theme-${selector}-contrast-rgb`, `${contrastRGB.r}, ${contrastRGB.g}, ${contrastRGB.b}`],
    ];

    if (extras) {
        Object.keys(steps).forEach(key => {
            rules.push([
                `--theme-${selector}-${key}`,
                changeBrightness(primary, steps[key])
            ])
        });
    }

    return rules;
}

const setTheme = (options, darkMode = false, steps = []) => {
    const stylesheetName = !darkMode ? 'easy-theme' : 'easy-theme-dark';
    let stylesheet = document.querySelector(`#${stylesheetName}`);

    if (!stylesheet) {
        stylesheet = document.createElement('style');
        stylesheet.id = stylesheetName;
    }

    let styles = '';
    if (darkMode) styles += '@media (prefers-color-scheme: dark)  {\n\t';
    styles += ':root {\n' + (darkMode ? '\t' : '');

    Object.keys(options).forEach((key) => {
        const rawColors = options[key];
        const rules = themeColor(key, rawColors[0], rawColors[1], !!rawColors[2], steps);
        rules.forEach((rule) => {
            styles += `${darkMode ? '\t\t' : '\t'}${rule[0]}:${rule[1]};\n`;
        });
    });

    if (darkMode) styles += '\t}\n';
    styles += '}';

    stylesheet.textContent = styles;
    document.head.appendChild(stylesheet);
}

const clearTheme = (darkMode = false) => {
    const stylesheetName = !darkMode ? 'easy-theme' : 'easy-theme-dark';
    let stylesheet = document.querySelector(`#${stylesheetName}`);
    if (stylesheet) stylesheet.remove();
}

const setLightTheme = (options, steps = []) => setTheme(options, false, steps);
const setDarkTheme = (options, steps = []) => setTheme(options, true, steps);

const clearLightTheme = () => clearTheme(true);
const clearDarkTheme = () => clearTheme(false);

export {
    setLightTheme,
    setDarkTheme,
    clearLightTheme,
    clearDarkTheme
};