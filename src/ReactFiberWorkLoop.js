import { HostRoot, HostComponent } from "./ReactWorkTags"
import { createWorkInProgress } from "./ReactFiber"
import { beginWork } from "./ReactFiberBeginWork"
import { completeWork } from "./ReactFiberCompleteWork"
import { Placement } from "./ReactFiberFlags"
import { commitPlacement } from "./ReactFiberCommitWork"

let workInProgressRoot = null
let workInProgress = null

export function markUpdateLaneFromFiberToRoot(fiber) {
    let node = fiber
    let parent = fiber.return
    while (parent) {
        node = parent
        parent = parent.return
    }
    if (node.tag === HostRoot) {
        return node.stateNode
    }
}

export function scheduleUpdateOnFiber(fiber) {
    const root = markUpdateLaneFromFiberToRoot(fiber)
    performSyncWorkOnRoot(root)
}

export function performSyncWorkOnRoot(root) {
    workInProgressRoot = root
    workInProgress = createWorkInProgress(workInProgressRoot.current)
    workLoopSync()
    commitRoot()
}

function commitRoot() {
    const finishedWork = workInProgressRoot.current.alternate
    workInProgressRoot.finishedWork = finishedWork
    console.log("workInProgressRoot", workInProgressRoot)
    commitMutationEffects(workInProgressRoot)
}

function commitMutationEffects(root) {
    const finishedWork = root.finishedWork
    let nextEffect = finishedWork.firstEffect
    let effectList = '';
    while (nextEffect) {
        effectList += `(${getFlag(nextEffect.flags)}#${nextEffect.type}#${nextEffect.key})=>`;
        const flags = nextEffect.flags
        if (flags === Placement) {
            commitPlacement(nextEffect)
        }
        nextEffect = nextEffect.nextEffect
    }
    effectList += 'null';
    root.current = finishedWork
}

function getFlag(flags) {
    switch (flags) {
        case Placement: return '添加';
        default: break;
    }
}

function workLoopSync() {
    while (workInProgress) {
        console.log("workLoopSync", workInProgress)
        performUnitOfWork(workInProgress)
    }
}

function performUnitOfWork(unitOfWork) {
    const current = unitOfWork.alternate
    let next = beginWork(current, unitOfWork)
    unitOfWork.memoizedProps = unitOfWork.pendingProps

    if (next) {
        workInProgress = next
    } else {
        completeUnitOfWork(unitOfWork)
    }
}

function completeUnitOfWork(unitOfWork) {
    let completedWork = unitOfWork
    do {
        const current = completedWork.alternate
        const returnFiber = completedWork.return
        completeWork(current, completedWork)
        collectEffectList(returnFiber, completedWork)
        const siblingFiber = completedWork.sibling
        if (siblingFiber) {
            workInProgress = siblingFiber
            return
        }
        completedWork = returnFiber
        workInProgress = completedWork
    } while (completedWork)
}

function collectEffectList(returnFiber, completedWork) {
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = completedWork.firstEffect
        }
        if (completedWork.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completedWork.lastEffect
            }
            returnFiber.lastEffect = completedWork.lastEffect
        }

        const flags = completedWork.flags
        if (flags) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completedWork
            } else {
                returnFiber.firstEffect = completedWork
            }
            returnFiber.lastEffect = completedWork
        }
    }
}