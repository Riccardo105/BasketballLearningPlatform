
// adds the exercises list to the indexedDb
// needed for offline feature throuhg service worker
document.addEventListener('DOMContentLoaded', async () => {

const exercisesDataElement = document.getElementById('exercises-data');
const exercises = JSON.parse(exercisesDataElement.textContent);

console.log("Parsed exercises data:", exercises);
   try {
    const db = await openDatabase();
    // check if exercises are in the database already
    const exercisesExist = await checkExercisesExistInDb(db);
    // if no exercises in the database
    if (!exercisesExist) {
        // and if exercises are rendered to the page
         if (exercises.length > 0) {
            // save them to the database
            await saveExercisesToIndexedDB(db, exercises);
            console.log('Exercises saved to IndexedDB');
         } else { 
            console.warn('No exercises found on the page');
         } 
    } else {
        console.log('Exercises already exist in IndexedDB');
    }
   } catch (error) {
    console.error('Error handling exercises:', error);
   }
 });

 function openDatabase() {
    return new Promise ((resolve, reject) => {
        const request = indexedDB.open("exercise-db", 2)
    
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("exercises")) {
                db.createObjectStore("exercises", {keyPath: "_id"})
            }
        }
    
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error)

    })
 };

 function checkExercisesExistInDb(db) {
    return new Promise ((resolve, reject) => { 
        console.log("database:", db)
        const tx = db.transaction("exercises", "readonly");
        const store = tx.objectStore("exercises");
        const countRequest = store.count();

        countRequest.onsuccess = () => resolve(countRequest.result > 0);
        countRequest.onerror = () => reject(countRequest.error);

    });
 }


// saves the exercises to the indexedDb
function saveExercisesToIndexedDB(db, exercises) {
   return new Promise ((resolve, reject) => {
    const tx = db.transaction("exercises", "readwrite");
    const store = tx.objectStore("exercises");

    exercises.forEach(exercise => {
        store.put(exercise);
    });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
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
            
            const linkElement = event.target.closest('a');

            // Capture the exercise ID from the data-id attribute
            const exerciseId = linkElement.getAttribute("data-id"); // Access data-id from the dataset

            // Save the exercise ID to IndexedDB
            saveExerciseIdToIndexedDB(exerciseId);

            // After saving, navigate to the exercise page
            window.location.href = linkElement.href;// Perform the navigation after saving the ID
        });
    });
});

// Function to save the exercise ID to IndexedDB
async function saveExerciseIdToIndexedDB(exerciseId) {
    try {
        const db = await openDatabase();
        const tx = db.transaction('exercises', 'readwrite');
        const store = tx.objectStore('exercises');
        await store.put({ _id: 'current-exercise', exerciseId: exerciseId });
        return new Promise((resolve) => {
            tx.oncomplete = () => resolve();
        });
    } catch (error) {
        console.error('Error saving exercise ID:', error);
        throw error;
    }
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
        const request = indexedDB.open('exercise-db', 2);
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
                        const exercise = event.target.result
                        console.log("exercise:", exercise)
                        if (exercise) {

                            fetch("http://localhost:5000/sessionHistory/addOngoingEntry", {
                                method: 'POST',
                                body: JSON.stringify({ exerciseId : exercise._id}),
                                headers: { 'Content-Type': 'application/json'},
                                credentials: "include"
                            }).then((response) => {
                                if (!response.ok) {
                                    console.error(
                                        "Error: ",
                                        response.status,
                                        response.statusText
                                    );
                                    reject("API call failed");
                                } else {
                                    return response.json();
                                }
                            })
                            .then((result) => {
                                console.log("API Response:", result);
                                resolve(result);
                            })
                            .catch((error) => {
                                console.error("Error calling the add-entry API:", error);
                                reject(error);
                            });
                        } else {
                            reject("Exercise not found in store"); 
                        } 
                        resolve(event.target.result)
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
