import Realm from 'realm';

// Définir un schéma pour une tâche
export class Task extends Realm.Object<Task> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    completed!: boolean;

    static schema = {
        name: 'Task',
        primaryKey: '_id',
        properties: {
        _id: 'objectId',  // Identifiant unique
        name: 'string',   // Nom de la tâche
        completed: 'bool', // Statut de la tâche
        },
    };
}

export class User extends Realm.Object<User> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    firstname!: string;
    gender!: string;
    email!: string;
    password!: string;
    dateOfBirth!: string;
    weight!: number;
    height!: number;
    activity_level!: string;
    profilePicture!: string;

    static schema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
        _id: 'objectId',
        name: 'string', 
        firstname: 'string',
        gender: 'string',
        email: 'string',
        password: 'string',
        dateOfBirth: 'string',
        weight: 'int',
        height: 'int',
        activity_level: 'string',
        profilePicture: 'string',
        },
    };
}

export class Food extends Realm.Object<Food> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    image!: string;
    category!: string;
    calories!: number;
    carbohydrates!: number;
    proteins!: number;
    fats!: number;

    static schema = {
        name: 'Food',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            image: 'string',
            category: 'string',
            calories: 'int',
            carbohydrates: 'int',
            proteins: 'int',
            fats: 'int',
        },
    };
}


// const realm = await Realm.open({
//     schema: [Task], // Schéma de la base de données
// });

// Fonction pour ouvrir Realm et la réutiliser partout
export const openRealm = async (): Promise<Realm> => {
    const realm = await Realm.open({
      schema: [Task, Food], // Schémas utilisés dans votre base de données
    });
    return realm;
};