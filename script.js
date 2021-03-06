(() => {
   var labelArray = [];
   var dataArray = [];
   //Consulta del primer archivo Covid19
   const proxyurl = "https://cors-anywhere.herokuapp.com/";
   const url = "http://api-peru-covid19.herokuapp.com/files/output/casos.json"; // site that doesn’t send Access-Control-*
   $.getJSON(proxyurl + url, function (result) {
      $.each(result, function (i, field) {
         //console.log(field);
         labelArray.push(field['Región']);
         dataArray.push(field['TOTAL CASOS (+)']);
      });
      labelArray.shift();
      dataArray.shift();
   });


   var ctx = document.getElementById('myChart');
   var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
         labels: labelArray,
         datasets: [{
            label: '# Total por Región',
            data: dataArray,
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         scales: {
            yAxes: [{
               ticks: {
                  beginAtZero: true
               }
            }]
         }
      }
   });
})();

(() => {
   //Consulta del segundo archivo Covid19
   var departamentosArray = [];
   var muestrasArray = [];
   var confirmadoAray = [];
   const proxyurl2 = "https://cors-anywhere.herokuapp.com/";
   const url2 = "http://api-peru-covid19.herokuapp.com/files/output/positividad.json"; // site that doesn’t send Access-Control-*
   $.getJSON(proxyurl2 + url2, function (result) {
      $.each(result, function (i, field) {
         console.log(field);
         departamentosArray.push(field['REGION']);
         muestrasArray.push(field['Muestras']);
         confirmadoAray.push(field['Confirmado (+)']);
      });
      departamentosArray.shift();
      muestrasArray.shift();
      confirmadoAray.shift();
   });

   var lineChartData = {
      labels: departamentosArray,
      datasets: [{
         label: 'Muestras',
         borderColor: window.chartColors.red,
         backgroundColor: window.chartColors.red,
         fill: false,
         data: muestrasArray,
         yAxisID: 'y-axis-1',
      }, {
         label: 'Positivos',
         borderColor: window.chartColors.blue,
         backgroundColor: window.chartColors.blue,
         fill: false,
         data: confirmadoAray,
         yAxisID: 'y-axis-2'
      }]
   };

   window.onload = function () {
      var ctx = document.getElementById('canvas').getContext('2d');
      window.myLine = Chart.Line(ctx, {
         data: lineChartData,
         options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
               display: true,
               text: 'Comparativa muestras con casos positivos'
            },
            scales: {
               yAxes: [{
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
               }, {
                  type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: 'right',
                  id: 'y-axis-2',

                  // grid line settings
                  gridLines: {
                     drawOnChartArea: false, // only want the grid lines for one axis to show up
                  },
               }],
            }
         }
      });
   };
})();