// To reuse code
// import icons from '../img/icons.svg' //Parcel 1
import icons from 'url:../../img/icons.svg' //Parcel 2 if it's not in folder
export default class View {
    _data
    
    render(data,render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this._data = data
        const markup = this._generateMarkup()
        console.log(markup);
        console.log(this._data);
        if(!render) return markup

        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    update(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this._data = data
        const markup = this._generateMarkup()

        const newDOM = document.createRange().createContextualFragment(markup)
        console.log(newDOM);
        const newElements = Array.from(newDOM.querySelectorAll('*'))
        const curElements = Array.from(this._parentElement.querySelectorAll('*'))
        newElements.forEach((newEle,i) => {
            const curEle = curElements[i]

            if(!newEle.isEqualNode(curEle) && newEle.firstChild?.nodeValue.trim() !== ''){
                curEle.textContent = newEle.textContent
            }

            if(!newEle.isEqualNode(curEle)){
                console.log(Array.from(newEle.attributes))
                console.log(Array.from(curEle.attributes))

                Array.from(newEle.attributes).forEach(attr => {
                    curEle.setAttribute(attr.name,attr.value)
                    
                })
                console.log(curEle);
            }
        })
    }

    _clear() {
        console.log(this._data);
        this._parentElement.innerHTML = ''
    }

    renderSpinner = ()=>{
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
}