const LoadingReducer = (preState = false, action) => {
    const {type, payload} = action
    let newState = preState
    switch (type) {
        case 'change_loading':
            newState = payload
            return newState
        default:
            return preState

    }
    
}

export default LoadingReducer