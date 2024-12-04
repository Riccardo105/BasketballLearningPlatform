
// adds the exercises list to the indexedDb
// needed for offline feature throuhg service worker
document.addEventListener('DOMContentLoaded', async () => {
    
    console.log(exercises)
    try {
        await saveExercisesToIndexedDB(exercises);
        console.log('Exercises saved to IndexedDB');
    } catch (error) {
        console.error('Failed to save exercises to IndexedDB:', error);
    }
});

// saves the exercises to the indexedDb
function saveExercisesToIndexedDB(exercises) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('exercise-db', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('exercises')) {
                db.createObjectStore('exercises', { keyPath: '_id' });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction('exercises', 'readwrite');
            const store = tx.objectStore('exercises');

            exercises.forEach(exercise => {
                store.put(exercise);
            });

            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        };

        request.onerror = (event) => reject(event.target.error);
    });
}

// saves clicked exercise int indexedDb
// the exerise page will use the current-exercise entry to display the correct exercise
document.addEventListener('DOMContentLoaded', () => {
    // Select all exercise links
    const exerciseLinks = document.querySelectorAll('.exerciseLink');

    exerciseLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent the default navigation behavior so we can capture the ID first
            event.preventDefault();
            console.log('Clicked element:', event.target)
            const linkElement = event.target.closest('a');
            console.log('Clicked element:', linkElement);

            // Capture the exercise ID from the data-id attribute
            const exerciseId = linkElement.getAttribute("data-id"); // Access data-id from the dataset
            console.log('Exercise ID:', exerciseId); // Log the exercise ID

            // Save the exercise ID to IndexedDB
            saveExerciseIdToIndexedDB(exerciseId);

            // After saving, navigate to the exercise page
            window.location.href = linkElement.href;// Perform the navigation after saving the ID
        });
    });
});

// Function to save the exercise ID to IndexedDB
function saveExerciseIdToIndexedDB(exerciseId) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('exercise-db', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction('exercises', 'readwrite');
            const store = tx.objectStore('exercises');
            store.put({ _id: 'current-exercise', exerciseId: exerciseId }); // Save the exercise ID
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        };
        request.onerror = (event) => reject(event.target.error);
    });
}

// retreive correct exercise and shows contents

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Get the current exercise ID from IndexedDB
        const currentExercise = await getCurrentExerciseFromIndexedDB();
        if (currentExercise) {
            // Populate the exercise page with data from IndexedDB
            document.getElementById('exerciseTitle').innerText = currentExercise.title;
            document.getElementById('exerciseCategory').innerText = currentExercise.category;
            document.getElementById('exerciseSkillLevel').innerText = currentExercise.skillLevel;
            document.getElementById('exerciseBody').innerText = currentExercise.body;
            document.getElementById('completedBtn').setAttribute("data-id", currentExercise._id)
        } else {
            console.error('No current exercise found in IndexedDB');
        }
    } catch (error) {
        console.error('Error fetching exercise from IndexedDB:', error);
    }
});

// Function to get the current exercise from IndexedDB
function getCurrentExerciseFromIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('exercise-db', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction('exercises', 'readonly');
            const store = tx.objectStore('exercises');

            // Retrieve the current exercise ID
            const exerciseIdRequest = store.get('current-exercise');
            exerciseIdRequest.onsuccess = (event) => {
                const data = event.target.result;
                if (data && data.exerciseId) {
                    const exerciseRequest = store.get(data.exerciseId);
                    exerciseRequest.onsuccess = (event) => {
                        resolve(event.target.result);
                    };
                    exerciseRequest.onerror = (event) => reject(event.target.error);
                } else {
                    reject('Current exercise not found');
                }
            };
            exerciseIdRequest.onerror = (event) => reject(event.target.error);
        };
        request.onerror = (event) => reject(event.target.error);
    });
}
