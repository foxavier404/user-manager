<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->insert([
            'name'=> Str::random(10),
            'email'=> Str::random(10). '@gmail.com',
            'password'=> MD5::make('password',),
        ]);
    }
}
