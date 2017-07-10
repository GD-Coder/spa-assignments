import 'app/styles/register.styles'
import templateUrl from 'app/html/register.template'

const controller = class FtRegisterController {
  constructor ($log, $state, $location, $http, ftGameSettings, $window, $rootScope, appService) {
    'ngInject'
    this.service = appService
    this.settings = ftGameSettings
    this.$location = $location
    this.$window = $window
    this.$state = $state
    this.$http = $http
    // $rootScope.$on(this.$location.$routeChangeStart, this.checkAuth())
    $log.log('ft-register is a go')
  }
  registerSubmit () {
    alert('Started!')
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/validate/username/available/@' + this.username + ''
      }).then(this.successCallback = (response) => {
        //alert(JSON.stringify(response.data) + '1')
      if (response.data === true) {
        //alert(JSON.stringify(response.data) + '2')
        this.$http({
          method: 'POST',
          url: 'http://localhost:8080/users/',
          data:
          {
            content: 'string',
            credentials: {
              uname: this.username,
              password: this.password
            },
            profile: {
              firstName: this.firstname,
              lastName: this.lastname,
              email: this.email,
              phone: '4057797130'
            }}})
       .then((response) => {
         alert(JSON.stringify(response.data) + '3')
         if (response.status === 201) {
           alert('User Created!' + ' ' + '201')
         }
         else {
              alert(JSON.stringify(response.data) + '4')
           this.error = 'something stupid happened.'
         }
       })
      } else {
          alert(JSON.stringify(response.data) + '5')
        this.error = 'Username is taken, try another.'
      }
      }, this.errorCallback = (response) => {
        alert(JSON.stringify(response.data) + '6')
        this.error = 'Username or password are incorrect, please try again.'
    })
  }
}

export const ftRegister = {
  controller,
  templateUrl,
  controllerAs: 'register'
}
