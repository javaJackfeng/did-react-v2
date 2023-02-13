import { createInstance, finalizeInitialChildren } from "./ReactDOMHostConfig";
import { HostComponent } from "./ReactWorkTags";

export function completeWork(current, workInProgress) {
    const newProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
        case HostComponent:
            if (current && workInProgress.stateNode) {
            } else {
                const type = workInProgress.type;
                const instance = createInstance(type, newProps);
                workInProgress.stateNode = instance;
                finalizeInitialChildren(instance, type, newProps);
            }
            break;
        default:
            break;
    }
}
