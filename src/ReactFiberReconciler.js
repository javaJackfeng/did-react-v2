import { createUpdate, enqueueUpdate } from './ReactUpdateQueue'
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"

export const updateContainer = (element, container) => {
    const current = container.current
    const update = createUpdate()
    update.payload = { element }
    enqueueUpdate(current, update)
    console.log("current", current)
    scheduleUpdateOnFiber(current)
}