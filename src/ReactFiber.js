import { HostRoot, HostComponent } from "./ReactWorkTags"
import { NoFlags } from "./ReactFiberFlags"

export function createFiberFromElement(element) {
    const { key, props, type } = element
    let fiberTag
    if (typeof type === "string") {
        fiberTag = HostComponent
    }
    const fiber = createFiber(fiberTag, props, key)
    fiber.type = type
    return fiber
}

export function createHostRootFiber() {
    return createFiber(HostRoot)
}

export function createFiber(tag, pendingProps, key) {
    return new FiberNode(tag, pendingProps, key)
}

/**
 * 基于老的current 创建新的workInProgress
 * @param {} current 
 */
export function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate
    if (!workInProgress) {
        workInProgress = createFiber(current.tag, pendingProps, current.key)
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode
        workInProgress.alternate = current
        current.alternate = workInProgress
    } else {
        workInProgress.pendingProps = pendingProps
        workInProgress.flags = NoFlags
    }

    // ?? why
    workInProgress.child = null
    workInProgress.sibling = null
    workInProgress.firstEffect = workInProgress.nextEffect = workInProgress.lastEffect = null

    workInProgress.updateQueue = current.updateQueue
    return workInProgress
}

function FiberNode(tag, pendingProps, key) {
    this.tag = tag;
    this.pendingProps = pendingProps;
    this.key = key
}