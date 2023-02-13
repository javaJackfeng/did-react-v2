export function createElement(type) {
    return document.createElement(type)
}

export function setInitialProperties(domElement, tag, rawProps) {
    for (const propKey in rawProps) {
        const nextProp = rawProps[propKey];
        if (propKey === "children") {
            let childrenValueString = ""
            for (let childValue of nextProp) {
                childrenValueString += childValue
            }
            if (typeof childrenValueString === 'string') {
                domElement.textContent = childrenValueString;
            }
        } else if (propKey === 'style') {
            let styleObj = rawProps[propKey];
            for (let styleProp in styleObj) {
                domElement.style[styleProp] = styleObj[styleProp];
            }
        } else {
            domElement[propKey] = nextProp;
        }
    }
}