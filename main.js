let labels = []
let data = []

await fetch("./songs-per-genre.json")
    .then(response => response.json())
    .then(songsPerGenre => {
        console.log(songsPerGenre)
        // HERE IS WHERE YOU WRITE YOUR CODE!!!!!!!!


        songsPerGenre.forEach(song => {
            labels.push(song.genre)

            data.push(song.genre_tracks)
        });
    });

console.log(labels)
console.log(data)

const bounceShadowPlugin = {
    id: 'bounceShadowPlugin',
    afterDatasetsDraw(chart) {
        const active = chart.getActiveElements();
        if (active.length > 0) {
            const { ctx } = chart;
            const { datasetIndex, index } = active[0];
            const bar = chart.getDatasetMeta(datasetIndex).data[index];

            const time = Date.now() / 200;
            const offsetY = Math.sin(time) * 5;

            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = 'rgba(99, 99, 99, 2)';
            ctx.fillRect(bar.x - bar.width / 2, bar.y + offsetY, bar.width, chart.chartArea.bottom - bar.y - offsetY);
            ctx.restore();
        }
    }
};


const colorSweepPlugin = {
    id: 'colorSweepPlugin',
    afterDatasetsDraw(chart) {
        const active = chart.getActiveElements();
        if (active.length > 0) {
            const { ctx } = chart;
            const { datasetIndex, index } = active[0];
            const bar = chart.getDatasetMeta(datasetIndex).data[index];

            const time = Date.now() / 500;
            const gradient = ctx.createLinearGradient(bar.x - bar.width / 2, bar.y, bar.x + bar.width / 2, chart.chartArea.bottom);
            gradient.addColorStop(0, `rgba(40, 0, 0, 1)`);
            gradient.addColorStop(0.5 + 0.5 * Math.sin(time), `rgba(204, 153, 51, 1)`); // moving highlight
            gradient.addColorStop(1, `rgba(150, 30, 30, 1)`);

            ctx.save();
            ctx.fillStyle = gradient;
            ctx.fillRect(bar.x - bar.width / 2, bar.y, bar.width, chart.chartArea.bottom - bar.y);
            ctx.restore();
        }
    }
};
const ctx1 = document.querySelector('#myChart1').getContext('2d');
Chart.defaults.color = '#000000';

const customTexts1 = [
    "High-energy guitars and drums.",
    "Rhythmic and danceable.",
    "Heavy riffs and powerful vocals.",
    "Edgy, rebellious tunes.",
    "Smooth, improvisational sounds.",
    "Famous TV themes.",
    "Soulful guitar and piano.",
    "Orchestral masterpieces",
    "Emotional, cinematic tracks.",
    "Melodic and heartfelt.",
    "Relaxed Jamaican rhythms.",
    "Catchy, chart-topping hits.",
    "Movie and game scores.",
    "Indie and unique styles.",
    "Rhythmic beats with rap.",
    "Electronic club music.",
    "Intense and loud.",
    "Global cultural music.",
    "Futuristic soundscapes.",
    "Soft, relaxing tunes.",
    "Funny and quirky songs.",
    "Smooth Brazilian rhythms.",
    "Imaginative sci-fi sounds.",
    "Classic energetic rock.",
    "Dramatic vocal performances."
];

const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Songs Per Genre',
            data: data,
            backgroundColor: [
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E"],
            borderColor: "#CC9933",
            borderWidth: 3,
            color: '#000000'
        }]
    },
    options: {
        plugins: {
            tooltip: {
                titleFont: { family: 'Montserrat, sans-serif', size: 12, weight: 'bold' },
                bodyFont: { family: 'Montserrat, sans-serif', size: 12},
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#FFD700',
                bodyColor: '#FFFFFF',
                borderColor: '#CC9933',
                displayColors: false,
                enabled: true,
                callbacks: {
                    title: function (context) {
                        return "Genre: " + context[0].label;
                    },
                    label: function (context) {
                        const index = context.dataIndex;
                        const value = Math.round(context.parsed.y);
                        return customTexts1[index] + " — Total songs: " + value + " songs";
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        responsive: true,
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    },
    plugins: [bounceShadowPlugin, colorSweepPlugin]
});




const ctx2 = document.querySelector('#myChart2').getContext('2d');
Chart.defaults.color = '#000000';

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#136288',
            borderWidth: 1,
            color: '#000000'
        }]
    },
    options: {
        responsive: true,
    },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }

            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
);

const ctx3 = document.querySelector('#myChart3').getContext('2d');
Chart.defaults.color = '#000000';

const customTexts3 = [
    "Heavy metal legends",
    "Irish rock icons with global hits",
    "Thrash metal pioneers from the US",
    "Classic rock innovators",
    "Experimental band with cult following",
    "Soundtrack for the hit show",
    "Brazilian rock legends",
    "British rock pioneers",
    "Alternative metal innovators",
    "Blues rock legend"
];

new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Iron Maiden', 'U2', 'Metallica', 'Led Zeppelin', 'Lost', 'The Office', 'Os Paralamas Do Sucesso', 'Deep Purple', 'Faith No More', 'Eric Clapton'],
        datasets: [{
            label: 'Revenue in dollars',
            data: [138.60, 105.93, 90.09, 86.13, 81.59, 49.75, 44.55, 43.56, 41.58, 39.60],
            backgroundColor: [
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E",
                "#280000",
                "#961E1E"],
            borderColor: "#CC9933",
            borderWidth: 3,
            color: '#000000'
        }]
    },
    options: {
        plugins: {
            tooltip: {
                titleFont: { family: 'Montserrat, sans-serif', size: 12, weight: 'bold' },
                bodyFont: { family: 'Montserrat, sans-serif', size: 12},
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#FFD700',
                bodyColor: '#FFFFFF',
                borderColor: '#CC9933',
                displayColors: false,
                enabled: true,
                callbacks: {
                    title: function (context) {
                        return "Artist: " + context[0].label;
                    },
                    label: function (context) {
                        const index = context.dataIndex;
                        const value = context.parsed.y.toFixed(2);
                        return customTexts3[index] + " — $" + value + "M revenue";
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        responsive: true,
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    },
    plugins: [bounceShadowPlugin, colorSweepPlugin]
});









