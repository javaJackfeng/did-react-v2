import { HostComponent, HostRoot } from "./ReactWorkTags";
import { reconcileChildFibers, mountChildFibers } from "./ReactChildFiber"
import { shouldSetTextContent } from "./ReactDOMHostConfig"

export function beginWork(current, workInProgress) {
    switch(workInProgress.tag) {
        case HostRoot:
            return updateHostRoot(current, workInProgress);
        case HostComponent:
            return updateHostComponent(current, workInProgress)
        default: break
    }
}

function updateHostRoot(current, workInProgress) {
    const updateQueue = workInProgress.updateQueue
    const nextChildren = updateQueue.shared.pending.payload.element
    reconcileChildren(current, workInProgress, nextChildren)
    updateQueue.shared.pending = null
    return workInProgress.child
}

function updateHostComponent(current, workInProgress) {
    const type = workInProgress.type
    const nextProps = workInProgress.pendingProps
    let nextChildren = nextProps.children
    const isDirectTextChild = shouldSetTextContent(type, nextProps)
    if (isDirectTextChild) {
        nextChildren = null
    }
    reconcileChildren(current, workInProgress, nextChildren)
    return workInProgress.child
}

function reconcileChildren(current, workInProgress, nextChildren) {
    if (current) {
        workInProgress.child = reconcileChildFibers(
            workInProgress,
            current && current.child,
            nextChildren
        )
    } else {
        workInProgress.child = mountChildFibers(
            workInProgress,
            current && current.child,
            nextChildren
        )
    }
}