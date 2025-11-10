const ctx1 = document.querySelector('#myChart1').getContext('2d');
Chart.defaults.color = '#000000';


new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['2009-01', '2009-02'],
        datasets: [{
            label: '# of Votes',
            data: [35.32, 43.23],
            backgroundColor: '#136288',
            borderWidth: 1,
            color: '#000000'
        }]
    },
    options: {
        responsive: true,
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
});

const ctx3 = document.querySelector('#myChart3').getContext('2d');
Chart.defaults.color = '#000000';

new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Iron Maiden', 'U2', 'Metallica', 'Led Zeppelin', 'Lost', 'The Office', 'Os Paralamas Do Sucesso', 'Deep Purple', 'Faith No More', 'Eric Clapton'],
        datasets: [{
            label: 'Revenue in dollars',
            data: [138.60, 105.93, 90.09, 86.13, 81.59, 49.75, 44.55, 43.56, 41.58, 39.60],
            backgroundColor: '#136288',
            borderWidth: 1,
            color: '#000000'
        }]
    },
    options: {
        responsive: true,
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
});









