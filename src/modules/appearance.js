// @flow

/**
 * DASHBOARD_TOGGLE
 */
export const DASHBOARD_TOGGLE = '@appearance/DASHBOARD_TOGGLE'

export type toggleDashboardType = {
  type: '@appearance/DASHBOARD_TOGGLE'
}

export function toggleDashboard(): toggleDashboardType {
  return {
    type: DASHBOARD_TOGGLE,
  }
}

type AppearanceActionType = toggleDashboardType

export type AppearanceState = {
  +dashboardIsOpen: boolean,
}

const defaultState: AppearanceState = {
  dashboardIsOpen: false,
}

export const appearanceReducer = (state: AppearanceState = defaultState, action: AppearanceActionType): AppearanceState => {
  switch (action.type) {
    case DASHBOARD_TOGGLE: {
      return {
        ...state,
        dashboardIsOpen: !state.dashboardIsOpen,
      }
    }

    default:
      return state
  }
}
