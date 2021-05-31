import icons from 'url:../../img/icons.svg' //Parcel 2 if it's not in folder
import View from './View.js'

class AddOwnRecipe extends View{
    _parentElement = document.querySelector('.upload')
    _message = 'Recipe was successfully uploaded :)'
   
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    _modelRecipe = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')

    constructor() {
      super()
      this._addHandlerShowWindow()
      this._addHandlerHideWindow()
    }

    toggleClassList(){
      this._modelRecipe.classList.toggle('hidden')
      this._overlay.classList.toggle('hidden')
    }

    _addHandlerShowWindow() {
      this._btnOpen.addEventListener('click',this.toggleClassList.bind(this))
    }

    _addHandlerHideWindow() {
      this._btnClose.addEventListener('click',this.toggleClassList.bind(this))
      this._overlay.addEventListener('click',this.toggleClassList.bind(this))
    }

    addHandlerUpload(handler) {
      this._parentElement.addEventListener('submit',function(e) {
        console.log(this);
        e.preventDefault()
        const dataArr = [...new FormData(this)]
        const data = Object.fromEntries(dataArr)
        handler(data)
      })
    }
    
    _generateMarkup() {
      
    }

    
}

export default new AddOwnRecipe()
