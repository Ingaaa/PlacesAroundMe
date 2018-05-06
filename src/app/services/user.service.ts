import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    private listsCollection: AngularFirestoreCollection<any> =
        this.afs.collection<any>('Lists');

    constructor(
        private angularFire: AngularFireAuth,
        private afs: AngularFirestore) {
    }

    register(email: string, password: string) {
        return this.angularFire.auth.createUserWithEmailAndPassword(email, password);
    }

    signIn(email: string, password: string) {
        return this.angularFire.auth.signInWithEmailAndPassword(email, password);
    }

    resetPassword(email: string) {
        return this.angularFire.auth.sendPasswordResetEmail(email);
    }

    signOut() {
        return this.angularFire.auth.signOut();
    }

    authState(): Observable<firebase.User> {
        return this.angularFire.authState;
    }

    createUserLists(userUID) {

        const list1 = {
            created: new Date().valueOf(),
            title: 'Favorīti',
            userUID: userUID,
            placesIds: [],
            key: 'favourites'
        };

        const list2 = {
            created: new Date().valueOf(),
            title: 'Vēlos apmeklēt',
            userUID: userUID,
            placesIds: [],
            key: 'toVisit'
        };

        const list3 = {
            created: new Date().valueOf(),
            title: 'Esmu apmeklējis',
            userUID: userUID,
            placesIds: [],
            key: 'visited'
        };

        this.listsCollection.doc(userUID).set(
            {
                userUID: userUID,
                lists: [list1, list2, list3]
            });
    }

    getUserLists(userUID: string) {
        return this.listsCollection.doc(userUID).valueChanges();
    }

    updateUserList(placeId, userUID) {
        const userListCollection = this.afs.collection<any>('Lists/' + userUID + '/lists/0/placesIds');
        userListCollection.add({ id: placeId, created: new Date().valueOf() }).then((data) => {
            console.log(data);
        });

        // this.listsCollection.doc(userUID + '/lists/0/placesIds/1').set(data);
    }

}
