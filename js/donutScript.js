// BMO script
let labels = [];
let data = [];
const genreData = []; // Combined array to hold genre and track count for sorting

await fetch("js/songs-per-genre.json")
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

// Register a custom tooltip positioner
Chart.Tooltip.positioners.center = function(elements, eventPosition) {
    // Get the chart from the first element
    const chart = elements.length ? elements[0].element.$context.chart : null;
    if (!chart) return false;

    const { chartArea } = chart;
    // Return the center of the chart area
    return {
        x: chartArea.left + (chartArea.right - chartArea.left) / 2,
        y: chartArea.top + (chartArea.bottom - chartArea.top) / 2
    };
};

let lastHovered = null;


const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart) {
        const { ctx, chartArea: { width, height, left, top } } = chart;
        if (!lastHovered) return; // nothing to draw yet

        const label = lastHovered.label;
        const value = lastHovered.value;

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';


        const fontSizeGenre = 25;
        const fontSizeValue = 40;
        const fontSizeText = 40;

        const totalHeight = fontSizeGenre + fontSizeValue + fontSizeText; // approximate
        let startY = centerY - totalHeight / 2 + fontSizeGenre / 2;


        // Line 1: genre
        ctx.fillStyle = '#000000';
        ctx.font = `bold ${fontSizeGenre}px Montserrat, sans-serif`;
        ctx.fillText(label, centerX, startY);

        startY += fontSizeGenre / 2 + fontSizeValue / 2; // space between lines
        ctx.font = `bold ${fontSizeValue}px Montserrat, sans-serif`;
        ctx.fillStyle = '#000000';
        ctx.fillText(value, centerX, startY);

        // Line 3: "songs"
        startY += fontSizeValue / 2 + fontSizeText / 2;
        ctx.font = `bold ${fontSizeText}px Montserrat, sans-serif`;
        ctx.fillStyle = '#000000';
        ctx.fillText('songs', centerX, startY);

        ctx.restore();
    }
};


Chart.register(centerTextPlugin);


const chart1 = new Chart(ctx1, {
    type: 'doughnut',
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
        onHover: (event, elements, chart) => {
            if (elements.length) {
                lastHovered = {
                    label: chart.data.labels[elements[0].index],
                    value: chart.data.datasets[0].data[elements[0].index]
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: false
            },
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