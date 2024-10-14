import React, { useState } from 'react';
import Realm from 'realm';
import { Food } from '@/database'; // Assure-toi d'importer la classe Food depuis le bon chemin
import { TextInput, View, Button, StyleSheet } from 'react-native';

export default function FoodForm({onFoodAdded }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [calories, setCalories] = useState(180);
    const [carbohydrates, setCarbohydrates] = useState(30);
    const [proteins, setProteins] = useState(10);
    const [fats, setFats] = useState(10);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async () => {
        console.log('Soumission du formulaire'); // Ajouté pour le débogage
        try {
            // Ouvrir la base de données Realm
            const realm = await Realm.open({
                schema: [Food], // Spécifie le schéma à utiliser
                // path: 'myrealm.realm', // Spécifie le chemin de la base de données / peux causer des problemes ne pas activé sauf specification particuliere
            });
            console.log(name)
            console.log(calories)
            console.log(image)
            // Ajouter un nouvel objet Food
            realm.write(() => {
                realm.create('Food', {
                    _id: new Realm.BSON.ObjectId(),
                    name,
                    image,
                    category,
                    calories,
                    carbohydrates,
                    proteins,
                    fats,
                });
            });

            console.log('Aliment ajouté'); // Ajouté pour le débogage

            if (onFoodAdded) {
                onFoodAdded();
            }

            // Réinitialiser les champs du formulaire
            setName('');
            setImage('');
            setCategory('');
            setCalories(180);
            setCarbohydrates(0);
            setProteins(0);
            setFats(0);
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un aliment :', error); // Afficher l'erreur
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={name}
                onChangeText={setName}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Catégorie"
                value={category}
                onChangeText={setCategory}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Calories"
                value={calories.toString()}
                onChangeText={(value) => setCalories(Number(value))}
                keyboardType="numeric"
                
            />
            <TextInput
                style={styles.input}
                placeholder="Glucides"
                value={carbohydrates.toString()}
                onChangeText={(value) => setCarbohydrates(Number(value))}
                keyboardType="numeric"
                
            />
            <TextInput
                style={styles.input}
                placeholder="Protéines"
                value={proteins.toString()}
                onChangeText={(value) => setProteins(Number(value))}
                keyboardType="numeric"
                
            />
            <TextInput
                style={styles.input}
                placeholder="Lipides"
                value={fats.toString()}
                onChangeText={(value) => setFats(Number(value))}
                keyboardType="numeric"
                
            />
            <Button title="Ajouter un aliment" onPress={handleSubmit} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
