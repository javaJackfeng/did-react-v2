import { appendChild } from "./ReactDOMHostConfig"
import { HostComponent, HostRoot } from "./ReactWorkTags"

function getParentStateNode(fiber) {
    let parent = fiber.return
    do {
        if (parent.tag === HostRoot) {
            return parent.stateNode.containerInfo
        } else if (parent.tag === HostComponent) {
            return parent.stateNode
        }
        parent = parent.return
    } while (parent)
}

export function commitPlacement(finishedWork) {
    let stateNode = finishedWork.stateNode
    let parentStateNode = getParentStateNode(finishedWork)
    appendChild(parentStateNode, stateNode)
}