<?php

namespace App\Http\Controllers\Person;

use App\Http\Controllers\Controller;
use App\Models\Person\Cathechumene;
use Illuminate\Http\Request;

class CathechumeneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        $data = Cathechumene::simplePaginate($req->has('limit')? $req->limit : 15);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createCathechumene()
    {
         $data = $req->except('birth_certificate');

        $this->validate($data, [
            'father_tel' => 'required',
            'godfather_tel' => 'required',
            'profession' => 'required',
            'catechese_level' => 'required',
            'catechese_place' => 'required',
        ]);

            $cathechumene = new Cathechumene();
            $cathechumene->father_tel = $data['father_tel'];
            $cathechumene->godfather_tel = $data['godfather_tel'];
            $cathechumene->profession = $data['profession'];
            $cathechumene->catechese_level = $data['catechese_level'];
            $cathechumene->catechese_place = $data['catechese_place'];
            $cathechumene->birth_certificate = $data['birth_certificate'];
          
            $cathechumene->save();
       
        return response()->json($cathechumene);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function searchCathechumene(Request $req)
    {
        $this->validate($req->all(), ['q'=>'present',
        'field'=>'present'
       ]);
       $data = Cathechumene::where($req->field,'like',"%$req->q%")->get();
       return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Person\Cathechumene  $cathechumene
     * @return \Illuminate\Http\Response
     */
    public function show(Cathechumene $cathechumene)
    {
        //
    }
    public function find($id)
    {
        if(!$cathechumene = Cathechumene::find($id)){
            abort(404,"No cathechumene found with id $id");
        }
        return response()->json($cathechumene);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Person\Cathechumene  $cathechumene
     * @return \Illuminate\Http\Response
     */
    public function edit(Cathechumene $cathechumene)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Person\Cathechumene  $cathechumene
     * @return \Illuminate\Http\Response
     */
    public function updateCathechumene(Request $req , $id)
    {
        
    
        $cathechumene = Cathechumene::find($id);
        if (!$cathechumene) {
            abort(404, "No user found with id $id");
        }

        $data = $req->except('birth_certificate');

        $this->validate($data, [
            'father_tel' => 'required',
            'godfather_tel' => 'required',
            'profession' => 'required',
            'catechese_level' => 'required',
            'catechese_place' => 'required',
        ]);

        /* if (isset($data['password']) && strlen($data['password']) >= 4) {
            $data['password'] = bcrypt($data['password']);
        } */

        //upload image
        if ($file = $req->file('birth_certificate')) {
            $photo = app()->make('UploadService')->saveSingleImage($this, $req, 'birth_certificate', 'cathechumenes');
            $data['birth_certificate'] =  $photo;
        }

        if (null !== $data['father_tel']) $cathechumene->father_tel = $data['father_tel'];
        if (null !== $data['godfather_tel']) $cathechumene->godfather_tel = $data['godfather_tel'];
        if (null !== $data['profession']) $cathechumene->profession = $data['profession'];
        if (null !== $data['catechese_level']) $cathechumene->catechese_level = $data['catechese_level'];
        if (null !== $data['catechese_place']) $cathechumene->catechese_place = $data['catechese_place'];
    
        
        
        $cathechumene->update();

        return response()->json($cathechumene);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Person\Cathechumene  $cathechumene
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!$cathechumene = Cathechumene::find($id)){
            abort(404,"No cathechumene found wiht id $id");
        }
        $cathechumene->delete();
        return response()->json();
    }
}
