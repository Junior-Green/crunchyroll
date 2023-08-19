import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseAuth = inject(Auth)
  const router = inject(Router)
  //console.log(firebaseAuth)

  if (!firebaseAuth.currentUser) {
    router.navigate(['/login'])
  }
  return true
};
