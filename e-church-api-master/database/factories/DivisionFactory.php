<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Models\Setting\Division;

$factory->define(Division::class, function (Faker $faker) {
    return [
        'name' => $name = $faker->sentence,
        'slug' => $name = $faker->sentence,
        'description' => $faker->paragraph(),
    ];
});
