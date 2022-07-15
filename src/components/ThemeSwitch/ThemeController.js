class ThemeController {
    constructor(themeLists, startTheme = 'None', updateThemeCallback = () => {}) {
        this.Themes = themeLists;
        this.ThemeList = Object.keys(themeLists);
        this.CurrentTheme = startTheme;
        this.updateThemeCallback = updateThemeCallback; // TODO get this working
        console.log('Mark');
        // if (this.Theme != undefined) {
            Object.keys(this.Themes[startTheme]).forEach(el => {
                document.documentElement.style.setProperty(`--${el}`, this.Themes[startTheme][el]);
            });
        // }
    }

    setTheme(theme) {
        try {
            Object.keys(this.Themes[theme]).forEach(el => {
                document.documentElement.style.setProperty(`--${el}`, this.Themes[theme][el]);
            });
            this.CurrentTheme = theme;
            this.updateThemeCallback(theme);

            // create the event
            let themeChange = new CustomEvent('themeChange', {
                detail: { theme: theme }
            });
            // dispatch the event
            document.dispatchEvent(themeChange);
        }
        catch (e) {
            console.log(e);
        }
    }

    getTheme() {
        return this.CurrentTheme;
    }

    getThemeList() {
        return this.ThemeList;
    }
}

export default ThemeController;
