export default function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types, 
      callAPI, 
      shouldCallAPI = () => true,
      payload = {}
    } = action;

    if (!types) {
      // Normal action, then pass it on
      return next(action)
    }

    if ( !Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch({
      type: requestType,
      payload
    })

    return callAPI().then(
      response =>
        dispatch({
          type: successType,
          payload,
          response
        }),
      error =>
        dispatch({
          type: failureType,
          payload, 
          error
        })
    )
  }
}