<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCathechumenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cathechumenes', function (Blueprint $table) {
            $table->increments('id');
            $table->text('father_tel');
            $table->text('godfather_tel');
            $table->string('profession');
            $table->string('catechese_level');
            $table->string('catechese_place');
            $table->text('birth_certificate');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cathechumenes');
    }
}
