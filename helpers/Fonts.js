import FontFaceObserver from 'fontfaceobserver'

const Fonts = () => {
  var Montserrat = new FontFaceObserver('Montserrat')

  Montserrat.load()
    .then(function() {
      document.documentElement.classList.add('montserrat-loaded')
    })
    .catch(function() {})
}

export default Fonts
