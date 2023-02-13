/**
 * 初始化fiber 的更新队列
 * @param {*} fiber 
 */
export function initializeUpdateQueue(fiber) {
    const queue = {
        shared: {
            pending: null
        }
    }
    fiber.updateQueue = queue
}

/**
 * 创建更新对象
 * @returns 
 */
export function createUpdate() {
    return {}
}

// 将更新对象放到fiber更新队列上
export function enqueueUpdate(fiber, update) {
    const updateQueue = fiber.updateQueue
    const sharedQueue = updateQueue.shared
    const pending = sharedQueue.pending
    if (!pending) {
        update.next = update
    } else {
        update.next = pending.next
        pending.next = update
    }
    sharedQueue.pending = update 
}