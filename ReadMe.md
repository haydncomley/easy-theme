# Easy Theme 🎨
This package has a bunch of helpful SCSS tools that you can use to theme your application in a fast and reliable way.

Theming is made super easy and it all generates down to CSS variables. As well as that, this package also has some useful SCSS mixins that cover the basics from dark-mode, responsiveness, mobiles and more!

```
npm install easy-theme
```

## "Here's one I made earlier" 🧱
This is just a quick overview of some of the features within `easy-theme` and how they work. Just `@use` the package in any SCSS file you want to use the tooling, or import helper functions within JavaScript or TypeScript with `import { setLightTheme } from 'easy-theme';`.
```scss
// index.scss

// 1. Import the tools.
@use "easy-theme" as theme;

// 2. Create your theme.
$light-theme: (
    'background': (#FFFFFF, #000000),
    'primary': (#1BFF72, #FFFFFF, true),
);

$dark-theme: (
    'background': (#000000, #FFFFFF),
);

$variables: (
    'spacing': .75rem,
    'radius': .2rem,
);

// 3. Let easy-theme do the rest!
@include theme.UseTheme((
    light: $light-theme,
    dark: $dark-theme,
    variables: $variables,
));

html, body {
    background: theme.Color('background');
}
```

```scss
// button.scss
@use "easy-theme" as theme;

button {
    background: theme.Color('primary');
    color: theme.Text('primary');
    border: 1px solid theme.Color('primary', 'darker');
    padding: theme.Variable('spacing');
}
```

```JavaScript
// index.js
import { setLightTheme } from 'easy-theme';

setLightTheme({
    'primary': ['#1BFF72', '#ffffff', true]
});
```

## Getting Started 🎬
1. Import `easy-theme` into any file that you want to use the tooling.
```scss
@use "easy-theme" as theme;
```
2. Define your colours
```scss
$light-theme: (
    // Basic Variables
    'background': (#FFFFFF, #000000),

    // Stepped Variables
    'primary': (#1BFF72, #FFFFFF, true),

    // Syntax:
    // 'color-name': (color, contrast, create-steps?),
);
```
3. Generate the theme (normally you would define this in your index or global style sheet but anywhere will work).
```scss
@include theme.UseTheme((
    light: $light-theme
));
```
4. Use your theme!

```scss
button {
    background: theme.Color('primary');
    color: theme.Text('primary');
    border: 1px solid theme.Color('primary', 'darker');

    &:disabled {
        background: theme.Color('primary', .5);
        color: theme.Text('primary', .5);
    }
}

// Above will be compiled into the following for the browser.

button {
    background: var(--theme-primary);
    color: var(--theme-primary-contrast);
    border: 1px solid var(--theme-primary-darker);

    &:disabled {
        background: rgba(var(--theme-primary-rgb), .5);
        color: rgba(var(--theme-primary-contrast-rgb), .5);
    }
}
```

## Theming Syntax ⚙️
- `color-name: string`: The name of the css variable to generate (e.g. background, navbar, primary, etc.)
- `color: hex`: The core variable color.
- `contrast: hex`: This is a contrasting color, this is mainly used for when you want to display text or icons on top of the colour provided.
- `create-steps?: boolean`: This is an optional value that if `true` will create extra variables for consistent theme steps (e.g. lighter, darker, darkest, etc.).

## Variable Syntax 🧑‍💻
- `variable-name: css-value`: The name of the CSS variable to generate (e.g. background, navbar, primary, etc.) and any valid CSS value
- `default?: css-value`: Any valid CSS value should the variable not be found.

#  Dark-mode theming and custom steps.
If you want to give your application some extra ✨ spice ✨ you can jazz up your theme with a dark mode and also some custom steps.

## Dark theme 🌙
Dark mode is super easy to get going, just create another object like the `$light-mode` we have above and shove your variables in there. These will overwrite any variables when a user has `@media (prefers-color-scheme: dark)` (aka: "Dark Mode") active on their device.
```scss
$light-theme: (
    'background': (#FFFFFF, #000000),
    'primary': (#1BFF72, #FFFFFF, true),
);

$dark-theme: (
    'background': (#000000, #FFFFFF),
);

@include theme.UseTheme((
    light: $light-theme,
    dark: $dark-theme,
));
```

## Custom Steps 🦶
By default if you don't provide any custom steps we will generate the following when you pass `true` to a theme colour definition.
- Lighter: `+25%`
- Light: `+15%`
- Dark: `-15%`
- Darker: `-25%`

All you need to do is include a new map of values within the theme and you'll be off to the races with your custom steps.

```scss
@include theme.UseTheme((
    light: $light-theme,
    dark: $dark-theme,
    steps: (
        'really-light': 50%,
        'just-a-touch-lighter': 5%,
        'a-little-darker': -10%,
        'super-dark': -90%
    )
));
```

## Helpers, Tools & Mixins 🔨
Here is a list of some "niceities" I've made that you can use to access media queries etc, but with a little more ease. 

### Mobile / Responsiveness 📱
```scss
@include theme.NotMobile {
    // 📵 We're a computer or something...
}

@include theme.Tablet {
    // 💻 We're probably a tablet, or at least a small computer...
}

@include theme.Mobile {
    // 📱 We are a mobile (most-likely)!
}

@include theme.MobileTiny {
    // 🐜 We are an itty-bitty little device.
}
```

### Preferences & Accessibility 🔤
```scss
@include theme.DarkMode {
    // 🌙 Dark-mode is enabled
}

@include theme.ReducedMotion {
    // 🏃‍♂️ The user want's to reduce animations on their device
}

@include theme.Landscape {
    // ⛰ The device is landscape...
}

@include theme.Portrait {
    // 🖼 The device is portrait...
}

@include theme.JavaScriptDisabled {
    // ❌ Scripting is not allowed on the device.
}

@include theme.JavaScriptEnabled {
    // 👩‍💻 Scripting is allowed!
}
```
