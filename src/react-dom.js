import { createFiberRoot } from "./ReactFiberRoot"
import { updateContainer } from "./ReactFiberReconciler"

const render = (element, container) => {
    const fiberRoot = createFiberRoot(container)
    updateContainer(element, fiberRoot)
}

const ReactDom = {
    render
}

export default ReactDom