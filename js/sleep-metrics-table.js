document.addEventListener('DOMContentLoaded', function(){
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th class="invisible"></th>
      <th colspan="3">Sleep Health Snapshot</th>
      <th colspan="2">Circadian</th>
    </tr>
    <tr>
      <th class="invisible"></th>
      <th>Sleep Onset Latency</th>
      <th>Awakenings</th>
      <th>Sleep Efficiency</th>
      <th>Chronotype</th>
      <th>Light Exposure</th>
    </tr>
    <tr>
      <th>Goal</th>
      <td>< 20 min</td>
      <td>< 1–2</td>
      <td>> 85%</td>
      <td>Stable</td>
      <td>Bright AM / Dim PM</td>
    </tr>
    <tr>
      <th>Current</th>
      <td>—</td>
      <td>—</td>
      <td>—</td>
      <td>—</td>
      <td>—</td>
    </tr>`;

  document.querySelectorAll('.sleep-metrics-table').forEach(div=>div.appendChild(table.cloneNode(true)));

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = '/css/sleep-table.css';
  document.head.appendChild(stylesheet);
  });