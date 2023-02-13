import { REACT_ELEMENT_TYPE } from "./ReactSymbols";

const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
}

const createElement = (type, config, ...children) => {
    let key, ref
    const props = {
        children
    }
    if (config) {
        if ("key" in config) {
            key = '' + config.key
        }
        if ("ref" in config) {
            ref = config.ref
        }
        for (let propsName in config) {
            if (!RESERVED_PROPS.hasOwnProperty(propsName)) {
                props[propsName] = config[propsName]
            }
        }
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props
    }
}

const React = {
    createElement,
}

export default React