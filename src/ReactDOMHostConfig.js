import { createElement, setInitialProperties } from './ReactDOMComponent'

export function shouldSetTextContent(type, props) {
    return typeof props.children === "string" || props.children === "number"
}

export function createInstance(type) {
    return createElement(type);
}

export function finalizeInitialChildren(domElement, type, props) {
    setInitialProperties(domElement, type, props);
}

export function appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
}

export function insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild);
}

