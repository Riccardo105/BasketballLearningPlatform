
// exercise button (in burger menu) to exercise page
document.querySelectorAll(".exercisesBtn").forEach(element => {
     element.addEventListener("click", function() {
        window.location.href = "/exercises"; // Navigates to the exercises page
    });
});

// filter button (in exercise page) to show filter menu
function toggleFilterMenu() {
    const filterMenu = document.getElementById('exerciseFilter');
    filterMenu.classList.toggle('hidden');
  };

// filtering function that alters the shown exercises
function applyFilters() {

    // get selected filters
    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value || '';
    const selectedSkillLevel = document.querySelector('input[name="skillLevel"]:checked')?.value || '';

    // Get all exercise buttons
    const exercises = document.querySelectorAll('.exerciseLink');

    exercises.forEach(exercise => {
        const category = exercise.getAttribute('data-category');
        const skillLevel = exercise.getAttribute('data-skillLevel');

        // Check if exercise matches selected filters
        const matchesCategory = selectedCategory ? category === selectedCategory : true;
        const matchesSkillLevel = selectedSkillLevel ? skillLevel === selectedSkillLevel : true;

        // Show or hide the exercise based on whether it matches the filters
        if (matchesCategory && matchesSkillLevel) {
            exercise.style.display = 'block';  // Show
        } else {
            exercise.style.display = 'none';  // Hide
        }
    });
}

// Add event listeners for radio buttons in the filters menu
document.querySelectorAll('input[name="category"]').forEach(input => {
    input.addEventListener('change', applyFilters);  // Listen for changes on category radio buttons
});

document.querySelectorAll('input[name="skillLevel"]').forEach(input => {
    input.addEventListener('change', applyFilters);  // Listen for changes on skillLevel radio buttons
});


// Clear filters button (in exercise page) and show all exercises
function clearFilters() {
    // Uncheck all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });

    // Show all exercises
    const exercises = document.querySelectorAll('.exerciseLink');
    exercises.forEach(exercise => {
        exercise.style.display = 'block';
    });
}


// complete button logic to save exercise to completed session and remove it from ongoing session

document.getElementById("completedBtn").addEventListener("click", function() {
    const exerciseId = this.getAttribute("data-id");
    console.log("from button:", exerciseId)
    // first the exercise is removed from the ongoing history
        fetch("/sessionHistory/addOngoingEntry", {
            method: 'POST',
            body: JSON.stringify({ exerciseId}),
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        }).then(response => {
            if (!response.ok) {
                // If the response status is not OK (200), log the status and throw an error
                console.error('Error: ', response.status, response.statusText);
                
            }else if (response.ok) {
                this.innerHTML = '<span class="text-green-600 ">✔ Completed</span>';
                this.classList.remove('hover:bg-green-600', 'bg-white');
                this.classList.add('bg-gray-300', 'cursor-not-allowed');
            }
            return response.json();

        }).catch(error => {
            console.error('Error calling the add-entry API:', error);
        });

    // then the exercise is added to the completed session
    
        fetch("/sessionHistory/addOngoingEntry", {
            method: 'POST',
            body: JSON.stringify({ exerciseId}),
            headers: { 'Content-Type': 'application/json'},
            credentials: "include"
        }).then(response => {
            if (!response.ok) {
                // If the response status is not OK (200), log the status and throw an error
                console.error('Error: ', response.status, response.statusText);
                
            }
            return response.json();

        }).catch(error => {
            console.error('Error calling the add-entry API:', error);
        })
});


