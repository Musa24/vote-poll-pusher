const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const choice = document.querySelector('input[name=framework]:checked').value;

  const data = { framework: choice };
  //Call the API => POST method
  fetch('http://localhost:5000/poll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('Error', err);
    });
});

//Fetching data = GET
fetch('http://localhost:5000/poll')
  .then((res) => res.json())
  .then((data) => {
    console.log('DATA', data);
    const votes = data.votes;
    const totalVotes = votes.length;

    const voteCounts = votes.reduce((acc, currVote) => {
      acc[currVote.framework] =
        (acc[currVote.framework] || 0) + parseInt(currVote.points);
      return acc;
    }, {});

    //IMPLEMENTING CANVAS JS
    let dataPoints = [
      { label: 'React', y: voteCounts.React ? voteCounts.React : 0 },
      { label: 'Angular', y: voteCounts.Angular ? voteCounts.Angular : 0 },
      { label: 'Vue.js', y: voteCounts['Vue.js'] ? voteCounts['Vue.js'] : 0 },
      {
        label: 'Ember.js',
        y: voteCounts['Ember.js'] ? voteCounts['Ember.js'] : 0,
      },
    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
          text: `Framework Results -${totalVotes} votes `,
        },
        data: [{ type: 'column', dataPoints: dataPoints }],
      });

      //Render a chart
      chart.render();
      // Enable pusher logging - don't include this in production
      // Pusher.logToConsole = true;

      const pusher = new Pusher('89259f67dec6904e068c', {
        cluster: 'eu',
      });

      const channel = pusher.subscribe('framework-polls');
      channel.bind('framework-vote', function (data) {
        dataPoints = dataPoints.map((x) => {
          if (x.label === data.framework) {
            x.y += data.point;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }
  });
