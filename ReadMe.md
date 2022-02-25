# 🎨 Easy Theme
This is a simple package that uses some SASS awesomeness in order to create a CSS Variable based theming solution quick and easily.

It also exposes some custom functions that wrap media queries for easy access to common mobile sizes, dark-mode and more!

```
npm install easy-theme
```

---

## ⚙️ Theme Syntax
- `css-variable-name: string`: The name of the css variable to generator (e.g. background, navbar, primary, etc.)
- `color: hex`: The core variable color. (a background might be white or black or this could be a brand color etc.)
- `contrast: hex`: This is a contrasting color for this variable, this is mainly used for when you want to display text or icons on-top of the colour provided.
- `create-steps?: boolean`: This is an optional value that if `true` will create extra variables for consistent theme steps (e.g. lighter, darker, darkest, etc.).

---

## 🎬 Getting Started
1. Import `easy-theme`.
```scss
@use "~easy-theme" as theme;
```
2. Create your theme!
```scss
$light-theme: (
    // Basic Variables
    'background': (#FFFFFF, #000000),

    // Stepped Variables
    'primary': (#1BFF72, #FFFFFF, true),

    // Syntax:
    '<css-variable-name>': (<color>, <contrast>, <create-steps?>),
);
```
3. Generate the theme.
```scss
@include theme.UseTheme((
    light: $light-theme
));
```
4. Use your theme!
   - You will see in your `:root` object all the css variables generated for your theme. These will include the base hex values provided, the contrasting values but also an `rgb` variable as well just in-case you want to do some on-the-fly opacity adjustments.
   - You can either straight up use the CSS variable names generated like `var(--theme-primary)` or you can also use the tooling to get extra fancy with your styles.

```scss
// Use the theme tooling for easier readability
button {
    background: theme.Color('primary');
    color: theme.Text('primary');
    border: 1px solid theme.Color('primary', 'darker');

    &:disabled {
        background: theme.Color('primary', .5);
        color: theme.Text('primary', .5);
    }
}

// Use the generated CSS variables
button {
    background: var(--theme-primary);
    color: var(--theme-primary-contrast);
    border: 1px solid var(--theme-primary-darker);

    &:disabled {
        background: rgba(var(--theme-primary-rgb), .5);
        background-color: rgba(var(--theme-primary-contrast-rgb), .5);
    }
}
```

## 🎥 All Together Now.
This is a example of how your `.scss` file might look after following all the steps above.
```scss
@use "~easy-theme" as theme;

$light-theme: (
    'background': (#FFFFFF, #000000),
    'primary': (#1BFF72, #FFFFFF, true),
);

@include theme.UseTheme((
    light: $light-theme
));

button {
    background: theme.Color('primary');
    color: theme.Text('primary');
    border: 1px solid theme.Color('primary', 'darker');
}
```

---

## 👷‍♀️ Advanced Theming (Dark Mode + Custom Steps)
If you want to give your application some extra ✨ spice ✨ you can jazz up your theme with dark-mode and also custom steps.

### 🌙 Dark mode
Dark more is super easy to get going, just create another SCSS variable like the `$light-mode` we have above and shove your variables in there. These will overwrite any variables when a user has `@media (prefers-color-scheme: dark)` (aka: "Dark Mode") active on their device.
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

### 🦶 Custom Steps
By default if you don't provide any custom steps we will generate the following:
- Lighter: `+25%`
- Light: `+15%`
- Dark: `-15%`
- Darker: `-25%`

All you need to do is include a new map of values within the theme and you'll be off to the races with your custom values.

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

---

## 📲 Mobiles, Tablets & Responsiveness
To include mobile specific styling simply use the `mixins` provided rather than writing out a million different media queries.
```scss
body {
    @include theme.NotMobile {
        // 📵 We're a computer or something...
    }

    @include theme.Tablet {
        // 💻 We're a little smaller than a computer.
        // Probably a tablet, but not a mobile.
    }

    @include theme.Mobile {
        // 📱 We are a mobile device!!
        background: red;
    }

    @include theme.MobileTiny {
        // 🐜 We are an itty-bitty device like an iPhone 5
        background: green;
    }
}
```