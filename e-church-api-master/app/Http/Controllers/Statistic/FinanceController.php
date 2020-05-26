<?php

namespace App\Http\Controllers\Statistic;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\APIError;
use App\Models\Person\User;

class FinanceController extends Controller
{
    function getFinance(Request $request) {
        return ['money' => '240E'];
    }
}
