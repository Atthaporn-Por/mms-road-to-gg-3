import { NavigationActions } from 'react-navigation'
import { RootStackNavigator } from 'navigation/RootNavigation'
import { fromJS } from 'immutable'

let initialState = RootStackNavigator.router.getStateForAction(
  NavigationActions.init()
)

const firstAction = RootStackNavigator.router.getActionForPathAndParams('UnAuthScreen')

initialState = RootStackNavigator.router.getStateForAction(
  firstAction,
  initialState
)

export default (state = initialState, action) => {
  const nextState = RootStackNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
