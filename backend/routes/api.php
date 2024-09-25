<?php

// Import necessary classes for handling HTTP requests and routing
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import the SearchHistoryController to handle search history operations
use App\Http\Controllers\SearchHistoryController;

// Define a POST route for storing search history
// This route will trigger the 'store' method of the SearchHistoryController when a POST request is made to '/search-history'
Route::post('/search-history', [SearchHistoryController::class, 'store']); 

// Define a GET route for retrieving search history
// This route will trigger the 'index' method of the SearchHistoryController when a GET request is made to '/search-history'
Route::get('/search-history', [SearchHistoryController::class, 'index']); 
