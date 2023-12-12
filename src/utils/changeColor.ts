export function changeColor(color: string) {
  switch (color) {
    case '000000':
      return (color = 'Black');
    case '848482':
      return (color = 'Silver');
    case '318ce7':
      return (color = 'Blue');
    case 'ddf9f12':
      return (color = 'White');
    case '006400':
      return (color = 'Green');
    case 'b43332':
      return (color = 'Red');
    case 'fffc99':
      return (color = 'Yellow');

    default:
      return color;
  }
}
