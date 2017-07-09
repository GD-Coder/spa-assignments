export const registerConfig =
  ($stateProvider) => {
    'ngInject'
    $stateProvider.state({
      name: 'register',
      url: '/register',
      component: 'ftRegister'
    })
  }
