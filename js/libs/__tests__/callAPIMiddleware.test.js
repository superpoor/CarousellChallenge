import callAPIMiddleware from '../callAPIMiddleware'

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  }

  const next = jest.fn()

  // function to call the middleware
  const invoke = (action) => callAPIMiddleware(store)(next)(action)

  return { store, next, invoke };
}


describe('Test callAPIMiddleware', () => {

  it('passes through non async action', () => {
    const { next, invoke } = create();
    const action = {type: 'TEST'}
    invoke(action)
    expect(next).toHaveBeenCalledWith(action);
  })

  it('calls correct actions in types - success case', () => {
    const { store, next, invoke } = create();
    const action = { 
      types: ['REQUEST', 'SUCCESS', 'FAILURE'], 
      callAPI: () => new Promise((resolve) => {
        resolve({ test: 'test data' })
      }) 
    }
    return invoke(action).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith({type: 'REQUEST', payload: {}});
      expect(store.dispatch).toHaveBeenCalledWith({type: 'SUCCESS', payload: {}, response: { test: 'test data' } });
    })
  })

  it('calls correct actions in types - failure case', () => {
    const { store, next, invoke } = create();
    const action = { 
      types: ['REQUEST', 'SUCCESS', 'FAILURE'], 
      callAPI: () => new Promise((resolve, reject) => {
        reject(new Error('Some error'))
      }) 
    }
    return invoke(action).then(() => {
      expect(store.dispatch).toHaveBeenCalledWith({type: 'REQUEST', payload: {}});
      expect(store.dispatch).toHaveBeenCalledWith({type: 'FAILURE', payload: {}, error: new Error('Some error') });
    })
  })

  it('does not call any action in types if shouldCallAPI return false', () => {
    const { store, next, invoke } = create();
    const action = { 
      types: ['REQUEST', 'SUCCESS', 'FAILURE'], 
      shouldCallAPI: () => false,
      callAPI: () => new Promise((resolve) => {
        resolve({ test: 'test data' })
      }) 
    }
    invoke(action)
    expect(store.dispatch).not.toHaveBeenCalledWith({type: 'REQUEST', payload: {}});
    expect(store.dispatch).not.toHaveBeenCalledWith({type: 'SUCCESS', payload: {}, response: expect.any(Object) });
    expect(store.dispatch).not.toHaveBeenCalledWith({type: 'FAILURE', payload: {}, error: expect.any(Object) });
  })

})

