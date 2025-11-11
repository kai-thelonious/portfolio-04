// BMO script
let labels = [];
let data = [];
const genreData = []; // Combined array to hold genre and track count for sorting

await fetch("./songs-per-genre.json")
    .then(response => response.json())
    .then(songsPerGenre => {
        // 1. Load data into a single array for easier sorting
        songsPerGenre.forEach(song => {
            genreData.push({
                genre: song.genre,
                tracks: song.genre_tracks
            });
        });
    });

// 2. Sort the data: Largest tracks count first (darkest color)
genreData.sort((a, b) => b.tracks - a.tracks);

// 3. Separate the sorted data back into Chart.js arrays
genreData.forEach(item => {
    labels.push(item.genre);
    data.push(item.tracks);
});

// --- DYNAMIC COLOR GENERATION FUNCTION (RED) ---
function generateRedPalette(count) {
    const palette = [];

    // Define the lightness range (L in HSL):
    // Lower L is darker, Higher L is lighter.
    const minLightness = 15; // Darkest shade (deep red)
    const maxLightness = 85; // Lightest shade (pale pinkish red)

    // Hue (H) for Red is 0. Saturation (S) is high for rich color.
    const fixedHue = 0;
    const fixedSaturation = 80; // High saturation for vivid color

    // Calculate the step size for lightness
    const step = (maxLightness - minLightness) / Math.max(1, count - 1);

    for (let i = 0; i < count; i++) {
        // Calculate the lightness, starting dark and getting lighter
        const lightness = Math.round(minLightness + (i * step));

        // Use HSL format which is easy to manipulate programmatically
        palette.push(`hsl(${fixedHue}, ${fixedSaturation}%, ${lightness}%)`);
    }
    return palette;
}
// ------------------------------------------------

// Generate the color palette based on the number of labels
const PIE_COLORS = generateRedPalette(labels.length);

const ctx1 = document.querySelector('#myDonutChart').getContext('2d');

// Set default text color to contrast with the red slices (white)
Chart.defaults.color = '#FFFFFF';
Chart.defaults.font.weight = 'bold';

const chart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Songs Per Genre',
            data: data,
            // Apply the dynamically generated red palette
            backgroundColor: PIE_COLORS,
            borderColor: '#FFFFFF', // Use white borders to separate slices
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#333333' // Set legend text back to dark gray
                }
            },
            title: {
                display: true,
                text: 'Songs Per Genre Distribution (Darker Red = More Tracks)',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#333333' // Set title text to dark gray
            }
        }
    }
});