export const settingsConfig =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'settings',
      url: '/settings',
      component: 'ftSettings'
    })
  }
