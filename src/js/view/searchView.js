class SearchView {
    #parentEl = document.querySelector('.search')
    #inputEl = this.#parentEl.querySelector('.search__field')
    
    getQuery() {
        const query = this.#inputEl.value   
        this.#clearInput()
        return query
    }

    #clearInput() {
        this.#inputEl.value = ''
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit',e=>{
            e.preventDefault()
            handler()
        })
    }


}

export default new SearchView()