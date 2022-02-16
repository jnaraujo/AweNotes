interface ThemeInterface{
    pallet: {
        title: string;
        text: string;
        background: string;
    }
    font: {
        family: string;
    }
}

export type {ThemeInterface}

export const lightTheme : ThemeInterface = {
    pallet: {
        title: '#979797',
        text: '#979797',
        background: '#F8F9FA',
    },
    font: {
        family: 'Inter',
    }
}
  
// export const darkTheme : ThemeInterface = {
// }