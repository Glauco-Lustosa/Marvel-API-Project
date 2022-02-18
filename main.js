var app = angular.module('mainApp', [])
app.controller('HeroController', function ($http, $scope) {
  let hero = this;
  const HASH = "bd4b447a65ef5d6b174f87cf9db6d2db"
  const API_KEY = "5a237863b3cc2061003cbbc4fe20dc06"
  const BASE_URL = "http://gateway.marvel.com/v1/public/characters"
  let characterUrl = `${BASE_URL}?limit=100&ts=1&apikey=${API_KEY}&hash=${HASH}`;
  $scope.canSee = true

  $http({
    method: 'GET',
    url: characterUrl
  }).then(function successCallback(response) {
    hero.heroesArray = response.data.data.results
    
    $scope.heroInfo = function (hero,index) {
    $scope.descriptionHero = hero.description
    $scope.heroName = hero.name
    var comics = []
  
    for (let i = 0; i < hero.comics.items.length; i++) {
      let quadrinhos = {name:hero.comics.items[i].name}
      comics.push(quadrinhos)
    }

    $scope.comics = comics
    }

    hero.heroSearch = (heroName) => {
      $scope.canSee = false
      let characterInfoUrl = `${BASE_URL}?name=${heroName}&ts=1&apikey=${API_KEY}&hash=${HASH}`;
      if (heroName == "") {
        return
      }
      $http({
        method: 'GET',
        url: characterInfoUrl
      }).then(function successCallback(response) {
        hero.info = response.data.data.results
        if (hero.info.length) {
          response.data.data.results[0].thumbnail.fullLink = `${response.data.data.results[0].thumbnail.path}.${response.data.data.results[0].thumbnail.extension}`  
        }

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    for (let i = 0; i < hero.heroesArray.length; i++) {
      response.data.data.results[i].thumbnail.fullLink = `${response.data.data.results[i].thumbnail.path}.${response.data.data.results[i].thumbnail.extension} `
    }
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
});