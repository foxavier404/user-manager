<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Models\Setting\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        $data = Contact::simplePaginate($req->has('limit')? $req->limit : 15);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
        
             /* $data = $req->except('birth_certificate'); */
    
            $this->validate($data, [
                'name' => 'required',
                'email' => 'required',
                'PO_BOX' => 'required',
                'phone1' => 'required',
                'phone2' => 'required',
            ]);
    
                $contact = new Contact();
                $contact->name = $data['name'];
                $contact->email = $data['email'];
                $contact->PO_BOX = $data['PO_BOX'];
                $contact->phone1 = $data['phone1'];
                $contact->phone2 = $data['phone2'];
               /*  $contact->birth_certificate = $data['birth_certificate']; */
              
                $contact->save();
           
            return response()->json($contact);
        
    }

    public function find($id)
    {
        if(!$contact = Contact::find($id)){
            abort(404,"No contact found with id $id");
        }
        return response()->json($contact);
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

    public function searchContact(Request $req)
    {
        $this->validate($req->all(), ['q'=>'present',
        'field'=>'present'
       ]);
       $data = Contact::where($req->field,'like',"%$req->q%")->get();
       return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setting\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Setting\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Setting\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function updateContact(Request $req , $id)
    {
        
    
        $contact = contact::find($id);
        if (!$contact) {
            abort(404, "No contact found with id $id");
        }

        /* $data = $req->except('birth_certificate'); */

        $this->validate($data, [
            'name' => 'required',
            'email' => 'required',
            'PO_BOX' => 'required',
            'phone1' => 'required',
            'phone2' => 'required',
        ]);

        /* if (isset($data['password']) && strlen($data['password']) >= 4) {
            $data['password'] = bcrypt($data['password']);
        } */

        //upload image
        /* if ($file = $req->file('birth_certificate')) {
            $photo = app()->make('UploadService')->saveSingleImage($this, $req, 'birth_certificate', 'contacts');
            $data['birth_certificate'] =  $photo;
        } */

        if (null !== $data['name']) $contact->father_tel = $data['father_tel'];
        if (null !== $data['email']) $contact->email = $data['email'];
        if (null !== $data['PO_BOX']) $contact->PO_BOX = $data['PO_BOX'];
        if (null !== $data['phone1']) $contact->phone1 = $data['phone1'];
        if (null !== $data['phone2']) $contact->phone2 = $data['phone2'];
    
        
        
        $contact->update();

        return response()->json($contact);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!$contact = Contact::find($id)){
            abort(404,"No contact found wiht id $id");
        }
        $contact->delete();
        return response()->json();
    }
}
