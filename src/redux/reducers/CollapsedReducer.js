
const CollapsedReducer = (preState = false, action) => {
    const {type} = action
    let newState = preState
    switch (type) {
        case 'change_collapsed':
            newState === false ? newState = true : newState = false
            return newState
        default:
            return preState

    }
    
}

export default CollapsedReducer