import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

interface User {
    uid: string;
    email: string;
}

@Injectable()
export class AuthService {
    user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.user = this.afAuth.authState;
    }

    register(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    signIn(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    resetPassword(email: string) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider);
    }

    signOut() {
        this.afAuth.auth.signOut();
    }
}
