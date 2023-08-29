import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const firebase = inject(FirebaseService);
  return firebase.isLoggedIn()
};
