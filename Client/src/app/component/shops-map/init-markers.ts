export class Init {
  load() {
    if (localStorage.getItem('markers') == null || localStorage.getItem('markers') === undefined) {
      console.log('No markers found... creating...');

      const markers = [
        {
          name: 'Company One',
          lat: 42.525588,
          lng: -71.018029,
          draggable: true
        },

        {
          name: 'Company Two',
          lat: 42.868164,
          lng: -70.889071,
          draggable: true
        },
        {
          name: 'Company Three',
          lat: 42.858279,
          lng: -71.930498,
          draggable: false
        }
      ];

      localStorage.setItem('markers', JSON.stringify(markers));

    } else {
      console.log('Loading markers...');
    }
  }
}
