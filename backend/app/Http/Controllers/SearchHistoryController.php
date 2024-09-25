<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSearchHistoryRequest; // Import the custom request
use App\Models\SearchHistory;

class SearchHistoryController extends Controller
{
    public function store(StoreSearchHistoryRequest $request)
    {
        // Create a new search history record
        $history = SearchHistory::create($request->validated()); // Use validated data

        // Respond with the created history
        return response()->json($history, 201);
    }

    public function index()
    {
        return SearchHistory::all();
    }
}
