
import { Placement } from "./ReactFiberFlags"
import { createFiberFromElement } from "./ReactFiber"
import { REACT_ELEMENT_TYPE } from "./ReactSymbols"

function ChildReconciler(shouldTrackSideEffects) {
    function placeSingleChild(newFiber) {
        if (shouldTrackSideEffects && !newFiber.alternate) {
            newFiber.flags = Placement
        }
        return newFiber
    }

    function reconcileSingleElement(returnFiber, currentFirstChild, element) {
        const created = createFiberFromElement(element)
        created.return = returnFiber
        return created
    }

    function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
        const isObject = typeof newChild === "object" && newChild;
        if (isObject) {
            switch(newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild))
                default: break
            }
        }
    }

    return reconcileChildFibers
}

export const reconcileChildFibers = ChildReconciler(true);

export const mountChildFibers = ChildReconciler(false);