import * as model from './model.js'
import {MODAL_CLOSE_SEC} from './config'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'
import recipeView from './view/recipeView.js'
import resultsView from './view/resultsView.js'
import paginationView from './view/paginationView.js'
import bookmarksView from './view/bookmarksView.js'
import addOwnRecipeView from './view/addOwnRecipe'

import 'core-js/stable'
// import 'regenerator-runtime/runtime'

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept()
// }

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if(!id) return
    console.log(id);
    recipeView.renderSpinner()

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks)
    
    // 2) Loading recipe
    await model.loadRecipe(id)
    
    // 3) Rendering recipe
    recipeView.render(model.state.recipe)
    // const recipeView = new recipeView(model.state.recipe) The above code is better
    
  
  } catch (error) {
    console.log(error)
    recipeView.renderError()
    console.log(error);
  }
}

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner()
    // console.log(resultsView);
    // 1) Get search query
    const query = searchView.getQuery()
    if(!query) return

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    // resultsView.render(model.state.search.result)
    resultsView.render(model.getSearchResultsPage())

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error);
  }
}

const controlPagination = (goToPage) => {
  // 3) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage))

  // 4) Render NEW initial pagination buttons
    paginationView.render(model.state.search)
}

const controlUpdateRecipe = (newServings) => {
  model.updateRecipeServings(newServings)
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)

}

const controlAddBookmark = () => {
  // 1) Add remove bookmark
  if(!model.state.recipe.bookmark) model.addBookMark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)

  bookmarksView
  console.log(model.state.recipe);
}

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddOwnRecipe = async (newRecipe) => {
  try {
    // Show loading spinner
    addOwnRecipeView.renderSpinner()


    // Upload new recipe data
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe);
    
    // Render recipe
    recipeView.render(model.state.recipe)

    // Success message 
    addOwnRecipeView.renderMessage()

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // Change ID in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    // window.history.back()

    // Close form window
    setTimeout(()=>{
      addOwnRecipeView.toggleClassList()
    },MODAL_CLOSE_SEC * 1000)
  } catch (error) {
    console.log(error);
    addOwnRecipeView.renderError(error.message)
  }
}

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateRenderServings(controlUpdateRecipe)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addOwnRecipeView.addHandlerUpload(controlAddOwnRecipe)
}

init()
