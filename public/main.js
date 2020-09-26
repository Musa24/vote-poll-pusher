const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const choice = document.querySelector('input[name=os]:checked').value;
  const data = { os: choice };
  //Call the API
  fetch('http://localhost:5000/poll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Send');
    })
    .catch((err) => {
      console.log(err);
    });
});

//Fetching data

fetch('http://localhost:5000/poll')
  .then((res) => res.json())
  .then((data) => {
    const votes = data.votes;
    const totalVotes = votes.length;

    const voteCounts = votes.reduce((acc, currVote) => {
      acc[currVote.os] = (acc[currVote.os] || 0) + parseInt(currVote.points);
      return acc;
    }, {});

    //IMPLEMENTING CANVAS JS
    let dataPoints = [
      { label: 'Window', y: voteCounts.Window },
      { label: 'MacOS', y: voteCounts.MacOS },
      { label: 'Linux', y: voteCounts.Linux },
      { label: 'Other', y: voteCounts.Other },
    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
          text: `OS Results -${totalVotes} votes `,
        },
        data: [{ type: 'column', dataPoints: dataPoints }],
      });

      //Render a chart
      chart.render();
      // Enable pusher logging - don't include this in production
      //   Pusher.logToConsole = true;

      const pusher = new Pusher('89259f67dec6904e068c', {
        cluster: 'eu',
      });

      const channel = pusher.subscribe('os-polls');
      channel.bind('os-vote', function (data) {
        dataPoints = dataPoints.map((x) => {
          if (x.label === data.os) {
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
