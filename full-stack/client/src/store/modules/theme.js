import variable from "@/assets/css/variable.less"

export default {
    namespaced: true,
    state: {
        variable,
        custom: {
            customMainBgc: 0,
            customMainColor: 0,
            // customMainHoverColor: 0,
            // customMainHoverBgc: 0,
            // customMainActiveColor: 0,
            customMainBoxShadow: 0,
        }
    },
    mutations: {
        whiteSwitch(state) {
            state.variable.mainBgc = state.variable.whiteMainBgc;
            state.variable.mainColor = state.variable.whiteMainColor;
            // state.variable.mainHoverColor = state.variable.whiteMainHoverColor;
            // state.variable.mainHoverBgc = state.variable.whiteMainHoverBgc;
            // state.variable.mainActiveColor = state.variable.whiteMainActiveColor;
            state.variable.mainBoxShadow =  state.variable.whiteMainBoxShadow;
        },
        darkSwitch(state) {
            state.variable.mainBgc = state.variable.darkMainBgc;
            state.variable.mainColor = state.variable.darkMainColor;
            // state.variable.mainHoverColor = state.variable.darkMainHoverColor;
            // state.variable.mainHoverBgc = state.variable.darkMainHoverBgc;
            // state.variable.mainActiveColor = state.variable.darkMainActiveColor;
            state.variable.mainBoxShadow = state.variable.darkMainBoxShadow;
        },
        customSwitch(state) {
            state.variable.mainBgc = state.custom.customMainBgc;
            state.variable.mainColor = state.custom.customMainColor;
            // state.variable.mainHoverColor = state.custom.customMainHoverColor;
            // state.variable.mainHoverBgc = state.custom.customMainHoverBgc;
            // state.variable.mainActiveColor = state.custom.customMainActiveColor;
            state.variable.mainBoxShadow = state.custom.customMainBoxShadow;
        },
        setCustom(state, arr) {
            state.custom.customMainBgc = arr[0];
            state.custom.customMainColor = arr[1];
            // state.custom.customMainHoverColor = 0;
            // state.custom.customMainHoverBgc = 0;
            // state.custom.customMainActiveColor = 0;
            state.custom.customMainBoxShadow = arr[2];
        }
    }
}