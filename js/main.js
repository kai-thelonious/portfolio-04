
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

            // Get custom options from the chart config
            const opts = chart.options.plugins.colorSweepPlugin || {};

            const colors = opts.gradientColors || [
                'rgba(40, 0, 0, 1)',
                'rgba(204, 153, 51, 1)',
                'rgba(150, 30, 30, 1)'
            ];
            const speed = opts.speed || 500; // how fast the highlight moves

            const time = Date.now() / speed;
            const gradient = ctx.createLinearGradient(
                bar.x - bar.width / 2,
                bar.y,
                bar.x + bar.width / 2,
                chart.chartArea.bottom
            );

            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(
                0.5 + 0.5 * Math.sin(time),
                colors[1]
            );
            gradient.addColorStop(1, colors[2]);

            ctx.save();
            ctx.fillStyle = gradient;
            ctx.fillRect(
                bar.x - bar.width / 2,
                bar.y,
                bar.width,
                chart.chartArea.bottom - bar.y
            );
            ctx.restore();
        }
    }
};


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

let labelsChart1 = []
let dataChart1 = []

await fetch("js/genre-track-length.json")
    .then(response => response.json())
    .then(trackLengthPerGenre => {
        console.log(trackLengthPerGenre)
        // HERE IS WHERE YOU WRITE YOUR CODE!!!!!!!!


        trackLengthPerGenre.forEach(genre => {
            labelsChart1.push(genre.genre)
            dataChart1.push(genre.track_length_m)
        });
    });

console.log(labelsChart1)
console.log(dataChart1)
console.log("")
console.log("")


const ctx1 = document.querySelector('#myChart1').getContext('2d');
Chart.defaults.color = '#000000';

const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: labelsChart1,
        datasets: [{
            label: 'Track Length Minutes',
            data: dataChart1,
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
                        return "Average Track Length: " + value + "m ";
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
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Arial',  // Font family
                        size: 8,         // Font size in px
                        weight: 'bold',   // Font weight
                        style: 'italic'   // Font style
                    },
                    color: '#333'       // Font color
                }
            }
        }
    },
    plugins: [bounceShadowPlugin, colorSweepPlugin]
});


let labelsChart2 = []
let dataChart2 = []

await fetch("js/genre-revenue.json")
    .then(response => response.json())
    .then(revenuePerGenre => {
        console.log(revenuePerGenre)
        // HERE IS WHERE YOU WRITE YOUR CODE!!!!!!!!


        revenuePerGenre.forEach(genre => {
            labelsChart2.push(genre.genre)

            dataChart2.push(genre.revenue)
        });
    });

console.log(labelsChart2)
console.log(dataChart2)
console.log("")
console.log("")

const ctx2 = document.querySelector('#myChart2').getContext('2d');
Chart.defaults.color = '#000000';

const chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labelsChart2,
        datasets: [{
            label: "Revenue In Dollars",
            data: dataChart2,
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
                        return customTexts1[index] + " — $" + value + "K revenue";
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
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Arial',  // Font family
                        size: 8,         // Font size in px
                        weight: 'bold',   // Font weight
                        style: 'italic'   // Font style
                    },
                    color: '#333'       // Font color
                }
            }
        }
    },
    plugins: [bounceShadowPlugin, colorSweepPlugin]
});


let labelsChart3 = []
let dataChart3 = []

await fetch("js/top-10-revenue-artists.json")
    .then(response => response.json())
    .then(revenuePerArtist => {
        console.log(revenuePerArtist)
        // HERE IS WHERE YOU WRITE YOUR CODE!!!!!!!!


        revenuePerArtist.forEach(artist => {
            labelsChart3.push(artist.artist)

            dataChart3.push(artist.revenue)
        });
    });

console.log(labelsChart3)
console.log(dataChart3)
console.log("")
console.log("")



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
        labels: labelsChart3,
        datasets: [{
            label: 'Revenue In Dollars',
            data: dataChart3,
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
                        return customTexts3[index] + " — $" + value + "K revenue";
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
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Arial',  // Font family
                        size: 8,         // Font size in px
                        weight: 'bold',   // Font weight
                        style: 'italic'   // Font style
                    },
                    color: '#333'       // Font color
                }
            }
        }
    },
    plugins: [bounceShadowPlugin, colorSweepPlugin]
});


let labelsChart4 = []
let dataChart4 = []

await fetch("js/monthly-revenue.json")
    .then(response => response.json())
    .then(revenuePerMonth => {
        console.log(revenuePerMonth)
        // HERE IS WHERE YOU WRITE YOUR CODE!!!!!!!!


        revenuePerMonth.forEach(month => {
            labelsChart4.push(month.month)

            dataChart4.push(month.revenue)
        });
    });

console.log(labelsChart4)
console.log(dataChart4)
console.log("")
console.log("")

const ctx4 = document.querySelector('#myChart4').getContext('2d');
Chart.defaults.color = '#000000';

const chart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: labelsChart4,
        datasets: [{
            label: "Revenue In Dollars",
            data: dataChart4,
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
                        return "Year and Month: " + context[0].label;
                    },
                    label: function (context) {
                        const value = Math.round(context.parsed.y);
                        return `Revenue: ${value}K$`;
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
            y: { beginAt20: true, grid: { display: false } },
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Arial',  // Font family
                        size: 8,         // Font size in px
                        weight: 'bold',   // Font weight
                        style: 'italic'   // Font style
                    },
                    color: '#333'       // Font color
                }
            }
        }
    },
});









