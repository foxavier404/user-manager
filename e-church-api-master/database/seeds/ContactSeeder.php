<?php

use Illuminate\Database\Seeder;
use App\Models\Setting\Contact;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(\Faker\Generator $faker)
    {
        factory(Contact::class,21)->make()->each(function ($contact) use ($faker){
            $contact->save();
        });
    }
}
