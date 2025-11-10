const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});





const ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.color = '#000000';

new Chart(ctx, {
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


