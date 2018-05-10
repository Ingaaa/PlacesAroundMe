import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    private listsCollection: AngularFirestoreCollection<any> =
        this.afs.collection<any>('Lists');
    private readonly lists = [
        { title: 'Favorīti', key: 'favourites' },
        { title: 'Vēlos apmeklēt', key: 'toVisit' },
        { title: 'Esmu apmeklējis', key: 'visited' }
    ];

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
        this.afs.collection('Lists').doc(userUID).set({ userUID: userUID });

        this.lists.forEach(element => {
            const id = this.afs.createId();
            this.afs.collection('Lists').doc(userUID).collection('lists')
                .doc(id).set(
                    {
                        id: id,
                        created: new Date().valueOf(),
                        title: element.title,
                        key: element.key,
                    }, { merge: true });
            this.afs.collection('Lists').doc(userUID).collection('lists')
                .doc(id).collection('places');
        });
    }

    getUserLists(userUID: string) {
        return this.listsCollection.doc(userUID).collection('lists').valueChanges();
    }

    addToUserList(placeID, userUID, listID) {
        const userListCollection = this.afs.collection('Lists').doc(userUID)
            .collection('lists').doc(listID).collection('places').doc(placeID);

        userListCollection.set({ id: placeID, created: new Date().valueOf() }).then((data) => { });
    }

    removeFromUserList(placeID, userUID, listID) {
        const userListCollection = this.afs.collection('Lists').doc(userUID)
            .collection('lists').doc(listID).collection('places').doc(placeID);
        userListCollection.delete();
    }

    findPlaceInList(placeID, userUID, listID) {
        return this.afs.collection('Lists').doc(userUID)
            .collection('lists').doc(listID)
            .collection('places', ref => ref.where('id', '==', placeID)).valueChanges();
    }

    getListPlaces(userUID, listID) {
        return this.afs.collection('Lists').doc(userUID)
            .collection('lists').doc(listID)
            .collection('places').valueChanges();
    }
}
