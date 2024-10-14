import { Image, StyleSheet, Platform, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Task, Food } from '@/database';
import { useState, useEffect } from 'react';
import FoodForm from '@/components/FoodForm';
import { useQuery, useRealm } from '@realm/react';

export default function HomeScreen() {

    const [tasks, setTasks] = useState<Realm.Results<Task> | null>(null); // State pour stocker les tâches
    const [foods, setFoods] = useState<Realm.Results<Food> | null>(null); // State pour stocker les tâches
    const realm = new Realm({ schema: [Food] });

    // useEffect(() => {
    //   // Fonction pour initialiser et manipuler Realm
    //   const initializeRealm = async () => {
    //     const realm = await Realm.open({
    //       schema: [Task], // Schéma de la base de données
    //     });

    //     // Ajouter un exemple de tâche si la base est vide
    //     realm.write(() => {
    //       if (realm.objects('Task').length === 0) {
    //         realm.create('Task', {
    //           _id: new Realm.BSON.ObjectId(),
    //           name: 'Apprendre Realm',
    //           completed: false,
    //         });
    //       }
    //     });

    //     // Lire les données
    //     const tasksFromRealm = realm.objects<Task>('Task');
    //     setTasks(tasksFromRealm); // Stocker les données dans le state
    //   };

    //   initializeRealm();

    // }, []);

    const fetchFoods = async () => {
        const Foods = realm.objects<Food>('Food');
        setFoods(Foods);

        return Array.from(Foods);

    };

    useEffect(() => {
        fetchFoods(); // Charger les aliments au montage du composant
    }, []);

    // Fonction pour être appelée après l'ajout d'un aliment
    const handleFoodAdded = async () => {
        await fetchFoods(); // Mettre à jour la liste des aliments
        console.log('Aliments mis à jour :', foods);
      };
// DELETE
  const deleteFood = (deletableFood: Food) => {
    realm.write(() => {
        realm.delete(deletableFood); // Supprime l'aliment
    });
    fetchFoods(); // Met à jour la liste après suppression
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView>
    {foods && foods.length > 0 ? (
        foods.map((food, id) => (
          <View style={styles.food}  key={id}>
            <ThemedText>{food.name}, #{id}</ThemedText>
            <Button onPress={() => deleteFood(food)} title={'delete'}>

            </Button>
          </View>
        ))
    ) : (
        <ThemedText>Aucun aliment disponible.</ThemedText>
    )}
</ThemedView>
      
        <FoodForm onFoodAdded={handleFoodAdded}></FoodForm>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  food : {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
