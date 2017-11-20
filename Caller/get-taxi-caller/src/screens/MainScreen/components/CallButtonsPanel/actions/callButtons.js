export const makeFreeCall = () => {
  return (dispatch, getState) => {
    const newTransaction = getState().get('newTransaction')
    if (!(newTransaction.get('pick_up').size && newTransaction.get('drop_off').size)) {
      return null
    }

    
  }
}
