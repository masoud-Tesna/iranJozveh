/** @type {import('antd').ThemeConfig} */
import {tailwindTheme} from '@/theme/tailwind-theme';

const antdTheme = {
  token: {
    fontSize: 16,
    fontFamily: 'samimFont',
    colorPrimary: tailwindTheme.theme.extend.colors.primary
  },
  components: {
    Form: {
      itemMarginBottom: 30
    },
    Input: {
      controlHeight: 42,
      colorBorder: tailwindTheme.theme.extend.colors.gray[40],
      activeBorderColor: tailwindTheme.theme.extend.colors.gray[50],
      hoverBorderColor: tailwindTheme.theme.extend.colors.gray[50],
      borderRadius: 4,
      activeShadow: tailwindTheme.theme.extend.boxShadow[2]
    },
    Select: {
      controlHeight: 44,
      colorBorder: tailwindTheme.theme.extend.colors.gray[40],
      colorPrimary: tailwindTheme.theme.extend.colors.gray[50],
      colorPrimaryHover: tailwindTheme.theme.extend.colors.gray[50],
      borderRadius: 4
    },
    Modal: {
      boxShadow: '0 6px 22px 0 rgba(0, 0, 0, .25)',
      marginXS: 25,
      borderRadiusLG: 0,
      colorBgMask: 'rgba(0, 0, 0, 0.50)'
    },
    Checkbox: {
      colorText: tailwindTheme.theme.extend.colors.gray[40],
      colorBorder: tailwindTheme.theme.extend.colors.gray[40],
      colorPrimary: tailwindTheme.theme.extend.colors.gray[50],
      colorPrimaryHover: tailwindTheme.theme.extend.colors.gray[40],
      borderRadiusSM: 2
    },
    Button: {
      borderRadius: 4,
      controlHeight: 42,
      paddingInline: 25,
      defaultBorderColor: tailwindTheme.theme.extend.colors.primary,
      defaultColor: tailwindTheme.theme.extend.colors.primary
    },
    Menu: {
      itemBg: 'transparent',
      darkItemBg: 'transparent',
      itemActiveBg: 'rgba(255, 255, 255, 0.10)',
      itemSelectedBg: 'rgba(255, 255, 255, 0.1)',
      itemHoverBg: 'rgba(255,255,255,0.07)',
      itemColor: '#FFFFFF',
      darkItemColor: 'red',
      itemHoverColor: '#FFFFFF',
      itemSelectedColor: '#FFFFFF',
      itemBorderRadius: 4,
      itemMarginBlock: 8,
      iconMarginInlineEnd: 16
    },
    Table: {
      colorText: '#6D6D6D',
      colorTextHeading: '#656565',
      headerBg: '#F5F7F9',
      headerBorderRadius: 0
    },
    Switch: {
      trackHeight: 30,
      handleSize: 25
    },
    Image: {
      colorBgMask: 'rgba(0,0,0,.93)'
    }
  }
};

export {antdTheme};
