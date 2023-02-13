import { createHostRootFiber } from "./ReactFiber"
import { initializeUpdateQueue } from "./ReactUpdateQueue"

function FiberRootNode(containerInfo){
    this.containerInfo = containerInfo
}

export function createFiberRoot(containerInfo) {
    const root = new FiberRootNode(containerInfo)
    const hostRootFiber = createHostRootFiber();
    root.current = hostRootFiber
    hostRootFiber.stateNode = root
    initializeUpdateQueue(hostRootFiber)
    return root
}