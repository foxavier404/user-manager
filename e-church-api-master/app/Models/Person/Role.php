<?php

namespace App\Models\Person;

use Laratrust\Models\LaratrustRole;

class Role extends LaratrustRole
{
    protected $guarded = [];

    public function permissions() {
        return $this->belongsToMany('App\Models\Person\Permission');
    }

    // public function permission_roles() {
    //     return $this->belongsToMany('App\PermissionRole');
    // }
}
